// =============================================================================
// data/mock-properties.ts
// -----------------------------------------------------------------------------
// Données fictives — PAS de logique ici, uniquement des valeurs. Séparées du
// repository (voir property.repository.mock.ts) pour respecter la règle
// SOLID/DRY : un fichier de données, un fichier qui l'expose via une logique.
// Cohérentes avec property.types.ts et le MCD du document d'architecture.
// =============================================================================

import type {
  Owner,
  Property,
  Reservation,
  CleaningJob,
  Agent,
} from "./Property.types";

export const mockOwners: Owner[] = [
  {
    id: "owner-1",
    fullName: "Lena Fischer",
    email: "lena.fischer@example.com",
    phone: "+49 911 1234567",
  },
  {
    id: "owner-2",
    fullName: "Markus Weber",
    email: "markus.weber@example.com",
    phone: "+49 911 2345678",
  },
  {
    id: "owner-3",
    fullName: "Hotel Altstadt Nürnberg GmbH",
    email: "kontakt@hotel-altstadt-nuernberg.example.com",
    phone: "+49 911 3456789",
  },
];

export const mockProperties: Property[] = [
  {
    id: "prop-1",
    ownerId: "owner-1",
    serviceType: "AIRBNB",
    label: "Appartement Altstadt - 2 pièces",
    address: "Burgstraße 12",
    city: "Nürnberg",
    postalCode: "90403",
    smoobuPropertyId: "smoobu-1001",
  },
  {
    id: "prop-2",
    ownerId: "owner-2",
    serviceType: "AIRBNB",
    label: "Studio Gostenhof",
    address: "Jansenstraße 8",
    city: "Nürnberg",
    postalCode: "90429",
    smoobuPropertyId: "smoobu-1002",
  },
  {
    id: "prop-3",
    ownerId: "owner-3",
    serviceType: "HOTEL",
    label: "Hôtel Altstadt - Chambres étage 2",
    address: "Königstraße 45",
    city: "Nürnberg",
    postalCode: "90402",
    smoobuPropertyId: "smoobu-2001",
  },
  {
    id: "prop-4",
    ownerId: "owner-2",
    serviceType: "OFFICE",
    label: "Bureaux Weber & Partner",
    address: "Fürther Straße 100",
    city: "Nürnberg",
    postalCode: "90429",
    smoobuPropertyId: null,
    notes: "Accès par l'entrée arrière, code portail requis.",
  },
  {
    id: "prop-5",
    ownerId: "owner-1",
    serviceType: "POST_CONSTRUCTION",
    label: "Maison individuelle - fin de travaux",
    address: "Erlenstegenstraße 30",
    city: "Nürnberg",
    postalCode: "90491",
    smoobuPropertyId: null,
    notes: "Chantier terminé le 2026-10-12, poussière de plâtre à prévoir.",
  },
];

export const mockReservations: Reservation[] = [
  {
    id: "resa-1",
    propertyId: "prop-1",
    guestName: "Familie Keller",
    checkIn: "2026-10-18",
    checkOut: "2026-10-22",
    status: "CONFIRMED",
    cleaningJobId: "job-1",
  },
  {
    id: "resa-2",
    propertyId: "prop-1",
    guestName: "Julia Santos",
    checkIn: "2026-10-22",
    checkOut: "2026-10-25",
    status: "CONFIRMED",
    cleaningJobId: null,
  },
  {
    id: "resa-3",
    propertyId: "prop-2",
    guestName: "Tom Richter",
    checkIn: "2026-10-19",
    checkOut: "2026-10-20",
    status: "COMPLETED",
    cleaningJobId: "job-2",
  },
  {
    id: "resa-4",
    propertyId: "prop-2",
    guestName: "Amara Diallo",
    checkIn: "2026-10-26",
    checkOut: "2026-10-29",
    status: "PENDING",
    cleaningJobId: null,
  },
];

export const mockCleaningJobs: CleaningJob[] = [
  {
    id: "job-1",
    propertyId: "prop-1",
    reservationId: "resa-1",
    scheduledDate: "2026-10-22",
    status: "ASSIGNED",
    assignedAgentId: "agent-1",
    estimatedDurationMinutes: 90,
  },
  {
    id: "job-2",
    propertyId: "prop-2",
    reservationId: "resa-3",
    scheduledDate: "2026-10-20",
    status: "DONE",
    assignedAgentId: "agent-2",
    estimatedDurationMinutes: 60,
  },
  {
    id: "job-3",
    propertyId: "prop-3",
    reservationId: null,
    scheduledDate: "2026-10-18",
    status: "IN_PROGRESS",
    assignedAgentId: "agent-1",
    estimatedDurationMinutes: 180,
  },
  {
    id: "job-4",
    propertyId: "prop-4",
    reservationId: null,
    scheduledDate: "2026-10-21",
    status: "PLANNED",
    assignedAgentId: null,
    estimatedDurationMinutes: 120,
  },
  {
    id: "job-5",
    propertyId: "prop-5",
    reservationId: null,
    scheduledDate: "2026-10-17",
    status: "VERIFIED",
    assignedAgentId: "agent-3",
    estimatedDurationMinutes: 240,
  },
];

export const mockAgents: Agent[] = [
  {
    id: "agent-1",
    fullName: "Said Benali",
    role: "AGENT",
    phone: "+49 176 1111111",
  },
  {
    id: "agent-2",
    fullName: "Nina Hoffmann",
    role: "AGENT",
    phone: "+49 176 2222222",
  },
  {
    id: "agent-3",
    fullName: "Peter Zimmer",
    role: "AGENT",
    phone: "+49 176 3333333",
  },
];