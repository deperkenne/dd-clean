import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Tag } from '@/components/common/Tag'
import { useLocalized } from '@/hooks/useLocale'
import { company } from '@/lib/company.data'
import { ReasonItem } from './ReasonItem'
import { reasonIcons, reasonOrder, whyUsContent } from './WhyUs.data'

export function WhyUs() {
  const t = useLocalized(whyUsContent)

  return (
    <Section id="pourquoi" aria-labelledby="why-title">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          titleId="why-title"
          description={t.description}
          className="lg:mb-0"
        />
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {reasonOrder.map((id) => (
            <ReasonItem
              key={id}
              icon={reasonIcons[id]}
              title={t.reasons[id].title}
              description={t.reasons[id].description}
            >
              {id === 'areas' && (
                <ul aria-label={t.areasLabel} className="mt-3 flex flex-wrap gap-1.5">
                  {company.serviceAreas.map((area) => (
                    <li key={area}>
                      <Tag>{area}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </ReasonItem>
          ))}
        </div>
      </div>
    </Section>
  )
}
