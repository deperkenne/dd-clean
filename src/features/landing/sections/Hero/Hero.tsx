import { CheckIcon, MessageCircleIcon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Section } from '@/components/common/Section'
import { useLocalized } from '@/hooks/useLocale'
import { company } from '@/lib/company.data'
import { heroBackground, heroContent } from './Hero.data'

export function Hero() {
  const t = useLocalized(heroContent)

  return (
    <Section
      aria-labelledby="hero-title"
      className="pt-12 lg:pt-24"
      backdrop={
        // Mobile : le fond couvre le bloc texte, la checklist déborde dessous. Dès md : 545px fixes.
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[calc(100%-140px)] overflow-hidden bg-mint md:h-[545px]">
          <img
            src={heroBackground.src}
            alt=""
            fetchPriority="high"
            className="size-full object-cover object-[75%_50%]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-paper/90 to-paper/80 lg:bg-linear-to-r lg:from-paper/95 lg:via-paper/80 lg:via-40% lg:to-transparent lg:to-75%" />
        </div>
      }
    >
      <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-5 text-[clamp(2.75rem,8vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-balance"
          >
            {t.title}
            <br />
            <em className="font-normal text-forest">{t.titleAccent}</em>
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg text-muted-foreground">{t.lead}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ActionButton asChild size="lg">
              <a href={t.primaryCta.href}>{t.primaryCta.label}</a>
            </ActionButton>
            <ActionButton asChild size="lg" variant="outline" className="border-ink bg-white">
              <a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer">
                <MessageCircleIcon aria-hidden="true" />
                {t.whatsappCta}
              </a>
            </ActionButton>
          </div>
        </div>

        <aside
          aria-label={t.checklist.title}
          className="rounded-2xl bg-ink p-6 text-paper shadow-[0_24px_60px_rgba(14,26,26,0.22)] lg:p-8"
        >
          <p className="font-mono text-xs font-medium tracking-[0.12em] text-citron uppercase">
            {t.checklist.title}
          </p>
          <ul className="mt-5 grid gap-3">
            {t.checklist.items.map((item) => (
              <li
                key={item}
                className="flex items-start justify-between gap-4 border-b border-dashed border-paper/20 pb-3 text-[15px] last:border-b-0 last:pb-0"
              >
                <span>{item}</span>
                <CheckIcon aria-hidden="true" className="mt-0.5 size-[18px] shrink-0 text-citron" />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  )
}
