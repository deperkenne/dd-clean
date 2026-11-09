import type { ComponentProps } from 'react'
import { useFormContext, type FieldPath } from 'react-hook-form'
import { TextField } from '@/components/common/TextField'
import type { CreateOwnerFormValues } from '@/features/properties/owner.types'
import { useLocalized } from '@/hooks/useLocale'
import { createOwnerContent } from './CreateOwnerPage.data'
import { useFieldError } from './useFieldError'

type OwnerFieldProps = Omit<ComponentProps<'input'>, 'name' | 'id'> & {
  name: FieldPath<CreateOwnerFormValues>
  label: string
  hint?: string
  optional?: boolean
}

/** Champ du formulaire propriétaire, relié à React Hook Form et à ses messages traduits. */
export function OwnerField({ name, label, hint, optional, ...inputProps }: OwnerFieldProps) {
  const t = useLocalized(createOwnerContent)
  const { register } = useFormContext<CreateOwnerFormValues>()
  const errorCode = useFieldError(name)

  return (
    <TextField
      id={name}
      label={label}
      hint={hint}
      optionalLabel={optional ? t.optional : undefined}
      error={errorCode && t.errors[errorCode]}
      {...inputProps}
      {...register(name)}
    />
  )
}
