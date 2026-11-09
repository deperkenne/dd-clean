/** « +49 911 1234567 » → « tel:+499111234567 » (les espaces cassent certains téléphones). */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function toMailHref(email: string): string {
  return `mailto:${email}`
}
