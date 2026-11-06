# Manorama AI Desk (മലയാള മനോരമ AI ഡെസ്ക്)
### Intelligent Multilingual Newsroom Content Transformation Studio (5-Language Pipeline)

> **Official Logo:** Integrated using Image (3) (`manorama_ai_desk_logo.png`) as the official brand identity.  
> **Design References:** Inspired by Manorama Online Desktop (References 1 & 2) and Onmanorama Mobile App (References 1 & 4).  
> **Tagline:** *From raw information to publication-ready journalism.*  
> **Assessment Notice:** *Independent software engineer intern assessment prototype built for Malayala Manorama evaluation. This is not an official company product or endorsement.*

---

## 1. Project Overview & Major Architectural Enhancement

**Manorama AI Desk** is an end-to-end editorial intelligence platform designed for modern digital, broadcast, and print journalism. 

### 🌟 Core Architectural Capability: Automatic 5-Language Generation
A single input (interview transcript, reporter notes, rough draft, or news brief) automatically generates **five separate, complete, publication-ready journalistic news articles**:
1. **English** (`en`) — Onmanorama style, inverted-pyramid lead, crisp newsroom prose.
2. **Malayalam** (`ml`) — Malayala Manorama / Manorama Online style with native reporting verbs and authentic typography.
3. **Hindi** (`hi`) — National broadsheet journalism style.
4. **Tamil** (`ta`) — Regional newsroom conventions and accurate Tamil script transliteration.
5. **Telugu** (`te`) — Formal broadsheet news vocabulary and Telugu script transliteration.

**Key Journalistic Principles:**
- All 5 editions are generated from the **same original source material** (no daisy-chain translation).
- If one language generation encounters an issue, successfully generated languages are preserved, and only the failed language can be retried independently.
- Independent editing and Source Fact Guard auditing for each language edition.
- Side-by-side **5-Language Comparison View** ensuring narrative consistency.

---

## 2. Multi-Medium Publication Previews

The application includes realistic publication previews across four major mediums:

1. **📺 Manorama News (TV Broadcast)**:
   - Built to match **Reference Image 5**!
   - Studio backdrop and anchor visual feed.
   - White rounded logo badge on the left with the red/blue icon and Malayalam text **"സ്പീഡ് ന്യൂസ്"**.
   - Red 3D chevron arrow: **`>>> SPEED NEWS`**.
   - Big bold breaking headline bar.
   - **Live scrolling news ticker bar** positioned directly below the logo with smooth marquee animation and Play/Pause control!
2. **🌐 Digital News Website (Manorama Online & Onmanorama)**:
   - Designed after **Reference Images 1 & 2**.
   - Features red navigation bar, category tabs, breaking news flash strip, audio news badge, byline, and reading time.
3. **📰 Newspaper Broadsheet**:
   - Classic Malayala Manorama print broadsheet layout with authentic historic coat of arms masthead (`newspaper_malayalam.png` / `newspaper_english.png`) and 3-column layout.
4. **📱 Mobile News App**:
   - Designed after **Reference Image 4 (Onmanorama Mobile Showcase)**.
   - Smartphone container with status bar, category pills (`ALL`, `KERALA`, `NEWS`, `TECH`), location tags, news image, and bookmark/share buttons.

---

## 3. Technology Stack

- **Frontend:** React 19, TypeScript, Vite 6, Tailwind CSS 3.4, Lucide React.
- **Backend:** Node.js v24 (ESM), Express 4, TypeScript 5 with `tsx`, Zod 3 validation.
- **Fonts:** Google Fonts (`Anek Malayalam`, `Noto Serif Malayalam`, `Anek Devanagari`, `Anek Tamil`, `Anek Telugu`, `Inter`, `Merriweather`).
- **AI Engine:** Google Gemini API (`gemini-2.5-flash`), with automated deterministic Demo Mode fallback for offline testing without an API key.
- **NLP / Similarity:** Multilingual Cosine TF-IDF vectorizer preserving Indic Unicode scripts.

---

## 4. Setup & Running Instructions

### 1. Run Development Server
```bash
npm run dev
```
- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:5000`

### 2. Run Test Suite
```bash
npm test
```
All 7 unit and integration tests validate input sanitization, multilingual generation, and HTML exports.

### 3. Build for Production
```bash
npm run build
```

---

## 5. Standalone HTML Export (100% Offline Capable)
Each language edition supports independent or batch export:
- Click **"Download Standalone HTML"** or **"Download All 5 Languages"**.
- Creates fully self-contained `.html` files with embedded CSS and zero CDN dependencies.
- Opens flawlessly offline in any web browser with proper native Unicode font fallbacks.
