import type { AssignAgentErrorCode } from '@/features/properties/propertyAgent.types'
import type { Localized } from '@/lib/i18n'
import type { AssignAgentFailure, AssignMode } from './assignPropertyAgent.types'

type PropertyAgentAssignContent = {
  open: Record<AssignMode, string>
  openFor: Record<AssignMode, (property: string) => string>
  label: Record<AssignMode, string>
  placeholder: string
  loading: string
  noChoice: Record<AssignMode, string>
  loadFailed: string
  createAgent: string
  confirm: Record<AssignMode, string>
  pending: string
  cancel: string
  errors: Record<AssignAgentErrorCode, string>
  failures: Record<AssignAgentFailure, string>
}

export const propertyAgentAssignContent: Localized<PropertyAgentAssignContent> = {
  fr: {
    open: { assign: 'Attribuer un agent', move: 'Déplacer vers un autre agent' },
    openFor: {
      assign: (property) => `Attribuer un agent à ${property}`,
      move: (property) => `Déplacer ${property} vers un autre agent`,
    },
    label: { assign: 'Agent à attribuer', move: 'Déplacer vers' },
    placeholder: 'Choisir un agent…',
    loading: 'Chargement…',
    noChoice: {
      assign: 'Aucun agent actif à proposer.',
      move: 'Aucun autre agent actif à proposer.',
    },
    loadFailed: 'Vos agents n’ont pas pu être chargés.',
    createAgent: 'Créer un agent',
    confirm: { assign: 'Attribuer', move: 'Déplacer' },
    pending: 'Enregistrement…',
    cancel: 'Annuler',
    errors: { required: 'Choisissez un agent.', agent: 'Choisissez un agent dans la liste.' },
    failures: {
      invalid: 'Cet agent ne peut pas être attribué à ce logement.',
      forbidden: 'Votre compte n’a pas le droit de modifier ce logement.',
      notFound: 'Logement ou agent introuvable. Rechargez la page.',
      conflict: 'Le logement a changé entre-temps. Rechargez la page.',
      unknown: 'L’enregistrement a échoué. Réessayez dans un instant.',
    },
  },
  de: {
    open: { assign: 'Reinigungskraft zuordnen', move: 'Zu anderer Reinigungskraft verschieben' },
    openFor: {
      assign: (property) => `${property} eine Reinigungskraft zuordnen`,
      move: (property) => `${property} zu einer anderen Reinigungskraft verschieben`,
    },
    label: { assign: 'Reinigungskraft zuordnen', move: 'Verschieben zu' },
    placeholder: 'Reinigungskraft wählen…',
    loading: 'Wird geladen…',
    noChoice: {
      assign: 'Keine aktive Reinigungskraft verfügbar.',
      move: 'Keine andere aktive Reinigungskraft verfügbar.',
    },
    loadFailed: 'Ihre Reinigungskräfte konnten nicht geladen werden.',
    createAgent: 'Reinigungskraft anlegen',
    confirm: { assign: 'Zuordnen', move: 'Verschieben' },
    pending: 'Wird gespeichert…',
    cancel: 'Abbrechen',
    errors: { required: 'Bitte wählen Sie eine Reinigungskraft.', agent: 'Bitte wählen Sie aus der Liste.' },
    failures: {
      invalid: 'Diese Reinigungskraft kann dieser Unterkunft nicht zugeordnet werden.',
      forbidden: 'Ihr Konto darf diese Unterkunft nicht ändern.',
      notFound: 'Unterkunft oder Reinigungskraft nicht gefunden. Bitte Seite neu laden.',
      conflict: 'Die Unterkunft wurde inzwischen geändert. Bitte Seite neu laden.',
      unknown: 'Speichern fehlgeschlagen. Bitte gleich erneut versuchen.',
    },
  },
  en: {
    open: { assign: 'Assign an agent', move: 'Move to another agent' },
    openFor: {
      assign: (property) => `Assign an agent to ${property}`,
      move: (property) => `Move ${property} to another agent`,
    },
    label: { assign: 'Agent to assign', move: 'Move to' },
    placeholder: 'Choose an agent…',
    loading: 'Loading…',
    noChoice: {
      assign: 'No active agent to offer.',
      move: 'No other active agent to offer.',
    },
    loadFailed: 'Your agents could not be loaded.',
    createAgent: 'Create an agent',
    confirm: { assign: 'Assign', move: 'Move' },
    pending: 'Saving…',
    cancel: 'Cancel',
    errors: { required: 'Choose an agent.', agent: 'Choose an agent from the list.' },
    failures: {
      invalid: 'This agent cannot be assigned to this property.',
      forbidden: 'Your account is not allowed to change this property.',
      notFound: 'Property or agent not found. Reload the page.',
      conflict: 'The property changed in the meantime. Reload the page.',
      unknown: 'Saving failed. Please try again shortly.',
    },
  },
}
