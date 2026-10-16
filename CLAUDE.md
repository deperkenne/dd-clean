# D&D Clean — Frontend (CLAUDE.md)


Ce fichier s'applique au dossier `frontend/` du projet D&D Clean. Il 
prévaut sur toute
habitude par défaut de l'assistant. Avant toute tâche sur ce dossier, 
le lire en entier.


Référence : le plan d'architecture complet (modèle de données, API, 
back-end) vit dans
le document Claude Docs du projet. Ce fichier ne couvre QUE le fronten
et le design —
il ne redéfinit rien côté back-end, Smoobu, SSE ou base de données.


## Skill de design — obligatoire avant toute UI


Avant de construire ou modifier une page, une section ou un composant 
visuel —
la landing page comme tout le reste de l'app par la suite — charger le
skill
`skills` (dans `.agent/skills/`) avec l'outil Skill, pour garantir un 
rendu
professionnel et de haute qualité, cohérent sur tout le site. Ce n'est
pas
optionnel : un écran construit sans être passé par ce skill n'est pas 
considéré
terminé, au même titre que le responsive ou le build qui passe.


Trois autres skills existent dans `.agent/skills/` (`introge`, `cadre`


`illustre`) — leur rôle et leur condition de déclenchement sont à préc
ser ;
dès qu'ils sont clarifiés, ils seront ajoutés ici avec leur propre règ
e
d'usage.

## Mission actuelle (ordre strict, ne pas anticiper)


