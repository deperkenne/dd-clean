import { useContext } from 'react'
import type { Localized } from '@/lib/i18n'
import { LocaleContext } from '@/lib/locale-context'

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale doit être utilisé dans <LocaleProvider>.')
  }
  return context
}

/** Renvoie la version du contenu correspondant à la langue active. */
export function useLocalized<T>(content: Localized<T>): T {
  const { locale } = useLocale()
  return content[locale]
}
