import { ChevronRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '@/components/common/StatusBadge'
import type { StatusTone } from '@/components/common/StatusDot'
import { Tag } from '@/components/common/Tag'

type ReservationRowProps = {
  guestName: string
  stayLabel: string
  statusLabel: string
  statusTone: StatusTone
  /** Lien vers le job de nettoyage de cette réservation, s'il existe. */
  job: { to: string; backTo: string; label: string } | null
  noJobLabel: string
}

export function ReservationRow({ guestName, stayLabel, statusLabel, statusTone, job, noJobLabel }: ReservationRowProps) {
  return (
    <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-5">
      <div className="min-w-0">
        <p className="text-[15px] leading-snug font-semibold text-ink">{guestName}</p>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-muted-foreground">
          {stayLabel}
          <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
        </p>
      </div>
      {job ? (
        <Link
          to={job.to}
          state={{ from: job.backTo }}
          className="inline-flex min-h-11 shrink-0 items-center gap-1 self-start rounded-sm text-[14px] font-medium text-forest outline-none hover:text-forest-strong focus-visible:ring-3 focus-visible:ring-ring/50 sm:self-auto"
        >
          {job.label}
          <ChevronRightIcon aria-hidden="true" className="size-4" />
        </Link>
      ) : (
        <Tag className="self-start bg-warning/15 text-ink sm:self-auto">{noJobLabel}</Tag>
      )}
    </div>
  )
}
