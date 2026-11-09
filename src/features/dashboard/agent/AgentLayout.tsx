import { Outlet, ScrollRestoration } from 'react-router-dom'
import { DashboardShell } from '@/components/layout/DashboardShell'
import { useAuthSession } from '@/features/auth/useAuthSession'
import { useLocalized } from '@/hooks/useLocale'
import { agentLayoutContent } from './AgentLayout.data'

/** Cadre commun à toutes les pages de l'espace agent de ménage. */
export function AgentLayout() {
  const t = useLocalized(agentLayoutContent)
  const { session, logout } = useAuthSession()
  const user = session?.status === 'authenticated' ? session.user : undefined

  return (
    <DashboardShell area={t.area} userName={user?.name ?? user?.email} onLogout={logout}>
      <Outlet />
      <ScrollRestoration />
    </DashboardShell>
  )
}
