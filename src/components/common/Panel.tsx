import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type PanelProps = {
  title: string
  titleId: string
  /** Texte court à droite du titre (compteur, période…). */
  meta?: ReactNode
  className?: string
  children: ReactNode
}

/** Bloc de contenu du back-office : carte blanche avec en-tête titré. */
export function Panel({ title, titleId, meta, className, children }: PanelProps) {
  return (
    <section aria-labelledby={titleId} className={cn('min-w-0 rounded-xl border border-line bg-white', className)}>
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line px-4 py-4 md:px-5">
        <h2 id={titleId} className="text-xl leading-tight font-semibold">
          {title}
        </h2>
        {meta && <p className="font-mono text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">{meta}</p>}
      </header>
      {children}
    </section>
  )
}
