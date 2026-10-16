# Design System — D&D Clean

## Product Context
- **Quoi** : site vitrine d'une entreprise de nettoyage professionnel basée à Nürnberg (Airbnb/RBnB, hôtels, bureaux, fin de chantier, voitures, canapés).
- **Pour qui** : particuliers et professionnels (hôtes Airbnb, hôtels, bureaux, artisans du bâtiment).
- **Espace** : services de nettoyage locaux — références : Merry Maids, Emerald House Cleaning, MoreHands, pages « turnover » Airbnb.
- **Type** : marketing (landing page), trilingue FR / DE / EN.
- **Memorable thing** : « Impeccable. À chaque passage. » — on peut leur confier les clés.

## Aesthetic Direction
- **Direction** : Utilitaire raffiné — la précision d'une fiche d'intervention, avec le soin d'une maison sérieuse.
- **Décoration** : minimale — filets fins, numérotation mono (01, 02…), pas d'illustrations ni de photos de banque d'images.
- **Mood** : net, calme, digne de confiance ; jamais « startup » ni « bulles de savon ».
- **Références** : webcitz.com/blog/best-cleaning-websites, ueni.com/blog/cleaning-service-website, zarla.com (templates Airbnb).

## Typography
- **Display/Hero** : Fraunces Variable (600, italique 400 en contrepoint) — serif chaleureux qui détonne dans une catégorie de sans-serif génériques.
- **Body** : Geist Variable — lisible, neutre, déjà en place via shadcn.
- **Data / labels** : Geist Mono (400/500) — numéros de section, eyebrows, étiquettes, chiffres.
- **Code** : Geist Mono.
- **Loading** : auto-hébergé via `@fontsource-variable/fraunces`, `@fontsource-variable/geist`, `@fontsource/geist-mono` (pas de Google Fonts distant — RGPD).
- **Scale** : 12 / 14 / 16 / 18 / 22 / 30 / 48 / 64 / 76 px (titres en `clamp()`).

## Color
- **Approche** : restrained — 1 primaire + 1 accent rare + neutres.
- **Primary** : `#0F5C4D` Forest — boutons, liens, numéros.
- **Primary hover** : `#0B463B`.
- **Accent** : `#D9F26B` Citron — uniquement sur fonds Ink et pour le CTA final.
- **Ink** : `#0E1A1A` — texte principal et blocs sombres.
- **Neutrals** : Paper `#FAFAF7` (fond) → White `#FFFFFF` (cartes) → Mint `#E6F2EC` (surfaces, tags) → Line `#DDE3DF` (filets) → Muted `#4A5654` (texte secondaire).
- **Semantic** : success `#1F7A4D`, warning `#B7791F`, error `#C2410C`, info `#1D5F8C`.
- **Dark mode** : non prévu (site vitrine clair uniquement).

## Spacing
- **Base** : 8px
- **Densité** : confortable / aérée
- **Scale** : 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64) 4xl(88)
- **Sections** : 56px vertical en mobile, 88px dès 1024px.

## Layout
- **Approche** : grid-disciplined
- **Grid** : 1 colonne (360) → 2 colonnes (768) → 3–4 colonnes (1024+) selon la section
- **Gouttière latérale** : 16px (mobile) → 32px (768+)
- **Max content width** : 1200px
- **Border radius** : sm 6px, md 10px, lg 16px, full 9999px
- **Zones tactiles** : 44px minimum

## Motion
- **Approche** : minimal-fonctionnel (hover, ouverture du menu mobile, scroll doux vers les ancres)
- **Easing** : enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration** : micro(50-100ms) court(150-250ms) moyen(250-400ms)
- Respect de `prefers-reduced-motion`.

## Decisions Log
| Date | Décision | Rationale |
|------|----------|-----------|
| 2026-10-16 | Création initiale | /design — landing trilingue d'une entreprise de nettoyage à Nürnberg, positionnement « fiable et précis » face à des concurrents génériques |
