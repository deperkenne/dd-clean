import { Outlet, ScrollRestoration } from 'react-router-dom'
import { DashboardShell } from '@/components/layout/DashboardShell'
import { useLocalized } from '@/hooks/useLocale'
import { useAuthSession } from '@/features/auth/useAuthSession'
import { customerDashboardContent } from './CustomerDashboardPage.data'
import { CustomerNav } from './CustomerNav'

/** Cadre commun à toutes les pages de l'espace client. */
export function CustomerLayout() {
  const t = useLocalized(customerDashboardContent)
  const { session, logout } = useAuthSession()
  const user = session?.status === 'authenticated' ? session.user : undefined

  return (
    <DashboardShell area={t.area} userName={user?.name ?? user?.email} onLogout={logout} background="blush">
      <CustomerNav />
      <Outlet />
      <ScrollRestoration />
    </DashboardShell>
  )
}
