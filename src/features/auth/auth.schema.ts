import { z } from 'zod'
import type { KeycloakConfig, Role } from './auth.types'

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

const knownRoles = ['ADMIN', 'SECRETARY', 'AGENT'] as const satisfies readonly Role[]

/**
 * Contenu attendu du jeton d'accès Keycloak. Les rôles sont lus dans les rôles
 * du realm (`realm_access.roles`) ; les rôles techniques de Keycloak
 * (`offline_access`, `uma_authorization`…) sont ignorés.
 */
export const tokenClaimsSchema = z.object({
  sub: z.string().min(1),
  email: z.email().optional(),
  name: z.string().optional(),
  realm_access: z
    .object({ roles: z.array(z.string()) })
    .optional()
    .transform((access) =>
      (access?.roles ?? []).filter((role): role is Role => knownRoles.includes(role as Role)),
    ),
})

/**
 * Page où renvoyer l'utilisateur après connexion. Seul un chemin de notre
 * propre site est accepté (`/…`, jamais `//autre-site` ni une URL complète),
 * sinon un lien piégé pourrait rediriger vers un site tiers après connexion.
 */
export const returnToSchema = z
  .string()
  .regex(/^\/(?![/\\])/)
  .refine((path) => !path.startsWith('/login') && !path.startsWith('/register'))
  .catch('/')
