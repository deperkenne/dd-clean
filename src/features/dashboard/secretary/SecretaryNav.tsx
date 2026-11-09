import { NavLink } from 'react-router-dom'
import { useLocalized } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { secretaryNavContent, secretaryNavItems } from './SecretaryNav.data'

/**
 * Onglets de l'espace secrétaire (l'onglet actif suit l'adresse).
 * Sur mobile : largeurs égales, icône au-dessus du libellé, pour qu'aucun
 * onglet ne soit caché ; dès 640px : icône et libellé côte à côte.
 */
export function SecretaryNav() {
  const t = useLocalized(secretaryNavContent)

  return (
    <nav aria-label={t.label} className="-mt-2 mb-6 border-b border-line lg:-mt-4 lg:mb-8">
      <ul className="grid grid-flow-col auto-cols-fr sm:flex sm:gap-1">
        {secretaryNavItems.map(({ id, to, end, icon: Icon }) => (
          <li key={id} className="min-w-0 sm:shrink-0">
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
              <span className="max-w-full break-words">{t.items[id]}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
