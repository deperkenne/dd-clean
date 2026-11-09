import { cn } from '@/lib/utils'

/**
 * Signature visuelle de D&D Clean : l'esperluette italique du logo, en filigrane.
 * Décorative uniquement ; le parent doit être `relative isolate overflow-hidden`.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute -z-10 font-heading leading-none font-normal italic select-none',
        className,
      )}
    >
      &amp;
    </span>
  )
}
