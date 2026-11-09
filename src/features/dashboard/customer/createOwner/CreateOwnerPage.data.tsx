import type { OwnerFieldErrorCode } from '@/features/properties/owner.types'
import type { Localized } from '@/lib/i18n'
import type { CreatedOwnerSummary, CreateOwnerFailure } from './createOwner.types'

type CreateOwnerContent = {
  backLabel: string
  logoLabel: string
  documentLabel: string
  title: string
  lead: string
  optional: string
  owner: {
    title: string
    description: string
    name: string
    email: string
    phone: string
  }
  properties: {
    title: string
    description: string
    count: (count: number) => string
    empty: string
    add: string
    legend: (position: number) => string
    remove: (position: number) => string
    name: string
    emailLabel: string
    emailLabelHint: string
    street: string
    postalCode: string
    city: string
    agent: {
      label: string
      none: string
      loading: string
      hint: string
      error: string
      empty: string
      create: string
    }
  }
  rooms: {
    title: string
    count: (count: number) => string
    empty: string
    add: string
    number: string
    price: string
    priceHint: string
    remove: (position: number) => string
  }
  summary: {
    title: string
    ownerPlaceholder: string
    properties: string
    rooms: string
  }
  submit: string
  submitting: string
  secureNote: string
  errors: Record<OwnerFieldErrorCode, string>
  failures: Record<CreateOwnerFailure, string>
  success: {
    eyebrow: string
    title: (name: string) => string
    details: (summary: CreatedOwnerSummary) => string
    again: string
    back: string
  }
}

