import { setAccessTokenProvider, setSessionExpiredHandler } from '@/lib/http'
import { SESSION_REJECTED_REASON } from '@/features/auth/auth.schema'
import { queryClient } from './queryClient'

// Le jeton Keycloak accompagne chaque appel API. L'adapter est chargé à la demande :
// les visiteurs de la landing page ne téléchargent pas Keycloak.
setAccessTokenProvider(async () => {
  const { keycloakAdapter } = await import('@/features/auth/keycloak.adapter')
  return keycloakAdapter.getAccessToken()
})

// Session expirée ou jeton refusé par l'API (401) : cache vidé, retour à /login, puis à la page
// courante (même `returnTo` que RequireRole). `reason=session` fait afficher la cause sur /login,
// pour qu'un jeton refusé en boucle par l'API ne ressemble pas à un bouton « Se connecter » cassé.
setSessionExpiredHandler(() => {
  const { pathname, search } = window.location
  if (pathname.startsWith('/login')) return
  queryClient.clear()
  const target = new URLSearchParams({ returnTo: pathname + search, reason: SESSION_REJECTED_REASON })
  window.location.assign(`/login?${target}`)
})
