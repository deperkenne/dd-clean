import { useAuthSession } from '@/features/auth/useAuthSession'
import { useLocale } from '@/hooks/useLocale'
import { formatLongDay, todayIsoDay } from '@/lib/date'
import type { CustomerProfile } from './customerProfile.types'

/**
 * Profil affiché en tête de l'espace client. Nom et e-mail viennent du jeton
 * Keycloak (jamais d'une donnée locale modifiable) : aucun appel réseau ici.
 */
export function useCustomerProfile(): CustomerProfile {
  const { locale } = useLocale()
  const { session } = useAuthSession()
  const user = session?.status === 'authenticated' ? session.user : undefined

  return {
    name: user?.name,
    email: user?.email,
    today: formatLongDay(todayIsoDay(), locale),
  }
}
