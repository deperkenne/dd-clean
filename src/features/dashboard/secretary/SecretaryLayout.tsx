import { Outlet, ScrollRestoration } from 'react-router-dom'
import { DashboardShell } from '@/components/layout/DashboardShell'
import { useLocalized } from '@/hooks/useLocale'
import { useAuthSession } from '@/features/auth/useAuthSession'
import { secretaryDashboardContent } from './SecretaryDashboardPage.data'
import { SecretaryNav } from './SecretaryNav'

/** Cadre commun à toutes les pages de l'espace secrétaire. */
export function SecretaryLayout() {
  const t = useLocalized(secretaryDashboardContent)
  const { session, logout } = useAuthSession()
  const user = session?.status === 'authenticated' ? session.user : undefined

  return (
    <DashboardShell area={t.area} userName={user?.name ?? user?.email} onLogout={logout}>
      <SecretaryNav />
      <Outlet />
      <ScrollRestoration />
    </DashboardShell>
  )
}
