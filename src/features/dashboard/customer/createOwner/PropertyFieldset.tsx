import { Trash2Icon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { OWNER_LIMITS } from '@/features/properties/owner.schema'
import { useLocalized } from '@/hooks/useLocale'
import { createOwnerContent } from './CreateOwnerPage.data'
import { OwnerField } from './OwnerField'
import { PropertyAgentField } from './PropertyAgentField'
import { RoomFields } from './RoomFields'

type PropertyFieldsetProps = {
  index: number
  onRemove: () => void
}

/** Un logement du formulaire : nom, nom Smoobu, adresse, agent attribué, puis ses chambres. */
export function PropertyFieldset({ index, onRemove }: PropertyFieldsetProps) {
  const t = useLocalized(createOwnerContent)
  const position = index + 1
  const prefix = `properties.${index}` as const

  return (
    <fieldset className="min-w-0 rounded-xl border border-line bg-paper motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
      <legend className="sr-only">{t.properties.legend(position)}</legend>
      <div className="flex items-center justify-between gap-3 border-b border-line py-1 pr-1 pl-4 md:pl-5">
        <span aria-hidden="true" className="font-mono text-[12px] font-medium tracking-[0.12em] text-forest uppercase">
          {t.properties.legend(position)}
        </span>
        <ActionButton
          type="button"
          variant="ghost"
          size="icon"
          aria-label={t.properties.remove(position)}
          title={t.properties.remove(position)}
          onClick={onRemove}
          className="text-muted-foreground hover:text-danger"
        >
          <Trash2Icon aria-hidden="true" />
        </ActionButton>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2 md:p-5">
        <OwnerField name={`${prefix}.name`} label={t.properties.name} maxLength={OWNER_LIMITS.propertyName} />
        <OwnerField
          name={`${prefix}.emailLabel`}
          label={t.properties.emailLabel}
          hint={t.properties.emailLabelHint}
          maxLength={OWNER_LIMITS.emailLabel}
        />
        <OwnerField
          name={`${prefix}.street`}
          label={t.properties.street}
          optional
          maxLength={OWNER_LIMITS.street}
          autoComplete="street-address"
          className="sm:col-span-2"
        />
        <OwnerField
          name={`${prefix}.postalCode`}
          label={t.properties.postalCode}
          optional
          maxLength={OWNER_LIMITS.postalCode}
          inputMode="numeric"
          autoComplete="postal-code"
        />
        <OwnerField
          name={`${prefix}.city`}
          label={t.properties.city}
          optional
          maxLength={OWNER_LIMITS.city}
          autoComplete="address-level2"
        />
        <PropertyAgentField propertyIndex={index} className="sm:col-span-2" />
      </div>

      <RoomFields propertyIndex={index} />
    </fieldset>
  )
}
