import { useLocation } from 'react-router-dom'
import type { Role } from './auth.types'
import { homePathFor } from './roleRoutes'
import { useAuthSession } from './useAuthSession'

export type RoleGuardState =
  | { status: 'loading' }
  | { status: 'allowed' }
  | { status: 'redirect'; to: string }

/**
 * Décide si l'utilisateur peut voir une page réservée à certains rôles.
 *
 * Les rôles sont lus dans le jeton Keycloak (via useAuthSession), jamais dans
 * une donnée locale que l'utilisateur pourrait modifier. Ce contrôle sert
 * seulement à afficher la bonne interface : la vraie vérification des
 * permissions reste faite par l'API, qui revérifie le jeton à chaque appel.
 *
 * - pas encore de réponse de Keycloak → on attend ;
 * - pas connecté → page de connexion, avec retour prévu sur cette page ;
 * - connecté mais sans le bon rôle → renvoyé vers SON propre espace
 *   (sans liste de rôles, il suffit d'être connecté) ;
 * - sinon → la page s'affiche.
 *
 * Les jetons vivant en mémoire, recharger la page oblige à repasser par
 * /login ; si la session Keycloak est encore ouverte, aucun mot de passe
 * n'est redemandé.
 */
export function useRoleGuard(allowedRoles?: Role[]): RoleGuardState {
  const { session, isLoading, errorCode } = useAuthSession()
  const location = useLocation()

  if (isLoading) return { status: 'loading' }

  if (errorCode || session?.status !== 'authenticated') {
    const returnTo = encodeURIComponent(location.pathname + location.search)
    return { status: 'redirect', to: `/login?returnTo=${returnTo}` }
  }

  const { roles } = session.user
  if (allowedRoles && !roles.some((role) => allowedRoles.includes(role))) {
    return { status: 'redirect', to: homePathFor(roles) }
  }

  return { status: 'allowed' }
}
