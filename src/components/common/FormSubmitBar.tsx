import { CheckIcon, Loader2Icon, ShieldCheckIcon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'

type FormSubmitBarProps = {
  isPending: boolean
  secureNote: string
  submitLabel: string
  submittingLabel: string
}

/** Barre d'envoi collée en bas d'un formulaire : mention de sécurité et bouton final. */
export function FormSubmitBar({ isPending, secureNote, submitLabel, submittingLabel }: FormSubmitBarProps) {
  return (
    <div className="sticky bottom-0 z-10 flex flex-col gap-3 bg-ink px-4 py-4 text-paper sm:flex-row sm:items-center sm:justify-between md:px-8">
      <p className="flex items-start gap-2 text-[13px] text-paper/75">
        <ShieldCheckIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-citron" />
        {secureNote}
      </p>
      <ActionButton
        type="submit"
        size="lg"
        disabled={isPending}
        aria-busy={isPending}
        className="w-full shrink-0 bg-citron text-ink hover:bg-citron/85 focus-visible:ring-citron/50 sm:w-auto"
      >
        {isPending ? (
          <Loader2Icon aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
        ) : (
          <CheckIcon aria-hidden="true" />
        )}
        {isPending ? submittingLabel : submitLabel}
      </ActionButton>
    </div>
  )
}
