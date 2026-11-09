import { homePathFor, noRolePath } from './roleRoutes'
import { useAuthSession } from './useAuthSession'

/**
 * Espace vers lequel renvoyer un compte qui se trouve sur la page « à venir »
 * alors que son rôle a désormais SON espace (ex. un onglet resté ouvert sur
 * /coming-soon). `undefined` : rester sur la page d'attente.
 * Les rôles viennent du jeton Keycloak, jamais d'une donnée locale.
 */
export function useOwnHomeRedirect(): string | undefined {
  const { session } = useAuthSession()
  if (session?.status !== 'authenticated') return undefined
  const home = homePathFor(session.user.roles)
  return home === noRolePath ? undefined : home
}
