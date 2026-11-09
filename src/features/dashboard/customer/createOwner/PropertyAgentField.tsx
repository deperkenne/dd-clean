import { Link } from 'react-router-dom'
import { useFormContext } from 'react-hook-form'
import { SelectField } from '@/components/common/SelectField'
import type { CreateOwnerFormValues } from '@/features/properties/owner.types'
import { useLocalized } from '@/hooks/useLocale'
import { customerPaths } from '../customerPaths'
import { createOwnerContent } from './CreateOwnerPage.data'
import { useAgentOptions } from '../agents/useAgentOptions'
import { useFieldError } from './useFieldError'

/** Choix de l'agent de ménage d'un logement, parmi les agents actifs du client. */
export function PropertyAgentField({ propertyIndex, className }: { propertyIndex: number; className?: string }) {
  const t = useLocalized(createOwnerContent)
  const texts = t.properties.agent
  const name = `properties.${propertyIndex}.agentId` as const
  const { register } = useFormContext<CreateOwnerFormValues>()
  const errorCode = useFieldError(name)
  const { options, isLoading, isError } = useAgentOptions()
  const hasNoAgent = !isLoading && !isError && options.length === 0

  const hint = isError ? (
    texts.error
  ) : hasNoAgent ? (
    <>
      {texts.empty}{' '}
      <Link
        to={customerPaths.createAgent}
        className="inline-flex min-h-11 items-center font-medium text-forest underline underline-offset-4 hover:text-ink md:min-h-0"
      >
        {texts.create}
      </Link>
    </>
  ) : (
    texts.hint
  )

  return (
    <SelectField
      id={name}
      label={texts.label}
      optionalLabel={t.optional}
      hint={hint}
      error={errorCode && t.errors[errorCode]}
      disabled={isLoading}
      className={className}
      {...register(name)}
    >
      <option value="">{isLoading ? texts.loading : texts.none}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </SelectField>
  )
}
