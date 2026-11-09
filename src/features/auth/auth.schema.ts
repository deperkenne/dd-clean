import { z } from 'zod'
import { ROLES, type KeycloakConfig, type Role } from './auth.types'

/**
 * Variables d'environnement Keycloak (fichier `.env.local`, voir `.env.example`).
 * Vérifiées avant tout appel : sans elles, inutile de contacter Keycloak.
 */
export const keycloakConfigSchema = z
  .object({
    VITE_KEYCLOAK_URL: z.url(),
    VITE_KEYCLOAK_REALM: z.string().trim().min(1),
    VITE_KEYCLOAK_CLIENT_ID: z.string().trim().min(1),
  })
  .transform(
    (env): KeycloakConfig => ({
      url: env.VITE_KEYCLOAK_URL,
      realm: env.VITE_KEYCLOAK_REALM,
      clientId: env.VITE_KEYCLOAK_CLIENT_ID,
    }),
  )

const isRole = (role: string): role is Role => (ROLES as readonly string[]).includes(role)

const roleListSchema = z.object({ roles: z.array(z.string()) })

/**
 * Contenu attendu du jeton d'accès Keycloak. Keycloak range les rôles à deux
 * endroits :
 * - `realm_access.roles` : les rôles du realm ;
 * - `resource_access.<client>.roles` : les rôles propres à un client. C'est là
 *   que le back-end place le rôle AGENT quand un client crée un agent.
 * Les deux sont lus par `rolesFromClaims` ci-dessous, comme le fait le back-end.
 */
export const tokenClaimsSchema = z.object({
  sub: z.string().min(1),
  email: z.email().optional(),
  name: z.string().optional(),
  realm_access: roleListSchema.optional(),
  resource_access: z.record(z.string(), roleListSchema).optional(),
})

type TokenClaims = z.infer<typeof tokenClaimsSchema>

/**
 * Rôles D&D Clean du jeton : ceux du realm + ceux du client de CETTE
 * application (`clientId`, ex. `order-management-app`). Les rôles d'autres
 * clients et les rôles techniques de Keycloak (`offline_access`…) sont ignorés.
 */
export function rolesFromClaims(claims: TokenClaims, clientId: string | undefined): Role[] {
  const realmRoles = claims.realm_access?.roles ?? []
  const clientRoles = (clientId && claims.resource_access?.[clientId]?.roles) || []
  return [...new Set([...realmRoles, ...clientRoles])].filter(isRole)
}

/**
 * Page où renvoyer l'utilisateur après connexion. Seul un chemin de notre
 * propre site est accepté (`/…`, jamais `//autre-site`, une URL complète, un `\`
 * ou un caractère de contrôle — certains navigateurs les transforment en `//`),
 * sinon un lien piégé pourrait rediriger vers un site tiers après connexion.
 */
export const returnToSchema = z
  .string()
  .regex(/^\/(?![/\\])/)
  // Caractères de contrôle (U+0000 à U+001F, tous < espace) : comparaison plutôt que regex (règle no-control-regex).
  .refine((path) => ![...path].some((char) => char < ' ' || char === '\\'))
  .refine((path) => !path.startsWith('/login') && !path.startsWith('/register'))
  .catch('/')

/** Valeur de `/login?reason=` quand la session a été fermée par un 401 de l'API ou un renouvellement refusé. */
export const SESSION_REJECTED_REASON = 'session'
