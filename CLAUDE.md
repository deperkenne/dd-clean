# D&D Clean — Frontend (CLAUDE.md)

Ce fichier s'applique au dossier `frontend/` du projet D&D Clean. Il prévaut sur toute
habitude par défaut de l'assistant. Avant toute tâche sur ce dossier, le lire en entier.

Référence : le plan d'architecture complet (modèle de données, API, back-end) vit dans
le document Claude Docs du projet. Ce fichier ne couvre QUE le frontend et le design —
il ne redéfinit rien côté back-end, Smoobu, SSE ou base de données.

## Skill de design — obligatoire avant toute UI

Avant de construire ou modifier une page, une section ou un composant visuel —
la landing page comme tout le reste de l'app par la suite — charger le skill
`skills` (dans `.agent/skills/`) avec l'outil Skill, pour garantir un rendu
professionnel et de haute qualité, cohérent sur tout le site. Ce n'est pas
optionnel : un écran construit sans être passé par ce skill n'est pas considéré
terminé, au même titre que le responsive ou le build qui passe.

Trois autres skills existent dans `.agent/skills/` (`introge`, `cadre`,
`illustre`) — leur rôle et leur condition de déclenchement sont à préciser ;
dès qu'ils sont clarifiés, ils seront ajoutés ici avec leur propre règle
d'usage.

## Mission actuelle (ordre strict, ne pas anticiper)

1. ~~**Landing page publique**~~ — ✅ terminée et validée.
2. **Authentification & autorisation (OAuth 2.0 / OIDC avec Keycloak)** — mission
   en cours. Voir la section dédiée plus bas pour les règles complètes.
3. **Dashboard / Properties (back-office)** — mission officiellement lancée en
   parallèle de l'Auth, avec des données **fictives** en attendant l'accès réel
   à Smoobu (voir la section dédiée "Données fictives — Repository pattern"
   plus bas). Reste limité au périmètre properties/reservations/cleaning jobs
   déjà modélisé ; l'interface agent mobile, SSE et l'intégration Smoobu réelle
   restent hors scope (voir "Ce que ce fichier ne couvre pas").
4. **Le reste** (interface agent mobile, SSE, intégration Smoobu réelle, etc.)
   — hors scope pour l'instant. Ne pas créer de routes, composants ou dossiers
   pour des écrans non demandés, même si l'architecture générale les prévoit
   pour plus tard.

Ne jamais passer à l'étape suivante sans validation explicite sur l'étape en cours.

## Une fonctionnalité à la fois, validée dans le navigateur

Règle de méthode de travail, valable pour toute mission à partir de maintenant
(dashboard secrétaire, dashboard agent, et tout ce qui suivra) :

- **Jamais plusieurs fonctionnalités d'un coup.** Une mission avec plusieurs
  fonctionnalités (ex. un dashboard) se découpe en une liste ordonnée, proposée
  avant de coder, puis implémentée une fonctionnalité à la fois.
- **Le code qui compile ne suffit jamais à valider une fonctionnalité.** Après
  chaque fonctionnalité implémentée : lancer le serveur de dev si besoin,
  indiquer précisément l'URL/route à ouvrir et les actions à effectuer pour la
  tester dans le navigateur, puis **attendre la confirmation explicite** de
  l'utilisateur — après qu'il l'a lui-même vue et testée — avant de passer à la
  fonctionnalité suivante.
- **Ne jamais anticiper la fonctionnalité suivante** pendant qu'on attend cette
  confirmation, même si elle semble triviale ou liée à la précédente.

## Responsive — non négociable, sur toute page et tout élément

Cette règle s'applique à **chaque page et chaque composant créé**, sans exception,
dès le premier commit — ce n'est pas une passe de finition à faire plus tard.

- **Mobile d'abord** : on écrit le CSS pour le plus petit écran, puis on ajoute des
  règles pour les écrans plus grands (`min-width`), jamais l'inverse.
- **Plages à couvrir pour chaque page/élément livré** : 360px (petit mobile),
  768px (tablette), 1024px, 1440px (desktop large). Aucune page n'est considérée
  terminée si elle n'a pas été vérifiée sur ces quatre largeurs.
- **Aucun débordement horizontal** à aucune largeur, aucun texte tronqué sans
  le vouloir, aucun élément qui chevauche un autre.
