# D&D Clean — Frontend (CLAUDE.md)

Ce fichier s'applique au frontend du projet D&D Clean (racine : `dd-clean/`,
désigné ci-dessous par `frontend/`). Il prévaut sur toute habitude par défaut
de l'assistant. Avant toute tâche sur ce dossier, le lire en entier.

Référence : le plan d'architecture complet (modèle de données, API, back-end)
est dans le document Claude Docs du projet. Ce fichier ne couvre QUE le
frontend et il ne redéfinit rien côté back-end, Smoobu, SSE ou base de données.

## Skill de design — obligatoire avant toute UI

Avant de construire ou modifier une page, une section ou un composant visuel —
la landing page comme tout le reste de l'app par la suite — charger le skill
`SKILL.md` (dans `.agents/skills/design`), pour garantir un rendu
professionnel et de haute qualité, cohérent sur tout le site. Ce n'est pas
optionnel : un écran construit sans être passé par ce skill n'est pas considéré
terminé, au même titre que le responsive ou le build qui passe.

D'autres skills existent dans `.agents/skills/` (`interroge`, `cadre`,
`illustre`, …) — leur rôle et leur condition de déclenchement sont à préciser ;
dès qu'ils sont clarifiés, ils seront ajoutés ici avec leur propre règle
d'usage.

## Mission actuelle (ordre strict, ne pas anticiper)

1. **Landing page publique** — professionnelle, prête à convaincre un
   propriétaire ou un client de contacter D&D Clean. C'est la SEULE tâche en
   cours tant qu'elle n'est pas validée.
2. **Authentification** — `/login` et `/register`, une fois la landing page
   validée.
3. **Le reste** (dashboard, interface agent, etc.) — hors scope pour l'instant.
   Ne pas créer de routes, composants ou dossiers pour des écrans non demandés,
   même si l'architecture générale les prévoit pour plus tard.

Ne jamais passer à l'étape suivante sans validation explicite sur l'étape en
cours.

## Responsive — non négociable, sur toute page et tout élément

Cette règle s'applique à **chaque page et chaque composant créé**, sans
exception, dès le premier commit — ce n'est pas une passe de finition à faire
plus tard.

- **Mobile d'abord** : on écrit le CSS pour le plus petit écran, puis on ajoute
  les règles pour les écrans plus grands (`min-width`), jamais l'inverse.
- **Plages à couvrir pour chaque page/élément livré** : 360px (petit mobile),
  768px (tablette), 1024px, 1440px (desktop large). Aucune page n'est considérée
  terminée si elle n'a pas été vérifiée sur ces quatre largeurs.
- **Aucun débordement horizontal** à aucune largeur, aucun texte tronqué sans
  le vouloir, aucun élément qui chevauche un autre.
- **Zones tactiles ≥ 44px** sur mobile (boutons, liens, champs de formulaire).
- **Images et médias** : toujours responsives (`max-width: 100%` ou équivalent
  Tailwind), jamais de largeur ou hauteur fixe en pixels qui casse sur petit
  écran.
- Un composant livré sans avoir été vérifié sur les quatre largeurs n'est
  **pas** un composant terminé, même si le reste de la tâche est fait.

## Stack imposée (ne pas en dévier sans demande explicite)

- React 18+ avec TypeScript strict, Vite
- React Router pour le routing
- TanStack Query pour tout état serveur (jamais de `useState` + `useEffect`
  pour simuler un fetch)
- Tailwind CSS + shadcn/ui pour les composants
- React Hook Form + Zod pour tout formulaire (y compris login/registration)
- Aucune autre librairie UI (pas de MUI, Ant Design, Bootstrap,
  styled-components…) sans accord explicite

## Commandes

- `npm run dev` : serveur de développement
- `npm run build` : build de production — **doit passer sans erreur et sans
  erreur TypeScript avant toute livraison**
