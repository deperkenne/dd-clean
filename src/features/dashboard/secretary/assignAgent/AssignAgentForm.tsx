import { CheckCircle2Icon, Loader2Icon, LockIcon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { NativeSelect } from '@/components/ui/native-select'
import type { CleaningJob } from '@/features/properties/Property.types'
import { useLocalized } from '@/hooks/useLocale'
import { AgentOptions } from '../agentOptions/AgentOptions'
import { assignAgentContent } from './AssignAgentForm.data'
import { useAssignAgent } from './useAssignAgent'

/** Fonctionnalité 4 — choix de l'agent d'un job, dans le bloc « Intervention » du détail. */
export function AssignAgentForm({ job }: { job: CleaningJob }) {
  const t = useLocalized(assignAgentContent)
  const { canAssign, options, form, submit, isPending, outcome } = useAssignAgent(job)
  const fieldError = form.formState.errors.agentId

  if (!canAssign) {
    return (
      <p className="flex items-start gap-2 border-t border-line px-4 py-4 text-[14px] text-muted-foreground md:px-5">
        <LockIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        {t.locked}
      </p>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="border-t border-line px-4 py-4 md:px-5">
      <h3 className="font-sans text-[15px] font-semibold">{t.title}</h3>
      <label htmlFor="assign-agent" className="mt-3 block text-[13px] text-muted-foreground">
        {t.label}
      </label>
      <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:items-start">
        <NativeSelect
          id="assign-agent"
          aria-describedby="assign-agent-hint"
          aria-invalid={fieldError ? true : undefined}
          disabled={isPending}
          className="w-full min-w-0 flex-1 [&_select]:h-11 [&_select]:bg-white [&_select]:text-[15px]"
          {...form.register('agentId')}
        >
          <AgentOptions options={options} />
        </NativeSelect>
        <ActionButton type="submit" disabled={isPending || !form.formState.isDirty} className="shrink-0">
          {isPending && <Loader2Icon aria-hidden="true" className="animate-spin motion-reduce:animate-none" />}
          {isPending ? t.saving : t.submit}
        </ActionButton>
      </div>
      <p id="assign-agent-hint" className="mt-2 text-[13px] text-muted-foreground">
        {t.hint}
      </p>

      {fieldError && (
        <p role="alert" className="mt-2 text-[14px] text-danger">
          {t.invalid}
        </p>
      )}
      {outcome === 'error' && (
        <p role="alert" className="mt-3 rounded-md border-l-[3px] border-danger bg-danger/5 px-3 py-2 text-[14px]">
          {t.error}
        </p>
      )}
      {(outcome === 'assigned' || outcome === 'removed') && (
        <p role="status" className="mt-3 flex items-start gap-2 text-[14px] text-success">
          <CheckCircle2Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {outcome === 'assigned' ? t.assigned : t.removed}
        </p>
      )}
    </form>
  )
}
