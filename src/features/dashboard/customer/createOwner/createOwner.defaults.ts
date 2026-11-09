import type { CreateOwnerFormValues } from '@/features/properties/owner.types'

type PropertyValues = CreateOwnerFormValues['properties'][number]
type RoomValues = PropertyValues['rooms'][number]

/** Valeurs de départ : un propriétaire sans logement, à compléter au besoin. */
export const emptyOwner = (): CreateOwnerFormValues => ({
  name: '',
  email: '',
  phone: '',
  properties: [],
})

export const emptyProperty = (): PropertyValues => ({
  name: '',
  emailLabel: '',
  street: '',
  postalCode: '',
  city: '',
  rooms: [],
  agentId: '',
})

export const emptyRoom = (): RoomValues => ({ number: '', price: '' })
