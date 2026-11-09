import { ArrowLeftIcon } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { Eyebrow } from '@/components/common/Eyebrow'
import { DashboardShell } from '@/components/layout/DashboardShell'
import { useLocalized } from '@/hooks/useLocale'
import { useAuthSession } from '@/features/auth/useAuthSession'
import { useOwnHomeRedirect } from '@/features/auth/useOwnHomeRedirect'
import { comingSoonContent } from './ComingSoonPage.data'

/** Page d'attente des rôles dont l'espace n'existe pas encore (ADMIN), ou des comptes sans rôle D&D Clean. */
export function ComingSoonPage() {
  const t = useLocalized(comingSoonContent)
  const { session, logout } = useAuthSession()
  const user = session?.status === 'authenticated' ? session.user : undefined
  const ownHome = useOwnHomeRedirect()

  // Un compte dont le rôle a maintenant son espace n'a rien à faire ici.
  if (ownHome) return <Navigate to={ownHome} replace />

  return (
    <DashboardShell area={t.area} userName={user?.name ?? user?.email} onLogout={logout}>
      <div className="max-w-[60ch]">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="mt-3 text-[clamp(1.875rem,4vw,2.5rem)] leading-tight font-semibold tracking-[-0.01em] text-balance">
          {t.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t.lead}</p>
        <Link
          to="/"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm text-[15px] font-medium text-forest outline-none hover:text-forest-strong focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          {t.backLabel}
        </Link>
      </div>
    </DashboardShell>
  )
}
