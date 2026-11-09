import { PlusIcon, Trash2Icon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { OWNER_LIMITS } from '@/features/properties/owner.schema'
import { useLocalized } from '@/hooks/useLocale'
import { createOwnerContent } from './CreateOwnerPage.data'
import { OwnerField } from './OwnerField'
import { useRoomFields } from './useRoomFields'

/** Chambres d'un logement : numéro et prix du ménage, ajout et retrait. */
export function RoomFields({ propertyIndex }: { propertyIndex: number }) {
  const t = useLocalized(createOwnerContent)
  const rooms = useRoomFields(propertyIndex)

  return (
    <div className="border-t border-line px-4 py-4 md:px-5 md:py-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-sans text-[15px] font-semibold">{t.rooms.title}</h3>
        <span className="font-mono text-[11px] font-medium tracking-[0.1em] text-muted-foreground uppercase">
          {t.rooms.count(rooms.fields.length)}
        </span>
      </div>

      {rooms.fields.length === 0 ? (
        <p className="mt-2 text-[14px] text-muted-foreground">{t.rooms.empty}</p>
      ) : (
        <ol className="mt-3 flex flex-col gap-3">
          {rooms.fields.map((field, roomIndex) => (
            <li
              key={field.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 rounded-lg border border-line bg-white p-3 sm:gap-3"
            >
              <div className="grid min-w-0 gap-3 sm:grid-cols-2">
                <OwnerField
                  name={`properties.${propertyIndex}.rooms.${roomIndex}.number`}
                  label={t.rooms.number}
                  maxLength={OWNER_LIMITS.roomNumber}
                  autoComplete="off"
                />
                <OwnerField
                  name={`properties.${propertyIndex}.rooms.${roomIndex}.price`}
                  label={t.rooms.price}
                  hint={t.rooms.priceHint}
                  inputMode="decimal"
                  autoComplete="off"
                />
              </div>
              <ActionButton
                type="button"
                variant="ghost"
                size="icon"
                aria-label={t.rooms.remove(roomIndex + 1)}
                title={t.rooms.remove(roomIndex + 1)}
                onClick={() => rooms.remove(roomIndex)}
                className="mt-6 text-muted-foreground hover:text-danger"
              >
                <Trash2Icon aria-hidden="true" />
              </ActionButton>
            </li>
          ))}
        </ol>
      )}

      <ActionButton type="button" variant="outline" onClick={rooms.add} className="mt-3 w-full bg-white sm:w-auto">
        <PlusIcon aria-hidden="true" />
        {t.rooms.add}
      </ActionButton>
    </div>
  )
}
