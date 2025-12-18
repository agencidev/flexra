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
Key fields: `slug`, `Title`, `excerpt`, `content`, `featuredImage`, `category`, `published`, `date`

## API Authentication
Protected routes require `x-api-key` header matching `POSTS_API_KEY`:
```bash
curl -X POST /api/case-studies -H "x-api-key: $POSTS_API_KEY" -d '{...}'
```

## Styleguide Reference
See `STYLEGUIDE.md` for complete design system including:
- Typography (DM Sans for body, system fonts for headings)
- Input styling: `rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200`
- Section padding: `px-[5%] py-16 md:py-24 lg:py-28`
- Pastel colors: `bg-pink-100`, `bg-yellow-100`, `bg-lime-100`, `bg-indigo-100`
- Touch targets: minimum 44x44px for clickable elements
