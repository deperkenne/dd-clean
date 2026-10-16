export const locales = ['fr', 'de', 'en'] as const

export type Locale = (typeof locales)[number]

/** Un contenu décliné dans les trois langues du site. */
export type Localized<T> = Record<Locale, T>

export const defaultLocale: Locale = 'de'

export const localeLabels: Localized<string> = {
  fr: 'Français',
  de: 'Deutsch',
  en: 'English',
}

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale)
}

/** Première langue du navigateur supportée par le site, sinon l'allemand. */
export function detectLocale(preferred: readonly string[]): Locale {
  for (const tag of preferred) {
    const base = tag.slice(0, 2).toLowerCase()
    if (isLocale(base)) return base
  }
  return defaultLocale
}
