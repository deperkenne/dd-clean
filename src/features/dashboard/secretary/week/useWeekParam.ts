import { useLocation, useSearchParams } from 'react-router-dom'
import { addDays, parseIsoDay, startOfWeek, todayIsoDay, toIsoDay } from '@/lib/date'

/** « 2026-10-12 » valide (et pas « 2026-02-31 »), sinon on ignore le paramètre. */
function isValidIsoDay(value: string | null): value is string {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value) && toIsoDay(parseIsoDay(value)) === value)
}

/**
 * Semaine affichée (lundi → dimanche), partagée par le planning et la page agents.
 *
 * Elle vit dans l'adresse (`?week=AAAA-MM-JJ`), pas dans un état local : un
 * lien ou un favori rouvre la même semaine, et les boutons Précédent /
 * Suivant du navigateur naviguent entre les semaines.
 */
export function useWeekParam() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const today = todayIsoDay()
  const requested = searchParams.get('week')
  const weekStart = startOfWeek(isValidIsoDay(requested) ? requested : today)

  return {
    today,
    weekStart,
    weekEnd: addDays(weekStart, 6),
    isCurrentWeek: weekStart === startOfWeek(today),
    previousWeek: () => setSearchParams({ week: addDays(weekStart, -7) }),
    nextWeek: () => setSearchParams({ week: addDays(weekStart, 7) }),
    currentWeek: () => setSearchParams({}),
    /** Adresse de la page, pour que le détail d'un job sache où revenir. */
    backTo: location.pathname + location.search,
  }
}
