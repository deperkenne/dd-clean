import { cn } from '@/lib/utils'
import { useLocalized } from '@/hooks/useLocale'
import { myReservationsContent } from './MyReservations.data'
import type { ReservationView } from './myReservations.types'
import { ReservationPlace } from './ReservationPlace'
import { ReservationRoom } from './ReservationRoom'
import { ReservationStatus } from './ReservationStatus'
import { ReservationStay } from './ReservationStay'

const headCell = 'px-4 py-3 text-left font-mono text-[11px] font-medium tracking-[0.1em] text-muted-foreground uppercase first:pl-6 last:pr-6'
const bodyCell = 'px-4 py-4 align-top first:pl-6 last:pr-6'

/** Les réservations en tableau (grands écrans). */
export function ReservationTable({ reservations, caption }: { reservations: ReservationView[]; caption: string }) {
  const t = useLocalized(myReservationsContent)

  return (
    <table className="w-full table-fixed border-collapse text-[15px]">
      <caption className="sr-only">{caption}</caption>
      <thead className="border-b border-line bg-paper/70">
        <tr>
          <th scope="col" className={cn(headCell, 'w-[16%]')}>{t.columns.booking}</th>
          <th scope="col" className={cn(headCell, 'w-[23%]')}>{t.columns.property}</th>
          <th scope="col" className={cn(headCell, 'w-[13%]')}>{t.columns.room}</th>
          <th scope="col" className={cn(headCell, 'w-[22%]')}>{t.columns.stay}</th>
          <th scope="col" className={cn(headCell, 'w-[12%] text-right')}>{t.columns.price}</th>
          <th scope="col" className={cn(headCell, 'w-[14%]')}>{t.columns.status}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {reservations.map((reservation) => (
          <tr
            key={reservation.id}
            className={cn('transition-colors hover:bg-mint/40', reservation.cancelled && 'text-muted-foreground')}
          >
            <td className={bodyCell}>
              <p className="font-mono text-[13px] font-medium tracking-[0.04em] text-forest">
                {reservation.bookingReference}
              </p>
              {reservation.channel && <p className="mt-0.5 text-[13px] text-muted-foreground">{reservation.channel}</p>}
            </td>
            <td className={cn(bodyCell, 'break-words')}>
              <ReservationPlace reservation={reservation} />
            </td>
            <td className={bodyCell}>
              <ReservationRoom reservation={reservation} />
            </td>
            <td className={bodyCell}>
              <ReservationStay reservation={reservation} />
            </td>
            <td className={cn(bodyCell, 'text-right font-semibold text-ink tabular-nums')}>
              {reservation.price ?? <span className="text-[13px] font-normal text-muted-foreground">{t.noPrice}</span>}
            </td>
            <td className={bodyCell}>
              <ReservationStatus reservation={reservation} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
