import { company } from '@/lib/company.data'
import type { Localized } from '@/lib/i18n'
import type { LegalSection } from './LegalLayout'

/**
 * TODO: texte provisoire — à remplacer par l'Impressum définitif
 * (idéalement relu par un juriste ou généré par un service spécialisé).
 */
const { address, legal, phone, email } = company
const addressLines = `${company.name}, ${legal.owner}, ${address.street}, ${address.postalCode} ${address.city}, ${address.country}`

type ImpressumContent = {
  eyebrow: string
  title: string
  placeholderNotice: string
  sections: LegalSection[]
}

export const impressumContent: Localized<ImpressumContent> = {
  fr: {
    eyebrow: 'Informations légales',
    title: 'Mentions légales (Impressum)',
    placeholderNotice:
      'Texte provisoire : les informations ci-dessous sont des exemples et seront remplacées par les mentions légales définitives.',
    sections: [
      { heading: 'Éditeur (§ 5 DDG)', paragraphs: [addressLines, `Forme juridique : ${legal.legalForm}`] },
      { heading: 'Contact', paragraphs: [`Téléphone : ${phone.display}`, `E-mail : ${email.display}`] },
      {
        heading: 'Immatriculation',
        paragraphs: [`N° de TVA intracommunautaire : ${legal.vatId}`, `Registre : ${legal.registry}`],
      },
      { heading: 'Responsable du contenu', paragraphs: [`${legal.owner}, adresse ci-dessus.`] },
    ],
  },
  de: {
    eyebrow: 'Rechtliches',
    title: 'Impressum',
    placeholderNotice:
      'Platzhaltertext: Die folgenden Angaben sind Beispiele und werden durch das endgültige Impressum ersetzt.',
    sections: [
      { heading: 'Angaben gemäß § 5 DDG', paragraphs: [addressLines, `Rechtsform: ${legal.legalForm}`] },
      { heading: 'Kontakt', paragraphs: [`Telefon: ${phone.display}`, `E-Mail: ${email.display}`] },
      {
        heading: 'Registereintrag',
        paragraphs: [`Umsatzsteuer-ID: ${legal.vatId}`, `Register: ${legal.registry}`],
      },
      { heading: 'Verantwortlich für den Inhalt', paragraphs: [`${legal.owner}, Anschrift wie oben.`] },
    ],
  },
  en: {
    eyebrow: 'Legal',
    title: 'Legal notice (Impressum)',
    placeholderNotice:
      'Placeholder text: the details below are examples and will be replaced by the final legal notice.',
    sections: [
      { heading: 'Provider (§ 5 DDG)', paragraphs: [addressLines, `Legal form: ${legal.legalForm}`] },
      { heading: 'Contact', paragraphs: [`Phone: ${phone.display}`, `Email: ${email.display}`] },
      {
        heading: 'Registration',
        paragraphs: [`VAT ID: ${legal.vatId}`, `Register: ${legal.registry}`],
      },
      { heading: 'Responsible for content', paragraphs: [`${legal.owner}, address as above.`] },
    ],
  },
}
