import { cva } from 'class-variance-authority'

/** `manual` : étape faite par le client ; `automatic` : prise en charge par D&D Clean. */
export type JourneyStepTone = 'manual' | 'automatic'

const stepVariants = cva('flex h-full min-w-0 flex-col rounded-xl border p-5 transition-colors md:p-6', {
  variants: {
    tone: {
      manual: 'border-line bg-white text-ink hover:border-forest/40',
      automatic: 'border-ink bg-ink text-paper',
    },
  },
})

const numberVariants = cva('font-mono text-[13px] font-medium', {
  variants: { tone: { manual: 'text-forest', automatic: 'text-citron' } },
})

const tagVariants = cva(
  'inline-flex items-center rounded-[4px] px-2 py-1 font-mono text-[11px] leading-none font-medium tracking-[0.08em] uppercase',
  { variants: { tone: { manual: 'bg-mint text-forest-strong', automatic: 'bg-citron text-ink' } } },
)

const ruleVariants = cva('mt-5 h-px w-full', {
  variants: { tone: { manual: 'bg-line', automatic: 'bg-paper/15' } },
})

const descriptionVariants = cva('mt-2 text-[15px]', {
  variants: { tone: { manual: 'text-muted-foreground', automatic: 'text-paper/75' } },
})

type JourneyStepProps = {
  index: number
  title: string
  description: string
  tag: string
  tone: JourneyStepTone
}

/** Une étape numérotée du parcours client (01, 02…). */
export function JourneyStep({ index, title, description, tag, tone }: JourneyStepProps) {
  return (
    <div className={stepVariants({ tone })}>
      <div className="flex items-center justify-between gap-3">
        <span className={numberVariants({ tone })}>{String(index).padStart(2, '0')}</span>
        <span className={tagVariants({ tone })}>{tag}</span>
      </div>
      <span aria-hidden="true" className={ruleVariants({ tone })} />
      <h3 className="mt-5 text-xl leading-tight font-semibold text-balance">{title}</h3>
      <p className={descriptionVariants({ tone })}>{description}</p>
    </div>
  )
}
