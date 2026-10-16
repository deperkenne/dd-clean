import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useLocalized } from '@/hooks/useLocale'
import { partners, partnersContent } from './Partners.data'

export function Partners() {
  const t = useLocalized(partnersContent)

  return (
    <Section id="partenaires" aria-labelledby="partners-title" className="border-b border-line">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        titleId="partners-title"
        description={t.description}
      />
      <ul className="grid grid-cols-2 border-t border-l border-t-ink border-l-line md:grid-cols-3 xl:grid-cols-6">
        {partners.map((partner) => (
          <li
            key={partner.id}
            className="group grid min-h-30 place-items-center border-r border-b border-line px-3 py-5"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              loading="lazy"
              decoding="async"
              width={168}
              height={48}
              className="h-auto w-full max-w-42 opacity-70 grayscale transition-opacity group-hover:opacity-100 motion-reduce:transition-none"
            />
          </li>
        ))}
      </ul>
    </Section>
  )
}
