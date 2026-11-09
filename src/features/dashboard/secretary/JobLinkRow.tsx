import { ChevronRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '@/components/common/StatusBadge'
import type { StatusTone } from '@/components/common/StatusDot'

type JobLinkRowProps = {
  to: string
  /** Page à rouvrir au retour du détail (avec sa semaine, son bien…). */
  backTo: string
  dayLabel: string
  /** Ligne principale : le bien (page Agents) ou l'agent (fiche d'un bien). */
  title: string
  /** Précision sous le titre (durée…). */
  detail: string
  statusLabel: string
  statusTone: StatusTone
}

/** Ligne de job cliquable, ouvrant son détail, dans une liste compacte. */
export function JobLinkRow({ to, backTo, dayLabel, title, detail, statusLabel, statusTone }: JobLinkRowProps) {
  return (
    <Link
      to={to}
      state={{ from: backTo }}
      className="group flex min-h-11 items-center gap-3 px-4 py-3 outline-none transition-colors hover:bg-paper focus-visible:bg-paper focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset md:px-5"
    >
      <span className="w-[72px] shrink-0 font-mono text-[12px] font-medium text-forest uppercase">{dayLabel}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] leading-snug font-semibold text-ink group-hover:text-forest">{title}</span>
        <span className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-muted-foreground">
          {detail}
          <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
        </span>
      </span>
      <ChevronRightIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
    </Link>
  )
}
