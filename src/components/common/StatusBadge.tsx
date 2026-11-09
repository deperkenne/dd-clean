import type { ComponentProps } from 'react'
import { StatusDot, type StatusTone } from '@/components/common/StatusDot'
import { cn } from '@/lib/utils'

type StatusBadgeProps = ComponentProps<'span'> & { tone: StatusTone }

/**
 * Badge d'état : la couleur n'est jamais seule, elle accompagne toujours un
 * libellé (lisible aussi pour les daltoniens). Le texte reste en encre, seule
 * la pastille porte la couleur de l'état.
 */
export function StatusBadge({ tone, className, children, ...props }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[13px] leading-none font-medium whitespace-nowrap text-ink',
        className,
      )}
      {...props}
    >
      <StatusDot tone={tone} />
      {children}
    </span>
  )
}