- **Zones tactiles ≥ 44px** sur mobile (boutons, liens, champs de formulaire).
- **Images et médias** : toujours responsives (`max-width: 100%` ou équivalent
  Tailwind), jamais de largeur ou hauteur fixe en pixels qui casse sur petit écran.
- Un composant livré sans avoir été vérifié sur les quatre largeurs n'est **pas**
  un composant terminé, même si le reste de la tâche est fait.

## Logo D&D Clean sur tous les formulaires

Règle transverse, valable pour tout formulaire de l'application, présent ou futur
(login, registration, contact, et tout autre à venir) : **le logo D&D Clean doit
être visible sur chaque formulaire**, pas seulement sur la landing page. Un
formulaire livré sans le logo n'est pas considéré terminé.

## Stack imposée (ne pas en dévier sans demande explicite)

- React 18+ avec TypeScript strict, Vite
- React Router pour le routing
- TanStack Query pour tout état serveur (jamais de `useState` + `useEffect` pour
  simuler un fetch)
- Tailwind CSS + shadcn/ui pour les composants
- React Hook Form + Zod pour tout formulaire (y compris login/registration)
- Aucune autre librairie UI (pas de MUI, Ant Design, Bootstrap, styled-components)
  sans accord explicite

## Commandes

- `npm run dev` : serveur de développement
- `npm run build` : build de production — **doit passer sans erreur et sans warning
  TypeScript avant toute livraison**
- `npm run lint` : ESLint, doit être propre avant de considérer une tâche terminée
- `npm run preview` : vérifier le build localement

## Organisation des dossiers

```
frontend/
├── src/
│   ├── main.tsx, App.tsx
│   ├── app/
│   │   ├── router.tsx          # routes publiques (landing, login, register)
│   │   └── queryClient.ts
│   ├── features/
│   │   ├── landing/
│   │   │   └── sections/
│   │   │       ├── Hero/
│   │   │       │   ├── Hero.tsx        # UI pure : affichage seulement
│   │   │       │   └── Hero.data.tsx   # contenu/valeurs de cette section
│   │   │       └── ...                 # une section = un dossier du même schéma
│   │   └── auth/
│   │       ├── LoginPage.tsx           # UI pure
│   │       ├── RegisterPage.tsx        # UI pure
│   │       ├── useLogin.ts             # hook métier (appel API, redirection)
│   │       ├── useRegister.ts          # hook métier
│   │       └── auth.schema.ts          # schémas Zod partagés
│   ├── components/ui/           # composants shadcn/ui, jamais modifiés à la main
│   ├── components/layout/       # Header, Footer, partagés landing + auth
│   ├── components/common/       # composants réutilisables entre features
│   │                             # (Button custom, Card, SectionTitle, etc.)
│   ├── hooks/                    # hooks métier transverses, réutilisés par
│   │                             # plusieurs features (ex. useAuthStatus)
│   └── lib/                      # utilitaires purs (formatage, constantes, cn())
└── public/
```

Un composant par fichier, PascalCase. Une section de la landing page = un dossier
sous `features/landing/sections/`, pas un grand fichier monolithique.

## SOLID et DRY — séparation stricte UI / données / logique

Trois rôles bien distincts, jamais mélangés dans le même fichier :

- **Le composant UI (`.tsx`) a une seule responsabilité : afficher.** Il reçoit
  ses valeurs en props ou les importe depuis un fichier `*.data.tsx` voisin, et
  n'a aucune logique métier, aucun appel réseau, aucune règle de validation
  écrite en dur à l'intérieur. S'il a besoin de données (textes, listes, liens,
  valeurs statiques), elles vivent dans un fichier `NomDuComposant.data.tsx` à
  côté, et le composant les importe — jamais de valeurs écrites en dur dispersées
  dans le JSX.
- **Les hooks (`use*.ts`) portent toute la logique métier** : appel API via
  TanStack Query, soumission de formulaire, redirection après login, gestion
  d'erreur. Un composant UI appelle un hook, il ne contient jamais cette
  logique lui-même. Un hook spécifique à une feature reste dans son dossier
  (ex. `features/auth/useLogin.ts`) ; un hook réutilisé par plusieurs features
  monte dans `hooks/`.
- **DRY** : si un même bloc visuel (carte, badge, bouton avec icône, titre de
  section) apparaît ou est susceptible d'apparaître plus d'une fois, il devient
  un composant réutilisable dans `components/common/`, pas une copie-colle
  locale à chaque section. Avant d'écrire un nouveau composant, vérifier qu'un
  équivalent n'existe pas déjà dans `components/ui/` ou `components/common/`.

