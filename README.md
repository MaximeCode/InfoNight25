# 🏙️ Le Village Numérique Résistant - Nuit de l'Info 2025

![Nuit de l'Info 2025 Badge](https://img.shields.io/badge/Nuit%20de%20l'Info-2025-blueviolet?style=for-the-badge&logo=mediamarkt)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

> **"Comment les établissements scolaires peuvent-ils réduire leur dépendance aux Big Tech et adopter un numérique inclusif, responsable et durable (NIRD) ?"**

Une application web immersive, ludique et interactive développée entre le coucher et le lever du soleil pour répondre à cette problématique cruciale.

---

## 📘 1. Présentation du Projet

### Contexte : Nuit de l'Info 2025

Ce projet a été réalisé dans le cadre de la **Nuit de l'Info 2025**, un hackathon national où des équipes d'étudiants s'affrontent pour développer une application web du coucher au lever du soleil (4 au 5 décembre 2025).

### Concept : Le NIRD Purity Test

Notre réponse au sujet prend la forme d'un **"Purity Test" numérique**.
Plutôt que de faire la morale aux utilisateurs, nous les invitons à tester leur niveau de "résistance" face aux GAFAM et aux mauvaises pratiques numériques.

L'application propose :

- Un **diagnostic ludique** sur 6 axes du numérique responsable.
- Une **Carte d'Identité de Résistant** générée dynamiquement.
- Des **mini-jeux cachés** et des défis UX décalés.
- Une ambiance **Cyberpunk / Synthwave** pour rendre le sujet attractif.

### Philosophie NIRD

**N**umérique **I**nclusif, **R**esponsable et **D**urable.
L'objectif est de sensibiliser sur l'obsolescence programmée, la souveraineté des données, et l'impact écologique du cloud, sans être ennuyeux.

---

## 🧑‍🤝‍🧑 2. L'Équipe

**Team : MaximeCode & LeBaptouBaptiste**

Des développeurs passionnés qui ont troqué leur sommeil contre du code (et beaucoup de café).

- **Développement Fullstack** : Architecture Next.js, Logique de jeu, Intégration.
- **Design & UI** : Charte graphique Synthwave, Animations, Responsive Design.

---

## 🎮 3. Fonctionnalités

### 🛡️ NIRD Purity Test

Le cœur de l'application. Une série de 15 questions réparties en 6 catégories :

- **Obsolescence & Matériel**
- **Sobriété Numérique**
- **Souveraineté & Cloud**
- **Logiciels Libres**
- **Sécurité Numérique**
- **Durabilité & Réemploi**

### 🆔 Générateur de Carte ID

À la fin du test, l'utilisateur reçoit une "Carte de Résistant" unique :

- **Score Global & Rank** (Novice, Apprenti, Villageois, Héros).
- **Radar Chart** détaillant les forces et faiblesses.
- **QR Code** de validation.
- **Export PNG** haute définition.

### 🎨 Système de Thèmes Dynamique

L'application change radicalement d'ambiance selon le thème choisi :

- **Retro (Défaut)** : Ambiance Synthwave, néons cyan/magenta, polices pixel/mono.
- **Dark** : Mode sombre sobre, vert "Matrix", haute lisibilité.
- **Light** : Mode clair, épuré, style "Corporatif".

### 🤖 Chatbot "Chat'bruti"

Un assistant virtuel volontairement absurde avec 3 personnalités :

- **Professeur Trucmuche** : Pseudo-intellectuel à côté de la plaque.
- **Madame Irma 2.0** : Voyante numérique déjantée.
- **Dr. Hors-Sujet** : Diagnostics médicaux basés sur la météo.
  _Note : Il répond à des commandes secrètes comme `sudo snake`._

### 🖱️ Challenge "Donald Norman à l'envers"

