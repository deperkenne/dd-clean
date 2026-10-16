import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLocale } from '@/hooks/useLocale'
import { returnToSchema } from './auth.schema'
import { keycloakAdapter } from './keycloak.adapter'
import { toAuthErrorCode, useAuthSession } from './useAuthSession'

/**
 * Logique de la page /login.
 *
 * - `login()` lance l'étape 1 du flux OIDC : départ vers la page Keycloak.
 * - Au retour de Keycloak, `useAuthSession` a échangé le code contre les
 *   jetons ; dès que la session est ouverte, on renvoie l'utilisateur vers la
 *   page qu'il voulait voir (`?returnTo=`), vérifiée pour rester sur notre site.
 *   returnTo redirige le user sur la page qu'il souhaite acceder avant 
 * qu'il ne soit rediriger vers la page de login  ce qui optimise que de le renvoiyer
 * a la page d'accueil a nouveau 
 */
export function useLogin() {
  const { locale } = useLocale()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const returnTo = returnToSchema.parse(searchParams.get('returnTo') ?? undefined)
  const { session, isLoading, errorCode: sessionError } = useAuthSession()

  const isAuthenticated = session?.status === 'authenticated'

  useEffect(() => {
    if (isAuthenticated) navigate(returnTo, { replace: true })
  }, [isAuthenticated, navigate, returnTo])

  const login = useMutation({
    mutationFn: () => {
      console.log("start login")
      // Keycloak renverra ici même, avec la page de retour conservée dans l'adresse.
      const redirectUri = new URL('/login', window.location.origin)
      redirectUri.searchParams.set('returnTo', returnTo)
      return keycloakAdapter.login({ redirectUri: redirectUri.href, locale })
    },
  })

  // L'échec du départ vers Keycloak, plus récent, passe avant celui du démarrage.
  const errorCode = toAuthErrorCode(login.error) ?? sessionError

  return {
    login: () => login.mutate(),
    /** Vrai pendant le démarrage, le départ vers Keycloak ou la redirection finale. */
    isBusy: isLoading || login.isPending || login.isSuccess || isAuthenticated,
    /** Sans configuration Keycloak valide, réessayer échouerait à coup sûr. */
    canLogin: errorCode !== 'config',
    errorCode,
  }
}
