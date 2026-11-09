import { useLocalized } from '@/hooks/useLocale'
import { myReservationsContent } from './MyReservations.data'
import type { DepartureDay } from './myReservations.types'
import { PropertyFilter } from './PropertyFilter'
import { ReservationCard } from './ReservationCard'
import { ReservationTable } from './ReservationTable'
import { useDayPropertyFilter } from './useDayPropertyFilter'

/** Les réservations d'un jour de départ, avec leur filtre par logement (cartes sur mobile, tableau dès 1024px). */
export function DepartureDayReservations({ day }: { day: DepartureDay }) {
  const t = useLocalized(myReservationsContent)
  const filter = useDayPropertyFilter(day)
  const dayLabel = `${day.weekday} ${day.fullDate}`

  return (
    <>
      {filter.isAvailable && (
        <PropertyFilter
          label={t.filterLabel(dayLabel)}
          allLabel={t.allProperties}
          total={day.reservations.length}
          options={filter.options}
          selectedId={filter.selectedId}
          onSelect={filter.select}
        />
      )}
      <ul className="flex flex-col gap-3 p-4 lg:hidden">
        {filter.reservations.map((reservation) => (
          <li key={reservation.id}>
            <ReservationCard reservation={reservation} />
          </li>
        ))}
      </ul>
      <div className="hidden lg:block">
        <ReservationTable reservations={filter.reservations} caption={dayLabel} />
      </div>
    </>
  )
}