Un champ de saisie anti-ergonomique (sur la page d'accueil) :

- Le curseur ne suit pas la souris.
- Il se pilote comme un vaisseau spatial (Rotation + Boost).
- Il faut stabiliser le curseur sur une cible pour déverrouiller l'accès.

### 🐍 Easter Egg : Snake.exe

Caché dans l'application !

- **Comment l'activer ?** Entrez le pseudo `sudo snake` lors de la génération de la carte, ou via le Chatbot.
- Un Snake complet style "Retro Terminal".
- **Malus Windows** : Manger le logo Windows fait perdre des points et rétrécir le serpent.
- **Bonus Linux** : Manger le pingouin Tux donne un boost de vitesse et de score.
- **Mobile** : Contrôles tactiles dédiés sur téléphone.

### 🌌 Chaos Email (Gravity Keyboard)

Pour envoyer son résultat par mail, l'utilisateur doit "attraper" les lettres qui flottent en apesanteur et rebondissent un peu partout. Un cauchemar UX assumé !

---

## 🧪 4. Architecture Technique

### Stack

- **Framework** : [Next.js 16](https://nextjs.org/) (App Router)
- **Langage** : JavaScript (React)
- **Styling** : [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Icons** : Lucide React
- **Export Image** : `html-to-image`

### Structure du Projet

```bash
src/
├── app/                 # Pages et Routing (App Router)
│   ├── layout.js        # Layout global (fontes, meta)
│   ├── page.js          # Accueil (Hero + Cursor Challenge)
│   ├── test/            # Page du Quiz
│   └── result/          # Page de Résultats + ID Card
├── components/
│   ├── game/            # Composants de jeu (Snake, QuestionCard, CursorChallenge...)
│   ├── layout/          # Hero, Footer...
│   ├── ui/              # Composants réutilisables (Button, Card, Modal...)
│   └── Chatbot.jsx      # Logique du Chatbot
├── data/
│   └── questions.js     # Base de données des questions
```

### Mécanique de Scoring

Les scores sont calculés via un hook d'état local qui accumule les points par catégorie.
À la fin du test, les résultats sont :

1. Sérialisés en JSON.
2. Encodés en URI.
3. Passés en paramètre d'URL à la page `/result`.
   Cela permet de partager son résultat simplement via l'URL sans base de données complexe.

---

## 🛠️ 5. Guide d'Installation

### Prérequis

- Node.js 18+
- npm, yarn, ou pnpm

### Installation

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/MaximeCode/InfoNight25.git
   cd InfoNight25
   ```

2. Installer les dépendances :

   ```bash
   npm install
   ```

3. Lancer le serveur de développement :

   ```bash
   npm run dev
   ```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build Production

```bash
npm run build
npm start
```

---

## 🖥️ 6. Guide d'Utilisation

1. **Lancement** : Arrivez sur la Home. Déverrouillez l'accès en réussissant le mini-jeu du curseur (flèches directionnelles ou contrôles tactiles).
2. **Le Test** : Répondez aux 15 questions. Chaque réponse influence votre score dans une des 6 catégories NIRD.
3. **Résultat** : Découvrez votre profil.
   - Changez le thème (Retro/Dark/Light) pour voir la carte changer.
   - Entrez votre pseudo.
   - **Astuce** : Entrez `sudo snake` pour une surprise.
4. **Partage** : Cliquez sur "Télécharger ma Carte" pour obtenir un PNG stylé à partager sur les réseaux.

---

## 🧩 7. Défis Nuit de l'Info Validés

| Défi                | Implémentation                                                                        |
| :------------------ | :------------------------------------------------------------------------------------ |
| **Purity Test**     | Système complet de quiz avec pondération par catégorie et radar chart.                |
| **Gamification**    | Mini-jeux (Curseur, Snake, Gravity Keyboard) intégrés au parcours.                    |
| **Chatbot Idiot**   | "Chat'bruti" intégré avec réponses absurdes et prompts systémiques drôles.            |
| **Anti-Ergonomie**  | Le "Cursor Challenge" force l'utilisateur à piloter un vaisseau au lieu d'une souris. |
| **Easter Egg**      | Snake complet caché derrière le pseudo `sudo snake`.                                  |
| **Thème Synthwave** | Design néon, grilles en perspective, effets CRT et scanlines.                         |

---

## 🎨 8. Design & Visuels

### Palettes de Couleurs (Tailwind)

- **NIRD Green** (`#10b981`): Symbole de durabilité et succès.
- **NIRD Neon** (`#06b6d4`): Couleur primaire du thème Retro/Tech.
- **NIRD Gold** (`#f59e0b`): Accents et grades élevés.
- **NIRD Dark** (`#0f172a`): Fond profond bleu nuit pour le constraste.

### UX Mobile First

L'application a été optimisée pour mobile :

- Le Snake dispose de **contrôles tactiles virtuels** (D-Pad).
- La carte d'identité utilise une transformation CSS `scale()` pour tenir sur les petits écrans tout en gardant sa résolution native pour l'export.

---

## 🔮 9. Améliorations Futures

- [ ] Ajouter un leaderboard global via une base de données.
- [ ] Plus de mini-jeux pour chaque catégorie NIRD.
- [ ] Mode multijoueur pour le Snake.
- [ ] Traduction anglaise complète.

---

## 📜 10. Licence

Ce projet est sous licence **MIT**. Vous êtes libres de le réutiliser, de le modifier et de le partager, tant que vous citez les auteurs originaux.

---

_Fait avec ❤️, ☕ et beaucoup de pixels pendant la Nuit de l'Info 2025._
