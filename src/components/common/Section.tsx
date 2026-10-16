import type { ComponentProps, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Container } from '@/components/common/Container'
import { cn } from '@/lib/utils'

const sectionVariants = cva('py-14 lg:py-[88px]', {
  variants: {
    tone: {
      paper: 'bg-paper text-ink',
      white: 'bg-white text-ink',
      ink: 'bg-ink text-paper',
      citron: 'bg-citron text-ink',
    },
  },
  defaultVariants: { tone: 'paper' },
})

type SectionProps = ComponentProps<'section'> &
  VariantProps<typeof sectionVariants> & {
    /** Fond pleine largeur (image, voile…) rendu derrière le contenu, hors du Container. */
    backdrop?: ReactNode
  }

export function Section({ tone, backdrop, className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(sectionVariants({ tone }), backdrop && 'relative isolate', className)}
      {...props}
    >
      {backdrop}
      <Container>{children}</Container>
    </section>
  )
}
