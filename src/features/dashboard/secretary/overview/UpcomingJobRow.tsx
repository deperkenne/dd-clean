import { ChevronRightIcon, ClockIcon, UserRoundIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '@/components/common/StatusBadge'
import type { StatusTone } from '@/components/common/StatusDot'
import { Tag } from '@/components/common/Tag'

type UpcomingJobRowProps = {
  /** Page détail du job, ouverte au clic sur la ligne. */
  to: string
  dayLabel: string
  propertyLabel: string
  propertyCity: string
  serviceLabel: string | null
  durationLabel: string
  durationTitle: string
  agentName: string | null
  agentTitle: string
  unassignedLabel: string
  statusLabel: string
  statusTone: StatusTone
}

export function UpcomingJobRow({
  to,
  dayLabel,
  propertyLabel,
  propertyCity,
  serviceLabel,
  durationLabel,
  durationTitle,
  agentName,
  agentTitle,
  unassignedLabel,
  statusLabel,
  statusTone,
}: UpcomingJobRowProps) {
  return (
    <Link
      to={to}
      className="group grid gap-3 px-4 py-4 outline-none transition-colors hover:bg-paper focus-visible:bg-paper focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset md:grid-cols-[96px_minmax(0,1fr)_auto] md:items-center md:gap-5 md:px-5"
    >
      <p className="font-mono text-[13px] font-medium text-forest uppercase">{dayLabel}</p>

      <div className="min-w-0">
        <p className="font-sans text-[15px] leading-snug font-semibold text-ink group-hover:text-forest">{propertyLabel}</p>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-muted-foreground">
          {serviceLabel && <Tag>{serviceLabel}</Tag>}
          <span>{propertyCity}</span>
          <span className="inline-flex items-center gap-1" title={durationTitle}>
            <ClockIcon aria-hidden="true" className="size-3.5" />
            <span className="sr-only">{durationTitle}</span>
            {durationLabel}
          </span>
          <span className="inline-flex items-center gap-1" title={agentTitle}>
            <UserRoundIcon aria-hidden="true" className="size-3.5" />
            <span className="sr-only">{agentTitle}</span>
            {agentName ?? <span className="font-medium text-ink">{unassignedLabel}</span>}
          </span>
        </p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
        <ChevronRightIcon
          aria-hidden="true"
          className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </div>
    </Link>
  )
}
