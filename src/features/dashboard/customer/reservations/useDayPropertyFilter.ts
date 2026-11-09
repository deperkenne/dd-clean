import { useMemo, useState } from 'react'
import type { DepartureDay, PropertyFilterOption } from './myReservations.types'

/**
 * Filtre « logement » d'un jour de départ.
 *
 * Les choix sont les logements qui ont un départ ce jour-là, avec leur
 * nombre de départs. Le filtre ne relance aucune requête : il trie les
 * réservations déjà chargées. Chaque jour garde son propre choix.
 */
export function useDayPropertyFilter(day: DepartureDay) {
  const [selectedId, setSelectedId] = useState<string>()

  const options = useMemo<PropertyFilterOption[]>(() => {
    const byId = new Map<string, PropertyFilterOption>()
    for (const { propertyId, propertyName } of day.reservations) {
      const option = byId.get(propertyId) ?? { propertyId, propertyName, count: 0 }
      option.count += 1
      byId.set(propertyId, option)
    }
    return [...byId.values()].sort((a, b) => a.propertyName.localeCompare(b.propertyName))
  }, [day.reservations])

  // Un logement disparu du jour (réservation annulée) ne reste pas sélectionné.
  const activeId = options.some((option) => option.propertyId === selectedId) ? selectedId : undefined

  return {
    options,
    /** Le filtre est affiché dès qu'un jour a au moins un logement. */
    isAvailable: options.length > 0,
    selectedId: activeId,
    select: (propertyId?: string) => setSelectedId(propertyId),
    reservations: activeId
      ? day.reservations.filter((reservation) => reservation.propertyId === activeId)
      : day.reservations,
  }
}
