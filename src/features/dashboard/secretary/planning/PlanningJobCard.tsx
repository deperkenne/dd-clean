import { ClockIcon, UserRoundIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '@/components/common/StatusBadge'
import type { StatusTone } from '@/components/common/StatusDot'
import { Tag } from '@/components/common/Tag'

type PlanningJobCardProps = {
  to: string
  /** Page à rouvrir quand on revient du détail (le planning à la bonne semaine). */
  backTo: string
  propertyLabel: string
  serviceLabel: string | null
  durationLabel: string
  durationTitle: string
  agentName: string | null
  agentTitle: string
  unassignedLabel: string
  statusLabel: string
  statusTone: StatusTone
}

export function PlanningJobCard({
  to,
  backTo,
  propertyLabel,
  serviceLabel,
  durationLabel,
  durationTitle,
  agentName,
  agentTitle,
  unassignedLabel,
  statusLabel,
  statusTone,
}: PlanningJobCardProps) {
  return (
    <Link
      to={to}
      state={{ from: backTo }}
      className="group flex min-h-11 flex-col gap-2 rounded-lg border border-line bg-white p-3 outline-none transition-colors hover:border-ink focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <p className="text-sm leading-snug font-semibold break-words text-ink group-hover:text-forest">
        {propertyLabel}
      </p>
      {serviceLabel && <Tag className="self-start">{serviceLabel}</Tag>}
      <p className="flex flex-col gap-1 text-[13px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <ClockIcon aria-hidden="true" className="size-3.5 shrink-0" />
          <span className="sr-only">{durationTitle}</span>
          {durationLabel}
        </span>
        <span className="inline-flex items-start gap-1">
          <UserRoundIcon aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          <span className="sr-only">{agentTitle}</span>
          {agentName ?? <span className="font-medium text-ink">{unassignedLabel}</span>}
        </span>
      </p>
      <StatusBadge tone={statusTone} className="self-start">
        {statusLabel}
      </StatusBadge>
    </Link>
  )
}
