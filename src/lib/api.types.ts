/*
 * Types Java du back-end Spring Boot, tels qu'ils arrivent en JSON (Jackson).
 * Partagés par tous les domaines pour que chaque fichier de types parle la même langue.
 */

/** `UUID` Java : chaîne, ex. "3f2a…-…". */
export type Uuid = string

/** `LocalDate` Java : date sans heure, "2026-11-03". */
export type IsoDate = string

/** `Instant` Java : date et heure UTC, "2026-11-03T18:42:00Z". */
export type IsoInstant = string

/** `BigDecimal` Java (montants en euros) : nombre JSON, ex. 45.5. */
export type Decimal = number

/** Fichier reçu du back-end (ex. facture PDF) ; `fileName` vient de `Content-Disposition`, s'il est lisible. */
export type DownloadedFile = { blob: Blob; fileName?: string }
