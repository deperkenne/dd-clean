import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useLocalized } from '@/hooks/useLocale'
import { ServiceCard } from './ServiceCard'
import { serviceDefinitions, servicesContent } from './Services.data'

export function Services() {
  const t = useLocalized(servicesContent)

  return (
    <Section id="services" tone="white" aria-labelledby="services-title" className="border-y border-line">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        titleId="services-title"
        description={t.description}
      />
      <ul className="grid gap-y-10 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3">
        {serviceDefinitions.map((service, i) => (
          <li key={service.id}>
            <ServiceCard
              index={i + 1}
              image={{ src: service.image, alt: t.services[service.id].imageAlt }}
              name={t.services[service.id].name}
              description={t.services[service.id].description}
              tags={service.audiences.map((audience) => t.audienceLabels[audience])}
            />
          </li>
        ))}
      </ul>
    </Section>
  )
}
