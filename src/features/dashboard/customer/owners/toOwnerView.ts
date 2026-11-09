import type { OwnerResponse } from '@/features/properties/owner.dto'
import type { Locale } from '@/lib/i18n'
import { initialsOf } from '@/lib/initials'
import type { OwnerView } from './myOwners.types'

/** Réponse de l'API → propriétaire affichable (rang, monogramme, date et contact mis en forme). */
export function toOwnerView(owner: OwnerResponse, index: number, locale: Locale): OwnerView {
  const phone = owner.phone?.trim() || undefined
  return {
    id: owner.id,
    position: String(index + 1).padStart(2, '0'),
    name: owner.name,
    initials: initialsOf(owner.name),
    customerId: owner.customerId,
    email: owner.email?.trim() || undefined,
    phone,
    phoneHref: phone?.replace(/[^\d+]/g, ''),
    addedOn: new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(owner.createdAt),
    ),
  }
}
