import { Eyebrow } from '@/components/common/Eyebrow'
import { Section } from '@/components/common/Section'
import { useLocalized } from '@/hooks/useLocale'
import { ContactChannel } from './ContactChannel'
import { contactChannels, contactContent } from './Contact.data'

export function Contact() {
  const t = useLocalized(contactContent)

  return (
    <Section id="contact" tone="citron" aria-labelledby="contact-title">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
        <div>
          <Eyebrow tone="ink">{t.eyebrow}</Eyebrow>
          <h2
            id="contact-title"
            className="mt-4 text-[clamp(2rem,5vw,3.5rem)] leading-none font-semibold tracking-[-0.01em] text-balance"
          >
            {t.title} <em className="font-normal">{t.titleAccent}</em>
          </h2>
          <p className="mt-5 max-w-[50ch] text-lg text-ink/80">{t.description}</p>
        </div>
        <ul className="grid gap-3">
          {contactChannels.map((channel) => (
            <li key={channel.id}>
              <ContactChannel
                icon={channel.icon}
                label={t.channelLabels[channel.id]}
                value={channel.value}
                href={channel.href}
                externalHint={channel.external ? t.externalHint : undefined}
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
