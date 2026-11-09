import { ArrowRightIcon } from 'lucide-react'
import { useLocalized } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { myReservationsContent } from './MyReservations.data'
import type { ReservationView } from './myReservations.types'

/** Séjour : arrivée → départ, nombre de nuits et jour d'arrivée donné par Smoobu. */
export function ReservationStay({ reservation, className }: { reservation: ReservationView; className?: string }) {
  const t = useLocalized(myReservationsContent)

  return (
    <div className={cn('min-w-0', className)}>
      <p
        className={cn(
          'flex flex-wrap items-center gap-x-2 font-medium text-ink',
          reservation.cancelled && 'line-through decoration-muted-foreground/60',
        )}
      >
        <span className="whitespace-nowrap">{reservation.arrival}</span>
        <ArrowRightIcon aria-hidden="true" className="size-4 text-muted-foreground" />
        <span className="whitespace-nowrap">{reservation.departure}</span>
      </p>
      <p className="mt-0.5 text-[13px] text-muted-foreground">
        {t.nights(reservation.nights)}
        {reservation.arrivalDay && <span> · {t.smoobuDay(reservation.arrivalDay)}</span>}
      </p>
    </div>
  )
}
