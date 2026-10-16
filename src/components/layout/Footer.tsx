import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { Logo } from '@/components/common/Logo'
import { useLocalized } from '@/hooks/useLocale'
import { company } from '@/lib/company.data'
import { cn } from '@/lib/utils'
import { footerContent } from './Footer.data'
import { FooterColumn } from './FooterColumn'

const linkClass =
  'inline-flex min-h-11 items-center rounded-sm outline-none transition-colors hover:text-forest focus-visible:ring-3 focus-visible:ring-ring/50'

export function Footer() {
  const t = useLocalized(footerContent)
  const { address } = company

  return (
    <footer className="border-t border-line bg-paper text-ink">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <Logo href="/" label={t.homeLabel} />
          <p className="mt-3 max-w-[32ch] text-[15px] text-muted-foreground">{t.tagline}</p>
          <p className="mt-3 font-mono text-xs font-medium tracking-[0.1em] uppercase">{t.availability}</p>
        </div>

        <FooterColumn title={t.contactTitle}>
          <address className="not-italic">
            <p>{address.street}</p>
            <p>
              {address.postalCode} {address.city}
            </p>
            <ul className="mt-1">
              <li>
                <a href={company.phone.href} className={linkClass}>
                  {company.phone.display}
                </a>
              </li>
              <li>
                <a href={company.email.href} className={cn(linkClass, 'break-all')}>
                  {company.email.display}
                </a>
              </li>
            </ul>
          </address>
        </FooterColumn>

        <FooterColumn title={t.areasTitle}>
          <p className="text-muted-foreground">{company.serviceAreas.join(' · ')}</p>
        </FooterColumn>

        <FooterColumn title={t.legalTitle}>
          <ul>
            {t.legalLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>
      </Container>
      <div className="border-t border-line">
        <Container className="py-5 text-[13px] text-muted-foreground">{t.rights}</Container>
      </div>
    </footer>
  )
}
