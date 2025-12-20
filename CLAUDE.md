# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server at localhost:3000
pnpm build            # Production build
pnpm lint             # Run ESLint
```

## Architecture

### Tech Stack
- Next.js 16 with App Router (JavaScript, no TypeScript)
- Tailwind CSS with Relume UI components
- AITable as headless CMS
- Cloudflare Turnstile for form spam protection

### Key Directories
- `app/` - Next.js App Router pages and API routes
- `components/` - React components (Relume-based layouts + custom blocks)
- `components/blocks/` - Reusable content blocks (FAQ, ContactForm, CaseStudy*, Blog*)
- `components/ui/` - Base UI components (Button, GetStartedButton)
- `lib/` - Data fetching utilities (aitable.js, posts.js, case-studies.js)
- `public/logos/` - Integration/tech stack logos (fortnox.svg, slack.svg, etc.)

### Data Flow
```
AITable API → lib/aitable.js → lib/posts.js / lib/case-studies.js → API routes → Pages
```

All content (blog posts, case studies) is stored in AITable and fetched via `lib/aitable.js`. Domain-specific logic lives in `lib/posts.js` and `lib/case-studies.js`.

### Page Layout Pattern
Use `PageLayout` component for consistent page structure with dark hero and navbar:
```jsx
<PageLayout title="Page Title" subtitle="Category">
  <section className="px-[5%] py-16 md:py-24 lg:py-28">
    {/* Content */}
  </section>
</PageLayout>
```

### CTA Buttons
Always use `GetStartedButton` for primary CTAs - it has animated chevron icon:
```jsx
<GetStartedButton dark>Boka möte</GetStartedButton>
<GetStartedButton dark loading={isLoading} loadingText="Skickar...">Skicka meddelande</GetStartedButton>
```

## Environment Variables

```
AITABLE_API_TOKEN=xxx
AITABLE_SPACE_ID=xxx
AITABLE_FLEXRA_BLOG_ID=xxx
AITABLE_CASE_STUDIES_ID=xxx
POSTS_API_KEY=xxx
NEXT_PUBLIC_TURNSTILE_SITE_KEY=xxx
TURNSTILE_SECRET_KEY=xxx
```

## AITable Content Systems

### Case Studies (`AITABLE_CASE_STUDIES_ID`)
Key fields: `slug`, `title`, `client`, `industry`, `category`, `categoryColor`, `heroImage`, `excerpt`, `challenge`, `solution`, `results`, `metrics` (JSON), `techStack` (comma-separated), `testimonial`, `published`, `company`

Multi-site filtering via `company` field:
```javascript
const caseStudies = await getAllCaseStudies({ company: "FLEXRA" });
```

### Blog Posts (`AITABLE_FLEXRA_BLOG_ID`)
Key fields: `slug`, `Title`, `excerpt`, `content`, `featuredImage`, `category`, `published`, `date`, `author`, `keywords`, `imageAlt`

**Important:** When creating blog posts, always use:
- `author: "Markus Westerlund"` (not "Flexra" or other values)
- `keywords`: Relevant SEO keywords for the post (comma-separated)
- `imageAlt`: Unique, descriptive alt text for the hero image (avoid generic phrases)

## API Authentication
Protected routes require `x-api-key` header matching `POSTS_API_KEY`:
```bash
curl -X POST /api/case-studies -H "x-api-key: $POSTS_API_KEY" -d '{...}'
```

---

## Case Study Intake Process

### Workflow
1. Användaren fyller i prompten nedan med grundinfo + URLs
2. Claude scrapar URLer för att hämta företagsinfo
3. Claude genererar komplett case study-data
4. Case skapas via POST till `/api/case-studies`

### Intake Prompt

```
KUNDCASE: [Projektnamn]

