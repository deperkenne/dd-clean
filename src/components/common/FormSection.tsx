import type { ReactNode } from 'react'

type FormSectionProps = {
  /** Numéro affiché en mono (1 → « 01 »). */
  index: number
  title: string
  titleId: string
  description?: string
  /** Texte court sous le titre (compteur…). */
  meta?: ReactNode
  children: ReactNode
}

/** Section numérotée d'un formulaire long : en-tête à gauche sur grand écran, champs à droite. */
export function FormSection({ index, title, titleId, description, meta, children }: FormSectionProps) {
  return (
    <section aria-labelledby={titleId} className="border-t border-line px-4 py-8 md:px-8 md:py-10">
      <div className="grid gap-6 xl:grid-cols-[200px_minmax(0,1fr)] xl:gap-10">
        <div className="min-w-0">
          <span className="font-mono text-[13px] font-medium text-forest">{String(index).padStart(2, '0')}</span>
          <h2 id={titleId} className="mt-2 text-2xl leading-tight font-semibold tracking-[-0.01em]">
            {title}
          </h2>
          {description && <p className="mt-2 text-[14px] text-muted-foreground">{description}</p>}
          {meta && (
            <p className="mt-3 font-mono text-[11px] font-medium tracking-[0.1em] text-muted-foreground uppercase">
              {meta}
            </p>
          )}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}
