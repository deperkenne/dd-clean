import { useLocalized } from '@/hooks/useLocale'
import { myReservationsContent } from './MyReservations.data'
import type { DepartureDay } from './myReservations.types'
import { RelativeDayBadge } from './RelativeDayBadge'

/** Titre de la page « journée » : jour de la semaine en grand, date complète, repère et nombre de départs. */
export function DepartureDayHero({ day, showCount }: { day: DepartureDay; showCount: boolean }) {
  const t = useLocalized(myReservationsContent)

  return (
    <div className="mt-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h1
            id="departure-day-title"
            className="font-heading text-[clamp(2.5rem,7vw,4rem)] leading-[0.95] font-semibold tracking-[-0.02em] text-ink first-letter:uppercase"
          >
            {day.weekday}
          </h1>
          <RelativeDayBadge relative={day.relative} />
        </div>
        <p className="mt-3 font-mono text-[13px] tracking-[0.06em] text-muted-foreground">{day.fullDate}</p>
      </div>
      {showCount && (
        <p className="flex items-baseline gap-2">
          <span className="font-heading text-[clamp(2.5rem,6vw,3.5rem)] leading-none font-semibold text-forest tabular-nums">
            {day.reservations.length}
          </span>
          <span className="font-mono text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            {t.departuresUnit(day.reservations.length)}
          </span>
        </p>
      )}
    </div>
  )
}