═══════════════════════════════════════════════════════════════
1. KUND & URLs (för automatisk datahämtning)
═══════════════════════════════════════════════════════════════
Företagsnamn:
Webbplats: [https://...] ← SCRAPA: företagsbeskrivning, bransch
LinkedIn företag: [URL] ← SCRAPA: anställda, beskrivning
Bransch: [Bygg/E-handel/Konsult/Finans/Tillverkning/Hälsovård/Utbildning/Transport/Fastighet/IT]

═══════════════════════════════════════════════════════════════
2. KONTAKTPERSON (för godkännande & testimonial)
═══════════════════════════════════════════════════════════════
Namn:
Roll/titel:
E-post:
LinkedIn: [URL] ← SCRAPA: korrekt titel
Får vi citera personen? [Ja/Nej/Fråga]

═══════════════════════════════════════════════════════════════
3. PROJEKTET
═══════════════════════════════════════════════════════════════
Vad var uppdraget (EN mening)?
Kategori: [Processautomation/AI-integration/Integration/Dataanalys/Kundservice]
System/verktyg: (t.ex. fortnox, slack, hubspot)
Tidsperiod: [start] - [slut]
Relevanta länkar: [docs, demo-URL, etc.]

═══════════════════════════════════════════════════════════════
4. SITUATIONEN FÖRE (Challenge)
═══════════════════════════════════════════════════════════════
Kundens huvudproblem:
Hur hanterades det innan?
Konkreta smärtpunkter:

VALFRITT - om du VET siffran:
- Tid som processen tog innan: [X timmar/vecka]
- Antal fel/problem: [X per månad]

═══════════════════════════════════════════════════════════════
5. VAD VI GJORDE (Solution)
═══════════════════════════════════════════════════════════════
Beskriv lösningen (2-3 meningar):
Huvudsteg i implementationen:
Integrationer som byggdes:
Implementationstid:

═══════════════════════════════════════════════════════════════
6. MÄTBARA RESULTAT - ⚠️ ENDAST VERIFIERBARA SIFFROR!
═══════════════════════════════════════════════════════════════
Välj DE som är verifierbara:

□ Tidsbesparing: ___ timmar/[vecka/månad]
  Hur vet vi detta? ___

□ Kostnadsbesparing: ___ kr/[månad/år]
  Hur vet vi detta? ___

□ Antal automatiserade processer: ___/[dag/vecka/månad]
  Hur vet vi detta? ___

□ Minskade fel: från ___ till ___
  Hur vet vi detta? ___

OM INGA EXAKTA SIFFROR: Beskriv kvalitativa förbättringar istället.

═══════════════════════════════════════════════════════════════
7. KUNDENS ORD (Testimonial)
═══════════════════════════════════════════════════════════════
Citat: "___"
Godkänt för publicering? [Ja/Nej/Väntar]

⚠️ SKRIVREGEL FÖR CITAT:
- Skriv naturligt, som en människa pratar
- UNDVIK tankstreck (–) och formella konstruktioner
- Använd komma eller punkt istället
- Kort och koncist, max 2-3 meningar

═══════════════════════════════════════════════════════════════
8. SEO (genereras automatiskt men kan anpassas)
═══════════════════════════════════════════════════════════════
Meta-titel: [lämna tomt för auto] eller anpassad
Meta-beskrivning: [lämna tomt för auto] eller anpassad (max 160 tecken)
Nyckelord: [kommaseparerade] eller lämna tomt

═══════════════════════════════════════════════════════════════
9. BILDER (⚠️ LOKALA FILER KRÄVS!)
═══════════════════════════════════════════════════════════════
Hero-bild: [lokal sökväg i /public/ eller "behöver laddas upp"]
Kundlogotyp: [lokal sökväg i /public/ - BE ANVÄNDAREN LADDA UPP]
Screenshots: [lokala sökvägar]

⚠️ VIKTIGT: Hämta ALDRIG logotyper från kundens webbplats!
   Be alltid användaren ladda upp loggan till /public/ först.
   Konvertera till WebP innan användning.
```

### AITable Fält-mapping

| Intake-fält | AITable-kolumn | Källa |
|-------------|----------------|-------|
| Företagsnamn | `client` | Input |
| Bransch | `industry` | Input/scraping |
| Projekt-titel | `title` | Genereras |
| Kategori | `category` | Input |
| System/verktyg | `techStack` | Input (kommaseparerat) |
| Situationen före | `challenge` | Input → Markdown |
| Vad vi gjorde | `solution` | Input → Markdown |
| Mätbara resultat | `results` + `metrics` | Input → Markdown + JSON |
| Citat | `testimonial` | Input |
| Kontaktperson | `testimonialAuthor`, `testimonialRole` | Input/LinkedIn |
| Bilder | `heroImage`, `clientLogo`, `gallery` | Lokala sökvägar (ex: `/kund-logo.webp`) |
| SEO | `metaTitle`, `metaDescription`, `keywords` | Input eller auto-genereras |

**Auto-genererade:**
- `slug` - från title
- `excerpt` - från challenge (max 160 tecken)
- `categoryColor` - baserat på category
- `date` - dagens datum
- `company` - "FLEXRA"
- `metaTitle` - från title om ej angivet
- `metaDescription` - från excerpt om ej angivet
- `keywords` - bransch + kategori + verktyg

### Skrivriktlinjer för Case Studies

⚠️ **UNDVIK AI-SPRÅK:**
- Inga tankstreck (–) i löpande text, använd komma eller punkt
- Inga överflödiga utfyllnadsord
- Skriv kort och konkret
- Använd aktiv form ("Vi byggde..." inte "Det byggdes...")
- Citat ska låta som riktig talspråk

### Metrics-strategi

**Alternativ 1 - Verkliga siffror:**
```json
[{"value": "15h", "label": "Sparad tid per vecka"}, {"value": "3", "label": "Integrerade system"}]
```

**Alternativ 2 - Kvalitativa:**
```json
[{"value": "100%", "label": "Automatiserat flöde"}, {"value": "24/7", "label": "Tillgänglighet"}]
```

**Alternativ 3 - Inga metrics:** Sätt `metrics: []` (sektionen visas inte)

## Styleguide Reference
See `STYLEGUIDE.md` for complete design system including:
- Typography (DM Sans for body, system fonts for headings)
- Input styling: `rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200`
- Section padding: `px-[5%] py-16 md:py-24 lg:py-28`
- Pastel colors: `bg-pink-100`, `bg-yellow-100`, `bg-lime-100`, `bg-indigo-100`
- Touch targets: minimum 44x44px for clickable elements
