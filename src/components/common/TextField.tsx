import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type TextFieldProps = ComponentProps<'input'> & {
  id: string
  label: string
  /** Mention ajoutée après le libellé, ex. « (facultatif) ». */
  optionalLabel?: string
  hint?: string
  /** Message d'erreur déjà traduit. */
  error?: string
}

/** Champ texte du site : libellé, aide, erreur liée au champ, zone tactile ≥ 44px. */
export function TextField({ id, label, optionalLabel, hint, error, className, ...inputProps }: TextFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={cn('min-w-0', className)}>
      <label htmlFor={id} className="block text-[14px] font-medium text-ink">
        {label}
        {optionalLabel && <span className="ml-1 font-normal text-muted-foreground">{optionalLabel}</span>}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className="mt-1.5 h-11 w-full min-w-0 rounded-md border border-input bg-white px-3 text-base text-ink transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-[15px]"
        {...inputProps}
      />
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
