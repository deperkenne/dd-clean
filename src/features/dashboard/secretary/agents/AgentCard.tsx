import type { ReactNode } from 'react'
import { PhoneIcon } from 'lucide-react'
import { ContactLink } from '@/components/common/ContactLink'

type AgentCardProps = {
  name: string
  phone: string
  phoneHref: string
  workloadLabel: string
  stats: { label: string; value: string }[]
  /** Liste des jobs de la semaine, ou message « disponible ». */
  children: ReactNode
}

/** Carte d'un agent : contact, charge de la semaine, puis ses jobs. */
export function AgentCard({ name, phone, phoneHref, workloadLabel, stats, children }: AgentCardProps) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-xl border border-line bg-white">
      <header className="border-b border-line px-4 py-4 md:px-5">
        <h2 className="font-sans text-lg leading-tight font-semibold">{name}</h2>
        <ContactLink href={phoneHref} icon={PhoneIcon}>
          {phone}
        </ContactLink>
      </header>
      <div className="px-4 py-4 md:px-5">
        <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
          {workloadLabel}
        </p>
        <dl className="mt-2 grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-paper px-3 py-2.5">
              <dt className="text-[13px] text-muted-foreground">{stat.label}</dt>
              <dd className="mt-0.5 font-sans text-2xl leading-tight font-semibold text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-auto border-t border-line">{children}</div>
    </article>
  )
}
