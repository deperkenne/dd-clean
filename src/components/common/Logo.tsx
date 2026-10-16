import { cn } from '@/lib/utils'

type LogoProps = {
  href: string
  label: string
  className?: string
}

/** Logo provisoire (wordmark) — TODO: remplacer par le logo définitif. */
export function Logo({ href, label, className }: LogoProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        'inline-flex min-h-11 items-center rounded-sm text-ink outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
    >
      <span aria-hidden="true" className="inline-flex items-baseline gap-1.5">
        <span className="font-heading text-[22px] leading-none font-bold">
          D<span className="font-normal text-forest italic">&amp;</span>D
        </span>
        <span className="font-mono text-[13px] leading-none font-medium tracking-[0.14em] uppercase">
          Clean
        </span>
      </span>
    </a>
  )
}
