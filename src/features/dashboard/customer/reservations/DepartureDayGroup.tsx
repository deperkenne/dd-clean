import { ArrowRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLocalized } from '@/hooks/useLocale'
import { customerPaths } from '../customerPaths'
import { DepartureDayReservations } from './DepartureDayReservations'
import { myReservationsContent } from './MyReservations.data'
import type { DepartureDay } from './myReservations.types'
import { RelativeDayBadge } from './RelativeDayBadge'

/**
 * Un jour de départ dans la liste : son en-tête (jour de la semaine, date,
 * nombre de départs) est un lien vers la page de ce jour ; suivent le filtre
 * par logement et les réservations.
 */
export function DepartureDayGroup({ day }: { day: DepartureDay }) {
  const t = useLocalized(myReservationsContent)
  const titleId = `departure-${day.date}`

  return (
    <section aria-labelledby={titleId} className="border-t border-line">
      <Link
        to={customerPaths.reservationDay(day.date)}
        aria-label={t.openDay(`${day.weekday} ${day.fullDate}`)}
        className="group flex flex-wrap items-end justify-between gap-x-6 gap-y-2 bg-paper/60 px-4 py-4 outline-none transition-colors hover:bg-mint/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset md:px-6"
      >
        <div className="flex min-w-0 items-end gap-3">
          <h4 id={titleId} className="min-w-0">
            <span className="block font-heading text-[clamp(1.5rem,3vw,1.875rem)] leading-none font-semibold text-ink underline-offset-4 first-letter:uppercase group-hover:underline">
              {day.weekday}
            </span>
            <span className="mt-1.5 block font-mono text-[12px] tracking-[0.06em] text-muted-foreground">
              {day.fullDate}
            </span>
          </h4>
          <RelativeDayBadge relative={day.relative} className="mb-0.5" />
        </div>
        <span className="flex items-center gap-3">
          <span className="font-mono text-[11px] font-medium tracking-[0.1em] text-forest uppercase">
            {t.departures(day.reservations.length)}
          </span>
          <span className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 text-[13px] font-medium text-ink transition-colors group-hover:border-forest group-hover:text-forest">
            {t.seeDay}
            <ArrowRightIcon
              aria-hidden="true"
              className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </span>
        </span>
      </Link>

      <DepartureDayReservations day={day} />
    </section>
  )
}
