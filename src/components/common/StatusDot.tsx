import { cva, type VariantProps } from 'class-variance-authority'

const dotVariants = cva('size-2 shrink-0 rounded-full', {
  variants: {
    tone: {
      neutral: 'bg-muted-foreground',
      info: 'bg-info',
      warning: 'bg-warning',
      success: 'bg-success',
      primary: 'bg-forest',
      muted: 'bg-[#AEB8B4]',
    },
  },
  defaultVariants: { tone: 'neutral' },
})

export type StatusTone = NonNullable<VariantProps<typeof dotVariants>['tone']>

/** Pastille de couleur d'un état — décorative : toujours accompagnée d'un libellé. */
export function StatusDot({ tone }: { tone: StatusTone }) {
  return <span aria-hidden="true" className={dotVariants({ tone })} />
}
