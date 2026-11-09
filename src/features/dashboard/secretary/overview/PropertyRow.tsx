import { ChevronRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Tag } from '@/components/common/Tag'

type PropertyRowProps = {
  /** Fiche du bien, ouverte au clic sur la ligne. */
  to: string
  label: string
  address: string
  city: string
  serviceLabel: string
  nextJobTitle: string
  nextJobValue: string
}

export function PropertyRow({ to, label, address, city, serviceLabel, nextJobTitle, nextJobValue }: PropertyRowProps) {
  return (
    <Link
      to={to}
      className="group flex flex-col gap-2 px-4 py-4 outline-none transition-colors hover:bg-paper focus-visible:bg-paper focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset md:px-5"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 font-sans text-[15px] leading-snug font-semibold text-ink group-hover:text-forest">{label}</p>
        <Tag className="shrink-0">{serviceLabel}</Tag>
      </div>
      <p className="text-[13px] text-muted-foreground">
        {address}, {city}
      </p>
      <p className="flex flex-wrap gap-x-2 text-[13px]">
        <span className="text-muted-foreground">{nextJobTitle}</span>
        <span className="font-medium text-ink">{nextJobValue}</span>
        <ChevronRightIcon aria-hidden="true" className="ml-auto size-4 self-center text-muted-foreground" />
      </p>
    </Link>
  )
}
