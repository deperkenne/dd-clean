import type { Localized } from '@/lib/i18n'

type AssignAgentContent = {
  title: string
  label: string
  hint: string
  submit: string
  saving: string
  assigned: string
  removed: string
  error: string
  invalid: string
  locked: string
}

export const assignAgentContent: Localized<AssignAgentContent> = {
  fr: {
    title: "Assigner l'agent",
    label: 'Agent pour ce job',
    hint: 'La charge indiquée concerne le même jour.',
    submit: 'Enregistrer',
    saving: 'Enregistrement…',
    assigned: 'Agent assigné. Le job est maintenant « Assigné ».',
    removed: 'Agent retiré. Le job est de nouveau « Planifié ».',
    error: "L'assignation n'a pas pu être enregistrée. Réessayez.",
    invalid: 'Choisissez un agent dans la liste.',
    locked: "Le nettoyage a déjà commencé ou est clos : l'agent ne peut plus être changé.",
  },
  de: {
    title: 'Reinigungskraft zuweisen',
    label: 'Reinigungskraft für diesen Einsatz',
    hint: 'Die angezeigte Auslastung gilt für denselben Tag.',
    submit: 'Speichern',
    saving: 'Wird gespeichert…',
    assigned: 'Reinigungskraft zugewiesen. Der Einsatz ist jetzt „Zugewiesen“.',
    removed: 'Zuweisung entfernt. Der Einsatz ist wieder „Geplant“.',
    error: 'Die Zuweisung konnte nicht gespeichert werden. Bitte erneut versuchen.',
    invalid: 'Bitte eine Reinigungskraft aus der Liste wählen.',
    locked: 'Die Reinigung hat bereits begonnen oder ist abgeschlossen: keine Änderung mehr möglich.',
  },
  en: {
    title: 'Assign agent',
    label: 'Agent for this job',
    hint: 'The workload shown is for the same day.',
    submit: 'Save',
    saving: 'Saving…',
    assigned: 'Agent assigned. The job is now “Assigned”.',
    removed: 'Agent removed. The job is “Planned” again.',
    error: 'The assignment could not be saved. Please try again.',
    invalid: 'Please choose an agent from the list.',
    locked: 'Cleaning has already started or is closed: the agent can no longer be changed.',
  },
}
