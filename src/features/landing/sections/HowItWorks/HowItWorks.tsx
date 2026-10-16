import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useLocalized } from '@/hooks/useLocale'
import { howItWorksContent } from './HowItWorks.data'
import { StepItem } from './StepItem'

export function HowItWorks() {
  const t = useLocalized(howItWorksContent)

  return (
    <Section id="fonctionnement" tone="ink" aria-labelledby="how-title">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} titleId="how-title" tone="dark" />
      <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {t.steps.map((step, i) => (
          <li key={step.title}>
            <StepItem index={i + 1} title={step.title} description={step.description} />
          </li>
        ))}
      </ol>
    </Section>
  )
}
