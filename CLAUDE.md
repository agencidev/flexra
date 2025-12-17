# Flexra Project Memory

## Project Overview
Flexra is a Next.js 16 website for an AI/automation consulting company. Uses AITable as headless CMS.

## Tech Stack
- Next.js 16 with App Router
- Tailwind CSS
- AITable API for content management
- Cloudflare Turnstile for form protection

## Environment Variables
```
AITABLE_API_TOKEN=xxx
AITABLE_SPACE_ID=xxx
AITABLE_FLEXRA_BLOG_ID=xxx
AITABLE_CASE_STUDIES_ID=xxx
POSTS_API_KEY=xxx
```

---

## Case Study System

### AITable Fields
| Field | Type | Description |
|-------|------|-------------|
| Title | SingleText | Case study title (default field) |
| slug | SingleText | URL-friendly identifier |
| client | SingleText | Customer name |
| clientLogo | URL | Customer logo URL |
| heroImage | URL | Main image |
| excerpt | Text | Short description for list page |
| industry | SingleSelect | Bygg, E-handel, Konsult, Finans, Tillverkning, Hälsovård, Utbildning, Transport, Fastighet, IT |
| category | SingleSelect | Processautomation, AI-integration, Integration, Dataanalys, Kundservice |
| categoryColor | SingleSelect | bg-pink-100, bg-yellow-100, bg-lime-100, bg-indigo-100, bg-blue-100 |
| challenge | Text | Markdown - customer's challenge |
| solution | Text | Markdown - our solution |
| results | Text | Markdown - achieved results |
| metrics | Text | JSON array: `[{"value": "80%", "label": "Improvement"}]` |
| gallery | Text | JSON array: `["url1", "url2"]` or `[{"url": "...", "alt": "..."}]` |
| techStack | SingleText | Comma-separated: `fortnox,slack,hubspot` |
| testimonial | Text | Customer quote |
| testimonialAuthor | SingleText | Quote author name |
| testimonialRole | SingleText | Quote author role |
| contactEmail | Email | Contact email |
| published | Checkbox | Publishing status |
| date | SingleText | Swedish format: "16 dec 2025" |
| company | SingleText | Filter by company (e.g., "FLEXRA") |
| metaTitle | SingleText | SEO title |
| metaDescription | Text | SEO description |
| keywords | SingleText | SEO keywords |
| noIndex | Checkbox | Exclude from search engines |

### Tech Stack Logo IDs
Available logos in `/public/logos/`:
- **CRM:** salesforce, hubspot, pipedrive
- **Finance:** fortnox, monitor, visma
- **Communication:** slack, teams, whatsapp, gmail, outlook, discord, linkedin
- **Storage:** google-drive, onedrive, dropbox, google-sheets, excel
- **Project Management:** notion, trello, jira, asana, monday, clickup, airtable
- **Support:** zendesk, freshdesk, intercom
- **Payments:** stripe, klarna, swish
- **Automation:** zapier, make, n8n
- **AI:** openai, anthropic, gemini, perplexity
- **E-commerce:** shopify, woocommerce
- **Scheduling:** calendly, google-calendar

### API Endpoints
- `GET /api/case-studies` - List all (filter: industry, category, company, limit)
- `POST /api/case-studies` - Create new (requires API key)
- `GET /api/case-studies/[slug]` - Get single
- `PUT /api/case-studies/[slug]` - Update (requires API key)
- `DELETE /api/case-studies/[slug]` - Delete (requires API key)
- `POST /api/case-studies/setup` - Create all fields in AITable (requires API key)

### Components
- `CaseStudyMetrics` - Displays metrics in pastel cards
- `CaseStudyTechStack` - Shows tech stack with logos
- `CaseStudyGallery` - Image gallery with lightbox

### Multi-site Usage
Filter case studies by `company` field to use same AITable for multiple sites:
```javascript
const caseStudies = await getAllCaseStudies({ company: "FLEXRA" });
```

---

## Blog System

### AITable Fields
Uses `AITABLE_FLEXRA_BLOG_ID` datasheet with similar structure.

### API Endpoints
- `GET /api/posts` - List all posts
- `POST /api/posts` - Create new (requires API key)
- `GET /api/posts/[slug]` - Get single
- `PUT /api/posts/[slug]` - Update (requires API key)
- `DELETE /api/posts/[slug]` - Delete (requires API key)

---

## Styleguide Notes
- See `STYLEGUIDE.md` for typography and component guidelines
- Use `PageLayout` component for consistent page structure
- Pastel colors: bg-pink-100, bg-yellow-100, bg-lime-100, bg-indigo-100
- Section padding: `px-[5%] py-16 md:py-24 lg:py-28`