Concrètement, pour une section de landing page : `Hero.tsx` affiche, `Hero.data.tsx`
fournit le titre/sous-titre/CTA, et si un bouton ou une carte s'y répète ailleurs
sur le site, il est extrait en composant partagé plutôt que dupliqué.

## Open/Closed — un composant s'étend, il ne se modifie pas

Un composant doit être **ouvert à l'extension, fermé à la modification** : ajouter
un nouveau cas d'usage ne doit jamais obliger à réécrire l'intérieur d'un composant
existant et déjà utilisé ailleurs.

- **Variantes par props, jamais par branchement interne qui grossit.** Si un
  bouton doit exister en plusieurs styles (primaire, secondaire, danger), il
  prend une prop `variant`, gérée proprement (ex. `cva` de shadcn/ui) — on
  n'ajoute pas un troisième `if` dans le composant à chaque nouveau besoin visuel,
  et encore moins un composant `ButtonRouge.tsx` à côté de `Button.tsx`.
- **Composition plutôt que paramètres qui s'accumulent.** Un composant qui a
  besoin d'accueillir un contenu variable prend un `children` ou des props de
  type `render`/`slot`, plutôt qu'une liste de props toujours plus longue
  (`showIcon`, `showBadge`, `showExtra`...) qui finit par dénaturer son rôle
  d'origine.
- **Avant de modifier un composant partagé existant** (`components/ui/`,
  `components/common/`) pour un nouveau besoin : vérifier si une prop ou un
  `children` suffit à couvrir ce besoin sans toucher à son comportement actuel.
  Si la modification changerait le comportement des usages déjà en place
  ailleurs sur le site, c'est le signal qu'il faut une nouvelle variante ou un
  nouveau composant, pas une réécriture de l'existant.
- **Les fichiers `*.data.tsx` suivent la même logique** : une nouvelle section
  ou un nouveau contenu s'ajoute en créant son propre fichier de données, sans
  réécrire la structure de données d'une section déjà en place.

## Qui est D&D Clean

D&D Clean est une entreprise de nettoyage professionnel (basée à Nürnberg), pas
un éditeur de logiciel. Ses services couvrent :

- **Ménage Airbnb / RBNB** : nettoyage entre deux locations courte durée
- **Hôtels** : nettoyage des chambres et parties communes
- **Bureaux** : nettoyage professionnel d'espaces de travail
- **Fin de chantier** : nettoyage après travaux/construction
- **Voitures** : nettoyage intérieur/extérieur de véhicules
- **Canapés** : nettoyage et détachage de canapés et assises

La landing page vend ces services à des particuliers et professionnels (hôtels,
bureaux, propriétaires Airbnb). Elle ne présente PAS de logiciel de gestion —
le dashboard interne mentionné dans l'architecture du projet est un outil de
back-office pour D&D Clean elle-même, pas un argument commercial de cette page.

## Authentification & autorisation — OAuth 2.0 / OIDC avec Keycloak

Mission en cours. S'ajoute aux règles déjà posées plus haut (SOLID/DRY, UI/données/
hooks, Open/Closed, responsive) — ne les répète pas, les complète.

### Architecture et design patterns

- **Isolation stricte logique métier / UI**, comme défini dans la section
  SOLID/DRY plus haut : aucune logique d'auth dans un composant `.tsx`.
- **Types et interfaces TypeScript dans des fichiers dédiés**, séparés du code
  d'implémentation (ex. `auth.types.ts` à côté de `auth.schema.ts`, jamais de
  `type`/`interface` défini au milieu d'un hook ou d'un composant).
- **Design patterns pertinents** à utiliser selon le besoin, pas par principe :
  - **Adapter** pour isoler le SDK/client Keycloak derrière une interface stable
    à nous — si on change de provider OIDC un jour, seul l'adapter change.
  - **Repository** pour l'accès aux données utilisateur/session.
  - **Strategy** si plusieurs façons de s'authentifier coexistent (ex. plus tard
    code à usage unique pour les agents, mentionné dans l'architecture globale).
- **Code minimaliste** : rien d'ajouté « au cas où » ; si Keycloak/la lib OIDC
  fournit déjà un mécanisme (refresh automatique, gestion de session), ne pas
  le réimplémenter à côté.

