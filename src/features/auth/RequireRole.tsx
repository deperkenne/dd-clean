import { Loader2Icon } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'
import { useLocalized } from '@/hooks/useLocale'
import type { Role } from './auth.types'
import { requireRoleContent } from './RequireRole.data'
import { useRoleGuard } from './useRoleGuard'

type RequireRoleProps = {
  /** Rôles autorisés ; absent = tout compte connecté. */
  roles?: Role[]
}

/** Route protégée : n'affiche ses pages enfants qu'aux comptes connectés ayant un rôle autorisé. */
export function RequireRole({ roles }: RequireRoleProps) {
  const t = useLocalized(requireRoleContent)
  const guard = useRoleGuard(roles)

  if (guard.status === 'redirect') return <Navigate to={guard.to} replace />
  if (guard.status === 'allowed') return <Outlet />

  return (
    <div role="status" className="grid min-h-svh place-items-center bg-paper px-4">
      <p className="flex items-center gap-3 text-[15px] text-muted-foreground">
        <Loader2Icon aria-hidden="true" className="size-5 animate-spin text-forest motion-reduce:animate-none" />
        {t.loading}
      </p>
    </div>
  )
}
