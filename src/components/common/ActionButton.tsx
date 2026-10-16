import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Bouton d'action du site : étend le Button shadcn (sans le modifier) avec
 * des tailles qui respectent la zone tactile minimale de 44px.
 */
const actionSizes = cva('gap-2 rounded-md font-semibold [&_svg:not([class*=size-])]:size-[18px]', {
  variants: {
    size: {
      md: 'h-11 px-4 text-[15px]',
      lg: 'h-12 px-5 text-base',
      icon: 'size-11',
    },
  },
  defaultVariants: { size: 'md' },
})

type ActionButtonProps = Omit<ComponentProps<typeof Button>, 'size'> &
  VariantProps<typeof actionSizes>

export function ActionButton({ size, className, ...props }: ActionButtonProps) {
  return <Button className={cn(actionSizes({ size }), className)} {...props} />
}
