import type { Locale } from '@/lib/i18n'

/** Rôles métier de D&D Clean, tels que Keycloak les place dans le jeton. */
export type Role = 'ADMIN' | 'SECRETARY' | 'AGENT'

/** Utilisateur connecté, reconstruit à partir du jeton (jamais d'une donnée locale modifiable). */
export type AuthUser = {
  id: string
  email?: string
  name?: string
  roles: Role[]
}

/** État de la session dans le navigateur : connecté ou non. */
export type AuthSession = { status: 'authenticated'; user: AuthUser } | { status: 'anonymous' }

/** Paramètres de connexion à Keycloak, lus dans les variables d'environnement. */
export type KeycloakConfig = {
  url: string
  realm: string
  clientId: string
}

/**
 * Raisons d'échec possibles, traduites en messages par les pages :
 * - `config`        : variables d'environnement Keycloak absentes ou invalides
 * - `callback`      : Keycloak a refusé ou annulé la connexion
 * - `invalid_token` : le jeton reçu n'a pas la forme attendue
 * - `unknown`       : toute autre erreur (réseau, serveur indisponible…)
 */
export type AuthErrorCode = 'config' | 'callback' | 'invalid_token' | 'unknown'

export type LoginOptions = {
  /** Adresse de notre site où Keycloak renverra l'utilisateur après connexion. */
  redirectUri: string
  /** Langue de la page de connexion Keycloak. */
  locale: Locale
}

/**
 * Contrat que l'application attend d'un fournisseur d'identité (pattern Adapter).
 * Seul `keycloak.adapter.ts` l'implémente ; changer de fournisseur OIDC
 * reviendrait à écrire une autre implémentation de cette interface.
 */
export interface AuthAdapter {
  init(): Promise<AuthSession>
  login(options: LoginOptions): Promise<void>
  logout(redirectUri: string): Promise<void>
  getAccessToken(): Promise<string | undefined>
}
