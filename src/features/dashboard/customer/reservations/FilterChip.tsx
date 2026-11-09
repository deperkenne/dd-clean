import { cn } from '@/lib/utils'

type FilterChipProps = {
  label: string
  count: number
  active: boolean
  onClick: () => void
}

/** Puce de filtre avec son nombre de résultats ; `aria-pressed` indique le choix actif. */
export function FilterChip({ label, count, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border px-4 py-1.5 text-left text-[14px] font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:min-h-9',
        active ? 'border-ink bg-ink text-paper' : 'border-line bg-white text-ink hover:border-forest hover:text-forest',
      )}
    >
      <span className="min-w-0 break-words">{label}</span>
      <span
        className={cn(
          'shrink-0 rounded-full px-1.5 font-mono text-[11px] leading-5 tabular-nums',
          active ? 'bg-citron text-ink' : 'bg-mint text-forest-strong',
        )}
      >
        {count}
      </span>
    </button>
  )
}
