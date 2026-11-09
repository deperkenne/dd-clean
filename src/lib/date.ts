import type { Locale } from '@/lib/i18n'

/**
 * Les dates du back-office sont des jours calendaires ISO (« 2026-10-22 »),
 * sans heure. On les manipule en heure locale : `new Date('2026-10-22')`
 * serait interprété en UTC et pourrait afficher la veille selon le fuseau.
 */
export function parseIsoDay(isoDay: string): Date {
  const [year, month, day] = isoDay.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function toIsoDay(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function todayIsoDay(): string {
  return toIsoDay(new Date())
}

export function addDays(isoDay: string, days: number): string {
  const date = parseIsoDay(isoDay)
  date.setDate(date.getDate() + days)
  return toIsoDay(date)
}

/** « ven. 17 oct. » / « Fr., 17. Okt. » / « Fri, Oct 17 » */
export function formatShortDay(isoDay: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short' }).format(
    parseIsoDay(isoDay),
  )
}

/** « vendredi 17 octobre 2026 » */
export function formatLongDay(isoDay: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parseIsoDay(isoDay))
}

/** 90 → « 1 h 30 min » (unités traduites par le navigateur). */
export function formatDuration(minutes: number, locale: Locale): string {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  const unit = (value: number, kind: 'hour' | 'minute') =>
    new Intl.NumberFormat(locale, { style: 'unit', unit: kind, unitDisplay: 'short' }).format(value)
  return [hours > 0 && unit(hours, 'hour'), rest > 0 && unit(rest, 'minute')].filter(Boolean).join(' ')
}

/** Lundi de la semaine contenant ce jour (semaine du lundi au dimanche). */
export function startOfWeek(isoDay: string): string {
  const date = parseIsoDay(isoDay)
  const daysSinceMonday = (date.getDay() + 6) % 7
  return addDays(isoDay, -daysSinceMonday)
}

/** « 12 – 18 oct. 2026 » (le navigateur évite de répéter mois et année). */
export function formatDayRange(startIsoDay: string, endIsoDay: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).formatRange(
    parseIsoDay(startIsoDay),
    parseIsoDay(endIsoDay),
  )
}

/** « lundi » / « Montag » / « Monday » */
export function formatWeekday(isoDay: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(parseIsoDay(isoDay))
}

/** « 12 oct. » / « 12. Okt. » / « Oct 12 » */
export function formatDayMonth(isoDay: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(parseIsoDay(isoDay))
}
