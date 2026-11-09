import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

export type TabNavItem = {
  to: string
  label: string
  icon: LucideIcon
  /** Actif seulement sur l'adresse exacte (pour l'onglet d'accueil). */
  end?: boolean
}

/**
 * Onglets d'un espace connecté (l'onglet actif suit l'adresse).
 * Sur mobile : largeurs égales, icône au-dessus du libellé, pour qu'aucun
 * onglet ne soit caché ; dès 640px : icône et libellé côte à côte.
 */
export function TabNav({ label, items }: { label: string; items: TabNavItem[] }) {
  return (
    <nav aria-label={label} className="-mt-2 mb-6 border-b border-ink/10 lg:-mt-4 lg:mb-8">
      <ul className="grid grid-flow-col auto-cols-fr sm:flex sm:gap-1">
        {items.map(({ to, label: itemLabel, icon: Icon, end }) => (
          <li key={to} className="min-w-0 sm:shrink-0">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  '-mb-px flex min-h-11 flex-col items-center justify-center gap-1 border-b-2 px-1 py-2 text-center text-[12px] leading-tight font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 sm:flex-row sm:gap-2 sm:px-3 sm:py-0 sm:text-[15px]',
                  isActive ? 'border-forest text-forest' : 'border-transparent text-muted-foreground hover:text-ink',
                )
              }
            >
              <Icon aria-hidden="true" className="size-4 shrink-0" />
              <span className="max-w-full break-words">{itemLabel}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
