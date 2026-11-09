import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { LogOutIcon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { Logo } from '@/components/common/Logo'
import { useLocalized } from '@/hooks/useLocale'
import { dashboardShellContent } from './DashboardShell.data'

/**
 * Fond de l'espace : `paper` par défaut ; `blush` pour l'espace client — rose
 * poudré en haut (autour de l'en-tête sombre), qui se fond en crème sous le contenu.
 */
const shellVariants = cva('flex min-h-svh flex-col overflow-x-clip text-ink', {
  variants: {
    background: {
      paper: 'bg-paper',
      blush: 'bg-[linear-gradient(180deg,#E8C9CF_0px,#F2DEE0_380px,#FAF6F2_1000px)]',
    },
  },
  defaultVariants: { background: 'paper' },
})

type DashboardShellProps = VariantProps<typeof shellVariants> & {
  /** Nom de l'espace affiché à côté du logo (ex. « Secrétariat »). */
  area: string
  userName?: string
  onLogout: () => void
  children: ReactNode
}

/** Cadre commun des espaces connectés : barre supérieure + zone de contenu. */
export function DashboardShell({ area, userName, onLogout, background, children }: DashboardShellProps) {
  const t = useLocalized(dashboardShellContent)

  return (
    <div className={shellVariants({ background })}>
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-3 px-4 md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Logo href="/" label={t.logoLabel} />
            <span aria-hidden="true" className="h-6 w-px shrink-0 bg-line" />
            <span className="truncate font-mono text-xs font-medium tracking-[0.12em] text-forest uppercase">
              {area}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            {userName && (
              <p className="hidden text-right text-sm leading-tight lg:block">
                <span className="block text-muted-foreground">{t.signedInAs}</span>
                <span className="font-medium">{userName}</span>
              </p>
            )}
            <LanguageSwitcher label={t.languageLabel} className="hidden md:inline-flex" />
            <ActionButton
              variant="outline"
              size="md"
              onClick={onLogout}
              aria-label={t.logout}
              className="border-ink bg-transparent px-3"
            >
              <LogOutIcon aria-hidden="true" />
              <span className="hidden md:inline">{t.logout}</span>
            </ActionButton>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 md:px-8 lg:py-12">{children}</main>
    </div>
  )
}