- `npm run lint` : ESLint, doit être propre avant de considérer une tâche
  terminée
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
│   └── lib/                      # utilitaires purs (formatage, constantes, …)
└── public/
```

Un composant par fichier, PascalCase. Une section de la landing page = un
dossier sous `features/landing/sections/`, pas un grand fichier monolithique.

## SOLID et DRY — séparation stricte UI / données / logique

Trois rôles bien distincts, jamais mélangés dans le même fichier :

- **Le composant UI (`.tsx`) a une seule responsabilité : afficher.** Il reçoit
  ses valeurs en props ou les importe depuis un fichier `*.data.tsx` voisin, il
  n'a aucune logique métier, aucun appel réseau, aucune règle de validation
  écrite en dur à l'intérieur. S'il a besoin de données (textes, listes, liens,
  valeurs statiques), elles vivent dans un fichier `NomDuComposant.data.tsx` à
  côté, et le composant les importe — jamais de valeurs écrites en dur
  dispersées dans le JSX.
- **Les hooks (`use*.ts`) portent toute la logique métier** : appel API via
  TanStack Query, soumission de formulaire, redirection après login, gestion
  d'erreur. Un composant UI appelle un hook, il ne contient jamais cette
  logique lui-même. Un hook spécifique à une feature reste dans son dossier
  (ex. `features/auth/useLogin.ts`) ; un hook réutilisé par plusieurs features
  monte dans `hooks/`.
- **DRY** : si un même bloc visuel (carte, badge, bouton avec icône, titre de
  section) apparaît ou est susceptible d'apparaître plus d'une fois, il devient
  un composant réutilisable dans `components/common/`, pas une copie-collée
  locale à chaque section. Avant d'écrire un nouveau composant, vérifier qu'un
  équivalent n'existe pas déjà dans `components/ui/` ou `components/common/`.

Concrètement, pour une section de landing page : `Hero.tsx` affiche,
`Hero.data.tsx` fournit le titre/sous-titre/CTA, et si un bouton ou une carte
s'y répète ailleurs sur le site, il est extrait en composant partagé plutôt
que dupliqué.

## Open/Closed — un composant s'étend, il ne se modifie pas

Un composant doit être **ouvert à l'extension, fermé à la modification** :
ajouter un nouveau cas d'usage ne doit jamais obliger à réécrire l'intérieur
d'un composant existant et déjà utilisé ailleurs.

- **Variantes par props, jamais par branchement interne qui grossit.** Si un
  bouton doit exister en plusieurs styles (primaire, secondaire, danger), il
  prend une prop `variant`, gérée proprement (ex. `cva` de shadcn/ui) — on
  n'ajoute pas un troisième `if` dans le composant à chaque nouveau besoin
  visuel, et encore moins un composant `ButtonRouge.tsx` à côté de `Button.tsx`.
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

D&D Clean est une entreprise de nettoyage professionnel (basée à Nürnberg),
pas un éditeur de logiciel. Ses services couvrent :

- **Ménage Airbnb / RBNB** : nettoyage entre deux locations courte durée
- **Hôtels** : nettoyage des chambres et parties communes
- **Bureaux** : nettoyage professionnel d'espaces de travail
- **Fin de chantier** : nettoyage après travaux/construction
- **Voitures** : nettoyage intérieur/extérieur de véhicules
- **Canapés** : nettoyage et détachage de canapés et assises

La landing page vend ces services à des particuliers et professionnels
(hôtels, bureaux, propriétaires Airbnb). Elle ne présente PAS de logiciel de
gestion : le dashboard interne mentionné dans l'architecture du projet est un
outil de back-office pour D&D Clean elle-même, pas un argument commercial de
cette page.

## Contenu attendu de la landing page

Proposition de structure (à valider avant de coder, pas à improviser en cours
de route) :

1. **Header** : logo, navigation (Services, Pourquoi nous, Contact), bouton
   d'appel à l'action (WhatsApp ou "Demander un devis") et lien "Se connecter"
   discret si un espace client/staff existe (lien vers `/login`, même si la
   page n'existe pas encore — ne jamais créer un lien mort sans le signaler)
2. **Hero** : promesse claire et large (nettoyage professionnel, fiable, pour
   particuliers et professionnels), un appel à l'action principal
   (devis/contact)
3. **Services** : les 6 prestations ci-dessus, présentées en cartes distinctes
   (icône, nom, courte description) — c'est le cœur de la page, pas une section
   secondaire
4. **Pourquoi D&D Clean** : fiabilité, réactivité, disponibilité (7j/7), zones
   d'intervention couvertes
5. **Fonctionnement** : 3 à 4 étapes simples (demande de devis → intervention
   planifiée → nettoyage effectué → vérification/satisfaction)
6. **Avis / confiance** : témoignages clients si disponibles, sinon section
   omise plutôt qu'inventée (voir contraintes anti-effet de bord)
7. **Appel à l'action final** : contact direct (téléphone, WhatsApp,
   formulaire)
8. **Footer** : coordonnées, zone d'intervention, mentions légales

Chaque service et chaque section est un composant isolé dans
`features/landing/sections/`, sans état partagé non nécessaire entre sections.

## Contraintes strictes — AUCUN EFFET DE BORD

Ce sont des règles dures, pas des préférences :

- **Aucune donnée inventée en dur dans un composant de production.** Tout
  texte, chiffre ou contenu variable vient du fichier `*.data.tsx` de la
  section concernée (voir la section SOLID/DRY), jamais codé en dur dans le JSX.
- **Aucune logique métier dans un composant UI.** Appel réseau, validation,
  redirection : toujours dans un hook dédié, jamais dans le `.tsx` qui affiche.
- **Aucun appel réseau sans TanStack Query.** Pas de `fetch` brut dans un
  `useEffect`, pas de requête déclenchée au rendu sans passer par un hook dédié.
- **Aucune modification d'un fichier hors du périmètre de la tâche demandée.**
  Si un changement semble nécessaire ailleurs (ex. config Tailwind, routing
  global), le signaler et demander avant de le faire, ne pas le faire en
  silence.
- **Aucune dépendance ajoutée** au `package.json` sans l'annoncer explicitement
  dans la réponse, avec la raison.
- **Aucune suppression ou renommage de fichier existant** sans le dire
  clairement avant de le faire.
- **Pas de refactor non demandé.** Une tâche sur la landing page ne touche pas
  l'auth, et inversement.
- **Pas de `console.log` ni de code de debug laissé dans le code livré.**
- **Formulaires (login/registration)** : validation Zod stricte, aucune
  soumission sans validation côté client, messages d'erreur explicites par
  champ, jamais de mot de passe loggé ou affiché en clair quelque part
  (console, state visible).
- **Accessibilité** : labels explicites sur tout champ de formulaire, contrastes
  suffisants, navigation clavier fonctionnelle sur le menu et les CTA.
- **Responsive** : voir la section dédiée ci-dessus — s'applique à tout, sans
  exception.

## Avant de livrer une tâche

1. `npm run build` passe sans erreur ni warning.
2. `npm run lint` est propre.
3. Vérifier visuellement la section ou la page concernée sur 360px, 768px,
   1024px et 1440px — pas de supposition, une vérification réelle à chaque
   largeur.
4. Résumer en une ligne ce qui a été fait — pas de récit des étapes
   intermédiaires.
5. Si une ambiguïté est apparue pendant le travail (contenu manquant, décision
   de design non tranchée), le signaler clairement plutôt que de deviner et
   continuer.

## Ce que ce fichier ne couvre pas

Dashboard secrétaire, interface agent mobile, SSE, intégration Smoobu côté
front : hors scope tant que la mission 3 n'est pas officiellement lancée. Ne
pas préparer ces écrans "par anticipation".
