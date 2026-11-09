import { TabNav } from '@/components/common/TabNav'
import { useLocalized } from '@/hooks/useLocale'
import { customerNavContent } from './CustomerNav.data'

/** Onglets de l'espace client : tableau de bord, réservations, propriétaires, nouveau propriétaire, nouvel agent. */
export function CustomerNav() {
  const t = useLocalized(customerNavContent)
  return <TabNav label={t.label} items={t.items} />
}
