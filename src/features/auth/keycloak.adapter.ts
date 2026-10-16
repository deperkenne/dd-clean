/**
 * keycloak.adapter.ts — le SEUL fichier de l'application qui connaît Keycloak.
 *
 * ── En deux mots : OAuth 2.0, OIDC et Keycloak ─────────────────────────────
 *
 * OAuth 2.0 est un protocole standard pour qu'une application obtienne le
 * droit d'appeler une API au nom d'un utilisateur, SANS jamais voir son mot
 * de passe. L'application reçoit à la place un « jeton d'accès » (access
 * token) : une sorte de badge temporaire, signé, à présenter à l'API.
 *
 * OpenID Connect (OIDC) ajoute une couche « identité » à OAuth 2.0 : en plus du
 * badge, l'application apprend QUI est connecté (identifiant, email, nom).
 *
 * Keycloak est le serveur d'identité : il affiche la page de connexion, vérifie
 * le mot de passe, connaît les rôles (ADMIN, SECRETARY, AGENT) et délivre les
 * jetons. Notre site et l'API Spring Boot lui font confiance.
 *
 * ── Le flux utilisé : « Authorization Code + PKCE » ────────────────────────
 *
 * 1. L'utilisateur clique « Se connecter ». On l'envoie sur la page de
 *    connexion de Keycloak (pas la nôtre) : le mot de passe ne transite donc
 *    jamais par notre code.
 * 2. Avant de partir, la bibliothèque invente un secret aléatoire (le
 *    « code verifier ») et n'en envoie qu'une empreinte à Keycloak. C'est PKCE.
 * 3. Après un mot de passe correct, Keycloak renvoie l'utilisateur sur notre
 *    page /login avec un « code » à usage unique dans l'adresse.
 * 4. La bibliothèque échange ce code contre les jetons, en prouvant avec le
 *    secret de l'étape 2 que c'est bien elle qui a lancé la connexion. Un
 *    pirate qui intercepterait le code ne pourrait rien en faire sans ce secret.
 *
 * ── Où sont gardés les jetons ───────────────────────────────────────────────
 *
 * En mémoire seulement (une variable JavaScript), jamais dans localStorage :
 * un script malveillant injecté dans la page (XSS) pourrait y lire un jeton et
 * se faire passer pour l'utilisateur. Contrepartie : recharger la page efface
 * la session ; un nouveau clic sur « Se connecter » suffit, et si la session
 * Keycloak est encore ouverte, l'utilisateur n'a pas à retaper son mot de passe.
 * (La bibliothèque garde brièvement le secret PKCE pendant l'aller-retour vers
 * Keycloak, puis l'efface : ce n'est pas un jeton.)
 *
 * Le jeton d'accès vit quelques minutes. Avant qu'il expire, la bibliothèque
 * en redemande un neuf à Keycloak grâce au « refresh token » (onTokenExpired
 * plus bas) : l'utilisateur ne voit rien.
 *
 * ── Pourquoi un « Adapter » ─────────────────────────────────────────────────
 *
 * Le reste de l'application ne parle qu'à l'interface `AuthAdapter`
 * (auth.types.ts), via les hooks. Si D&D Clean changeait un jour de serveur
 * d'identité, seul ce fichier serait à réécrire.
 */
import Keycloak from 'keycloak-js' // est un SDK
import { keycloakConfigSchema, tokenClaimsSchema } from './auth.schema'
import type { AuthAdapter, AuthErrorCode, AuthSession } from './auth.types'

/** Erreur d'authentification portant un code que les pages traduisent en message. */
export class AuthError extends Error {
  readonly code: AuthErrorCode

  constructor(code: AuthErrorCode) {
    super(`Erreur d'authentification : ${code}`)
    this.name = 'AuthError'
    this.code = code
  }
}

/** Marge (en secondes) : on renouvelle le jeton s'il expire dans moins de 30 s. */
const MIN_TOKEN_VALIDITY = 30

let keycloak: Keycloak | undefined
let initialization: Promise<AuthSession> | undefined

/**
 * Crée le client Keycloak au premier besoin, après avoir vérifié la
 * configuration : sans URL, realm ou client ID valides, inutile d'appeler le serveur.
 */
function getClient(): Keycloak {
  if (keycloak) return keycloak
  
  // recuperation et validation des variable d'environmemnt
  const config = keycloakConfigSchema.safeParse(import.meta.env)
   console.log("start element",config.data?.clientId)
  if (!config.success) throw new AuthError('config')
  
  const client = new Keycloak(config.data)
  // Jeton bientôt expiré → on en demande un neuf avec le refresh token.
  // Si Keycloak refuse (session fermée côté serveur), on oublie les jetons.
  // attention ceci est une promesse (un gestionaire d'evenements(event listener ) qui ecoute)
  // et serra declencher seulement si l'evenement expiration du token se produit
  // plus tard   
  client.onTokenExpired = () => {
    client.updateToken(MIN_TOKEN_VALIDITY).catch(() => client.clearToken())
  }
  keycloak = client
  return client
}

/** Traduit le contenu du jeton en utilisateur, après en avoir vérifié la forme. */
function readSession(client: Keycloak, authenticated: boolean): AuthSession {
  if (!authenticated) return { status: 'anonymous' }

  const claims = tokenClaimsSchema.safeParse(client.tokenParsed)
  if (!claims.success) {
    client.clearToken()
    throw new AuthError('invalid_token')
  }

  const { sub, email, name, realm_access: roles } = claims.data
  return { status: 'authenticated', user: { id: sub, email, name, roles } }
}

// au premier rendu quand le user ouvre l'app 
// authenticated == false car l'url n'aurras aucun token ni de code 
async function startClient(): Promise<AuthSession> {
  const client = getClient()
  try {
    // Si l'adresse contient le « code » renvoyé par Keycloak (étape 3), init()
    // l'échange contre les jetons (étape 4). Sinon, l'utilisateur est anonyme.
    const authenticated = await client.init({
      pkceMethod: 'S256',
      // Pas d'iframe de surveillance : elle dépend de cookies tiers, bloqués par
      // la plupart des navigateurs, et le renouvellement du jeton suffit ici.
      checkLoginIframe: false,
    })
    return readSession(client, authenticated)
  } catch (error) {
    if (error instanceof AuthError) throw error
    // Keycloak renvoie { error, error_description } quand il refuse ou que
    // l'utilisateur annule ; tout le reste (réseau, serveur) est « unknown ».
    throw new AuthError(error && typeof error === 'object' && 'error' in error ? 'callback' : 'unknown')
  }
}

export const keycloakAdapter: AuthAdapter = {
  /** Démarre la bibliothèque une seule fois pour toute l'application. */
  init() {
    initialization ??= startClient()
    return initialization
  },

  /** Étape 1 du flux : redirige vers la page de connexion Keycloak. */
  async login({ redirectUri, locale }) {
     console.log("url", redirectUri)
    await this.init()
    await getClient().login({ redirectUri, locale })
   
  },

  /** Ferme la session côté Keycloak (pas seulement dans ce navigateur), puis revient sur notre site. */
  async logout(redirectUri) {
    await this.init()
    await getClient().logout({ redirectUri })
  },

  /** Jeton à joindre aux appels à l'API Spring Boot, renouvelé s'il expire bientôt. */
  async getAccessToken() {
    const session = await this.init()
    if (session.status === 'anonymous') return undefined
    const client = getClient()
    await client.updateToken(MIN_TOKEN_VALIDITY)
    return client.token
  },
}