### Structure (vient compléter l'arborescence `features/auth/` déjà définie)

```
features/auth/
├── LoginPage.tsx              # UI pure
├── RegisterPage.tsx           # UI pure
├── auth.types.ts              # types et interfaces (User, Session, Tokens...)
├── auth.schema.ts             # schémas Zod (validation des formulaires)
├── useLogin.ts                # hook métier : déclenche le flux OIDC
├── useAuthSession.ts          # hook métier : session courante, refresh, logout
├── keycloak.adapter.ts        # Adapter : seul fichier qui connaît le SDK Keycloak
└── auth.repository.ts         # Repository : accès aux données de session/utilisateur
```

Aucun composant UI n'importe `keycloak.adapter.ts` directement — toujours via un
hook.

### Validation et performance

- **Toute donnée est pré-validée côté client avant tout appel réseau** : champs de
  formulaire (Zod), format/structure des tokens reçus, payloads sortants. Objectif :
  ne jamais envoyer une requête qu'on sait déjà invalide, pour ne pas saturer l'API
  ou provoquer des timeouts inutiles.
- Pas de requête déclenchée avant que la validation locale soit passée.

### Sécurité (non négociable)

- **Stockage des tokens** : jamais dans `localStorage` en clair pour un token
  sensible (risque XSS) ; privilégier ce que recommande le flux OIDC utilisé avec
  Keycloak (ex. Authorization Code + PKCE, tokens gérés en mémoire ou cookie
  httpOnly selon ce que permet l'architecture back-end — à confirmer avant
  d'implémenter, ne pas choisir au hasard).
- **Jamais de token, secret ou mot de passe loggé**, même en développement.
- **Gestion des rôles/permissions** : les rôles viennent du token (claims OIDC),
  jamais d'une donnée locale modifiable côté client. L'UI peut masquer un élément
  selon le rôle, mais la vraie vérification de permission reste côté back-end.
- Respecter le flux standard OAuth 2.0 / OIDC avec Keycloak sans raccourci
  « maison » qui s'écarte du protocole.

### Documentation et pédagogie

- **Commentaires extrêmement clairs et didactiques**, en particulier dans
  `keycloak.adapter.ts` et les hooks d'auth : quelqu'un qui ne développe pas doit
  pouvoir lire les commentaires et comprendre, dans les grandes lignes, comment
  fonctionnent OAuth 2.0, OIDC, et leur intégration avec Keycloak dans ce projet.
- Un commentaire explique le **pourquoi** (ce que fait ce flux et pourquoi il est
  nécessaire), pas seulement une paraphrase du code.

## Données fictives — Repository pattern (en attendant l'accès Smoobu)

L'accès réel aux données propriétaires/réservations via Smoobu n'est pas encore
disponible. Le dashboard/properties avance quand même, avec des données
**fictives**, mais sans jamais coder en dur un accès aux données dans un hook
ou un composant — pour que brancher Smoobu plus tard ne demande aucune
réécriture, seulement un changement de source.

- **Un seul contrat (`*.repository.ts`)** décrit l'accès aux données
  (`getProperties()`, `getReservationsByPropertyId()`, etc.), indépendamment
  de la source.
- **Deux implémentations** de ce contrat : `*.repository.mock.ts` (données
  fictives, avec une latence simulée pour reproduire le comportement d'un
  vrai réseau) et `*.repository.api.ts` (stub pour l'appel réel au backend,
  non implémenté avant que l'architecture d'appel backend soit confirmée).
- **Un point d'injection unique** (`*.repository.index.ts`) décide quelle
  implémentation est active. Les hooks importent toujours depuis ce point
  d'injection, jamais directement depuis le mock ou l'api.
- **Les hooks (`use*.ts`) et les composants UI ne savent jamais** si les
  données viennent du mock ou de Smoobu — ils appellent le repository via le
  point d'injection, point final.
- Exemple de structure pour le domaine properties/reservations/cleaning jobs :

```
features/properties/
├── property.types.ts            # types/interfaces, cohérents avec le MCD
├── property.repository.ts       # interface (contrat)
├── property.repository.mock.ts  # implémentation fictive
├── property.repository.api.ts   # stub, implémentation réelle à venir
├── property.repository.index.ts # point d'injection unique
├── useProperties.ts             # hooks TanStack Query
└── data/
    └── mock-properties.ts       # données fictives pures, séparées de la logique
```

Cette règle s'applique à tout nouveau domaine de données tant que son backend
réel n'est pas branché (pas seulement properties/reservations).

## Contenu attendu de la landing page

Proposition de structure (à valider avant de coder, pas à improviser en cours de
route) :

1. **Header** : logo, navigation (Services, Pourquoi nous, Contact), bouton
   d'appel à l'action (WhatsApp ou "Demander un devis") et lien "Se connecter"
   discret si un espace client/staff existe (lien vers `/login`, même si la page
   n'existe pas encore — ne jamais créer un lien mort sans le signaler)
2. **Hero** : promesse claire et large (nettoyage professionnel, fiable, pour
   particuliers et professionnels), un appel à l'action principal (devis/contact)
3. **Services** : les 6 prestations ci-dessus, présentées en cartes distinctes
   (icône, nom, courte description) — c'est le cœur de la page, pas une section
   secondaire
4. **Pourquoi D&D Clean** : fiabilité, réactivité, disponibilité (7j/7), zones
   d'intervention couvertes
5. **Fonctionnement** : 3 à 4 étapes simples (demande de devis → intervention
   planifiée → nettoyage effectué → vérification/satisfaction)
6. **Avis / confiance** : témoignages clients si disponibles, sinon section
   omise plutôt qu'inventée (voir contraintes anti-effet de bord)
7. **Appel à l'action final** : contact direct (téléphone, WhatsApp, formulaire)
8. **Footer** : coordonnées, zone d'intervention, mentions légales

Chaque service et chaque section est un composant isolé dans
`features/landing/sections/`, sans état partagé non nécessaire entre sections.

## Contraintes strictes — AUCUN EFFET DE BORD

Ce sont des règles dures, pas des préférences :

- **Aucune donnée inventée en dur dans un composant de production.** Tout texte,
  chiffre ou contenu variable vient du fichier `*.data.tsx` de la section
  concernée (voir la section SOLID/DRY plus bas), jamais codé en dur dans le JSX.
- **Aucune logique métier dans un composant UI.** Appel réseau, validation,
  redirection : toujours dans un hook dédié, jamais dans le `.tsx` qui affiche.
- **Aucun appel réseau sans TanStack Query.** Pas de `fetch` brut dans un
  `useEffect`, pas de requête déclenchée au rendu sans passer par un hook dédié.
- **Aucune modification d'un fichier hors du périmètre de la tâche demandée.**
  Si un changement semble nécessaire ailleurs (ex. config Tailwind, routing
  global), le signaler et demander avant de le faire, ne pas le faire en silence.
- **Aucune dépendance ajoutée** au `package.json` sans l'annoncer explicitement
  dans la réponse, avec la raison.
- **Aucune suppression ou renommage de fichier existant** sans le dire clairement
  avant de le faire.
- **Pas de refactor non demandé.** Une tâche sur la landing page ne touche pas à
  l'auth, et inversement.
- **Pas de `console.log` ni de code de debug laissé dans le code livré.**
- **Formulaires (login/registration)** : validation Zod stricte, aucune soumission
  sans validation côté client, messages d'erreur explicites par champ, jamais de
  mot de passe loggé ou affiché en clair quelque part (console, state visible).
- **Accessibilité** : labels explicites sur tout champ de formulaire, contrastes
  suffisants, navigation clavier fonctionnelle sur le menu et les CTA.
- **Responsive** : voir la section dédiée ci-dessus — s'applique à tout, sans
  exception.

## Avant de livrer une tâche

1. `npm run build` passe sans erreur ni warning.
2. `npm run lint` est propre.
3. Vérifier visuellement la section ou la page concernée sur 360px, 768px, 1024px
   et 1440px — pas de supposition, une vérification réelle à chaque largeur.
4. Résumer en une ligne ce qui a été fait — pas de récit des étapes intermédiaires.
5. Si une ambiguïté est apparue pendant le travail (contenu manquant, décision de
   design non tranchée), le signaler clairement plutôt que de deviner et continuer.

## Ce que ce fichier ne couvre pas

Interface agent mobile, SSE, intégration Smoobu réelle côté front (au-delà du
Repository pattern en données fictives défini plus haut) : hors scope tant que
non explicitement lancés. Ne pas préparer ces écrans "par anticipation".
































































































































































































