import { MenuIcon, MessageCircleIcon, XIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ActionButton } from '@/components/common/ActionButton'
import { Container } from '@/components/common/Container'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { Logo } from '@/components/common/Logo'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useLocalized } from '@/hooks/useLocale'
import { company } from '@/lib/company.data'
import { cn } from '@/lib/utils'
import { headerContent } from './Header.data'

const navLinkClass =
  'inline-flex min-h-11 items-center rounded-sm text-[15px] text-ink outline-none transition-colors hover:text-forest focus-visible:ring-3 focus-visible:ring-ring/50'

export function Header() {
  const t = useLocalized(headerContent)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <Container className="flex h-16 items-center justify-between gap-3 lg:h-[72px]">
        <Logo href="/" label={t.homeLabel} />

        <nav aria-label={t.navLabel} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {t.links.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher label={t.languageLabel} className="hidden md:inline-flex" />
          <ActionButton
            asChild
            variant="outline"
            size="icon"
            className="hidden border-ink bg-transparent md:inline-flex"
          >
            <a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label={t.whatsappLabel}>
              <MessageCircleIcon aria-hidden="true" />
            </a>
          </ActionButton>
          <ActionButton asChild className="hidden sm:inline-flex">
            <Link to={t.quoteCta.href}>{t.quoteCta.label}</Link>
          </ActionButton>

          <Sheet>
            <SheetTrigger asChild>
              <ActionButton variant="ghost" size="icon" className="lg:hidden" aria-label={t.openMenuLabel}>
                <MenuIcon aria-hidden="true" />
              </ActionButton>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              aria-describedby={undefined}
              className="w-[min(100%,360px)] gap-0 bg-paper p-0"
            >
              <div className="flex h-16 items-center justify-between border-b border-line px-4">
                <SheetTitle className="font-mono text-xs font-medium tracking-[0.12em] text-ink uppercase">
                  {t.menuTitle}
                </SheetTitle>
                <SheetClose asChild>
                  <ActionButton variant="ghost" size="icon" aria-label={t.closeMenuLabel}>
                    <XIcon aria-hidden="true" />
                  </ActionButton>
                </SheetClose>
              </div>

              <nav aria-label={t.navLabel} className="px-4 py-4">
                <ul className="flex flex-col">
                  {t.links.map((link) => (
                    <li key={link.href} className="border-b border-line">
                      <SheetClose asChild>
                        <Link to={link.href} className={cn(navLinkClass, 'w-full py-3 font-heading text-2xl')}>
                          {link.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-line p-4">
                <LanguageSwitcher label={t.languageLabel} className="self-start" />
                <SheetClose asChild>
                  <ActionButton asChild size="lg">
                    <Link to={t.quoteCta.href}>{t.quoteCta.label}</Link>
                  </ActionButton>
                </SheetClose>
                <ActionButton asChild size="lg" variant="outline" className="border-ink bg-transparent">
                  <a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer">
                    <MessageCircleIcon aria-hidden="true" />
                    {t.whatsappLabel}
                  </a>
                </ActionButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
