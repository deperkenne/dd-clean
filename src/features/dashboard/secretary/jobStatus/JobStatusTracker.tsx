import { BanIcon, CheckCircle2Icon, Loader2Icon, ShieldCheckIcon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { Panel } from '@/components/common/Panel'
import type { CleaningJob } from '@/features/properties/Property.types'
import { useLocalized } from '@/hooks/useLocale'
import { jobStatusLabels } from '../jobLabels.data'
import { jobStatusContent, statusSteps } from './JobStatusTracker.data'
import { StatusStepper, type StepView } from './StatusStepper'
import { useJobStatusActions } from './useJobStatusActions'

/** Fonctionnalité 5 — suivi du statut d'un job et actions de la secrétaire. */
export function JobStatusTracker({ job, className }: { job: CleaningJob; className?: string }) {
  const t = useLocalized(jobStatusContent)
  const statusLabels = useLocalized(jobStatusLabels)
  const actions = useJobStatusActions(job)
  const busy = actions.pendingStatus !== undefined

  // « Vérifié » est la dernière étape : toutes les étapes sont alors cochées.
  const isClosed = job.status === 'VERIFIED'
  const currentIndex = statusSteps.indexOf(job.status)
  const steps: StepView[] = statusSteps.map((status, index) => {
    const state = index < currentIndex || isClosed ? 'done' : index === currentIndex ? 'current' : 'upcoming'
    return { key: status, label: statusLabels[status], state, stateLabel: t.stepState[state] }
  })

  return (
    <Panel title={t.title} titleId="job-status-title" className={className}>
      <div className="px-4 py-5 md:px-5">
        {job.status === 'CANCELLED' ? (
          <p className="flex items-start gap-2 rounded-md border-l-[3px] border-muted-foreground bg-paper px-3 py-3 text-[15px]">
            <BanIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            {t.hints.CANCELLED}
          </p>
        ) : (
          <>
            <StatusStepper steps={steps} label={t.stepsLabel} />
            <p className="mt-5 text-[15px] text-muted-foreground">{t.hints[job.status]}</p>
          </>
        )}

        {(actions.canVerify || actions.canCancel) && (
          <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
            {!actions.confirmingCancel && (
              <div className="flex flex-col gap-3 sm:flex-row">
                {actions.canVerify && (
                  <ActionButton onClick={actions.verify} disabled={busy}>
                    {actions.pendingStatus === 'VERIFIED' ? (
                      <Loader2Icon aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
                    ) : (
                      <ShieldCheckIcon aria-hidden="true" />
                    )}
                    {actions.pendingStatus === 'VERIFIED' ? t.verifying : t.verify}
                  </ActionButton>
                )}
                {actions.canCancel && (
                  <ActionButton variant="destructive" onClick={actions.askCancel} disabled={busy}>
                    <BanIcon aria-hidden="true" />
                    {t.cancel}
                  </ActionButton>
                )}
              </div>
            )}

            {actions.confirmingCancel && (
              <div role="alertdialog" aria-labelledby="cancel-job-question" className="rounded-md border border-danger/40 bg-danger/5 p-3">
                <p id="cancel-job-question" className="text-[15px] text-ink">
                  {t.confirmCancel}
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <ActionButton variant="destructive" onClick={actions.cancel} disabled={busy} className="border-danger/40">
                    {actions.pendingStatus === 'CANCELLED' && (
                      <Loader2Icon aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
                    )}
                    {actions.pendingStatus === 'CANCELLED' ? t.cancelling : t.confirmCancelYes}
                  </ActionButton>
                  {/* Focus sur l'option sûre : le bouton cliqué vient de disparaître. */}
                  <ActionButton
                    variant="outline"
                    onClick={actions.keepJob}
                    disabled={busy}
                    autoFocus
                    className="border-ink bg-transparent"
                  >
                    {t.confirmCancelNo}
                  </ActionButton>
                </div>
              </div>
            )}
          </div>
        )}

        {actions.outcome === 'error' && (
          <p role="alert" className="mt-4 rounded-md border-l-[3px] border-danger bg-danger/5 px-3 py-2 text-[14px]">
            {t.error}
          </p>
        )}
        {(actions.outcome === 'verified' || actions.outcome === 'cancelled') && (
          <p role="status" className="mt-4 flex items-start gap-2 text-[14px] text-success">
            <CheckCircle2Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {actions.outcome === 'verified' ? t.verified : t.cancelled}
          </p>
        )}
      </div>
    </Panel>
  )
}
