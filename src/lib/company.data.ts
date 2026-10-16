/**
 * Coordonnées et informations légales de D&D Clean.
 *
 * TODO: remplacer toutes les valeurs ci-dessous par les vraies informations.
 * C'est le SEUL fichier à modifier : header, hero, contact, footer et pages
 * légales lisent tous leurs coordonnées ici.
 */
export const company = {
  name: 'D&D Clean',
  // TODO: remplacer — numéro affiché et numéro au format international (sans espaces)
  phone: { display: '+49 911 000 000 00', href: 'tel:+4991100000000' },
  // TODO: remplacer — numéro WhatsApp au format international, sans « + » ni espaces
  whatsapp: { display: '+49 160 000 000 00', href: 'https://wa.me/4916000000000' },
  // TODO: remplacer
  email: { display: 'kontakt@dd-clean.example', href: 'mailto:kontakt@dd-clean.example' },
  // TODO: remplacer
  address: {
    street: 'Musterstraße 1',
    postalCode: '90402',
    city: 'Nürnberg',
    country: 'Deutschland',
  },
  // TODO: vérifier la liste des villes réellement desservies
  serviceAreas: [
    'Nürnberg',
    'Fürth',
    'Erlangen',
    'Schwabach',
    'Zirndorf',
    'Stein',
    'Oberasbach',
    'Feucht',
  ],
  // TODO: remplacer — informations obligatoires de l'Impressum
  legal: {
    owner: 'Max Mustermann',
    legalForm: 'Einzelunternehmen',
    vatId: 'DE000000000',
    registry: '—',
  },
} as const
