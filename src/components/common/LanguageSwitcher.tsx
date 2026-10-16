import { useLocale } from '@/hooks/useLocale'
import { localeLabels, locales } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type LanguageSwitcherProps = {
  label: string
  className?: string
}

export function LanguageSwitcher({ label, className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale()

  return (
    <div
      role="group"
      aria-label={label}
      className={cn('inline-flex rounded-md border border-line bg-white p-0.5', className)}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-label={localeLabels[code]}
          aria-pressed={code === locale}
          onClick={() => setLocale(code)}
          className={cn(
            'min-h-11 min-w-11 rounded-[4px] font-mono text-xs font-medium uppercase outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50',
            code === locale ? 'bg-ink text-paper' : 'text-ink hover:bg-mint',
          )}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
