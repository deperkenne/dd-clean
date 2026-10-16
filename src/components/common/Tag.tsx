import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function Tag({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[4px] bg-mint px-2 py-1 font-mono text-[11px] leading-none font-medium tracking-[0.08em] text-forest-strong uppercase',
        className,
      )}
      {...props}
    />
  )
}
