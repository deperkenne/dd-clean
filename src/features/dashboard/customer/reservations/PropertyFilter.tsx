import { FilterChip } from './FilterChip'
import type { PropertyFilterOption } from './myReservations.types'

type PropertyFilterProps = {
  label: string
  allLabel: string
  total: number
  options: PropertyFilterOption[]
  selectedId?: string
  onSelect: (propertyId?: string) => void
}

/** Puces de filtre par logement : « Tous les logements », puis un choix par logement du jour. */
export function PropertyFilter({ label, allLabel, total, options, selectedId, onSelect }: PropertyFilterProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2 bg-paper/60 px-4 pb-4 md:px-6">
      <FilterChip label={allLabel} count={total} active={!selectedId} onClick={() => onSelect(undefined)} />
      {options.map((option) => (
        <FilterChip
          key={option.propertyId}
          label={option.propertyName}
          count={option.count}
          active={option.propertyId === selectedId}
          onClick={() => onSelect(option.propertyId)}
        />
      ))}
    </div>
  )
}
