import { useMutation, useQuery } from '@tanstack/react-query'
import { AuthError, keycloakAdapter } from './keycloak.adapter'
import type { AuthErrorCode } from './auth.types'

/** Clé de cache TanStack Query de la session, partagée par tous les hooks d'auth. */
export const authSessionKey = ['auth', 'session'] as const

export function toAuthErrorCode(error: unknown): AuthErrorCode | undefined {
  if (!error) return undefined
  return error instanceof AuthError ? error.code : 'unknown'
}

/**
 * Session courante de l'utilisateur.
 *
 * Au premier appel, la bibliothèque Keycloak démarre : si l'on revient de la
 * page de connexion, elle échange le code reçu contre les jetons. Le résultat
 * est mis en cache sans expiration (`staleTime: Infinity`) : la session ne
 * change qu'à la connexion ou à la déconnexion, et le renouvellement des
 * jetons est déjà assuré par l'adapter.
 */
export function useAuthSession() {
  const session = useQuery({
    queryKey: authSessionKey,
    queryFn: () => keycloakAdapter.init(),
    staleTime: Infinity,
    gcTime: Infinity,
    // Un code Keycloak ne s'échange qu'une fois : réessayer échouerait toujours.
    retry: false,
    refetchOnWindowFocus: false,
  })

  // Déconnexion : Keycloak ferme sa propre session puis renvoie sur l'accueil.
  const logout = useMutation({
    mutationFn: () => keycloakAdapter.logout(window.location.origin),
  })

  return {
    session: session.data,
    isLoading: session.isPending,
    errorCode: toAuthErrorCode(session.error),
    logout: () => logout.mutate(),
  }
}
