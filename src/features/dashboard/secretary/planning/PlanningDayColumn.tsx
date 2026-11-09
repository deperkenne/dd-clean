import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type PlanningDayColumnProps = {
  weekday: string
  dayMonth: string
  isToday: boolean
  todayLabel: string
  /** Vide pour un jour sans job (le corps l'indique déjà). */
  countLabel: string
  emptyLabel: string
  isEmpty: boolean
  children: ReactNode
}

/**
 * Une journée du planning : en-tête (jour, date, nombre de jobs) puis ses jobs.
 * Ligne pleine largeur sur mobile/tablette, colonne de la grille dès 1024px.
 */
export function PlanningDayColumn({
  weekday,
  dayMonth,
  isToday,
  todayLabel,
  countLabel,
  emptyLabel,
  isEmpty,
  children,
}: PlanningDayColumnProps) {
  return (
    <section
      aria-label={`${weekday} ${dayMonth}`}
      className={cn(
        'flex min-w-0 flex-col rounded-xl border bg-paper',
        isToday ? 'border-forest ring-1 ring-forest' : 'border-line',
      )}
    >
      <header
        className={cn(
          'flex items-baseline justify-between gap-2 rounded-t-xl border-b px-3 py-3 lg:flex-col lg:items-start lg:gap-0.5',
          isToday ? 'border-forest bg-forest text-white' : 'border-line bg-white',
        )}
      >
        <h2 className="font-sans text-[15px] font-semibold first-letter:uppercase">
          {weekday} <span className="font-normal lg:block">{dayMonth}</span>
        </h2>
        {/*
          Ligne toujours présente en grille, pour aligner le haut des colonnes.
          En grille, le fond vert signale déjà « aujourd'hui » : le libellé n'y
          est lu que par les lecteurs d'écran, pour ne pas passer sur deux lignes.
        */}
        <p
          className={cn(
            'font-mono text-[11px] font-medium tracking-[0.08em] uppercase',
            isToday ? 'text-citron' : 'text-muted-foreground',
            !isToday && !countLabel && 'hidden lg:block',
          )}
        >
          {isToday && (
            <span className="lg:sr-only">
              {todayLabel}
              {countLabel && ' · '}
            </span>
          )}
          {countLabel || '\u00A0'}
        </p>
      </header>
      {isEmpty ? (
        <p className="px-3 py-4 text-[13px] text-muted-foreground">{emptyLabel}</p>
      ) : (
        <ul className="flex flex-col gap-2 p-2">{children}</ul>
      )}
    </section>
  )
}
