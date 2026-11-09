import type { PropertyResponse } from '@/features/properties/owner.dto'
import type { PropertyView } from './myProperties.types'

function formatAddress({ street, postalCode, city }: PropertyResponse): string | undefined {
  const town = [postalCode?.trim(), city?.trim()].filter(Boolean).join(' ')
  return [street?.trim(), town].filter(Boolean).join(', ') || undefined
}

/** Réponse de l'API → logement affichable. */
export function toPropertyView(property: PropertyResponse, index: number): PropertyView {
  return {
    id: property.id,
    position: String(index + 1).padStart(2, '0'),
    name: property.name,
    emailLabel: property.emailLabel,
    address: formatAddress(property),
    ownerName: property.ownerName,
    ownerCustomerId: property.ownerCustomerId,
    agentId: property.agentId ?? undefined,
    agentName: property.agentName?.trim() || undefined,
  }
}
