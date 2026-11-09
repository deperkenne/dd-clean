import type { DownloadedFile } from './api.types'
import { logError } from './log'

/** Racine des API du back-end ; vide = même origine (proxy Vite en développement). */
const API_URL = import.meta.env.VITE_API_URL ?? ''

type AccessTokenProvider = () => Promise<string | undefined>

let getAccessToken: AccessTokenProvider = async () => undefined

/**
 * Fournit le jeton d'accès à joindre aux requêtes. Appelé une fois au démarrage
 * (`app/http.setup.ts`) : ce fichier reste indépendant du fournisseur d'identité.
 */
export function setAccessTokenProvider(provider: AccessTokenProvider) {
  getAccessToken = provider
}

let onSessionExpired = () => {}
let sessionExpired = false

/** Réaction à une session expirée (vider le cache, renvoyer vers /login), fournie par `app/http.setup.ts`. */
export function setSessionExpiredHandler(handler: () => void) {
  onSessionExpired = handler
}

/** Jeton refusé (rafraîchissement ou 401) : le handler n'est déclenché qu'une seule fois. */
export function expireSession() {
  if (sessionExpired) return
  sessionExpired = true
  onSessionExpired()
}

/** Erreur de champ renvoyée par le back-end (validation 400). */
type FieldProblem = {
  field: string
  message: string
}

/** Réponse d'erreur HTTP, avec le `ProblemDetail` du back-end quand il est présent. */
export class HttpError extends Error {
  readonly status: number
  /** Explication du back-end (`ProblemDetail.detail`), si elle est fournie. */
  readonly detail?: string
  readonly errorCode?: string
  readonly fieldErrors: readonly FieldProblem[]

  constructor(status: number, path: string, problem: unknown) {
    // `detail` : format ProblemDetail ; `error` : format `{ error: "…" }` de nos @ExceptionHandler.
    const detail = readString(problem, 'detail') ?? readString(problem, 'error')
    super(detail ?? `Erreur ${status} sur ${path}`)
    this.name = 'HttpError'
    this.status = status
    this.detail = detail
    this.errorCode = readString(problem, 'errorCode') ?? readString(problem, 'code')
    this.fieldErrors = readFieldErrors(problem)
  }
}

function readString(source: unknown, key: string): string | undefined {
  if (typeof source !== 'object' || source === null || !(key in source)) return undefined
  const value: unknown = Reflect.get(source, key)
  return typeof value === 'string' ? value : undefined
}

function readFieldErrors(source: unknown): FieldProblem[] {
  if (typeof source !== 'object' || source === null) return []
  const errors: unknown = Reflect.get(source, 'errors')
  if (!Array.isArray(errors)) return []
  return errors.flatMap((item: unknown) => {
    const field = readString(item, 'field')
    const message = readString(item, 'message')
    return field && message ? [{ field, message }] : []
  })
}

async function readBody(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text) return undefined
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

/**
 * Envoie la requête avec le jeton et rejette toute réponse en erreur.
 *
 * Chaque requête porte l'en-tête `Authorization: Bearer <jeton>` : c'est le
 * « badge » OAuth 2.0 délivré par Keycloak. L'API Spring Boot vérifie sa
 * signature et ses rôles à chaque appel — c'est elle, et non l'interface,
 * qui décide vraiment de ce que l'utilisateur a le droit de faire.
 */
async function send(path: string, init?: RequestInit): Promise<Response> {
  const call = `${init?.method ?? 'GET'} ${path}`
  const token = await getAccessToken().catch((error: unknown) => {
    // Init Keycloak échouée : déjà journalisée par l'adaptateur. Rafraîchissement refusé : journalisé ici.
    logError(`[http] ${call} : jeton indisponible`, error)
    throw error
  })
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.body && { 'Content-Type': 'application/json' }),
      ...init?.headers,
      // Après les en-têtes de l'appelant : ils ne peuvent pas remplacer le jeton.
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }).catch((error: unknown) => {
    // Serveur éteint, mauvais port ou CORS : aucune réponse HTTP.
    logError(`[http] ${call} : serveur injoignable`, error)
    throw error
  })
  if (!response.ok) {
    const error = new HttpError(response.status, path, await readBody(response))
    // Jamais le jeton ni le corps envoyé : seulement l'appel et la réponse d'erreur.
    // Sur un 401, Spring explique le refus dans `WWW-Authenticate`
    // (ex. « The iss claim is not valid ») : c'est un motif, pas le jeton.
    const authError = response.status === 401 ? response.headers.get('WWW-Authenticate') : null
    logError(`[http] ${call} a échoué`, error, { status: response.status, ...(authError && { authError }) })
    if (response.status === 401) expireSession()
    throw error
  }
  return response
}

/** Appel JSON des implémentations `*.repository.api.ts`. */
export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await send(path, init)
  // Forme garantie par le contrat du back-end (non validée à l'exécution).
  return (await readBody(response)) as T
}

/** Nom proposé par le serveur dans `Content-Disposition: attachment; filename="…"`. */
function readFileName(response: Response): string | undefined {
  const header = response.headers.get('Content-Disposition') ?? ''
  const encoded = /filename\*=UTF-8''([^;]+)/i.exec(header)?.[1]
  if (encoded) {
    try {
      return decodeURIComponent(encoded)
    } catch {
      // Nom mal encodé : on se rabat sur `filename=`.
    }
  }
  return /filename="?([^";]+)"?/i.exec(header)?.[1]
}

/** Téléchargement d'un fichier (PDF…), avec le même jeton et la même gestion d'erreur que `http()`. */
export async function httpFile(path: string, init?: RequestInit): Promise<DownloadedFile> {
  const response = await send(path, init)
  return { blob: await response.blob(), fileName: readFileName(response) }
}
