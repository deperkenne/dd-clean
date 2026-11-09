import type { ComponentProps, ReactNode } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type SelectFieldProps = ComponentProps<'select'> & {
  id: string
  label: string
  /** Mention ajoutée après le libellé, ex. « (facultatif) ». */
  optionalLabel?: string
  /** Aide sous le champ : texte ou contenu (ex. un lien). */
  hint?: ReactNode
  /** Message d'erreur déjà traduit. */
  error?: string
}

/** Liste déroulante du site, même allure que `TextField` : libellé, aide, erreur, zone tactile ≥ 44px. */
export function SelectField({ id, label, optionalLabel, hint, error, className, children, ...selectProps }: SelectFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={cn('min-w-0', className)}>
      <label htmlFor={id} className="block text-[14px] font-medium text-ink">
        {label}
        {optionalLabel && <span className="ml-1 font-normal text-muted-foreground">{optionalLabel}</span>}
      </label>
      <div className="relative mt-1.5">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          className="h-11 w-full min-w-0 appearance-none truncate rounded-md border border-input bg-white pr-10 pl-3 text-base text-ink transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-[15px]"
          {...selectProps}
        >
          {children}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
      {hint && (
        <p id={hintId} className="mt-1.5 text-[13px] text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-[13px] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
