import { ArrowRightIcon, CalendarCheckIcon, ShieldCheckIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ActionButton } from '@/components/common/ActionButton'
import { BrandMark } from '@/components/common/BrandMark'
import { Eyebrow } from '@/components/common/Eyebrow'
import { useLocalized } from '@/hooks/useLocale'
import { customerPaths } from '../customerPaths'
import type { CustomerProfile } from './customerProfile.types'
import { welcomeHeroContent } from './WelcomeHero.data'

/** En-tête de l'espace client : salutation, action principale et carte du compte. */
export function WelcomeHero({ profile }: { profile: CustomerProfile }) {
  const t = useLocalized(welcomeHeroContent)

  return (
    <section
      aria-labelledby="customer-welcome-title"
      className="relative isolate overflow-hidden rounded-2xl bg-ink text-paper motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
    >
      <BrandMark className="-top-[0.2em] -right-[0.05em] text-[clamp(14rem,42vw,30rem)] text-forest/45" />

      <div className="grid gap-10 px-5 py-8 md:px-10 md:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:items-end lg:gap-12 lg:px-12 lg:py-14">
        <div className="min-w-0">
          <Eyebrow tone="citron">{t.eyebrow}</Eyebrow>
          <p className="mt-3 font-mono text-xs tracking-[0.08em] text-paper/60 uppercase">{profile.today}</p>
          <h1
            id="customer-welcome-title"
            className="mt-6 max-w-[16ch] text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.02em] break-words text-balance"
          >
            {t.greeting}
            {profile.name && (
              <>
                , <em className="font-normal text-citron italic">{profile.name}</em>
              </>
            )}
            .
          </h1>
          <p className="mt-5 max-w-[52ch] text-lg text-paper/75">{t.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ActionButton
              asChild
              size="lg"
              className="bg-citron text-ink hover:bg-citron/85 focus-visible:ring-citron/50"
            >
              <Link to={customerPaths.createOwner}>
                {t.cta}
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            </ActionButton>
            <ActionButton
              asChild
              size="lg"
              variant="outline"
              className="border-paper/30 bg-transparent text-paper hover:bg-paper/10 hover:text-paper"
            >
              <Link to={customerPaths.reservations}>
                <CalendarCheckIcon aria-hidden="true" />
                {t.reservationsCta}
              </Link>
            </ActionButton>
          </div>
        </div>

        <div className="min-w-0 rounded-xl border border-paper/15 bg-paper/[0.04] backdrop-blur-sm">
          <p className="border-b border-paper/15 px-5 py-3 font-mono text-[11px] font-medium tracking-[0.12em] text-citron uppercase">
            {t.cardTitle}
          </p>
          <dl className="divide-y divide-paper/10">
            {(profile.name ?? profile.email) && (
              <div className="px-5 py-3">
                <dt className="font-mono text-[11px] tracking-[0.1em] text-paper/55 uppercase">{t.holderLabel}</dt>
                <dd className="mt-1 text-[15px] break-words">{profile.name ?? profile.email}</dd>
              </div>
            )}
            {profile.email && (
              <div className="px-5 py-3">
                <dt className="font-mono text-[11px] tracking-[0.1em] text-paper/55 uppercase">{t.contactLabel}</dt>
                <dd className="mt-1 text-[15px] break-words">{profile.email}</dd>
              </div>
            )}
            <div className="px-5 py-3">
              <dt className="font-mono text-[11px] tracking-[0.1em] text-paper/55 uppercase">{t.accessLabel}</dt>
              <dd className="mt-1 flex items-center gap-2 text-[15px]">
                <ShieldCheckIcon aria-hidden="true" className="size-4 shrink-0 text-citron" />
                {t.accessValue}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
