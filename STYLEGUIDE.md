# Flexra Styleguide

> **Version:** 2.4
> **Senast uppdaterad:** December 2025
> **Baserad på:** Förstasidan och befintliga komponenter

Denna styleguide fungerar som regelverk för hela Flexra-webbplatsen. Följ dessa specifikationer för att säkerställa ett konsekvent utseende och känsla på alla undersidor.

---

## Innehållsförteckning

1. [Typografi](#1-typografi)
2. [Färgpalett](#2-färgpalett)
3. [Layout](#3-layout)
4. [Komponenter](#4-komponenter)
5. [Animationer & Övergångar](#5-animationer--övergångar)
6. [Ikoner](#6-ikoner)
7. [Bilder](#7-bilder)
8. [Tillgänglighet](#8-tillgänglighet)
9. [SEO & Metadata](#9-seo--metadata)
10. [Prestanda](#10-prestanda)
11. [Tone of Voice](#11-tone-of-voice)
12. [Nya komponenter](#12-nya-komponenter)
13. [Återanvändbara Block-komponenter](#13-återanvändbara-block-komponenter)
14. [Mobilanpassning](#14-mobilanpassning)
15. [Blogg-system & API](#15-blogg-system--api)
16. [Case Study-system](#16-case-study-system)

---

## 1. Typografi

### 1.1 Fontfamiljer

| Användning | Font | CSS-variabel | Fallback |
|------------|------|--------------|----------|
| **Rubriker (h1-h6)** | Space Grotesk | `var(--font-space-grotesk)` | `sans-serif` |
| **Brödtext & UI** | DM Sans | `var(--font-dm-sans)` | `sans-serif` |

#### Tillgängliga vikter

**Space Grotesk (Rubriker):**
- Regular (400) - Standard för rubriker
- Medium (500)
- SemiBold (600)
- Bold (700)

**DM Sans (Brödtext):**
- Regular (400) - Standard för brödtext
- Medium (500) - UI-element, labels
- Bold (700) - Betoning, knappar

### 1.2 Rubriknivåer (h1-h6)

Alla rubriker använder `font-weight: 400` och `line-height: 1.1` som standard.

| Nivå | Storlek (Desktop) | Storlek (rem) | Användning |
|------|-------------------|---------------|------------|
| **h1** | 80px | `5rem` | Huvudrubrik på hero-sektioner |
| **h2** | 56px | `3.5rem` | Sektionsrubriker |
| **h3** | 40px | `2.5rem` | Underrubriker, kort-titlar |
| **h4** | 32px | `2rem` | Feature-titlar |
| **h5** | 24px | `1.5rem` | Mindre rubriker, lista-titlar |
| **h6** | 20px | `1.25rem` | Minsta rubriknivå |

#### CSS-implementation
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-space-grotesk), sans-serif;
  line-height: 1.1;
  font-weight: 400;
}

h1 { font-size: 5rem; }      /* 80px */
h2 { font-size: 3.5rem; }    /* 56px */
h3 { font-size: 2.5rem; }    /* 40px */
h4 { font-size: 2rem; }      /* 32px */
h5 { font-size: 1.5rem; }    /* 24px */
h6 { font-size: 1.25rem; }   /* 20px */
```

#### VIKTIGT: Rubriker utan Tailwind-storlekar

Baserat på förstasidan (mallen) ska rubriker använda **rena HTML-element** utan Tailwind-storleksklasser. CSS-filen hanterar all storlek och responsivitet.

```jsx
// ✅ KORREKT - ren h2 med endast margin
<h2 className="mb-6">AI och automation för moderna företag</h2>
<h2 className="mb-4">Verktyg vi arbetar med</h2>
<h3>Arbeta smartare, inte hårdare</h3>

// ❌ FEL - använd INTE responsiva storleksklasser
<h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">...</h2>

// ❌ FEL - använd INTE italic i rubriker
<h2>Verktyg vi <span className="italic">arbetar med</span></h2>

// ❌ FEL - använd INTE delvis grå text i rubriker
<h2>Enkelt att <span className="text-gray-500">integrera</span></h2>
```

#### Tillåtna klasser på rubriker
- `mb-*` (margin-bottom för spacing)
- `max-w-*` (max-width för läsbarhet)
- `text-white` / `text-text-alternative` (på mörk bakgrund)

### 1.3 Brödtext

| Element | Storlek | Line-height | Användning |
|---------|---------|-------------|------------|
| **p (standard)** | `1.3rem` (20.8px) | `1.6` | Brödtext, sektionsbeskrivningar, hero-text |
| **p.text-sm** | `0.875rem` (14px) | `1.5` | Grid-items, kort, feature-beskrivningar |
| **p.text-xs** | `0.75rem` (12px) | `1.5` | Labels, metadata, fotnoter |
| **p.text-lg** | `1.125rem` (18px) | `1.6` | Ingress, lead-text |

#### CSS-implementation
```css
p {
  font-size: 1.3rem;
  line-height: 1.6;
}
```

### 1.4 Textstorlek per kontext

**Baserat på förstasidan (mallen):**

| Kontext | Tailwind-klass | Källa |
|---------|----------------|-------|
| **Hero beskrivning** | `text-gray-600` (standard) | Header23 |
| **Sektionsbeskrivning** | `text-gray-600` (standard) | Layout396, Layout442 |
| **FAQ subtitle** | `text-gray-600` (standard) | FAQ block |
| **FAQ svar** | `text-gray-600` (standard) | FAQ block |
| **Grid-item beskrivning** | `text-sm text-gray-600` | Layout29 features |
| **Kort-beskrivning** | `text-sm text-gray-600` | Tool cards, service cards |

#### Regel
- **Standard storlek** för sektionsbeskrivningar och längre texter
- **text-sm** endast för små upprepade items i grid/lista (features, tools, kort)

#### Exempel från förstasidan
```jsx
// Hero/sektion - STANDARD storlek
<p className="text-gray-600">
  Vi hjälper företag att frigöra tid...
</p>

// Grid-item (many items) - text-sm
<p className="text-gray-600 text-sm leading-relaxed">
  Kort beskrivning i feature-grid...
</p>
```

### 1.5 Textfärger

#### På ljus bakgrund (vit/grå)
| Användning | Färg | Tailwind-klass |
|------------|------|----------------|
| Primär text | `#000000` | `text-black` |
| Sekundär text | `#4B5563` | `text-gray-600` |
| Tertiär/muted | `#6B7280` | `text-gray-500` |
| Disabled | `#9CA3AF` | `text-gray-400` |

#### På mörk bakgrund (svart/mörkgrå)
| Användning | Färg | Tailwind-klass |
|------------|------|----------------|
| Primär text | `#FFFFFF` | `text-white` |
| Sekundär text | `rgba(255,255,255,0.9)` | `text-white/90` eller `opacity-90` |
| Tertiär/muted | `rgba(255,255,255,0.7)` | `text-white/70` |
| Subtil | `rgba(255,255,255,0.6)` | `text-white/60` |
| Disabled | `rgba(255,255,255,0.5)` | `text-white/50` |

### 1.5 Korrekt vs Inkorrekt användning

#### ✅ Korrekt
```jsx
// Rubrik med rätt font och vikt
<h2 className="text-3xl md:text-4xl">Sektionsrubrik</h2>

// Brödtext med rätt färg på ljus bakgrund
<p className="text-gray-600">Beskrivande text här...</p>

// Text på mörk bakgrund
<p className="text-white opacity-90">Text på mörk bakgrund</p>
```

#### ❌ Inkorrekt
```jsx
// FEL: Använd inte font-bold på rubriker (de ska vara 400)
<h2 className="font-bold">Rubrik</h2>

// FEL: Använd inte svart text på mörk bakgrund
<p className="text-black">Text på mörk bakgrund</p>

// FEL: Använd inte för liten text för huvudbrödtext
<p className="text-xs">Huvudbrödtext...</p>
```

---

## 2. Färgpalett

### 2.1 Primära färger

| Namn | HEX | RGB | HSL | Tailwind | Användning |
|------|-----|-----|-----|----------|------------|
| **Svart (Primary)** | `#171717` | `rgb(23, 23, 23)` | `hsl(0, 0%, 9%)` | `bg-gray-900` | Knappar, navbar, footer |
| **Vit** | `#FFFFFF` | `rgb(255, 255, 255)` | `hsl(0, 0%, 100%)` | `bg-white` | Bakgrund, kort |
| **Off-white** | `#F8F8F6` | `rgb(248, 248, 246)` | - | `bg-[#f8f8f6]` | Alternativ bakgrund |

### 2.2 Accentfärger (Pastelltoner)

Dessa används för kort, badges, ikoner och dekorativa element.

| Namn | HEX | RGB | Tailwind | Användning |
|------|-----|-----|----------|------------|
| **Rosa/Pink** | `#FCE7F3` | `rgb(252, 231, 243)` | `bg-pink-100` | Kort, badges, ikon-bakgrund |
| **Gul/Yellow** | `#FEF9C3` | `rgb(254, 249, 195)` | `bg-yellow-100` | Kort, CTA-bakgrund, badges |
| **Lime/Grön** | `#ECFCCB` | `rgb(236, 252, 203)` | `bg-lime-100` | Kort, badges, ikon-bakgrund |
| **Indigo/Blå** | `#E0E7FF` | `rgb(224, 231, 255)` | `bg-indigo-100` | Kort, markerade element, CTA |

#### Mörkare varianter (för text på pastellbakgrund)
| Namn | HEX | Tailwind | Användning |
|------|-----|----------|------------|
| **Rosa text** | - | `text-pink-800` | Text på rosa bakgrund |
| **Gul text** | - | `text-yellow-800` | Text på gul bakgrund |
| **Lime text** | `#65A30D` | `text-lime-600` / `text-lime-700` | Text på lime bakgrund |
| **Indigo text** | - | `text-indigo-800` | Text på indigo bakgrund |
| **Indigo border** | `#6366F1` | `border-indigo-500` | Ram på indigo kort |

### 2.3 Gråskala

| Namn | HEX | Tailwind | Användning |
|------|-----|----------|------------|
| **Gray 50** | `#F9FAFB` | `bg-gray-50` | Subtil bakgrund |
| **Gray 100** | `#F3F4F6` | `bg-gray-100` | Kort-bakgrund, badges |
| **Gray 200** | `#E5E7EB` | `border-gray-200` | Borders, dividers |
| **Gray 500** | `#6B7280` | `text-gray-500` | Muted text |
| **Gray 600** | `#4B5563` | `text-gray-600` | Sekundär text |
| **Gray 700** | `#374151` | `text-gray-700` | Ikon-färg |
| **Gray 800** | `#1F2937` | `bg-gray-800` | Mörk bakgrund |
| **Gray 900** | `#111827` | `bg-gray-900` | Navbar, footer |
| **Gray 950** | `#030712` | `bg-gray-950` | Darkest |

### 2.4 Mörk bakgrund (Hero/Footer)

```jsx
// Gradient för hero och page-headers
className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"

// Solid för footer
style={{ backgroundColor: '#1a1a1a' }}
```

### 2.5 Färghierarki för element

| Element | Primär färg | Sekundär färg |
|---------|-------------|---------------|
| **Bakgrund (ljus)** | `#FFFFFF` | `#F8F8F6` |
| **Bakgrund (mörk)** | `#1a1a1a` | Gradient `gray-900 → gray-800` |
| **Kort** | `#FFFFFF` | Pastellfärger (rosa/gul/lime) |
| **Text (ljus bg)** | `#000000` | `#4B5563` (gray-600) |
| **Text (mörk bg)** | `#FFFFFF` | `rgba(255,255,255,0.7)` |
| **Borders** | `#E5E7EB` (gray-200) | `#F3F4F6` (gray-100) |
| **Ikoner** | `#374151` (gray-700) | Pastellbakgrund |

### 2.6 Hover & Active States

| Element | Default | Hover | Active |
|---------|---------|-------|--------|
| **Primary Button** | `bg-gray-900` | `bg-gray-900/90` | `scale-95` |
| **Secondary Button** | `bg-gray-100` | `bg-gray-100/80` | `scale-95` |
| **Outline Button** | `border-black bg-transparent` | `bg-black/5` | - |
| **Link** | `text-gray-900` | `underline` | - |
| **Link (mörk bg)** | `text-white` | `underline` | - |
| **Kort** | `shadow-none` | `shadow-lg` | - |
| **Nav-länk** | `text-white/90` | `text-white` | - |

### 2.7 Korrekt vs Inkorrekt användning

#### ✅ Korrekt
```jsx
// Pastellfärger för kort
<div style={{ backgroundColor: '#fce7f3' }}>Rosa kort</div>
<div style={{ backgroundColor: '#fef9c3' }}>Gult kort</div>
<div style={{ backgroundColor: '#ecfccb' }}>Lime kort</div>
<div style={{ backgroundColor: '#e0e7ff' }}>Indigo kort</div>

// Grå text på ljus bakgrund
<p className="text-gray-600">Sekundär text</p>

// Vit text med opacity på mörk bakgrund
<p className="text-white/70">Muted text på mörk bakgrund</p>
```

#### ❌ Inkorrekt
```jsx
// FEL: Använd inte starka/mättade färger
<div className="bg-pink-500">För stark rosa</div>
<div className="bg-yellow-400">För stark gul</div>

// FEL: Använd inte starka blå - använd pastellvarianten bg-indigo-100 istället
<div className="bg-blue-500">För stark blå</div>

// FEL: Använd inte för låg kontrast
<p className="text-gray-300">För ljus text på vit bakgrund</p>
```

---

## 3. Layout

### 3.1 Container & Maxbredd

```jsx
// Standard container (centrerad med maxbredd)
<div className="container">...</div>

// Container med horisontell padding
<div className="px-[5%]">
  <div className="container">...</div>
</div>
```

**Container-specifikationer:**
- Maxbredd: Definieras av Tailwind/Relume preset
- Horisontell padding: `5%` på båda sidor (`px-[5%]`)
- Centrerad: `mx-auto` (inbyggt i `.container`)

### 3.2 Responsiva brytpunkter

| Namn | Minbredd | Tailwind-prefix | Användning |
|------|----------|-----------------|------------|
| **Mobile** | 0px | (default) | Bas-stilar |
| **sm** | 640px | `sm:` | Större mobiler |
| **md** | 768px | `md:` | Tablets |
| **lg** | 1024px | `lg:` | Laptops |
| **xl** | 1280px | `xl:` | Desktop |
| **2xl** | 1536px | `2xl:` | Stora skärmar |

### 3.3 Gridsystem

#### Standard 3-kolumns grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
  {/* Grid items */}
</div>
```

#### 2-kolumns grid (50/50)
```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
  {/* Grid items */}
</div>
```

#### Feature grid (6 items)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
  {/* Feature items */}
</div>
```

### 3.4 Sektions-spacing (Whitespace)

| Sektion | Padding (Mobile) | Padding (Tablet) | Padding (Desktop) |
|---------|------------------|------------------|-------------------|
| **Standard** | `py-16` (64px) | `py-24` (96px) | `py-28` (112px) |
| **Hero** | `min-h-[calc(100vh-1rem)]` | `min-h-[calc(100vh-2rem)]` | - |
| **Kompakt** | `py-12` (48px) | `py-16` (64px) | `py-20` (80px) |

#### CSS-implementation
```jsx
// Standard sektion
<section className="px-[5%] py-16 md:py-24 lg:py-28">
  <div className="container">...</div>
</section>

// Hero sektion
<section className="px-[5%] min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-2rem)]">
  ...
</section>
```

### 3.5 Komponent-spacing

| Element | Margin/Gap | Tailwind |
|---------|------------|----------|
| **Rubrik → Brödtext** | 16-24px | `mb-4` / `mb-6` |
| **Brödtext → CTA** | 24-32px | `mt-6` / `mt-8` |
| **Sektionsrubrik → Innehåll** | 48-80px | `mb-12 md:mb-16 lg:mb-20` |
| **Kort-gap** | 24-32px | `gap-6` / `gap-8` |
| **Knapp-gap** | 16px | `gap-4` / `gap-x-4` |

### 3.6 Wrapper med padding (Cards/Sections)

```jsx
// Yttre wrapper med liten padding (för rounded corners)
<div className="p-2 md:p-4">
  <section className="rounded-3xl ...">
    ...
  </section>
</div>
```

### 3.7 Maxbredd för textinnehåll

| Innehåll | Maxbredd | Tailwind |
|----------|----------|----------|
| **Hero-rubrik** | 65rem (1040px) | `max-w-[65rem]` |
| **Hero-brödtext** | 32rem (512px) | `max-w-lg` |
| **Sektionsrubrik** | 64rem (1024px) | `max-w-4xl` |
| **Artikelinnehåll** | 56rem (896px) | `max-w-4xl` (med container) |

### 3.8 Korrekt vs Inkorrekt användning

#### ✅ Korrekt
```jsx
// Konsekvent sektions-padding
<section className="px-[5%] py-16 md:py-24 lg:py-28">
  <div className="container">...</div>
</section>

// Responsivt grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Begränsad textbredd
<h1 className="max-w-4xl">Lång rubrik som inte ska bli för bred</h1>
```

#### ❌ Inkorrekt
```jsx
// FEL: Inkonsekvent padding
<section className="px-4 py-10">  // Använd px-[5%] och py-16/24/28

// FEL: Fast bredd istället för responsivt
<div className="w-[1200px]">  // Använd container eller max-w-*

// FEL: Ingen maxbredd på text
<p className="w-full">Väldigt lång text utan maxbredd blir svårläst...</p>
```

---

## 4. Komponenter

### 4.1 Knappar

#### Varianter

| Variant | Bakgrund | Text | Border | Användning |
|---------|----------|------|--------|------------|
| **default** | `bg-gray-900` | `text-white` | - | Primär CTA |
| **secondary** | `bg-gray-100` | `text-gray-900` | - | Sekundär action |
| **outline** | `transparent` | `text-black` | `border-black` | Tertiär action |
| **ghost** | `transparent` | - | - | Subtil action |
| **link** | `transparent` | `text-gray-900` | - | Inline-länk |
| **link-alt** | `transparent` | `text-white` | - | Länk på mörk bg |
| **secondary-alt** | `bg-white/20` | `text-white` | - | Sekundär på mörk bg |

#### Storlekar

| Storlek | Höjd | Padding | Tailwind |
|---------|------|---------|----------|
| **sm** | 36px | `px-3` | `size="sm"` |
| **default** | 40px | `px-4 py-2` | `size="default"` |
| **lg** | 44px | `px-8` | `size="lg"` |
| **icon** | 40x40px | - | `size="icon"` |

#### Gemensamma stilar
```jsx
// Alla knappar har:
className="rounded-[100px] text-sm font-medium transition-colors"
```

#### GetStartedButton (Special CTA)
```jsx
<GetStartedButton>Boka möte</GetStartedButton>
<GetStartedButton dark>Boka</GetStartedButton>  // Mörk variant
```

**Specifikationer:**
- Storlek: `lg` (44px höjd)
- Animerad ikon som expanderar vid hover
- Två varianter: ljus (vit bg) och mörk (svart bg)

#### Användningsexempel
```jsx
// Primär CTA
<Button>Kontakta oss</Button>

// Sekundär
<Button variant="secondary">Läs mer</Button>

// Outline
<Button variant="outline">Läs mer</Button>

// Länk på mörk bakgrund
<Button variant="link-alt">Läs mer</Button>

// Special CTA med animation
<GetStartedButton>Boka möte</GetStartedButton>
```

### 4.2 Kort (Cards)

#### Standard kort
```jsx
<div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
  {/* Innehåll */}
</div>
```

#### Färgat kort (Feature card)
```jsx
<div 
  className="rounded-3xl p-8 md:p-10 min-h-[400px]" 
  style={{ backgroundColor: '#fce7f3' }}  // eller #fef9c3 eller #ecfccb
>
  <h3>Rubrik</h3>
  <p className="text-gray-600">Beskrivning</p>
</div>
```

#### Bild-kort (Blog/Case study)
```jsx
<article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
  <div className="aspect-[4/3] overflow-hidden relative">
    <Image src="..." fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
  </div>
  <div className="p-6">
    {/* Text-innehåll */}
  </div>
</article>
```

#### Kort-specifikationer

| Egenskap | Värde |
|----------|-------|
| **Border-radius** | `rounded-2xl` (16px) eller `rounded-3xl` (24px) |
| **Padding** | `p-6` (24px) eller `p-8 md:p-10` (32-40px) |
| **Border** | `border border-gray-100` |
| **Shadow (hover)** | `hover:shadow-lg` |
| **Transition** | `transition-shadow` eller `transition-all duration-300` |

### 4.3 Badges/Tags

```jsx
// Standard badge
<span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
  Tag
</span>

// Färgad badge
<span className="px-3 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-800">
  Insikter
</span>

// Uppercased badge
<span className="text-sm uppercase tracking-wider text-gray-500">
  Kategori
</span>
```

### 4.4 Navbar

```jsx
// Navbar-wrapper (fixed, glassmorphism)
<nav className="fixed top-0 left-0 right-0 z-50 px-[5%] py-5">
  <div className={`mx-auto max-w-5xl rounded-full px-8 py-4 transition-all duration-300 border ${
    isScrolled 
      ? "bg-[#1a1a1a] border-white/10 shadow-lg" 
      : "bg-white/10 backdrop-blur-md border-white/20"
  }`}>
    {/* Innehåll */}
  </div>
</nav>
```

**Specifikationer:**
- Position: `fixed`, `z-50`
- Maxbredd: `max-w-5xl`
- Border-radius: `rounded-full`
- Glassmorphism: `bg-white/10 backdrop-blur-md`
- Scrolled state: Solid mörk bakgrund

### 4.5 Footer

```jsx
<div className="p-2 md:p-4">
  <footer className="px-[5%] py-12 md:py-18 lg:py-20 rounded-3xl text-white" style={{ backgroundColor: '#1a1a1a' }}>
    {/* Innehåll */}
  </footer>
</div>
```

**Specifikationer:**
- Bakgrund: `#1a1a1a`
- Border-radius: `rounded-3xl`
- Yttre padding: `p-2 md:p-4`
- Text: Vit med opacity-varianter

### 4.6 Formulärfält (Inputs)

```jsx
// Text input
<input 
  type="text"
  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
  placeholder="Placeholder..."
/>

// Textarea
<textarea 
  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors resize-none"
  rows={4}
/>
```

**Specifikationer:**
| Egenskap | Värde |
|----------|-------|
| **Padding** | `px-4 py-3` |
| **Border-radius** | `rounded-xl` (12px) |
| **Border** | `border-gray-200` |
| **Focus border** | `border-gray-400` |
| **Focus ring** | `ring-2 ring-gray-200` |

### 4.7 Ikon-container

```jsx
// Ikon med färgad bakgrund
<div 
  className="w-12 h-12 rounded-xl flex items-center justify-center"
  style={{ backgroundColor: '#fce7f3' }}  // Pastellfärg
>
  <IconComponent className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
</div>
```

---

## 5. Animationer & Övergångar

### 5.1 Standard transitions

| Typ | Duration | Easing | Tailwind |
|-----|----------|--------|----------|
| **Färg/opacity** | 150ms | ease | `transition-colors` |
| **Shadow** | 150ms | ease | `transition-shadow` |
| **Transform** | 300ms | ease | `transition-transform duration-300` |
| **All** | 300ms | ease | `transition-all duration-300` |

### 5.2 Hover-effekter

```jsx
// Kort med shadow
className="hover:shadow-lg transition-shadow"

// Bild-zoom
className="group-hover:scale-105 transition-transform duration-300"

// Knapp-färg
className="hover:bg-primary/90 transition-colors"

// Länk med underline
className="hover:underline"

// Ikon-container scale
className="hover:scale-110 transition-transform"
```

### 5.3 Logo-scroll animation

```jsx
// Definierad i tailwind.config.js
animation: {
  "logo-scroll": "logo-scroll 40s linear infinite",
},
keyframes: {
  "logo-scroll": {
    from: { transform: "translateX(0)" },
    to: { transform: "translateX(-100%)" },
  },
},

// Användning
<div className="animate-logo-scroll">...</div>
```

### 5.4 GetStartedButton animation

```jsx
// Ikon expanderar från 25% till 100% bredd vid hover
<i className="... w-1/4 group-hover:w-[calc(100%-0.5rem)] transition-all duration-500">
  <ChevronRight />
</i>

// Text fadar ut
<span className="transition-opacity duration-500 group-hover:opacity-0">
  Text
</span>
```

### 5.5 Korrekt vs Inkorrekt användning

#### ✅ Korrekt
```jsx
// Subtil hover-effekt
<div className="hover:shadow-lg transition-shadow">

// Konsekvent duration
<div className="transition-transform duration-300">

// Grupperad hover
<div className="group">
  <img className="group-hover:scale-105 transition-transform duration-300" />
</div>
```

#### ❌ Inkorrekt
```jsx
// FEL: För lång duration
<div className="transition-all duration-1000">  // Max 500ms

// FEL: För aggressiv animation
<div className="hover:scale-150">  // Max scale-110

// FEL: Ingen transition
<div className="hover:shadow-lg">  // Lägg till transition-shadow
```

---

## 6. Ikoner

### 6.1 Ikonbibliotek

**Primärt:** Lucide React (`lucide-react`)

```jsx
import { Clock, Scale, Target, ChevronRight, Menu, X } from "lucide-react";
```

### 6.2 Storlekar

| Kontext | Storlek | Tailwind | strokeWidth |
|---------|---------|----------|-------------|
| **Inline med text** | 16px | `w-4 h-4` | 2 |
| **Knapp-ikon** | 16px | `w-4 h-4` | 2 |
| **Feature-ikon** | 20px | `w-5 h-5` | 1.5 |
| **Navbar-ikon** | 24px | `w-6 h-6` | 2 |
| **Hero-ikon** | 24-32px | `w-6 h-6` / `w-8 h-8` | 1.5 |

### 6.3 Färger

| Kontext | Färg | Tailwind |
|---------|------|----------|
| **På ljus bakgrund** | `#374151` | `text-gray-700` |
| **På mörk bakgrund** | `#FFFFFF` | `text-white` |
| **Muted** | `#6B7280` | `text-gray-500` |
| **I knapp** | Ärver | `currentColor` |

### 6.4 Användningsexempel

```jsx
// Feature-ikon med bakgrund
<div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#fce7f3' }}>
  <Clock className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
</div>

// Knapp med ikon
<Button>
  Nästa <ChevronRight className="w-4 h-4 ml-2" />
</Button>

// Navbar hamburger
<Menu className="w-6 h-6 text-white" />
```

---

## 7. Bilder

### 7.1 Next.js Image-komponent

**Alla bilder ska använda `next/image`** för optimering.

```jsx
import Image from "next/image";

// Med fasta dimensioner
<Image 
  src="/logo.png" 
  alt="Logo" 
  width={300} 
  height={88}
  className="h-6 w-auto"
/>

// Fill-läge (för responsiva bilder)
<div className="relative aspect-[4/3]">
  <Image 
    src={imageUrl} 
    alt="Beskrivning" 
    fill
    sizes="(min-width: 1024px) 33vw, 100vw"
    className="object-cover"
  />
</div>
```

### 7.2 Aspect ratios

| Användning | Ratio | Tailwind |
|------------|-------|----------|
| **Kort-bild** | 4:3 | `aspect-[4/3]` |
| **Hero-bild** | 2:1 | `aspect-[2/1]` |
| **Avatar (rund)** | 1:1 | `rounded-full` + fasta mått |
| **Bakgrundsbild** | fill | `fill` + `object-cover` |

### 7.3 Avatar-storlekar

| Kontext | Storlek | Tailwind |
|---------|---------|----------|
| **Liten (footer)** | 40px | `w-10 h-10` |
| **Medium (författare)** | 48px | `w-12 h-12` |
| **Stor (team)** | 128px | `w-32 h-32` |

```jsx
// Avatar
<div className="relative w-12 h-12 rounded-full overflow-hidden">
  <Image src={avatarUrl} alt={name} fill sizes="48px" className="object-cover" />
</div>
```

### 7.4 Bildeffekter

```jsx
// Zoom vid hover
<div className="overflow-hidden">
  <Image className="group-hover:scale-105 transition-transform duration-300" />
</div>

// Rounded corners
<div className="rounded-2xl overflow-hidden">
  <Image ... />
</div>
```

---

## 8. Tillgänglighet

### 8.1 Fokus-stilar

```jsx
// Knappar har inbyggda fokus-stilar:
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

### 8.2 Alt-texter

- **Alla bilder** måste ha beskrivande `alt`-text
- **Dekorativa bilder** kan ha `alt=""`
- **Logotyper** ska ha företagsnamnet som alt

### 8.3 Semantisk HTML

```jsx
// Använd rätt element
<nav>...</nav>           // Navigation
<main>...</main>         // Huvudinnehåll
<section>...</section>   // Sektioner
<article>...</article>   // Artiklar/kort
<footer>...</footer>     // Footer

// Använd rubriker i rätt ordning
<h1> → <h2> → <h3>  // Hoppa inte över nivåer
```

### 8.4 Kontrast

- **Text på ljus bakgrund:** Minst `gray-600` för läsbarhet
- **Text på mörk bakgrund:** Vit eller `white/90`
- **Pastellbakgrunder:** Använd `gray-600` eller mörkare för text

---

## 9. SEO & Metadata

### 9.1 Sidtitlar (Title tags)

| Sidtyp | Format | Exempel |
|--------|--------|---------|
| **Startsida** | `Flexra - Webb & Automation för företag` | - |
| **Tjänstesidor** | `[Tjänst] | Flexra` | `Webbyrå | Flexra` |
| **Undersidor** | `[Sidnamn] - [Kategori] | Flexra` | `Om oss - Företaget | Flexra` |
| **Blogg** | `[Artikelrubrik] | Flexra Blogg` | - |

**Regler:**
- Max 60 tecken (visas i sökresultat)
- Primärt nyckelord först
- Varumärke sist, separerat med `|` eller `-`
- Unik titel för varje sida

```jsx
// Next.js metadata
export const metadata = {
  title: 'Webbyrå Stockholm | Flexra',
  // eller med template
  title: {
    default: 'Flexra - Webb & Automation',
    template: '%s | Flexra'
  }
}
```

### 9.2 Meta descriptions

| Sidtyp | Längd | Innehåll |
|--------|-------|----------|
| **Alla sidor** | 150-160 tecken | Nyckelord + värdeförslag + CTA |

**Struktur:**
1. Vad (tjänst/innehåll)
2. Värde (vad kunden får)
3. CTA (uppmaning)

```jsx
// Exempel
export const metadata = {
  description: 'Vi bygger moderna webbplatser och automatiserar affärsprocesser. Boka ett kostnadsfritt möte och se hur vi kan hjälpa ditt företag växa.'
}
```

#### Exempeltexter per sidtyp

| Sida | Meta description |
|------|------------------|
| **Startsida** | `Flexra hjälper företag med moderna webbplatser och smart automation. Spara tid och öka försäljningen. Boka kostnadsfritt möte idag.` |
| **Webbyrå** | `Professionell webbutveckling med fokus på konvertering och SEO. Vi bygger snabba, responsiva sidor som driver resultat. Kontakta oss.` |
| **Automation** | `Automatisera repetitiva uppgifter och integrera dina system. Spara 10+ timmar i veckan med våra skräddarsydda lösningar.` |
| **Om oss** | `Möt teamet bakom Flexra. Vi är passionerade utvecklare som hjälper svenska företag att digitalisera sina processer.` |

### 9.3 Rubrikstruktur (Headings)

```
Sida
├── h1: Huvudrubrik (EXAKT EN per sida)
│   ├── h2: Sektionsrubrik
│   │   ├── h3: Underrubrik
│   │   └── h3: Underrubrik
│   ├── h2: Sektionsrubrik
│   │   ├── h3: Underrubrik
│   │   │   └── h4: Detalj
│   │   └── h3: Underrubrik
│   └── h2: Sektionsrubrik
```

**Regler:**
- **Exakt EN h1** per sida (i hero-sektionen)
- Hoppa **aldrig** över nivåer (h1 → h3 är FEL)
- Inkludera nyckelord naturligt
- h1 ska matcha sidans title tag

#### ✅ Korrekt
```jsx
<h1>Webbyrå i Stockholm</h1>
<section>
  <h2>Våra tjänster</h2>
  <h3>Webbutveckling</h3>
  <h3>E-handel</h3>
</section>
<section>
  <h2>Varför välja oss?</h2>
</section>
```

#### ❌ Inkorrekt
```jsx
// FEL: Två h1
<h1>Välkommen</h1>
<h1>Våra tjänster</h1>

// FEL: Hoppar över nivå
<h1>Rubrik</h1>
<h3>Underrubrik</h3>  // Borde vara h2

// FEL: h1 i komponent som återanvänds
<Card><h1>Kort-titel</h1></Card>  // Använd h3 eller h4
```

### 9.4 Bildoptimering för SEO

| Attribut | Krav | Exempel |
|----------|------|---------|
| **Filnamn** | Kebab-case, beskrivande | `webbdesign-stockholm-hero.webp` |
| **Alt-text** | Beskrivande, inkludera nyckelord naturligt | `Modern webbdesign för e-handel` |
| **Format** | WebP (primärt), AVIF (modern fallback) | - |
| **Storlek** | Optimerad, max 200KB för heroes | - |

```jsx
<Image
  src="/images/webbdesign-stockholm-hero.webp"
  alt="Flexra webbdesign - responsiv hemsida visad på laptop och mobil"
  width={1200}
  height={630}
  priority  // För LCP-bilder (hero)
/>
```

**Alt-text regler:**
- Beskrivande för innehållsbilder
- Inkludera nyckelord där det är naturligt
- `alt=""` för rent dekorativa bilder
- Företagsnamn för logotyper

### 9.5 Strukturerad data (Schema.org)

#### LocalBusiness (för kontakt/om oss)
```jsx
// app/layout.js eller specifik sida
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Flexra',
  description: 'Webb och automation för företag',
  url: 'https://flexra.se',
  telephone: '+46-XXX-XXXXXX',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Stockholm',
    addressCountry: 'SE'
  },
  openingHours: 'Mo-Fr 09:00-17:00',
  sameAs: [
    'https://linkedin.com/company/flexra',
    'https://instagram.com/flexra'
  ]
}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

#### Service (för tjänstesidor)
```jsx
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Webbutveckling',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Flexra'
  },
  description: 'Professionell webbutveckling med fokus på prestanda och SEO',
  areaServed: 'Sverige'
}
```

#### FAQPage (för FAQ-sektioner)
```jsx
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Vad kostar en hemsida?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Priset varierar beroende på projektets omfattning...'
      }
    }
  ]
}
```

#### BreadcrumbList
```jsx
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://flexra.se' },
    { '@type': 'ListItem', position: 2, name: 'Tjänster', item: 'https://flexra.se/tjanster' },
    { '@type': 'ListItem', position: 3, name: 'Webbyrå', item: 'https://flexra.se/tjanster/webbyra' }
  ]
}
```

### 9.6 Interna länkar

**Regler:**
- Använd **beskrivande ankartext** (inte "klicka här" eller "läs mer")
- Länka relevanta sidor till varandra
- 3-5 interna länkar per sida
- Viktigaste sidorna ska ha flest inlänkar

#### ✅ Korrekt
```jsx
<p>
  Vi erbjuder <Link href="/tjanster/webbutveckling">skräddarsydd webbutveckling</Link> för
  företag som vill <Link href="/tjanster/automation">automatisera sina processer</Link>.
</p>
```

#### ❌ Inkorrekt
```jsx
// FEL: Icke-beskrivande ankartext
<p>
  För mer info om webbutveckling, <Link href="/tjanster">klicka här</Link>.
</p>

// FEL: Samma ankartext för olika länkar
<Link href="/webbutveckling">Läs mer</Link>
<Link href="/automation">Läs mer</Link>
```

### 9.7 URL-struktur

| Sidtyp | Format | Exempel |
|--------|--------|---------|
| **Tjänst** | `/tjanster/[slug]` | `/tjanster/webbutveckling` |
| **Blogg** | `/blogg/[slug]` | `/blogg/seo-tips-2025` |
| **Case** | `/case/[slug]` | `/case/foretag-ab` |

**Regler:**
- Lowercase, kebab-case
- Korta och beskrivande
- Inkludera nyckelord
- Undvik parametrar när möjligt

### 9.8 Open Graph & Social

```jsx
export const metadata = {
  openGraph: {
    title: 'Webbyrå Stockholm | Flexra',
    description: 'Vi bygger moderna webbplatser...',
    url: 'https://flexra.se',
    siteName: 'Flexra',
    images: [
      {
        url: '/og-image.jpg',  // 1200x630px
        width: 1200,
        height: 630,
        alt: 'Flexra - Webb & Automation'
      }
    ],
    locale: 'sv_SE',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webbyrå Stockholm | Flexra',
    description: 'Vi bygger moderna webbplatser...',
    images: ['/og-image.jpg']
  }
}
```

---

## 10. Prestanda

### 10.1 Core Web Vitals mål

| Metric | Mål | Vad det mäter |
|--------|-----|---------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Laddningstid för största synliga element |
| **INP** (Interaction to Next Paint) | < 200ms | Responstid vid interaktion |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Visuell stabilitet |

### 10.2 LCP-optimering

```jsx
// Hero-bilder: använd priority
<Image
  src="/hero.webp"
  alt="Hero"
  priority  // Förladdar bilden
  sizes="100vw"
/>

// Preload kritiska resurser i layout.js
<link rel="preload" href="/fonts/SpaceGrotesk.woff2" as="font" crossOrigin="anonymous" />
```

**Checklista:**
- [ ] Hero-bild har `priority`
- [ ] Fonter är preloadade
- [ ] Inga render-blocking resurser
- [ ] Server-side rendering (Next.js)

### 10.3 CLS-optimering

```jsx
// ALLTID sätt dimensioner på bilder
<Image
  src="/bild.webp"
  alt="Beskrivning"
  width={800}
  height={600}  // Förhindrar layout shift
/>

// Eller använd aspect-ratio
<div className="aspect-[4/3] relative">
  <Image src="/bild.webp" fill alt="Beskrivning" />
</div>

// Reservera plats för dynamiskt innehåll
<div className="min-h-[400px]">
  {/* Dynamiskt innehåll */}
</div>
```

**Checklista:**
- [ ] Alla bilder har width/height eller aspect-ratio
- [ ] Fonter använder `font-display: swap`
- [ ] Inga injicerade annonser/banners utan reserverad plats
- [ ] Skeleton loaders för dynamiskt innehåll

### 10.4 INP-optimering

```jsx
// Undvik tung JavaScript i main thread
// Använd dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />
})

// Debounce inputs
const debouncedSearch = useDebouncedCallback((value) => {
  search(value)
}, 300)
```

### 10.5 Bildformat & storlekar

| Användning | Format | Max storlek | Dimensioner |
|------------|--------|-------------|-------------|
| **Hero** | WebP | 200KB | 1920x1080 |
| **Kort-bilder** | WebP | 80KB | 800x600 |
| **Thumbnails** | WebP | 30KB | 400x300 |
| **Ikoner** | SVG | 5KB | - |
| **Logotyper** | SVG/PNG | 20KB | - |

```jsx
// Responsiva bilder med sizes
<Image
  src="/bild.webp"
  alt="Beskrivning"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### 10.6 Lazy Loading

```jsx
// Bilder under fold: lazy loading (default i Next.js Image)
<Image src="/below-fold.webp" alt="..." />  // loading="lazy" är default

// Komponenter: dynamic import
const FAQ = dynamic(() => import('@/components/FAQ'))
const Testimonials = dynamic(() => import('@/components/Testimonials'))

// Intersection Observer för animationer
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
```

### 10.7 Caching-strategi

```jsx
// next.config.js
module.exports = {
  images: {
    minimumCacheTTL: 31536000,  // 1 år för optimerade bilder
  },
  headers: async () => [
    {
      source: '/fonts/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    }
  ]
}
```

### 10.8 Prestanda-checklista

#### Before launch
- [ ] Lighthouse score > 90 på alla kategorier
- [ ] Alla bilder optimerade och i WebP
- [ ] Fonter preloadade
- [ ] Inga console errors
- [ ] Gzip/Brotli-komprimering aktiverad

#### Ongoing
- [ ] Månadsvis Lighthouse-audit
- [ ] Övervaka Core Web Vitals i Search Console
- [ ] Testa på riktiga enheter (inte bara simulering)

---

## 11. Tone of Voice

### 11.1 Övergripande ton

| Egenskap | Beskrivning | Exempel |
|----------|-------------|---------|
| **Professionell** | Kunnig men inte stel | "Vi hjälper dig" inte "Undertecknad erbjuder" |
| **Personlig** | Varm och tillgänglig | "Vi" och "du/ni" istället för "man" |
| **Tydlig** | Konkret, undvik jargong | "Snabbare hemsida" inte "optimerad UX" |
| **Aktiv** | Handlingsorienterad | "Automatisera" inte "Automatisering kan ske" |

### 11.2 Pronomen och tilltal

| Använd | Undvik |
|--------|--------|
| Vi | Undertecknad, bolaget |
| Du/Ni | Man, användaren |
| Ditt företag | Organisationen |
| Era kunder | Slutanvändarna |

```jsx
// ✅ Korrekt
<p>Vi hjälper dig att automatisera dina processer så att du kan fokusera på det som är viktigt.</p>

// ❌ Inkorrekt
<p>Flexra erbjuder lösningar för automatisering av processer för att möjliggöra fokus på kärnverksamheten.</p>
```

### 11.3 Rubriker

| Typ | Stil | Exempel |
|-----|------|---------|
| **Hero h1** | Kort, slagkraftig, värdefokuserad | "Frigör tid med smart automation" |
| **Sektions h2** | Fråga eller påstående | "Varför välja Flexra?" / "Så fungerar det" |
| **Feature h3** | Nyttofokuserad | "Spara 10 timmar i veckan" |

**Regler:**
- Max 8 ord i h1
- Börja med verb när möjligt
- Undvik "Välkommen till..." i rubriker

### 11.4 CTA-texter (Call to Action)

| Typ | Använd | Undvik |
|-----|--------|--------|
| **Primär CTA** | "Boka möte", "Kom igång", "Starta nu" | "Submit", "Skicka" |
| **Sekundär CTA** | "Läs mer", "Se hur det fungerar", "Utforska" | "Klicka här", "Mer info" |
| **Kontakt** | "Kontakta oss", "Prata med oss" | "Fyll i formulär" |

```jsx
// ✅ Korrekt
<Button>Boka kostnadsfritt möte</Button>
<Button variant="secondary">Se våra case</Button>

// ❌ Inkorrekt
<Button>Skicka</Button>
<Button variant="secondary">Klicka här</Button>
```

### 11.5 Beskrivande text

**Struktur för tjänstebeskrivningar:**
1. Vad det är (1 mening)
2. Problemet det löser (1-2 meningar)
3. Värdet för kunden (1 mening)

```jsx
// ✅ Korrekt
<p>
  Vi bygger moderna, snabba webbplatser som konverterar besökare till kunder.
  Slipp krångliga CMS och långsamma sidor som skrämmer bort potentiella leads.
  Fokusera på din verksamhet medan vi tar hand om tekniken.
</p>

// ❌ Inkorrekt
<p>
  Flexra AB erbjuder webbutvecklingstjänster inklusive design, utveckling
  och hosting av webbplatser med moderna teknologier som React och Next.js.
</p>
```

### 11.6 Vanliga fraser

| Istället för | Använd |
|--------------|--------|
| "Klicka här" | "Läs om våra tjänster" |
| "Kontakta oss för mer information" | "Boka ett möte så berättar vi mer" |
| "Vi erbjuder lösningar för..." | "Vi hjälper dig med..." |
| "Optimera din..." | "Få en snabbare/bättre..." |
| "Leverage/synergier" | (Skriv om helt) |
| "End-to-end" | "Från start till mål" |

### 11.7 Siffror och social proof

```jsx
// Konkreta siffror bygger förtroende
<p>Vi har hjälpt 50+ företag att spara i snitt 15 timmar per vecka.</p>

// Undvik vaga påståenden
// ❌ "Vi har hjälpt många företag att spara tid."
```

---

## 12. Nya komponenter

### 12.1 Accordion / FAQ

```jsx
// components/Accordion.jsx
'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-lg">{item.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <p className="px-6 pb-4 text-gray-600">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Användning
<Accordion items={[
  { question: 'Vad kostar en hemsida?', answer: 'Priset varierar...' },
  { question: 'Hur lång tid tar det?', answer: 'Oftast 4-8 veckor...' }
]} />
```

### 12.2 Breadcrumbs

```jsx
// components/Breadcrumbs.jsx
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4" />}
            {index === items.length - 1 ? (
              <span className="text-gray-900">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Användning
<Breadcrumbs items={[
  { label: 'Hem', href: '/' },
  { label: 'Tjänster', href: '/tjanster' },
  { label: 'Webbyrå', href: '/tjanster/webbyra' }
]} />
```

### 12.3 Testimonials

```jsx
// components/Testimonial.jsx
import Image from 'next/image'
import { Star } from 'lucide-react'

export function Testimonial({ quote, author, role, company, avatar, rating = 5 }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100">
      {/* Stjärnor */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Citat */}
      <blockquote className="text-lg text-gray-700 mb-6">
        "{quote}"
      </blockquote>

      {/* Författare */}
      <div className="flex items-center gap-4">
        {avatar && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image src={avatar} alt={author} fill className="object-cover" />
          </div>
        )}
        <div>
          <p className="font-medium text-gray-900">{author}</p>
          <p className="text-sm text-gray-500">{role}, {company}</p>
        </div>
      </div>
    </div>
  )
}

// Grid för flera testimonials
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Testimonial
    quote="Flexra levererade över förväntan..."
    author="Anna Andersson"
    role="VD"
    company="Företag AB"
    avatar="/testimonials/anna.jpg"
    rating={5}
  />
</div>
```

### 12.4 Stats / Numbers

```jsx
// components/Stats.jsx
'use client'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

function AnimatedNumber({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (inView) {
      let start = 0
      const end = parseInt(value)
      const increment = end / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [inView, value, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export function Stats({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {items.map((item, index) => (
        <div key={index} className="text-center">
          <p className="text-4xl md:text-5xl font-medium text-gray-900 mb-2">
            <AnimatedNumber value={item.value} suffix={item.suffix} />
          </p>
          <p className="text-gray-600">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

// Användning
<Stats items={[
  { value: 50, suffix: '+', label: 'Nöjda kunder' },
  { value: 98, suffix: '%', label: 'Kundnöjdhet' },
  { value: 15, suffix: 'h', label: 'Sparad tid/vecka' },
  { value: 24, suffix: '/7', label: 'Support' }
]} />
```

### 12.5 CTA Section

```jsx
// components/CTASection.jsx
import { GetStartedButton } from './GetStartedButton'

export function CTASection({
  title = "Redo att komma igång?",
  description = "Boka ett kostnadsfritt möte så diskuterar vi hur vi kan hjälpa ditt företag.",
  buttonText = "Boka möte",
  variant = "dark"  // "dark" | "light" | "gradient"
}) {
  const variants = {
    dark: "bg-gray-900 text-white",
    light: "bg-gray-50 text-gray-900",
    gradient: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
  }

  return (
    <section className={`px-[5%] py-16 md:py-24 ${variants[variant]} rounded-3xl mx-2 md:mx-4`}>
      <div className="container text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">{title}</h2>
        <p className={`text-lg mb-8 ${variant === 'light' ? 'text-gray-600' : 'text-white/80'}`}>
          {description}
        </p>
        <GetStartedButton dark={variant === 'light'}>
          {buttonText}
        </GetStartedButton>
      </div>
    </section>
  )
}

// Användning
<CTASection
  title="Automatisera dina processer"
  description="Vi hjälper dig att identifiera och automatisera tidskrävande uppgifter."
  buttonText="Starta nu"
  variant="gradient"
/>
```

### 12.6 Page Header

```jsx
// components/PageHeader.jsx
import { Breadcrumbs } from './Breadcrumbs'

export function PageHeader({
  title,
  description,
  breadcrumbs,
  badge
}) {
  return (
    <section className="px-[5%] pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container">
        {breadcrumbs && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        {badge && (
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/90 mb-4">
            {badge}
          </span>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl max-w-4xl mb-6">
          {title}
        </h1>

        {description && (
          <p className="text-lg md:text-xl text-white/80 max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}

// Användning
<PageHeader
  title="Webbyrå Stockholm"
  description="Vi bygger moderna, snabba webbplatser som driver resultat för ditt företag."
  badge="Tjänster"
  breadcrumbs={[
    { label: 'Hem', href: '/' },
    { label: 'Tjänster', href: '/tjanster' },
    { label: 'Webbyrå', href: '/tjanster/webbyra' }
  ]}
/>
```

### 12.7 Feature Grid

```jsx
// components/FeatureGrid.jsx
export function FeatureGrid({ features, columns = 3 }) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }

  const colors = ['#fce7f3', '#fef9c3', '#ecfccb']

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6 md:gap-8`}>
      {features.map((feature, index) => (
        <div
          key={index}
          className="rounded-2xl p-6 md:p-8"
          style={{ backgroundColor: colors[index % colors.length] }}
        >
          {feature.icon && (
            <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
            </div>
          )}
          <h3 className="text-xl md:text-2xl mb-3">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

// Användning
import { Zap, Clock, Shield } from 'lucide-react'

<FeatureGrid features={[
  {
    icon: Zap,
    title: 'Snabbt',
    description: 'Optimerade sidor som laddar blixtsnabbt.'
  },
  {
    icon: Clock,
    title: 'Spara tid',
    description: 'Automatisera repetitiva uppgifter.'
  },
  {
    icon: Shield,
    title: 'Säkert',
    description: 'Moderna säkerhetsstandarder som standard.'
  }
]} />
```

---

## 13. Återanvändbara Block-komponenter

Block-komponenter är återanvändbara sektioner som kan importeras på flera sidor. De följer ett konsekvent mönster för props, styling och struktur.

### 13.1 Filstruktur

```
/components/blocks/
├── index.js          # Central export för alla block
├── FAQ.jsx           # FAQ-sektion med accordion
├── ContactForm.jsx   # Kontaktformulär (planerad)
├── Testimonials.jsx  # Kundomdömen (planerad)
├── Stats.jsx         # Statistik med animerade siffror (planerad)
├── CTA.jsx           # Call-to-action sektion (planerad)
├── PricingTable.jsx  # Pristabell (planerad)
├── Team.jsx          # Teammedlemmar (planerad)
├── LogoCloud.jsx     # Logotyper/partners (planerad)
└── Newsletter.jsx    # Nyhetsbrev-signup (planerad)
```

### 13.2 Import via index.js

```jsx
// Rekommenderat: Importera från index
import { FAQ } from "@/components/blocks";

// Eller flera samtidigt
import { FAQ, ContactForm, Testimonials } from "@/components/blocks";

// Alternativ: Direkt import (fungerar också)
import { FAQ } from "@/components/blocks/FAQ";
```

### 13.3 Block-komponent mönster

Alla block-komponenter ska följa detta mönster:

```jsx
"use client";

import { useState } from "react";
// ... andra imports

// Default data (om tillämpligt)
const defaultItems = [...];

export function BlockName({
  items = defaultItems,
  title = "Default titel",
  subtitle = "Default undertitel",
  badge = "Badge",
  ctaText = "CTA text",
  background = "gray"  // "white" | "gray"
}) {
  const bgClass = background === "white" ? "bg-white" : "bg-[#f8f8f6]";

  return (
    <section className={`px-[5%] py-16 md:py-24 lg:py-28 ${bgClass}`}>
      <div className="container">
        {/* Innehåll */}
      </div>
    </section>
  );
}

export default BlockName;
```

### 13.4 FAQ Block

**Fil:** `/components/blocks/FAQ.jsx`

**Props:**
| Prop | Typ | Default | Beskrivning |
|------|-----|---------|-------------|
| `items` | `Array<{question, answer}>` | 6 svenska frågor | FAQ-innehåll |
| `title` | `string` | "Vanliga frågor" | Rubrik |
| `subtitle` | `string` | Beskrivande text | Underrubrik |
| `badge` | `string` | "FAQ" | Badge-text |
| `ctaText` | `string` | "Har du fler frågor?" | Knapptext |
| `background` | `"white" \| "gray"` | "gray" | Bakgrundsfärg |

**Användning:**

```jsx
// Med default-innehåll
import { FAQ } from "@/components/blocks/FAQ";

<FAQ />

// Med anpassat innehåll
<FAQ
  items={[
    { question: "Min fråga?", answer: "Mitt svar." },
    // ...
  ]}
  title="FAQ om tjänsten"
  background="white"
/>
```

**Layout:**
- 2-kolumns grid på desktop (`lg:grid-cols-2`)
- Vänster: Header med badge, titel, undertitel och CTA
- Höger: Accordion med FAQ-items

**Accordion-styling:**
```jsx
// Item container
"border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"

// Knapp
"w-full px-6 py-5 flex items-center justify-between text-left"

// Ikon-container
"w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"

// Expanderbart innehåll
"overflow-hidden transition-all duration-300 ease-out"
`${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`
```

### 13.5 Planerade block-komponenter

#### ContactForm
```jsx
<ContactForm
  title="Kontakta oss"
  subtitle="Vi återkommer inom 24 timmar"
  fields={["name", "email", "company", "message"]}
  submitText="Skicka meddelande"
  background="white"
/>
```

#### Testimonials
```jsx
<Testimonials
  items={[
    { quote: "...", author: "Anna", role: "VD", company: "AB", avatar: "/..." }
  ]}
  title="Vad våra kunder säger"
  layout="grid"  // "grid" | "carousel"
  background="gray"
/>
```

#### Stats
```jsx
<Stats
  items={[
    { value: 50, suffix: "+", label: "Kunder" },
    { value: 98, suffix: "%", label: "Nöjdhet" }
  ]}
  animated={true}
  background="white"
/>
```

#### CTA
```jsx
<CTA
  title="Redo att automatisera?"
  description="Boka ett kostnadsfritt möte..."
  buttonText="Boka möte"
  variant="gradient"  // "dark" | "light" | "gradient"
/>
```

#### LogoCloud
```jsx
<LogoCloud
  title="Företag som litar på oss"
  logos={[{ src: "/...", alt: "Företag", url: "..." }]}
  animated={true}  // Scroll-animation
  background="gray"
/>
```

### 13.6 Att skapa nya block-komponenter

#### Steg-för-steg

1. **Skapa fil** i `/components/blocks/[BlockName].jsx`
2. **Följ mönstret** från 13.3
3. **Exportera** i `/components/blocks/index.js`
4. **Dokumentera props** i denna styleguide
5. **Testa** på minst två olika sidor

#### Checklista för nya block

- [ ] `"use client"` direktiv om interaktivitet krävs
- [ ] Responsiv design (mobile-first)
- [ ] Background prop (`"white"` | `"gray"`)
- [ ] Sensible defaults för alla props
- [ ] Named export + default export
- [ ] Följer sektions-spacing: `px-[5%] py-16 md:py-24 lg:py-28`
- [ ] Exporterad i `index.js`
- [ ] Dokumenterad i STYLEGUIDE.md

#### Namnkonventioner

| Typ | Filnamn | Komponentnamn |
|-----|---------|---------------|
| **Block** | `FAQ.jsx` | `FAQ` |
| **Block** | `ContactForm.jsx` | `ContactForm` |
| **Block** | `LogoCloud.jsx` | `LogoCloud` |

#### Standard-props alla block ska ha

```typescript
interface BaseBlockProps {
  background?: "white" | "gray";  // Default: "gray"
  className?: string;             // Extra klasser
  id?: string;                    // För anchor-länkar
}
```

---

## 14. Mobilanpassning

**KRITISKT:** Alla komponenter och sidor MÅSTE vara 100% mobilanpassade. Mobile-first är standard.

### 14.1 Mobile-first approach

Skriv alltid bas-stilar för mobil först, lägg sedan till för större skärmar:

```jsx
// ✅ Korrekt: Mobile-first
<div className="text-2xl md:text-3xl lg:text-4xl">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div className="p-4 md:p-6 lg:p-8">

// ❌ Fel: Desktop-first (undvik)
<div className="text-4xl sm:text-3xl xs:text-2xl">
```

### 14.2 Responsiva brytpunkter

| Brytpunkt | Minbredd | Typisk enhet | Tailwind |
|-----------|----------|--------------|----------|
| **Bas** | 0px | Mobil (portrait) | (default) |
| **sm** | 640px | Mobil (landscape) | `sm:` |
| **md** | 768px | Tablet | `md:` |
| **lg** | 1024px | Laptop | `lg:` |
| **xl** | 1280px | Desktop | `xl:` |
| **2xl** | 1536px | Stor skärm | `2xl:` |

### 14.3 Touch-targets

Alla klickbara element MÅSTE ha minst **44x44px** touch-area:

```jsx
// ✅ Korrekt: Tillräckligt stor touch-target
<button className="min-h-[44px] min-w-[44px] px-4 py-3">

// ✅ Korrekt: Padding skapar större touch-area
<Link className="block py-3 px-4">

// ❌ Fel: För liten touch-target
<button className="p-1 text-xs">  // Svår att träffa på mobil
```

### 14.4 Responsiv typografi

| Element | Mobil | Tablet (md) | Desktop (lg) |
|---------|-------|-------------|--------------|
| **h1** | `text-3xl` (30px) | `text-4xl` (36px) | `text-5xl` (48px) |
| **h2** | `text-2xl` (24px) | `text-3xl` (30px) | `text-4xl` (36px) |
| **h3** | `text-xl` (20px) | `text-2xl` (24px) | `text-3xl` (30px) |
| **p** | `text-base` (16px) | `text-base` | `text-lg` (18px) |

```jsx
// Hero-rubrik
<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">

// Sektionsrubrik
<h2 className="text-2xl md:text-3xl lg:text-4xl">

// Brödtext som ska vara läsbar
<p className="text-base md:text-lg leading-relaxed">
```

### 14.5 Responsiva grids

```jsx
// Standard mönster: 1 → 2 → 3 kolumner
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">

// 2-kolumns layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

// Feature cards (max 3)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// Stats (4 items)
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
```

### 14.6 Responsiv spacing

| Element | Mobil | Tablet | Desktop |
|---------|-------|--------|---------|
| **Sektion py** | `py-12` (48px) | `py-16` (64px) | `py-24` (96px) |
| **Sektion px** | `px-4` eller `px-[5%]` | `px-[5%]` | `px-[5%]` |
| **Card padding** | `p-4` (16px) | `p-6` (24px) | `p-8` (32px) |
| **Grid gap** | `gap-4` (16px) | `gap-6` (24px) | `gap-8` (32px) |
| **Stack gap** | `space-y-4` | `space-y-6` | `space-y-8` |

```jsx
// Standard sektion
<section className="px-[5%] py-12 md:py-16 lg:py-24">

// Kort
<div className="p-4 md:p-6 lg:p-8">

// Mellanrum mellan element
<div className="space-y-4 md:space-y-6">
```

### 14.7 Mobil-specifika mönster

#### Hamburger-meny
```jsx
// Visa hamburgare på mobil, vanlig nav på desktop
<button className="lg:hidden">
  <Menu className="w-6 h-6" />
</button>

<nav className="hidden lg:flex">
  {/* Desktop navigation */}
</nav>
```

#### Stackade vs side-by-side
```jsx
// Knappar: stackade på mobil, bredvid varandra på desktop
<div className="flex flex-col sm:flex-row gap-4">
  <Button>Primär</Button>
  <Button variant="secondary">Sekundär</Button>
</div>
```

#### Dold/synlig på olika skärmar
```jsx
// Visa endast på mobil
<div className="block md:hidden">Mobil-innehåll</div>

// Visa endast på desktop
<div className="hidden md:block">Desktop-innehåll</div>

// Visa från tablet och uppåt
<div className="hidden sm:block">Tablet+ innehåll</div>
```

#### Scrollbara element på mobil
```jsx
// Horisontell scroll för kort på mobil
<div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-3 md:overflow-visible md:mx-0 md:px-0">
  {items.map(item => (
    <div className="flex-shrink-0 w-[280px] md:w-auto">
      {/* Kort */}
    </div>
  ))}
</div>
```

### 14.8 Bilder på mobil

```jsx
// Responsiva bilder med olika storlekar
<Image
  src="/hero.webp"
  alt="Hero"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>

// Olika aspect-ratio på mobil vs desktop
<div className="aspect-[4/3] md:aspect-[16/9] relative">
  <Image src="..." fill className="object-cover" />
</div>

// Dölj dekorativa bilder på mobil för snabbare laddning
<div className="hidden md:block">
  <Image src="/decoration.webp" ... />
</div>
```

### 14.9 Formulär på mobil

```jsx
// Full bredd inputs på mobil
<input className="w-full px-4 py-3 rounded-xl" />

// Stackade fält på mobil, sida vid sida på desktop
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <input placeholder="Förnamn" />
  <input placeholder="Efternamn" />
</div>

// Stor submit-knapp på mobil
<button className="w-full md:w-auto px-8 py-4 md:py-3">
  Skicka
</button>
```

### 14.10 Testning checklista

**Innan deploy, testa ALLTID på:**

- [ ] iPhone SE (375px) - minsta vanliga mobil
- [ ] iPhone 14/15 (390px) - standard mobil
- [ ] iPhone 14 Plus (428px) - stor mobil
- [ ] iPad Mini (768px) - liten tablet
- [ ] iPad (1024px) - standard tablet
- [ ] Laptop (1280px)
- [ ] Desktop (1440px+)

**Kontrollera:**

- [ ] Ingen horisontell scroll på mobil
- [ ] Text är läsbar utan zoom (min 16px)
- [ ] Knappar är lätta att träffa (min 44px)
- [ ] Bilder skalas korrekt
- [ ] Navigation fungerar (hamburger-meny)
- [ ] Formulär är användbara
- [ ] Inga överlappande element
- [ ] Touch-gester fungerar (swipe, scroll)

### 14.11 Vanliga mobilproblem att undvika

#### ❌ Undvik dessa fel:

```jsx
// FEL: Fast bredd som orsakar overflow
<div className="w-[500px]">  // Bredare än mobil

// FEL: För liten text
<p className="text-xs">  // Svårläst på mobil

// FEL: För liten touch-target
<button className="p-1">  // Svår att träffa

// FEL: Horisontell layout som inte stackas
<div className="flex">  // Borde vara flex-col på mobil

// FEL: Fasta pixelvärden för spacing
<div className="ml-[200px]">  // Funkar inte på små skärmar
```

#### ✅ Gör istället:

```jsx
// BRA: Responsiv bredd
<div className="w-full max-w-lg">

// BRA: Läsbar textstorlek
<p className="text-base md:text-lg">

// BRA: Stor touch-target
<button className="p-3 min-h-[44px]">

// BRA: Stackad på mobil, rad på desktop
<div className="flex flex-col md:flex-row">

// BRA: Responsiv spacing
<div className="ml-4 md:ml-8 lg:ml-12">
```

### 14.12 Block-komponenter mobilkrav

Alla block-komponenter i `/components/blocks/` MÅSTE:

1. **Använda responsiva klasser** för alla storlekar
2. **Testa på minst 3 skärmstorlekar** (mobil, tablet, desktop)
3. **Ha touch-vänliga interaktioner**
4. **Stacka innehåll vertikalt på mobil**
5. **Anpassa typografi för läsbarhet**

```jsx
// Exempel: FAQ block mobilanpassning
<section className="px-[5%] py-12 md:py-16 lg:py-24">  // Responsiv padding
  <div className="container">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">  // Stackat på mobil
      {/* Header - full bredd på mobil */}
      <div className="text-center lg:text-left">  // Centrerad på mobil
        <h2 className="text-2xl md:text-3xl lg:text-4xl">  // Responsiv text
      </div>

      {/* FAQ items */}
      <div className="space-y-3 md:space-y-4">  // Responsiv spacing
        <button className="w-full p-4 md:p-5 min-h-[56px]">  // Touch-vänlig
```

---

## 15. Blogg-system & API

### 15.1 Arkitektur

Blogg-systemet använder AITable som databas med följande struktur:

```
/lib/
  aitable.js        # AITable API-klient
  posts.js          # Posts-hantering (CRUD)

/components/blocks/
  BlogGrid.jsx      # Grid-layout för blogg
  BlogCarousel.jsx  # Karusell-layout

/app/
  insikter/
    page.js         # Listar alla inlägg
    [slug]/
      page.js       # Enskilt inlägg
  api/
    posts/
      route.js      # GET, POST
      [slug]/
        route.js    # GET, PUT, DELETE
```

### 15.2 BlogGrid komponent

Återanvändbar grid för att visa blogginlägg.

**Props:**
| Prop | Typ | Default | Beskrivning |
|------|-----|---------|-------------|
| `posts` | `Array` | `[]` | Array med post-objekt |
| `columns` | `1\|2\|3` | `3` | Antal kolumner |
| `limit` | `number` | - | Max antal inlägg |
| `showAuthor` | `boolean` | `true` | Visa författare |
| `showDate` | `boolean` | `true` | Visa datum |
| `showDescription` | `boolean` | `true` | Visa beskrivning |
| `background` | `"white"\|"gray"` | `"white"` | Bakgrundsfärg |
| `title` | `string` | - | Valfri rubrik |
| `subtitle` | `string` | - | Valfri underrubrik |
| `badge` | `string` | - | Valfri badge |

**Användning:**
```jsx
import { BlogGrid } from "@/components/blocks";
import { getAllPosts } from "@/lib/posts";

const posts = await getAllPosts();

<BlogGrid
  posts={posts}
  columns={3}
  limit={6}
  showAuthor={true}
/>
```

### 15.3 BlogCarousel komponent

Horisontellt scrollande karusell för blogg.

**Props:**
| Prop | Typ | Default | Beskrivning |
|------|-----|---------|-------------|
| `posts` | `Array` | `[]` | Array med post-objekt |
| `title` | `string` | `"Senaste insikter..."` | Rubrik |
| `badge` | `string` | `"Blogg och artiklar"` | Badge-text |
| `background` | `"white"\|"gray"` | `"white"` | Bakgrundsfärg |

**Användning:**
```jsx
import { BlogCarousel } from "@/components/blocks";

<BlogCarousel
  posts={posts}
  title="Senaste nytt"
  badge="Nyheter"
/>
```

### 15.4 Post-objekt struktur

```typescript
interface Post {
  id: string;           // AITable record ID
  slug: string;         // URL-slug (unik)
  title: string;        // Rubrik
  description: string;  // Kort beskrivning
  content: string;      // Markdown-innehåll
  image: string;        // Bild-URL
  category: string;     // Kategori (Insikter, Nyheter, etc.)
  categoryColor: string; // Tailwind-klass (bg-pink-100, etc.)
  author: string;       // Författarnamn
  date: string;         // Formaterat datum (ex: "16 dec 2025")
  published: boolean;   // Publicerad eller ej
}
```

### 15.5 Posts-funktioner (/lib/posts.js)

```javascript
import { getAllPosts, getPostBySlug, getRelatedPosts, createPost } from "@/lib/posts";

// Hämta alla publicerade inlägg
const posts = await getAllPosts();
const posts = await getAllPosts({ limit: 6 });
const posts = await getAllPosts({ includeUnpublished: true });

// Hämta enskilt inlägg
const post = await getPostBySlug("min-artikel");

// Hämta relaterade inlägg
const related = await getRelatedPosts("current-slug", 3);

// Skapa nytt inlägg
const newPost = await createPost({
  title: "Min nya artikel",
  description: "Kort beskrivning",
  content: "Markdown-innehåll...",
  category: "Insikter",
  author: "Namn",
  published: true
});
```

### 15.6 API-endpoints

#### GET /api/posts
Hämtar alla publicerade inlägg.

**Query params:**
- `limit` - Max antal inlägg
- `includeUnpublished=true` - Inkludera opublicerade (kräver API-nyckel)

**Response:**
```json
{
  "success": true,
  "data": [...posts],
  "count": 10
}
```

#### POST /api/posts
Skapar nytt inlägg. Kräver API-nyckel.

**Headers:**
```
x-api-key: din-api-nyckel
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Rubrik (obligatorisk)",
  "slug": "auto-genereras-om-utelämnad",
  "description": "Kort beskrivning",
  "content": "Markdown-innehåll",
  "image": "https://...",
  "category": "Insikter",
  "categoryColor": "bg-pink-100",
  "author": "Namn",
  "published": true
}
```

#### GET /api/posts/[slug]
Hämtar enskilt inlägg.

#### PUT /api/posts/[slug]
Uppdaterar inlägg. Kräver API-nyckel.

#### DELETE /api/posts/[slug]
Tar bort inlägg. Kräver API-nyckel.

### 15.7 n8n Integration

#### Direkt till AITable
```json
{
  "method": "POST",
  "url": "https://aitable.ai/fusion/v1/datasheets/{DATASHEET_ID}/records",
  "headers": {
    "Authorization": "Bearer {{$env.AITABLE_API_TOKEN}}",
    "Content-Type": "application/json"
  },
  "body": {
    "records": [{
      "fields": {
        "slug": "nytt-inlagg",
        "title": "Nytt inlägg",
        "description": "Beskrivning...",
        "content": "Markdown...",
        "category": "Insikter",
        "categoryColor": "bg-pink-100",
        "author": "AI",
        "date": "16 dec 2025",
        "published": true
      }
    }]
  }
}
```

#### Via Flexra API
```json
{
  "method": "POST",
  "url": "https://flexra.se/api/posts",
  "headers": {
    "Content-Type": "application/json",
    "x-api-key": "{{$env.POSTS_API_KEY}}"
  },
  "body": {
    "title": "Nytt inlägg",
    "description": "Beskrivning...",
    "content": "Markdown...",
    "category": "Insikter",
    "author": "AI"
  }
}
```

### 15.8 AITable datasheet-fält

| Fält | Typ | Beskrivning |
|------|-----|-------------|
| `slug` | Text | URL-slug (unik) |
| `title` | Text | Rubrik |
| `description` | Text | Kort beskrivning |
| `content` | LongText | Markdown-innehåll |
| `image` | URL | Bild-URL |
| `category` | SingleSelect | Insikter, Nyheter |
| `categoryColor` | SingleSelect | bg-pink-100, bg-yellow-100, bg-lime-100 |
| `author` | Text | Författarnamn |
| `date` | Text | Formaterat datum |
| `published` | Checkbox | Publicerad |

### 15.9 Miljövariabler

```env
# AITable
AITABLE_API_TOKEN=xxx
AITABLE_SPACE_ID=xxx
AITABLE_FLEXRA_BLOG_ID=xxx

# API Authentication
POSTS_API_KEY=xxx
```

### 15.10 Migrera befintliga inlägg

Kör migreringsscriptet för att flytta hårdkodade inlägg till AITable:

```bash
node scripts/migrate-posts-to-aitable.js
```

---

## 16. Case Study-system

Case study-systemet använder AITable som databas och stödjer multi-site filtrering.

### 16.1 Arkitektur

```
/lib/
  aitable.js          # AITable API-klient
  case-studies.js     # Case study-hantering (CRUD + multi-site)

/components/blocks/
  CaseStudyMetrics.jsx    # Nyckeltal i pastellkort
  CaseStudyTechStack.jsx  # Tech stack med loggor
  CaseStudyGallery.jsx    # Bildgalleri med lightbox

/app/
  case-studies/
    page.js               # Listar alla case studies
    CaseStudyList.jsx     # Klientkomponent med filter/sökning
    [slug]/
      page.js             # Enskild case study
  api/
    case-studies/
      route.js            # GET, POST
      [slug]/
        route.js          # GET, PUT, DELETE
      setup/
        route.js          # Skapa AITable-fält
```

### 16.2 AITable-fält

| Fält | Typ | Beskrivning |
|------|-----|-------------|
| `Title` | Text | Case study-titel (default-fält) |
| `slug` | Text | URL-slug (unik) |
| `client` | Text | Kundnamn |
| `clientLogo` | URL | Kundens logotyp |
| `industry` | SingleSelect | Bransch |
| `category` | SingleSelect | Processautomation, AI-integration, Integration, etc. |
| `categoryColor` | SingleSelect | bg-pink-100, bg-yellow-100, bg-lime-100, etc. |
| `heroImage` | URL | Huvudbild |
| `excerpt` | Text | Kort beskrivning för listsida |
| `challenge` | LongText | Markdown - kundens utmaning |
| `solution` | LongText | Markdown - vår lösning |
| `results` | LongText | Markdown - uppnådda resultat |
| `metrics` | Text | JSON-array: `[{"value": "80%", "label": "Förbättring"}]` |
| `gallery` | Text | JSON-array: `["url1", "url2"]` |
| `techStack` | Text | Kommaseparerad: `fortnox,slack,hubspot` |
| `testimonial` | LongText | Kundcitat |
| `testimonialAuthor` | Text | Citatpersonens namn |
| `testimonialRole` | Text | Citatpersonens roll |
| `contactEmail` | Email | Kontaktperson |
| `published` | Checkbox | Publicerad |
| `date` | Text | Formaterat datum (ex: "15 dec 2024") |
| `company` | Text | Multi-site filter (ex: "FLEXRA") |
| `metaTitle` | Text | SEO-titel (max 60 tecken) |
| `metaDescription` | Text | SEO-beskrivning (150-160 tecken) |
| `keywords` | Text | SEO-nyckelord |
| `noIndex` | Checkbox | Dölj från sökmotorer |

### 16.3 Tech Stack-loggor

Tillgängliga logo-ID:n för `techStack`-fältet (finns i `/public/logos/`):

| Kategori | Logo-ID:n |
|----------|-----------|
| **CRM** | salesforce, hubspot, pipedrive |
| **Ekonomi** | fortnox, monitor, visma |
| **Kommunikation** | slack, teams, whatsapp, gmail, outlook, discord, linkedin |
| **Lagring** | google-drive, onedrive, dropbox, google-sheets, excel |
| **Projekthantering** | notion, trello, jira, asana, monday, clickup, airtable |
| **Support** | zendesk, freshdesk, intercom |
| **Betalningar** | stripe, klarna, swish |
| **Automation** | zapier, make, n8n |
| **AI** | openai, anthropic, gemini, perplexity |
| **E-handel** | shopify, woocommerce |
| **Schemaläggning** | calendly, google-calendar |

**Användning:**
```
techStack: "fortnox,slack,hubspot,openai"
```

### 16.4 Responsiv typografi på case study-sidor

Eftersom CSS sätter fasta storlekar på rubriker (`h1: 5rem`, `h2: 3.5rem`), MÅSTE hero- och CTA-rubriker använda responsiva Tailwind-klasser:

```jsx
// Hero-rubrik (h1)
<h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6">
  {caseStudy.title}
</h1>

// CTA-sektionsrubrik (h2)
<h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-4">
  Redo att ta nästa steg?
</h2>

// Content-rubriker (h2) - använd default
<h2 className="mb-6">Utmaningen</h2>
```

| Element | Mobil | Tablet (md) | Desktop (lg) |
|---------|-------|-------------|--------------|
| Hero h1 | text-3xl (30px) | text-4xl (36px) | text-5xl (48px) |
| CTA h2 | text-2xl (24px) | text-3xl (30px) | text-4xl (36px) |
| Content h2 | default | default | default |

### 16.5 SEO & Metadata

Case study-sidor genererar automatiskt SEO-metadata:

```jsx
export async function generateMetadata({ params }) {
  const caseStudy = await getCaseStudyBySlug(slug);

  // Använder AITable-fält om de finns
  const seoTitle = caseStudy.metaTitle || `${caseStudy.title} | Case Study`;
  const seoDescription = caseStudy.metaDescription || caseStudy.excerpt;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: caseStudy.keywords || "...",
    robots: caseStudy.noIndex ? { index: false } : { index: true },
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: { ... },
    twitter: { ... }
  };
}
```

**JSON-LD strukturerad data:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "inLanguage": "sv-SE",
  "author": { "@type": "Organization", "name": "Flexra" },
  "about": { "@type": "Organization", "name": "Kundnamn" }
}
```

### 16.6 Multi-site support

Case studies filtreras automatiskt på `company`-fältet:

```javascript
// lib/case-studies.js
const DEFAULT_COMPANY = process.env.SITE_COMPANY || "FLEXRA";

// Alla queries filtrerar på company
const caseStudies = await getAllCaseStudies({ company: "FLEXRA" });

// Eller använd env-variabel
// .env.local
SITE_COMPANY=FLEXRA
```

### 16.7 API Endpoints

#### GET /api/case-studies
```
?limit=10
?industry=Bygg
?category=Processautomation
?company=FLEXRA
?includeUnpublished=true (kräver API-nyckel)
```

#### POST /api/case-studies
Kräver header: `x-api-key: din-api-nyckel`

```json
{
  "title": "Rubrik (obligatorisk)",
  "client": "Kundnamn (obligatorisk)",
  "industry": "Bygg",
  "category": "Processautomation",
  "excerpt": "Kort beskrivning...",
  "challenge": "## Markdown...",
  "solution": "## Markdown...",
  "results": "## Markdown...",
  "metrics": [{"value": "80%", "label": "Förbättring"}],
  "techStack": "fortnox,slack",
  "published": true,
  "company": "FLEXRA"
}
```

#### POST /api/case-studies/setup
Skapar alla AITable-fält. Kräver API-nyckel via `Authorization: Bearer xxx`.

### 16.8 Block-komponenter

**CaseStudyMetrics:**
```jsx
import { CaseStudyMetrics } from "@/components/blocks";

<CaseStudyMetrics
  metrics={[
    { value: "80%", label: "Minskad tid" },
    { value: "40h", label: "Sparad per månad" }
  ]}
/>
```

**CaseStudyTechStack:**
```jsx
import { CaseStudyTechStack } from "@/components/blocks";

<CaseStudyTechStack tools="fortnox,slack,hubspot" />
```

**CaseStudyGallery:**
```jsx
import { CaseStudyGallery } from "@/components/blocks";

<CaseStudyGallery
  images={["url1.jpg", "url2.jpg"]}
  // eller
  images={[{ url: "url1.jpg", alt: "Beskrivning" }]}
/>
```

### 16.9 Miljövariabler

```env
# AITable
AITABLE_API_TOKEN=xxx
AITABLE_SPACE_ID=xxx
AITABLE_CASE_STUDIES_ID=xxx

# Multi-site (optional)
SITE_COMPANY=FLEXRA

# API Authentication (samma som blogg)
POSTS_API_KEY=xxx
```

---

## Snabbreferens

### Tailwind-klasser att använda

```jsx
// Sektioner
"px-[5%] py-16 md:py-24 lg:py-28"

// Container
"container"

// Grid
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"

// Kort
"bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"

// Rubriker (responsiva)
"text-3xl md:text-4xl lg:text-5xl"  // h2
"text-xl md:text-2xl"               // h5

// Text
"text-gray-600"                     // Sekundär text
"text-gray-500 text-sm"             // Muted/meta

// Knappar
<Button variant="default|secondary|outline|link" size="default|sm|lg">

// Pastellfärger
style={{ backgroundColor: '#fce7f3' }}  // Rosa
style={{ backgroundColor: '#fef9c3' }}  // Gul
style={{ backgroundColor: '#ecfccb' }}  // Lime
style={{ backgroundColor: '#e0e7ff' }}  // Indigo
```

---

## Changelog

| Version | Datum | Ändringar |
|---------|-------|-----------|
| 2.5 | Dec 2025 | Lagt till: Case Study-system (16) - AITable, komponenter, multi-site, SEO, responsiv typografi |
| 2.4 | Dec 2025 | Lagt till: Blogg-system & API (15) - AITable, BlogGrid, BlogCarousel, API-routes för n8n |
| 2.3 | Dec 2025 | Lagt till: Mobilanpassning (14) - komplett guide för responsiv design |
| 2.2 | Dec 2025 | Utökad sektion 13: index.js, planerade block-komponenter, namnkonventioner |
| 2.1 | Dec 2025 | Lagt till: Återanvändbara Block-komponenter (13), FAQ Block |
| 2.0 | Dec 2025 | Lagt till: SEO & Metadata (9), Prestanda (10), Tone of Voice (11), Nya komponenter (12) |
| 1.0 | Dec 2025 | Initial release baserad på förstasidan |

---

*Denna styleguide är ett levande dokument och bör uppdateras när nya mönster etableras.*
