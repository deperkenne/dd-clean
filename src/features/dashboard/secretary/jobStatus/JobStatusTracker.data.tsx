import type { CleaningJobStatus } from '@/features/properties/Property.types'
import type { Localized } from '@/lib/i18n'

/** Étapes du cycle de vie normal d'un job, dans l'ordre. */
export const statusSteps: CleaningJobStatus[] = ['PLANNED', 'ASSIGNED', 'IN_PROGRESS', 'DONE', 'VERIFIED']

type JobStatusContent = {
  title: string
  stepsLabel: string
  stepState: { done: string; current: string; upcoming: string }
  hints: Record<CleaningJobStatus, string>
  verify: string
  verifying: string
  cancel: string
  confirmCancel: string
  confirmCancelYes: string
  confirmCancelNo: string
  cancelling: string
  verified: string
  cancelled: string
  error: string
}

export const jobStatusContent: Localized<JobStatusContent> = {
  fr: {
    title: 'Suivi du statut',
    stepsLabel: 'Étapes du job',
    stepState: { done: 'étape passée', current: 'étape actuelle', upcoming: 'étape à venir' },
    hints: {
      PLANNED: "En attente d'un agent : assignez-en un dans le bloc « Intervention ».",
      ASSIGNED: "L'agent démarrera le nettoyage le jour prévu.",
      IN_PROGRESS: "Nettoyage en cours : l'agent le marquera terminé sur place.",
      DONE: "Nettoyage terminé par l'agent : il reste à le vérifier.",
      VERIFIED: 'Nettoyage vérifié : le job est clos.',
      CANCELLED: "Ce job a été annulé et n'apparaît plus dans le planning.",
    },
    verify: 'Valider le nettoyage',
    verifying: 'Validation…',
    cancel: 'Annuler le job',
    confirmCancel: "Annuler ce job ? L'agent sera libéré et le job retiré du planning.",
    confirmCancelYes: 'Oui, annuler le job',
    confirmCancelNo: 'Non, le garder',
    cancelling: 'Annulation…',
    verified: 'Nettoyage validé : le job est maintenant « Vérifié ».',
    cancelled: 'Job annulé.',
    error: "Le changement de statut n'a pas pu être enregistré. Réessayez.",
  },
  de: {
    title: 'Statusverlauf',
    stepsLabel: 'Schritte des Einsatzes',
    stepState: { done: 'abgeschlossen', current: 'aktueller Schritt', upcoming: 'ausstehend' },
    hints: {
      PLANNED: 'Wartet auf eine Reinigungskraft: im Block „Einsatz“ zuweisen.',
      ASSIGNED: 'Die Reinigungskraft beginnt am geplanten Tag.',
      IN_PROGRESS: 'Reinigung läuft: die Reinigungskraft meldet sie vor Ort als erledigt.',
      DONE: 'Von der Reinigungskraft erledigt: Kontrolle ausstehend.',
      VERIFIED: 'Reinigung geprüft: Einsatz abgeschlossen.',
      CANCELLED: 'Dieser Einsatz wurde storniert und erscheint nicht mehr im Wochenplan.',
    },
    verify: 'Reinigung bestätigen',
    verifying: 'Wird bestätigt…',
    cancel: 'Einsatz stornieren',
    confirmCancel: 'Diesen Einsatz stornieren? Die Reinigungskraft wird frei und der Einsatz aus dem Wochenplan entfernt.',
    confirmCancelYes: 'Ja, stornieren',
    confirmCancelNo: 'Nein, behalten',
    cancelling: 'Wird storniert…',
    verified: 'Reinigung bestätigt: der Einsatz ist jetzt „Geprüft“.',
    cancelled: 'Einsatz storniert.',
    error: 'Die Statusänderung konnte nicht gespeichert werden. Bitte erneut versuchen.',
  },
  en: {
    title: 'Status tracking',
    stepsLabel: 'Job steps',
    stepState: { done: 'completed step', current: 'current step', upcoming: 'upcoming step' },
    hints: {
      PLANNED: 'Waiting for an agent: assign one in the “Visit” block.',
      ASSIGNED: 'The agent will start cleaning on the scheduled day.',
      IN_PROGRESS: 'Cleaning in progress: the agent will mark it done on site.',
      DONE: 'Done by the agent: it still needs to be verified.',
      VERIFIED: 'Cleaning verified: the job is closed.',
      CANCELLED: 'This job was cancelled and no longer appears in the schedule.',
    },
    verify: 'Approve cleaning',
    verifying: 'Approving…',
    cancel: 'Cancel job',
    confirmCancel: 'Cancel this job? The agent will be released and the job removed from the schedule.',
    confirmCancelYes: 'Yes, cancel the job',
    confirmCancelNo: 'No, keep it',
    cancelling: 'Cancelling…',
    verified: 'Cleaning approved: the job is now “Verified”.',
    cancelled: 'Job cancelled.',
    error: 'The status change could not be saved. Please try again.',
  },
}
