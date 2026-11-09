import { useLocalized } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { myReservationsContent } from './MyReservations.data'
import type { DepartureDay } from './myReservations.types'

/** Badge « Aujourd'hui » ou « Demain » d'un jour de départ ; rien pour les autres jours. */
export function RelativeDayBadge({ relative, className }: { relative: DepartureDay['relative']; className?: string }) {
  const t = useLocalized(myReservationsContent)
  if (!relative) return null

  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.08em] uppercase',
        relative === 'today' ? 'bg-ink text-citron' : 'bg-mint text-forest-strong',
        className,
      )}
    >
      {relative === 'today' ? t.today : t.tomorrow}
    </span>
  )
}
