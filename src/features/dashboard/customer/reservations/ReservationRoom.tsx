import { DoorOpenIcon } from 'lucide-react'
import { useLocalized } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { myReservationsContent } from './MyReservations.data'
import type { ReservationView } from './myReservations.types'

/** Numéro de la chambre réservée, en badge ; « Unique » quand Smoobu n'en donne pas. */
export function ReservationRoom({ reservation, className }: { reservation: ReservationView; className?: string }) {
  const t = useLocalized(myReservationsContent)
  const label =
    reservation.room === 'whole' ? t.uniqueRoom : reservation.room ? t.roomNumber(reservation.room) : t.noRoom

  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[13px] font-medium tracking-[0.04em]',
        reservation.room ? 'border-forest/25 bg-mint text-forest-strong' : 'border-line bg-paper text-muted-foreground',
        className,
      )}
    >
      <DoorOpenIcon aria-hidden="true" className="size-3.5 shrink-0" />
      <span className="sr-only">{t.columns.room} : </span>
      {reservation.room ? (
        <span className="min-w-0 break-words">{label}</span>
      ) : (
        <>
          <span aria-hidden="true">—</span>
          <span className="sr-only">{label}</span>
        </>
      )}
    </span>
  )
}
