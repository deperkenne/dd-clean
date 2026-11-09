import { DepartureDayGroup } from './DepartureDayGroup'
import type { DepartureDay } from './myReservations.types'

type DepartureListProps = { id: string; title: string; days: DepartureDay[]; empty?: string }

/** Une liste de jours de départ (à venir ou passés), avec son titre ; masquée si vide et sans message. */
export function DepartureList({ id, title, days, empty }: DepartureListProps) {
  if (days.length === 0 && !empty) return null
  return (
    <section aria-labelledby={id} className="border-t border-line">
      <h3
        id={id}
        className="px-4 pt-6 pb-3 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase md:px-6"
      >
        {title}
      </h3>
      {days.length === 0 ? (
        <p className="px-4 pb-6 text-[15px] text-muted-foreground md:px-6">{empty}</p>
      ) : (
        days.map((day) => <DepartureDayGroup key={day.date} day={day} />)
      )}
    </section>
  )
}
