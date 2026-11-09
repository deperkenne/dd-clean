import { cn } from '@/lib/utils'

/** Monogramme du propriétaire : ses initiales en serif citron sur un carré encre. */
export function OwnerMonogram({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-11 shrink-0 place-items-center rounded-xl bg-ink font-heading text-[17px] font-semibold tracking-[0.02em] text-citron shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]',
        className,
      )}
    >
      {initials}
    </span>
  )
}
