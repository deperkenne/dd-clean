import { PlusIcon } from 'lucide-react'
import { FormProvider } from 'react-hook-form'
import { ActionButton } from '@/components/common/ActionButton'
import { FormSection } from '@/components/common/FormSection'
import { OWNER_LIMITS } from '@/features/properties/owner.schema'
import { useLocalized } from '@/hooks/useLocale'
import { GoodToKnow } from '../home/GoodToKnow'
import type { CreateOwnerController } from './createOwner.types'
import { createOwnerContent } from './CreateOwnerPage.data'
import { DraftSummary } from './DraftSummary'
import { FormDocumentHeader } from './FormDocumentHeader'
import { OwnerField } from './OwnerField'
import { PropertyFieldset } from './PropertyFieldset'
import { SubmitBar } from './SubmitBar'

/** La fiche propriétaire : en-tête D&D Clean, sections numérotées, barre d'envoi, récapitulatif. */
export function CreateOwnerForm({ owner }: { owner: CreateOwnerController }) {
  const t = useLocalized(createOwnerContent)
  const { form, properties, submit, isPending, failure } = owner

  return (
    <FormProvider {...form}>
      <form onSubmit={submit} noValidate aria-labelledby="create-owner-title" className="mt-4">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 overflow-clip rounded-2xl border border-line bg-white motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
            <FormDocumentHeader />

            <FormSection index={1} title={t.owner.title} titleId="owner-section-title" description={t.owner.description}>
              <fieldset disabled={isPending} className="grid min-w-0 gap-4 sm:grid-cols-2">
                <legend className="sr-only">{t.owner.title}</legend>
                <OwnerField
                  name="name"
                  label={t.owner.name}
                  maxLength={OWNER_LIMITS.ownerName}
                  autoComplete="name"
                  className="sm:col-span-2"
                />
                <OwnerField
                  name="email"
                  label={t.owner.email}
                  optional
                  type="email"
                  maxLength={OWNER_LIMITS.email}
                  autoComplete="email"
                />
                <OwnerField
                  name="phone"
                  label={t.owner.phone}
                  optional
                  type="tel"
                  maxLength={OWNER_LIMITS.phone}
                  autoComplete="tel"
                />
              </fieldset>
            </FormSection>

            <FormSection
              index={2}
              title={t.properties.title}
              titleId="properties-section-title"
              description={t.properties.description}
              meta={t.properties.count(properties.fields.length)}
            >
              <fieldset disabled={isPending} className="flex min-w-0 flex-col gap-4">
                <legend className="sr-only">{t.properties.title}</legend>
                {properties.fields.length === 0 && (
                  <p className="rounded-xl border border-dashed border-line px-4 py-6 text-center text-[14px] text-muted-foreground">
                    {t.properties.empty}
                  </p>
                )}
                {properties.fields.map((field, index) => (
                  <PropertyFieldset key={field.id} index={index} onRemove={() => properties.remove(index)} />
                ))}
                <ActionButton type="button" variant="outline" onClick={properties.add} className="w-full border-ink sm:w-auto sm:self-start">
                  <PlusIcon aria-hidden="true" />
                  {t.properties.add}
                </ActionButton>
              </fieldset>
            </FormSection>

            {failure && (
              <p
                role="alert"
                className="mx-4 mb-6 rounded-md border-l-[3px] border-danger bg-danger/5 px-4 py-3 text-[15px] text-ink md:mx-8"
              >
                {t.failures[failure]}
              </p>
            )}

            <SubmitBar isPending={isPending} />
          </div>

          <aside className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-24">
            <DraftSummary />
            <GoodToKnow />
          </aside>
        </div>
      </form>
    </FormProvider>
  )
}