1. ~~**Landing page publique**~~ — ✅ terminée et validé
2. **Authentification & autorisation (OAuth 2.0 / OIDC a
   en cours. Voir la section dédiée plus bas pour les rè
3. **Le reste** (dashboard, interface agent, etc.) — hor
   Ne pas créer de routes, composants ou dossiers pour d
   même si l'architecture générale les prévoit pour plus


Ne jamais passer à l'étape suivante sans validation expl


## Responsive — non négociable, sur toute page et tout é


Cette règle s'applique à **chaque page et chaque composa
dès le premier commit — ce n'est pas une passe de finiti


- **Mobile d'abord** : on écrit le CSS pour le plus peti
  règles pour les écrans plus grands (`min-width`), jama
- **Plages à couvrir pour chaque page/élément livré** : 
  768px (tablette), 1024px, 1440px (desktop large). Aucu
  terminée si elle n'a pas été vérifiée sur ces quatre l
- **Aucun débordement horizontal** à aucune largeur, auc
  le vouloir, aucun élément qui chevauche un autre.
- **Zones tactiles ≥ 44px** sur mobile (boutons, liens, 
- **Images et médias** : toujours responsives (`max-widt
  Tailwind), jamais de largeur ou hauteur fixe en pixels
- Un composant livré sans avoir été vérifié sur les quat
  un composant terminé, même si le reste de la tâche est


## Logo D&D Clean sur tous les formulaires


Règle transverse, valable pour tout formulaire de l'appl
(login, registration, contact, et tout autre à venir) : 
être visible sur chaque formulaire**, pas seulement sur 
formulaire livré sans le logo n'est pas considéré termin


## Stack imposée (ne pas en dévier sans demande explicit


- React 18+ avec TypeScript strict, Vite
- React Router pour le routing
- TanStack Query pour tout état serveur (jamais de `useS
  simuler un fetch)
- Tailwind CSS + shadcn/ui pour les composants
- React Hook Form + Zod pour tout formulaire (y compris 
- Aucune autre librairie UI (pas de MUI, Ant Design, Boo
  sans accord explicite


## Commandes


- `npm run dev` : serveur de développement
- `npm run build` : build de production — **doit passer 
  TypeScript avant toute livraison**
- `npm run lint` : ESLint, doit être propre avant de con
- `npm run preview` : vérifier le build localement


## Organisation des dossiers


```
frontend/
├── src/
│   ├── main.tsx, App.tsx
│   ├── app/
│   │   ├── router.tsx          # routes publiques (land
│   │   └── queryClient.ts
│   ├── features/
│   │   ├── landing/
│   │   │   └── sections/
│   │   │       ├── Hero/
│   │   │       │   ├── Hero.tsx        # UI pure : affi
│   │   │       │   └── Hero.data.tsx   # contenu/valeur
│   │   │       └── ...                 # une section = 
│   │   └── auth/
│   │       ├── LoginPage.tsx           # UI pure
│   │       ├── RegisterPage.tsx        # UI pure
│   │       ├── useLogin.ts             # hook métier (a
│   │       ├── useRegister.ts          # hook métier
│   │       └── auth.schema.ts          # schémas Zod pa
│   ├── components/ui/           # composants shadcn/ui,
│   ├── components/layout/       # Header, Footer, parta
│   ├── components/common/       # composants réutilisab
│   │                             # (Button custom, Card
│   ├── hooks/                    # hooks métier transve
│   │                             # plusieurs features (
│   └── lib/                      # utilitaires purs (fo
└── public/
```


Un composant par fichier, PascalCase. Une section de la 
sous `features/landing/sections/`, pas un grand fichier 


## SOLID et DRY — séparation stricte UI / données / logi


Trois rôles bien distincts, jamais mélangés dans le même


- **Le composant UI (`.tsx`) a une seule responsabilité 
  ses valeurs en props ou les importe depuis un fichier 
  n'a aucune logique métier, aucun appel réseau, aucune 
  écrite en dur à l'intérieur. S'il a besoin de données 
  valeurs statiques), elles vivent dans un fichier `NomD
  côté, et le composant les importe — jamais de valeurs 
  dans le JSX.
- **Les hooks (`use*.ts`) portent toute la logique métie
  TanStack Query, soumission de formulaire, redirection 
  d'erreur. Un composant UI appelle un hook, il ne conti
  logique lui-même. Un hook spécifique à une feature res
  (ex. `features/auth/useLogin.ts`) ; un hook réutilisé 
  monte dans `hooks/`.
- **DRY** : si un même bloc visuel (carte, badge, bouton
  section) apparaît ou est susceptible d'apparaître plus
  un composant réutilisable dans `components/common/`, p
  locale à chaque section. Avant d'écrire un nouveau com
  équivalent n'existe pas déjà dans `components/ui/` ou 


Concrètement, pour une section de landing page : `Hero.t
fournit le titre/sous-titre/CTA, et si un bouton ou une 
sur le site, il est extrait en composant partagé plutôt 


## Open/Closed — un composant s'étend, il ne se modifie 


Un composant doit être **ouvert à l'extension, fermé à l
un nouveau cas d'usage ne doit jamais obliger à réécrire
existant et déjà utilisé ailleurs.


- **Variantes par props, jamais par branchement interne 
  bouton doit exister en plusieurs styles (primaire, sec
  prend une prop `variant`, gérée proprement (ex. `cva` 
  n'ajoute pas un troisième `if` dans le composant à cha
  et encore moins un composant `ButtonRouge.tsx` à côté 
- **Composition plutôt que paramètres qui s'accumulent.*
  besoin d'accueillir un contenu variable prend un `chil
  type `render`/`slot`, plutôt qu'une liste de props tou
  (`showIcon`, `showBadge`, `showExtra`...) qui finit pa
  d'origine.
- **Avant de modifier un composant partagé existant** (`
  `components/common/`) pour un nouveau besoin : vérifie
  `children` suffit à couvrir ce besoin sans toucher à s
  Si la modification changerait le comportement des usag
  ailleurs sur le site, c'est le signal qu'il faut une n
  nouveau composant, pas une réécriture de l'existant.
- **Les fichiers `*.data.tsx` suivent la même logique** 
  ou un nouveau contenu s'ajoute en créant son propre fi
  réécrire la structure de données d'une section déjà en


## Qui est D&D Clean


D&D Clean est une entreprise de nettoyage professionnel 
un éditeur de logiciel. Ses services couvrent :


- **Ménage Airbnb / RBNB** : nettoyage entre deux locati
- **Hôtels** : nettoyage des chambres et parties commune
- **Bureaux** : nettoyage professionnel d'espaces de tra
- **Fin de chantier** : nettoyage après travaux/construc
- **Voitures** : nettoyage intérieur/extérieur de véhicu
- **Canapés** : nettoyage et détachage de canapés et ass


La landing page vend ces services à des particuliers et 
bureaux, propriétaires Airbnb). Elle ne présente PAS de 
le dashboard interne mentionné dans l'architecture du pr
back-office pour D&D Clean elle-même, pas un argument co


## Authentification & autorisation — OAuth 2.0 / OIDC av


Mission en cours. S'ajoute aux règles déjà posées plus h
hooks, Open/Closed, responsive) — ne les répète pas, les


### Architecture et design patterns


- **Isolation stricte logique métier / UI**, comme défin
  SOLID/DRY plus haut : aucune logique d'auth dans un co
- **Types et interfaces TypeScript dans des fichiers déd
  d'implémentation (ex. `auth.types.ts` à côté de `auth.
  `type`/`interface` défini au milieu d'un hook ou d'un 
- **Design patterns pertinents** à utiliser selon le bes
  - **Adapter** pour isoler le SDK/client Keycloak derri
    à nous — si on change de provider OIDC un jour, seul
  - **Repository** pour l'accès aux données utilisateur/
  - **Strategy** si plusieurs façons de s'authentifier c
    code à usage unique pour les agents, mentionné dans 
- **Code minimaliste** : rien d'ajouté « au cas où » ; s
  fournit déjà un mécanisme (refresh automatique, gestio
  le réimplémenter à côté.


### Structure (vient compléter l'arborescence `features/


```
features/auth/
├── LoginPage.tsx              # UI pure
├── RegisterPage.tsx           # UI pure
├── auth.types.ts              # types et interfaces (Us
├── auth.schema.ts             # schémas Zod (validation
├── useLogin.ts                # hook métier : déclenche
├── useAuthSession.ts          # hook métier : session c
├── keycloak.adapter.ts        # Adapter : seul fichier 
└── auth.repository.ts         # Repository : accès aux 
```


Aucun composant UI n'importe `keycloak.adapter.ts` direc
hook.


### Validation et performance


- **Toute donnée est pré-validée côté client avant tout 
  formulaire (Zod), format/structure des tokens reçus, p
  ne jamais envoyer une requête qu'on sait déjà invalide
  ou provoquer des timeouts inutiles.
- Pas de requête déclenchée avant que la validation loca


### Sécurité (non négociable)
- **Stockage des tokens** : jamais dans `localStorage` en clair pour un 
  sensible (risque XSS) ; privilégier ce que recommande le flux OIDC uti
  Keycloak (ex. Authorization Code + PKCE, tokens gérés en mémoire ou co
  httpOnly selon ce que permet l'architecture back-end — à confirmer ava
  d'implémenter, ne pas choisir au hasard).
- **Jamais de token, secret ou mot de passe loggé**, même en développeme
- **Gestion des rôles/permissions** : les rôles viennent du token (claim
  jamais d'une donnée locale modifiable côté client. L'UI peut masquer u
  selon le rôle, mais la vraie vérification de permission reste côté bac
- Respecter le flux standard OAuth 2.0 / OIDC avec Keycloak sans raccour
  « maison » qui s'écarte du protocole.


### Documentation et pédagogie


- **Commentaires extrêmement clairs et didactiques**, en particulier dan
  `keycloak.adapter.ts` et les hooks d'auth : quelqu'un qui ne développe
  pouvoir lire les commentaires et comprendre, dans les grandes lignes, 
  fonctionnent OAuth 2.0, OIDC, et leur intégration avec Keycloak dans c
- Un commentaire explique le **pourquoi** (ce que fait ce flux et pourqu
  nécessaire), pas seulement une paraphrase du code.


## Contenu attendu de la landing page


Proposition de structure (à valider avant de coder, pas à improviser en 
route) :


1. **Header** : logo, navigation (Services, Pourquoi nous, Contact), bou
   d'appel à l'action (WhatsApp ou "Demander un devis") et lien "Se conn
   discret si un espace client/staff existe (lien vers `/login`, même si
   n'existe pas encore — ne jamais créer un lien mort sans le signaler)
2. **Hero** : promesse claire et large (nettoyage professionnel, fiable,
   particuliers et professionnels), un appel à l'action principal (devis
3. **Services** : les 6 prestations ci-dessus, présentées en cartes dist
   (icône, nom, courte description) — c'est le cœur de la page, pas une 
   secondaire
4. **Pourquoi D&D Clean** : fiabilité, réactivité, disponibilité (7j/7),
   d'intervention couvertes
5. **Fonctionnement** : 3 à 4 étapes simples (demande de devis → interve
   planifiée → nettoyage effectué → vérification/satisfaction)
6. **Avis / confiance** : témoignages clients si disponibles, sinon sect
   omise plutôt qu'inventée (voir contraintes anti-effet de bord)
7. **Appel à l'action final** : contact direct (téléphone, WhatsApp, for
8. **Footer** : coordonnées, zone d'intervention, mentions légales


Chaque service et chaque section est un composant isolé dans
`features/landing/sections/`, sans état partagé non nécessaire entre sec


## Contraintes strictes — AUCUN EFFET DE BORD


Ce sont des règles dures, pas des préférences :


- **Aucune donnée inventée en dur dans un composant de production.** Tou
  chiffre ou contenu variable vient du fichier `*.data.tsx` de la sectio
  concernée (voir la section SOLID/DRY plus bas), jamais codé en dur dan
- **Aucune logique métier dans un composant UI.** Appel réseau, validati
  redirection : toujours dans un hook dédié, jamais dans le `.tsx` qui a
- **Aucun appel réseau sans TanStack Query.** Pas de `fetch` brut dans u
  `useEffect`, pas de requête déclenchée au rendu sans passer par un hoo
- **Aucune modification d'un fichier hors du périmètre de la tâche deman
  Si un changement semble nécessaire ailleurs (ex. config Tailwind, rout
  global), le signaler et demander avant de le faire, ne pas le faire en
- **Aucune dépendance ajoutée** au `package.json` sans l'annoncer explic
  dans la réponse, avec la raison.
- **Aucune suppression ou renommage de fichier existant** sans le dire 
clairement
  avant de le faire.
- **Pas de refactor non demandé.** Une tâche sur la landing page ne 
touche pas à
  l'auth, et inversement.
- **Pas de `console.log` ni de code de debug laissé dans le code livré.
**
- **Formulaires (login/registration)** : validation Zod stricte, aucune
 soumission
  sans validation côté client, messages d'erreur explicites par champ, 
  jamais de
  mot de passe loggé ou affiché en clair quelque part (console, state 
  visible).
- **Accessibilité** : labels explicites sur tout champ de formulaire, 
contrastes
  suffisants, navigation clavier fonctionnelle sur le menu et les CTA.
- **Responsive** : voir la section dédiée ci-dessus — s'applique à tout,
sans
  exception.


## Avant de livrer une tâche


1. `npm run build` passe sans erreur ni warning.
2. `npm run lint` est propre.
3. Vérifier visuellement la section ou la page concernée sur 360px, 
768px, 1024px
   et 1440px — pas de supposition, une vérification réelle à chaque 
   largeur.
4. Résumer en une ligne ce qui a été fait — pas de récit des étapes 
intermédiaires.
5. Si une ambiguïté est apparue pendant le travail (contenu manquant, 
décision de
   design non tranchée), le signaler clairement plutôt que de deviner 
   et continuer.


## Ce que ce fichier ne couvre pas


Dashboard secrétaire, interface agent mobile, SSE, intégration Smoobu 
côté front :
hors scope tant que la mission 3 n'est pas officiellement lancée. 
Ne pas préparer
ces écrans "par anticipation".