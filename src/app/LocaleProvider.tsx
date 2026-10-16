import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { detectLocale, isLocale, type Locale } from '@/lib/i18n'
import { LocaleContext } from '@/lib/locale-context'

const STORAGE_KEY = 'dd-clean.locale'

function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return isLocale(stored) ? stored : null
  } catch {
    return null
  }
}

function storeLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // Stockage indisponible (navigation privée) : la langue reste en mémoire.
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(
    () => readStoredLocale() ?? detectLocale(navigator.languages),
  )

  useEffect(() => {
    document.documentElement.lang = locale
    storeLocale(locale)
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale }), [locale])

  return <LocaleContext value={value}>{children}</LocaleContext>
}