export const createOwnerContent: Localized<CreateOwnerContent> = {
  fr: {
    backLabel: 'Retour au tableau de bord',
    logoLabel: 'D&D Clean — site public',
    documentLabel: 'Fiche propriétaire',
    title: 'Créer un propriétaire',
    lead: 'Renseignez le propriétaire, puis ajoutez ses logements et leurs chambres. Logements et chambres sont facultatifs.',
    optional: '(facultatif)',
    owner: {
      title: 'Propriétaire',
      description: 'La personne ou la société à qui appartiennent les logements.',
      name: 'Nom',
      email: 'E-mail',
      phone: 'Téléphone',
    },
    properties: {
      title: 'Logements',
      description: 'Chaque logement relie les réservations Smoobu au bon propriétaire.',
      count: (count) => (count === 0 ? 'Aucun logement' : count === 1 ? '1 logement' : `${count} logements`),
      empty: 'Aucun logement pour l’instant. Vous pouvez créer le propriétaire seul.',
      add: 'Ajouter un logement',
      legend: (position) => `Logement ${String(position).padStart(2, '0')}`,
      remove: (position) => `Retirer le logement ${position}`,
      name: 'Nom du logement',
      emailLabel: 'Nom dans les e-mails Smoobu',
      emailLabelHint: 'Exactement comme dans les e-mails de réservation Smoobu.',
      street: 'Rue et numéro',
      postalCode: 'Code postal',
      city: 'Ville',
      agent: {
        label: 'Agent attribué',
        none: 'Aucun agent pour l’instant',
        loading: 'Chargement de vos agents…',
        hint: 'L’agent de ménage qui s’occupe de ce logement. Seuls vos agents actifs sont proposés.',
        error: 'Vos agents n’ont pas pu être chargés : le logement sera créé sans agent.',
        empty: 'Vous n’avez encore aucun agent actif.',
        create: 'Créer un agent',
      },
    },
    rooms: {
      title: 'Chambres',
      count: (count) => (count === 0 ? 'Aucune' : count === 1 ? '1 chambre' : `${count} chambres`),
      empty: 'Aucune chambre.',
      add: 'Ajouter une chambre',
      number: 'Numéro ou code',
      price: 'Prix du ménage (€)',
      priceHint: 'Ex. 45,50',
      remove: (position) => `Retirer la chambre ${position}`,
    },
    summary: {
      title: 'Récapitulatif',
      ownerPlaceholder: 'Nouveau propriétaire',
      properties: 'Logements',
      rooms: 'Chambres',
    },
    submit: 'Créer le propriétaire',
    submitting: 'Création en cours…',
    secureNote: 'Envoi sécurisé : votre identité est jointe à la demande et vérifiée par le serveur.',
    errors: {
      required: 'Ce champ est obligatoire.',
      tooLong: 'Ce texte est trop long.',
      email: 'Adresse e-mail invalide.',
      price: 'Indiquez un prix positif, avec 2 décimales au plus (ex. 45,50).',
      duplicateRoom: 'Ce numéro existe déjà dans ce logement.',
      duplicateEmailLabel: 'Ce nom Smoobu est déjà utilisé par un autre logement de cette fiche.',
      agent: 'Choisissez un agent dans la liste.',
      server: 'Le serveur a refusé cette valeur.',
    },
    failures: {
      invalid: 'Certaines informations ont été refusées par le serveur. Vérifiez les champs signalés.',
      forbidden: 'Votre compte n’a pas le droit de créer un propriétaire.',
      conflict: 'Ce nom Smoobu est déjà utilisé par un autre logement.',
      unknown: 'La création a échoué. Vérifiez votre connexion et réessayez.',
    },
    success: {
      eyebrow: 'Enregistré',
      title: (name) => `${name} est enregistré.`,
      details: ({ propertyCount, roomCount }) =>
        `${propertyCount} logement${propertyCount > 1 ? 's' : ''} · ${roomCount} chambre${roomCount > 1 ? 's' : ''}`,
      again: 'Créer un autre propriétaire',
      back: 'Retour au tableau de bord',
    },
  },
  de: {
    backLabel: 'Zurück zur Übersicht',
    logoLabel: 'D&D Clean — öffentliche Website',
    documentLabel: 'Eigentümerblatt',
    title: 'Eigentümer anlegen',
    lead: 'Erfassen Sie den Eigentümer und fügen Sie dann seine Unterkünfte und Zimmer hinzu. Unterkünfte und Zimmer sind optional.',
    optional: '(optional)',
    owner: {
      title: 'Eigentümer',
      description: 'Die Person oder Firma, der die Unterkünfte gehören.',
      name: 'Name',
      email: 'E-Mail',
      phone: 'Telefon',
    },
    properties: {
      title: 'Unterkünfte',
      description: 'Jede Unterkunft ordnet die Smoobu-Buchungen dem richtigen Eigentümer zu.',
      count: (count) => (count === 0 ? 'Keine Unterkunft' : count === 1 ? '1 Unterkunft' : `${count} Unterkünfte`),
      empty: 'Noch keine Unterkunft. Sie können den Eigentümer auch allein anlegen.',
      add: 'Unterkunft hinzufügen',
      legend: (position) => `Unterkunft ${String(position).padStart(2, '0')}`,
      remove: (position) => `Unterkunft ${position} entfernen`,
      name: 'Name der Unterkunft',
      emailLabel: 'Name in den Smoobu-E-Mails',
      emailLabelHint: 'Genau wie in den Smoobu-Buchungs-E-Mails.',
      street: 'Straße und Hausnummer',
      postalCode: 'PLZ',
      city: 'Ort',
      agent: {
        label: 'Zugeordnete Reinigungskraft',
        none: 'Vorerst keine Reinigungskraft',
        loading: 'Ihre Reinigungskräfte werden geladen…',
        hint: 'Die Reinigungskraft, die diese Unterkunft betreut. Nur aktive Reinigungskräfte werden angeboten.',
        error: 'Ihre Reinigungskräfte konnten nicht geladen werden: Die Unterkunft wird ohne Zuordnung angelegt.',
        empty: 'Sie haben noch keine aktive Reinigungskraft.',
        create: 'Reinigungskraft anlegen',
      },
    },
    rooms: {
      title: 'Zimmer',
      count: (count) => (count === 0 ? 'Keine' : count === 1 ? '1 Zimmer' : `${count} Zimmer`),
      empty: 'Keine Zimmer.',
      add: 'Zimmer hinzufügen',
      number: 'Nummer oder Code',
      price: 'Reinigungspreis (€)',
      priceHint: 'z. B. 45,50',
      remove: (position) => `Zimmer ${position} entfernen`,
    },
    summary: {
      title: 'Zusammenfassung',
      ownerPlaceholder: 'Neuer Eigentümer',
      properties: 'Unterkünfte',
      rooms: 'Zimmer',
    },
    submit: 'Eigentümer anlegen',
    submitting: 'Wird angelegt…',
    secureNote: 'Sichere Übertragung: Ihre Identität wird mitgesendet und vom Server geprüft.',
    errors: {
      required: 'Dieses Feld ist erforderlich.',
      tooLong: 'Dieser Text ist zu lang.',
      email: 'Ungültige E-Mail-Adresse.',
      price: 'Bitte einen positiven Preis mit höchstens 2 Nachkommastellen angeben (z. B. 45,50).',
      duplicateRoom: 'Diese Nummer gibt es in dieser Unterkunft bereits.',
      duplicateEmailLabel: 'Dieser Smoobu-Name wird bereits von einer anderen Unterkunft dieses Blatts verwendet.',
      agent: 'Bitte wählen Sie eine Reinigungskraft aus der Liste.',
      server: 'Der Server hat diesen Wert abgelehnt.',
    },
    failures: {
      invalid: 'Einige Angaben wurden vom Server abgelehnt. Bitte prüfen Sie die markierten Felder.',
      forbidden: 'Ihr Konto darf keine Eigentümer anlegen.',
      conflict: 'Dieser Smoobu-Name wird bereits von einer anderen Unterkunft verwendet.',
      unknown: 'Das Anlegen ist fehlgeschlagen. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
    },
    success: {
      eyebrow: 'Gespeichert',
      title: (name) => `${name} ist gespeichert.`,
      details: ({ propertyCount, roomCount }) =>
        `${propertyCount} ${propertyCount === 1 ? 'Unterkunft' : 'Unterkünfte'} · ${roomCount} Zimmer`,
      again: 'Weiteren Eigentümer anlegen',
      back: 'Zurück zur Übersicht',
    },
  },
  en: {
    backLabel: 'Back to the dashboard',
    logoLabel: 'D&D Clean — public website',
    documentLabel: 'Owner sheet',
    title: 'Create an owner',
    lead: 'Fill in the owner, then add their properties and rooms. Properties and rooms are optional.',
    optional: '(optional)',
    owner: {
      title: 'Owner',
      description: 'The person or company the properties belong to.',
      name: 'Name',
      email: 'E-mail',
      phone: 'Phone',
    },
    properties: {
      title: 'Properties',
      description: 'Each property links Smoobu bookings to the right owner.',
      count: (count) => (count === 0 ? 'No properties' : count === 1 ? '1 property' : `${count} properties`),
      empty: 'No properties yet. You can create the owner on their own.',
      add: 'Add a property',
      legend: (position) => `Property ${String(position).padStart(2, '0')}`,
      remove: (position) => `Remove property ${position}`,
      name: 'Property name',
      emailLabel: 'Name in Smoobu e-mails',
      emailLabelHint: 'Exactly as in the Smoobu booking e-mails.',
      street: 'Street and number',
      postalCode: 'Postal code',
      city: 'City',
      agent: {
        label: 'Assigned agent',
        none: 'No agent for now',
        loading: 'Loading your agents…',
        hint: 'The cleaning agent in charge of this property. Only your active agents are listed.',
        error: 'Your agents could not be loaded: the property will be created without an agent.',
        empty: 'You do not have any active agent yet.',
        create: 'Create an agent',
      },
    },
    rooms: {
      title: 'Rooms',
      count: (count) => (count === 0 ? 'None' : count === 1 ? '1 room' : `${count} rooms`),
      empty: 'No rooms.',
      add: 'Add a room',
      number: 'Number or code',
      price: 'Cleaning price (€)',
      priceHint: 'e.g. 45.50',
      remove: (position) => `Remove room ${position}`,
    },
    summary: {
      title: 'Summary',
      ownerPlaceholder: 'New owner',
      properties: 'Properties',
      rooms: 'Rooms',
    },
    submit: 'Create the owner',
    submitting: 'Creating…',
    secureNote: 'Secure submission: your identity is attached to the request and checked by the server.',
    errors: {
      required: 'This field is required.',
      tooLong: 'This text is too long.',
      email: 'Invalid e-mail address.',
      price: 'Enter a positive price with at most 2 decimals (e.g. 45.50).',
      duplicateRoom: 'This number already exists in this property.',
      duplicateEmailLabel: 'This Smoobu name is already used by another property on this sheet.',
      agent: 'Choose an agent from the list.',
      server: 'The server rejected this value.',
    },
    failures: {
      invalid: 'Some details were rejected by the server. Please check the highlighted fields.',
      forbidden: 'Your account is not allowed to create owners.',
      conflict: 'This Smoobu name is already used by another property.',
      unknown: 'Creation failed. Check your connection and try again.',
    },
    success: {
      eyebrow: 'Saved',
      title: (name) => `${name} is saved.`,
      details: ({ propertyCount, roomCount }) =>
        `${propertyCount} ${propertyCount === 1 ? 'property' : 'properties'} · ${roomCount} ${roomCount === 1 ? 'room' : 'rooms'}`,
      again: 'Create another owner',
      back: 'Back to the dashboard',
    },
  },
}
