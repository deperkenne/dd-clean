import { company } from '@/lib/company.data'
import type { Localized } from '@/lib/i18n'
import type { LegalSection } from './LegalLayout'

/**
 * TODO: texte provisoire — à remplacer par la déclaration de confidentialité
 * définitive (RGPD / DSGVO), idéalement relue par un juriste.
 */
const controller = `${company.name}, ${company.legal.owner}, ${company.address.street}, ${company.address.postalCode} ${company.address.city} — ${company.email.display}`

type DatenschutzContent = {
  eyebrow: string
  title: string
  placeholderNotice: string
  sections: LegalSection[]
}

export const datenschutzContent: Localized<DatenschutzContent> = {
  fr: {
    eyebrow: 'Informations légales',
    title: 'Politique de confidentialité',
    placeholderNotice:
      'Texte provisoire : cette page sera remplacée par la déclaration de confidentialité définitive.',
    sections: [
      { heading: 'Responsable du traitement', paragraphs: [controller] },
      {
        heading: 'Données traitées',
        paragraphs: [
          'Lorsque vous nous contactez par téléphone, WhatsApp ou e-mail, nous traitons les informations que vous nous transmettez afin de répondre à votre demande.',
          "Ce site n'utilise ni cookies de suivi ni outils d'analyse. Les polices sont hébergées localement.",
          'La langue choisie est enregistrée dans le stockage local (localStorage) de votre navigateur, uniquement pour mémoriser votre préférence.',
        ],
      },
      {
        heading: 'Vos droits',
        paragraphs: [
          "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition, ainsi que du droit d'introduire une réclamation auprès d'une autorité de contrôle.",
        ],
      },
    ],
  },
  de: {
    eyebrow: 'Rechtliches',
    title: 'Datenschutzerklärung',
    placeholderNotice:
      'Platzhaltertext: Diese Seite wird durch die endgültige Datenschutzerklärung ersetzt.',
    sections: [
      { heading: 'Verantwortlicher', paragraphs: [controller] },
      {
        heading: 'Verarbeitete Daten',
        paragraphs: [
          'Wenn Sie uns per Telefon, WhatsApp oder E-Mail kontaktieren, verarbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten.',
          'Diese Website verwendet keine Tracking-Cookies und keine Analysewerkzeuge. Schriftarten werden lokal gehostet.',
          'Die gewählte Sprache wird ausschließlich zur Speicherung Ihrer Präferenz im lokalen Speicher (localStorage) Ihres Browsers abgelegt.',
        ],
      },
      {
        heading: 'Ihre Rechte',
        paragraphs: [
          'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde.',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Legal',
    title: 'Privacy policy',
    placeholderNotice: 'Placeholder text: this page will be replaced by the final privacy policy.',
    sections: [
      { heading: 'Data controller', paragraphs: [controller] },
      {
        heading: 'Data we process',
        paragraphs: [
          'When you contact us by phone, WhatsApp or email, we process the information you provide in order to answer your request.',
          'This website uses no tracking cookies and no analytics tools. Fonts are hosted locally.',
          "Your chosen language is stored in your browser's local storage (localStorage), only to remember your preference.",
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You have the right of access, rectification, erasure, restriction of processing, data portability and objection, as well as the right to lodge a complaint with a supervisory authority.',
        ],
      },
    ],
  },
}
