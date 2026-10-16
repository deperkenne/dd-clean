import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const eyebrowVariants = cva(
  "flex items-center gap-3 font-mono text-xs font-medium tracking-[0.12em] uppercase before:h-px before:w-6 before:shrink-0 before:bg-current before:content-['']",
  {
    variants: {
      tone: {
        forest: 'text-forest',
        citron: 'text-citron',
        ink: 'text-ink',
      },
    },
    defaultVariants: { tone: 'forest' },
  },
)

type EyebrowProps = ComponentProps<'p'> & VariantProps<typeof eyebrowVariants>

export function Eyebrow({ tone, className, ...props }: EyebrowProps) {
  return <p className={cn(eyebrowVariants({ tone }), className)} {...props} />
}
