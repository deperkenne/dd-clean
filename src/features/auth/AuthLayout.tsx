import type { ReactNode } from 'react'
import { ArrowLeftIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Eyebrow } from '@/components/common/Eyebrow'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { Logo } from '@/components/common/Logo'

type AuthLayoutProps = {
  logoLabel: string
  eyebrow: string
  title: string
  lead: string
  backLabel: string
  languageLabel: string
  children: ReactNode
}

/** Cadre commun des pages /login et /register : logo, titre, contenu, retour au site. */
export function AuthLayout({
  logoLabel,
  eyebrow,
  title,
  lead,
  backLabel,
  languageLabel,
  children,
}: AuthLayoutProps) {
  return (
    <main className="grid min-h-svh place-items-center bg-paper px-4 py-10 md:px-8">
      <div className="w-full max-w-[440px]">
        <section
          aria-labelledby="auth-title"
          className="rounded-2xl border border-line bg-white p-6 shadow-[0_24px_60px_rgba(14,26,26,0.08)] md:p-10"
        >
          <Logo href="/" label={logoLabel} />
          <Eyebrow className="mt-8">{eyebrow}</Eyebrow>
          <h1
            id="auth-title"
            className="mt-4 text-[clamp(1.875rem,7vw,2.5rem)] leading-[1.05] font-semibold tracking-[-0.01em] text-balance"
          >
            {title}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{lead}</p>
          <div className="mt-8">{children}</div>
        </section>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm text-[15px] text-ink outline-none transition-colors hover:text-forest focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
            {backLabel}
          </Link>
          <LanguageSwitcher label={languageLabel} />
        </div>
      </div>
    </main>
  )
}
