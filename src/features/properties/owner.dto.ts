// =============================================================================
// owner.dto.ts
// -----------------------------------------------------------------------------
// Corps des requêtes de création envoyés au back-end (records Java
// CreateOwnerRequest, CreatePropertyRequest, CreateRoomRequest). Les règles de
// validation correspondantes vivent dans `owner.schema.ts`.
// Un champ facultatif côté Java (sans @NotBlank/@NotNull) est omis s'il est vide.
// =============================================================================

import type { Decimal, IsoInstant, Uuid } from '@/lib/api.types'

export type CreateRoomRequest = {
  number: string
  price: Decimal
}

/** Logement, avec ou sans chambres. */
export type CreatePropertyRequest = {
  name: string
  emailLabel: string
  street?: string
  postalCode?: string
  city?: string
  rooms?: CreateRoomRequest[]
  /** Agent de ménage attribué (un agent du client connecté) ; omis si aucun. */
  agentId?: Uuid
}

/** Logement tel que renvoyé par le back-end (record `PropertyResponse`). */
export type PropertyResponse = {
  id: Uuid
  name: string
  emailLabel: string
  street: string | null
  postalCode: string | null
  city: string | null
  ownerId: Uuid
  ownerCustomerId: string
  ownerName: string
  /** Agent de ménage attribué ; `null` si aucun. */
  agentId: Uuid | null
  agentName: string | null
}

/**
 * Propriétaire tel que renvoyé par le back-end (record `OwnerResponse`), par
 * `POST /api/owners` et `GET /api/owners/mine`. Un champ Java facultatif
 * arrive à `null` quand il n'est pas renseigné.
 */
export type OwnerResponse = {
  id: Uuid
  customerId: string
  name: string
  email: string | null
  phone: string | null
  createdAt: IsoInstant
  /** Ses logements ; lu avec prudence (`?? []`) au cas où il serait absent. */
  properties?: PropertyResponse[] | null
}

/**
 * Propriétaire, avec ou sans logements. Le numéro client (`customerId`) n'est
 * pas envoyé : il est attribué par le back-end.
 */
export type CreateOwnerRequest = {
  name: string
  email?: string
  phone?: string
  properties?: CreatePropertyRequest[]
}
