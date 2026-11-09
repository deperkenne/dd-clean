// =============================================================================
// property.repository.index.ts
// -----------------------------------------------------------------------------
// POINT D'INJECTION UNIQUE. C'est le seul fichier qui décide quelle
// implémentation du PropertyRepository est active (mock ou api). Les hooks
// importent `propertyRepository` depuis ICI, jamais directement depuis
// property.repository.mock.ts ou property.repository.api.ts.
//
// Pour basculer vers les vraies données Smoobu plus tard : changer la
// condition ci-dessous (ou la variable d'environnement), zéro changement
// dans les hooks ou les composants UI.
// =============================================================================

import type { PropertyRepository } from "./property.repository";
import { PropertyRepositoryMock } from "./Property.repository.mock";
import { PropertyRepositoryApi } from "./Property.repository.api";

// Pendant toute la phase "pas d'accès Smoobu", on force le mock, quel que
// soit l'environnement. Le jour où l'accès backend est prêt, remplacer par :
//   const USE_MOCK = import.meta.env.VITE_USE_MOCK_PROPERTIES === "true";
const USE_MOCK = true;

export const propertyRepository: PropertyRepository = USE_MOCK
  ? new PropertyRepositoryMock()
  : new PropertyRepositoryApi();