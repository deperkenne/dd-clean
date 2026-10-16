import { cva, type VariantProps } from 'class-variance-authority'
import { Eyebrow } from '@/components/common/Eyebrow'
import { cn } from '@/lib/utils'

const descriptionVariants = cva('mt-4 max-w-[60ch] text-lg', {
  variants: {
    tone: {
      light: 'text-muted-foreground',
      dark: 'text-paper/75',
    },
  },
  defaultVariants: { tone: 'light' },
})

type SectionHeadingProps = VariantProps<typeof descriptionVariants> & {
  eyebrow: string
  title: string
  titleId: string
  description?: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  description,
  tone,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 lg:mb-14', className)}>
      <Eyebrow tone={tone === 'dark' ? 'citron' : 'forest'}>{eyebrow}</Eyebrow>
      <h2
        id={titleId}
        className="mt-4 max-w-[20ch] text-[clamp(1.875rem,4.5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.01em] text-balance"
      >
        {title}
      </h2>
      {description && <p className={descriptionVariants({ tone })}>{description}</p>}
    </div>
  )
}
