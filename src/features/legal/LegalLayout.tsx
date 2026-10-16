import { Eyebrow } from '@/components/common/Eyebrow'
import { Section } from '@/components/common/Section'

export type LegalSection = {
  heading: string
  paragraphs: string[]
}

type LegalLayoutProps = {
  eyebrow: string
  title: string
  placeholderNotice: string
  sections: LegalSection[]
}

export function LegalLayout({ eyebrow, title, placeholderNotice, sections }: LegalLayoutProps) {
  return (
    <Section aria-labelledby="legal-title" className="pt-12 lg:pt-20">
      <div className="max-w-[72ch]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          id="legal-title"
          className="mt-4 text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.01em]"
        >
          {title}
        </h1>
        <p
          role="note"
          className="mt-6 rounded-md border-l-[3px] border-warning bg-white px-4 py-3 text-[15px]"
        >
          {placeholderNotice}
        </p>
        <div className="mt-10 grid gap-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl leading-tight font-semibold">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </Section>
  )
}
