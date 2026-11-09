import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { AuthError } from '@/features/auth/auth.types'
import { HttpError } from '@/lib/http'
import { logError } from '@/lib/log'

/** Une erreur 4xx ou d'authentification ne changera pas en réessayant : seuls réseau et 5xx sont relancés. */
const isRetryable = (error: Error) => !(error instanceof AuthError) && !(error instanceof HttpError && error.status < 500)

/** Filet de sécurité : logue ce qui ne l'a pas déjà été à la source (http, auth). */
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => logError('[query] Requête échouée', error, { queryKey: query.queryKey }),
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) =>
      logError('[mutation] Mutation échouée', error, { mutationKey: mutation.options.mutationKey }),
  }),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: (failureCount, error) => failureCount < 1 && isRetryable(error),
    },
  },
})
