import type { LucideIcon } from 'lucide-react'

type ContactChannelProps = {
  icon: LucideIcon
  label: string
  value: string
  href: string
  externalHint?: string
}

export function ContactChannel({ icon: Icon, label, value, href, externalHint }: ContactChannelProps) {
  const externalProps = externalHint ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <a
      href={href}
      {...externalProps}
      className="group flex min-h-16 items-center gap-4 rounded-lg border border-ink/15 bg-paper px-4 py-3 text-ink outline-none transition-colors hover:border-ink focus-visible:ring-3 focus-visible:ring-ink/40"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-forest text-white transition-colors group-hover:bg-forest-strong">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="font-mono text-xs font-medium tracking-[0.1em] uppercase">{label}</span>
        <span className="truncate text-[15px] font-semibold">{value}</span>
        {externalHint && <span className="sr-only">{externalHint}</span>}
      </span>
    </a>
  )
}
