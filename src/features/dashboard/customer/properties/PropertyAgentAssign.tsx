import { ArrowLeftRightIcon, Loader2Icon, UserPlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ActionButton } from '@/components/common/ActionButton'
import { SelectField } from '@/components/common/SelectField'
import { isAssignAgentErrorCode } from '@/features/properties/propertyAgent.schema'
import { useLocalized } from '@/hooks/useLocale'
import { customerPaths } from '../customerPaths'
import type { PropertyView } from './myProperties.types'
import { propertyAgentAssignContent } from './PropertyAgentAssign.data'
import { useAssignPropertyAgent } from './useAssignPropertyAgent'

/** Bouton « Attribuer un agent » / « Changer », qui déplie un petit formulaire de choix. */
export function PropertyAgentAssign({ property }: { property: Pick<PropertyView, 'id' | 'name' | 'agentId'> }) {
  const t = useLocalized(propertyAgentAssignContent)
  const assign = useAssignPropertyAgent(property)
  const { mode, form } = assign
  const fieldId = `assign-agent-${property.id}`
  const code = form.formState.errors.agentId?.message
  const Icon = mode === 'move' ? ArrowLeftRightIcon : UserPlusIcon

  if (!assign.isOpen) {
    return (
      <ActionButton
        type="button"
        variant="outline"
        onClick={assign.open}
        aria-label={t.openFor[mode](property.name)}
        className="mt-2 h-11 w-full border-line bg-white px-3 text-[13px] text-forest hover:border-forest hover:bg-mint/40 hover:text-forest sm:w-auto xl:h-9"
      >
        <Icon aria-hidden="true" className="size-4" />
        {t.open[mode]}
      </ActionButton>
    )
  }

  const hasNoChoice = !assign.isLoadingAgents && !assign.agentsFailed && assign.choices.length === 0
  const hint = assign.agentsFailed ? (
    t.loadFailed
  ) : hasNoChoice ? (
    <>
      {t.noChoice[mode]}{' '}
      <Link
        to={customerPaths.createAgent}
        className="inline-flex min-h-11 items-center font-medium text-forest underline underline-offset-4 hover:text-ink xl:min-h-0"
      >
        {t.createAgent}
      </Link>
    </>
  ) : undefined

  return (
    <form
      onSubmit={assign.submit}
      noValidate
      className="mt-2 rounded-md border border-forest/30 bg-white p-3 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200"
    >
      <fieldset disabled={assign.isPending} className="min-w-0">
        <SelectField
          id={fieldId}
          label={t.label[mode]}
          hint={hint}
          error={isAssignAgentErrorCode(code) ? t.errors[code] : undefined}
          disabled={assign.isLoadingAgents || hasNoChoice}
          autoFocus
          {...form.register('agentId')}
        >
          <option value="">{assign.isLoadingAgents ? t.loading : t.placeholder}</option>
          {assign.choices.map((choice) => (
            <option key={choice.id} value={choice.id}>
              {choice.label}
            </option>
          ))}
        </SelectField>

        {assign.failure && (
          <p role="alert" className="mt-3 rounded-md border-l-[3px] border-danger bg-danger/5 px-3 py-2 text-[13px] text-ink">
            {t.failures[assign.failure]}
            {assign.serverReason && <span className="mt-1 block text-muted-foreground">{assign.serverReason}</span>}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          <ActionButton
            type="submit"
            disabled={hasNoChoice || assign.agentsFailed}
            className="h-11 flex-1 bg-ink px-3 text-[13px] text-paper hover:bg-ink/85 sm:flex-none xl:h-9"
          >
            {assign.isPending && <Loader2Icon aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />}
            {assign.isPending ? t.pending : t.confirm[mode]}
          </ActionButton>
          <ActionButton
            type="button"
            variant="ghost"
            onClick={assign.close}
            className="h-11 flex-1 px-3 text-[13px] sm:flex-none xl:h-9"
          >
            {t.cancel}
          </ActionButton>
        </div>
      </fieldset>
    </form>
  )
}
