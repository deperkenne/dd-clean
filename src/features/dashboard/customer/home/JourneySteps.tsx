import { Eyebrow } from '@/components/common/Eyebrow'
import { useLocalized } from '@/hooks/useLocale'
import { JourneyStep } from './JourneyStep'
import { journeyStepsContent } from './JourneySteps.data'

/** Le parcours du client en quatre étapes : ce qu'il saisit, puis ce qui est automatique. */
export function JourneySteps() {
  const t = useLocalized(journeyStepsContent)

  return (
    <section
      aria-labelledby="customer-journey-title"
      className="min-w-0 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700"
    >
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <h2
        id="customer-journey-title"
        className="mt-3 max-w-[24ch] text-[clamp(1.5rem,3vw,2rem)] leading-tight font-semibold tracking-[-0.01em] text-balance"
      >
        {t.title}
      </h2>
      <p className="mt-3 max-w-[60ch] text-[15px] text-muted-foreground md:text-base">{t.lead}</p>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-4">
        {t.steps.map((step, i) => (
          <li key={step.title} className="min-w-0">
            <JourneyStep index={i + 1} {...step} />
          </li>
        ))}
      </ol>
    </section>
  )
}
