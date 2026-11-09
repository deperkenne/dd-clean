import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type StepView = {
  key: string
  label: string
  state: 'done' | 'current' | 'upcoming'
  /** Texte lu par les lecteurs d'écran (« étape passée »…). */
  stateLabel: string
}

/** Étapes du job : verticales sur mobile, horizontales dès 768px. */
export function StatusStepper({ steps, label }: { steps: StepView[]; label: string }) {
  return (
    <ol aria-label={label} className="grid gap-0 md:grid-cols-5 md:gap-2">
      {steps.map((step, index) => (
        <li
          key={step.key}
          aria-current={step.state === 'current' ? 'step' : undefined}
          className="relative flex items-center gap-3 pb-4 last:pb-0 md:flex-col md:items-start md:gap-2 md:pb-0"
        >
          {/* Trait de liaison vers l'étape suivante. */}
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={cn(
                'absolute top-7 bottom-0 left-[13px] w-0.5 md:top-[13px] md:right-[-8px] md:bottom-auto md:left-9 md:h-0.5 md:w-auto',
                step.state === 'done' ? 'bg-forest' : 'bg-line',
              )}
            />
          )}
          <span
            aria-hidden="true"
            className={cn(
              'relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-medium',
              step.state === 'done' && 'border-forest bg-forest text-white',
              step.state === 'current' && 'border-forest bg-white text-forest ring-4 ring-forest/15',
              step.state === 'upcoming' && 'border-line bg-white text-muted-foreground',
            )}
          >
            {step.state === 'done' ? <CheckIcon className="size-4" /> : index + 1}
          </span>
          <span
            className={cn(
              'text-[14px] leading-tight',
              step.state === 'current' ? 'font-semibold text-ink' : 'text-muted-foreground',
              step.state === 'done' && 'text-ink',
            )}
          >
            {step.label}
            <span className="sr-only"> ({step.stateLabel})</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
