import type { ComponentProps } from 'react'
import type { FieldPath, UseFormReturn } from 'react-hook-form'
import { TextField } from '@/components/common/TextField'
import { isAgentFieldErrorCode } from '@/features/agents/agent.schema'
import type { CreateAgentRequest } from '@/features/agents/agent.dto'
import type { CreateAgentFormValues } from '@/features/agents/agent.types'
import { useLocalized } from '@/hooks/useLocale'
import { createAgentContent } from './CreateAgentPage.data'

type AgentFieldProps = Omit<ComponentProps<'input'>, 'name' | 'id' | 'form'> & {
  form: UseFormReturn<CreateAgentFormValues, unknown, CreateAgentRequest>
  name: FieldPath<CreateAgentFormValues>
  label: string
  hint?: string
  optional?: boolean
}

/** Champ du formulaire agent, relié à React Hook Form et à ses messages traduits. */
export function AgentField({ form, name, label, hint, optional, ...inputProps }: AgentFieldProps) {
  const t = useLocalized(createAgentContent)
  const code = form.formState.errors[name]?.message

  return (
    <TextField
      id={`agent-${name}`}
      label={label}
      hint={hint}
      optionalLabel={optional ? t.optional : undefined}
      error={isAgentFieldErrorCode(code) ? t.errors[code] : undefined}
      {...inputProps}
      {...form.register(name)}
    />
  )
}
