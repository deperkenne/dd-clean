import { cn } from '@/lib/utils'
import { useLocalized } from '@/hooks/useLocale'
import { myReservationsContent } from './MyReservations.data'
import type { ReservationView } from './myReservations.types'
import { ReservationPlace } from './ReservationPlace'
import { ReservationRoom } from './ReservationRoom'
import { ReservationStatus } from './ReservationStatus'
import { ReservationStay } from './ReservationStay'

/** Une réservation en carte (petits écrans). */
export function ReservationCard({ reservation }: { reservation: ReservationView }) {
  const t = useLocalized(myReservationsContent)

  return (
    <article className={cn('rounded-xl border border-line bg-white p-4', reservation.cancelled && 'bg-paper')}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[13px] font-medium tracking-[0.04em] text-forest">
          {reservation.bookingReference}
          {reservation.channel && (
            <span className="ml-2 font-sans font-normal tracking-normal text-muted-foreground">
              {reservation.channel}
            </span>
          )}
        </p>
        <ReservationStatus reservation={reservation} />
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <ReservationPlace reservation={reservation} />
        <ReservationRoom reservation={reservation} className="shrink-0" />
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-line pt-3">
        <ReservationStay reservation={reservation} className="text-[15px]" />
        <p className="font-heading text-xl font-semibold tabular-nums">
          {reservation.price ?? <span className="font-sans text-[13px] font-normal text-muted-foreground">{t.noPrice}</span>}
        </p>
      </div>
    </article>
  )
}
