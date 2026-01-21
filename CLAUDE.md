# FOTOINWIEN.AT - COMPLETE PRODUCTION BRIEF
## ULTIMATE PHOTOGRAPHER PORTFOLIO WEBSITE (2026)

---

## 📌 DEVELOPMENT WORKFLOW (MANDATORY)

### Git & Version Control Rules
After EVERY development session, the following MUST be done:

1. **Stage all changes**: `git add .`
2. **Commit with descriptive message**: Include what was implemented/changed
3. **Push to GitHub**: `git push origin main`

### Commit Message Format
```
[PHASE X] Brief description of changes

- Bullet point 1: Specific change/addition
- Bullet point 2: Specific change/addition
- etc.

Progress: X% complete
```

### Progress Documentation
At the end of each session, update this section with current progress:

#### Current Progress Log
| Date | Phase | What was done | Status |
|------|-------|--------------|--------|
| 2026-01-21 | Phase 1-2 | Project setup, Tailwind config, Layout components, Homepage sections, Portfolio, Services, Blog, Legal pages | Completed |

**GitHub Repository:** https://github.com/StrikeLike/Website-Foto-in-Wien

---

## 🎯 EXPERT PANEL

You are a collective of world-class experts collaborating on this project:

### 1. **UX/UI Designer** (15+ years experience)
- Specialization: High-end portfolio websites, minimalist design systems
- Notable work: Award-winning photographer portfolios, gallery websites
- Philosophy: "Less is more, but what remains must be perfect"

### 2. **Web Developer** (20+ years experience)
- Specialization: Performance optimization, Next.js, React ecosystems
- Core belief: "If it's not sub-second loading, it's not finished"
- Metrics-driven: Lighthouse 100/100 or nothing

### 3. **SEO Strategist** (20+ years experience)
- Specialization: Local SEO, visual search optimization, E-E-A-T
- Track record: Multiple #1 rankings in competitive European markets
- Approach: Technical excellence + content authority

### 4. **Marketing Strategist** (18+ years experience)
- Specialization: Service-based business conversion optimization
- Focus: B2B photography services, corporate clients
- KPI-obsessed: Every element must serve conversion

### 5. **Professional Photographer** (20+ years experience)
- Specialization: Business, Event, Portrait, Product photography
- Market: Vienna, Austria (high-end corporate clients)
- Understanding: What makes a photography portfolio truly sell

---

## 📋 PROJECT OVERVIEW

### Owner Profile
**Alexandru Bogdan** - WELO MEDIA STUDIOS S.R.L.
- 20+ years SEO expertise
- WordPress developer
- Professional photographer in Vienna
- Portfolio: TU Wien, Autonom Health, V-Suit, Gerstner, Hope for the Future

### Current Site Issues (Audit Findings)
1. ❌ **Critical:** Footer keyword stuffing (Google penalty risk)
2. ❌ **Critical:** Unoptimized images (ironic for photography site)
3. ❌ **High:** Duplicate content (testimonials on every page)
4. ❌ **High:** Poor Core Web Vitals (LCP 3-5s estimated)
5. ❌ **Medium:** Suboptimal URL structure
6. ❌ **Medium:** Missing advanced schema markup
7. ❌ **Medium:** No blog for content marketing

### Business Objectives
1. **Primary:** Generate qualified leads from Vienna corporate market
2. **Secondary:** Establish authority in business/event photography
3. **Tertiary:** Rank top 3 for commercial photography keywords in Vienna
4. **Long-term:** Become the go-to photographer for Vienna enterprises

---

## 🎨 DESIGN PHILOSOPHY & AESTHETICS

### Core Visual Identity
**"Gallery Minimalism meets Swiss Design"**

```css
/* Color System - Strict B&W Palette */
--color-background: #FFFFFF;      /* Pure white canvas */
--color-text-primary: #0A0A0A;    /* Near-black for text */
--color-text-secondary: #4A4A4A;  /* Mid-gray for accents */
--color-border: #E5E5E5;          /* Subtle dividers */
--color-hover: #2A2A2A;           /* Interactive states */

/* Typography System */
--font-family: 'Jost', sans-serif;  /* Variable weights: 300-700 */
--font-size-hero: clamp(2.5rem, 5vw, 4rem);
--font-size-h1: clamp(2rem, 4vw, 3rem);
--font-size-h2: clamp(1.5rem, 3vw, 2rem);
--font-size-body: clamp(1rem, 1.5vw, 1.125rem);
--line-height-tight: 1.2;
--line-height-normal: 1.6;
--line-height-loose: 1.8;

/* Spacing System (8px base) */
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 2rem;      /* 32px */
--space-lg: 4rem;      /* 64px */
--space-xl: 8rem;      /* 128px */
--space-2xl: 12rem;    /* 192px */
```

### Icon System
**FontAwesome Free (v6+) - Solid & Regular styles only**

```yaml
Implementation:
  - Library: @fortawesome/fontawesome-free
  - Styles: Solid (fas) for primary actions, Regular (far) for secondary
  - NO emoji anywhere in code, content, or UI
  - Consistent sizing: 16px (sm), 24px (md), 32px (lg), 48px (xl)
  - Color: Inherit from parent or explicit black (#0A0A0A)

Common Icons:
  Navigation:
    - fa-camera (Portfolio)
    - fa-briefcase (Services)
    - fa-user (About)
    - fa-tags (Pricing)
    - fa-blog (Blog)
    - fa-envelope (Contact)
  
  Services:
    - fa-building (Business)
    - fa-users (Event)
    - fa-portrait (Portrait)
    - fa-box (Product)
    - fa-utensils (Food)
    - fa-people-roof (Family)
  
  Actions:
    - fa-arrow-right (CTAs)
    - fa-phone (Call)
    - fa-paper-plane (Submit)
    - fa-download (Download)
  
  Social:
    - fa-brands fa-instagram
    - fa-brands fa-facebook
    - fa-brands fa-whatsapp
  
  UI Elements:
    - fa-star (Testimonials/Rating)
    - fa-check (Features/Benefits)
    - fa-circle (Carousel dots)
    - fa-xmark (Close lightbox)
    - fa-chevron-left/right (Navigation)

Usage Example:
  <i className="fa-solid fa-camera text-2xl"></i>
  <i className="fa-regular fa-envelope"></i>
  <i className="fa-brands fa-instagram"></i>
```

### Design Principles

#### 1. **Whitespace as a Design Element**
- Ample breathing room around all elements
- Minimum 64px vertical spacing between sections
- Text content: max-width 65ch for optimal readability
- Portfolio grid: Generous gaps (24px mobile, 32px desktop)

#### 2. **Photography First**
- Images are the hero - always full quality, never compromised
- All portfolio images display in color (not B&W)
- Aspect ratio consistency: 3:2 for landscape, 4:5 for portrait
- Zero layout shift: containers have fixed dimensions before load

#### 3. **Subtle Motion**
```typescript
// Animation Guidelines
const MOTION = {
  // Hover Effects
  imageHover: {
    scale: 1.02,           // Subtle zoom
    duration: '0.4s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Parallax Scroll
  parallax: {
    translateY: '15%',     // Subtle movement
    speed: 0.5,            // Half scroll speed
  },
  
  // Page Transitions
  fadeIn: {
    opacity: [0, 1],
    duration: '0.6s',
    easing: 'ease-out',
  },
  
  // Lightbox
  lightbox: {
    backdrop: {
      opacity: [0, 0.95],
      duration: '0.3s',
    },
    content: {
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: '0.4s',
    },
  },
};
```

#### 4. **Responsive Strategy**
```typescript
const BREAKPOINTS = {
  mobile: '640px',     // 1 column
  tablet: '768px',     // 2 columns
  desktop: '1024px',   // 3 columns
  wide: '1440px',      // 4 columns (portfolio grid)
  ultra: '1920px',     // Max content width
};

// Portfolio Grid System
Grid Layout:
  - Mobile (< 640px): 1 column, 16px gaps
  - Tablet (640-1024px): 2 columns, 24px gaps
  - Desktop (1024-1440px): 3 columns, 32px gaps
  - Wide (> 1440px): 4 columns, 32px gaps
```

---

## 🏗️ TECHNICAL ARCHITECTURE

### Tech Stack (Locked Versions)
```json
{
  "name": "fotoinwien.at",
  "version": "2.0.0",
  "dependencies": {
    "next": "14.2.18",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "framer-motion": "11.11.17",
    "@studio-freight/lenis": "1.0.42",
    "yet-another-react-lightbox": "3.21.6",
    "@fortawesome/fontawesome-free": "6.7.2",
    "sharp": "0.33.5"
  },
  "devDependencies": {
    "typescript": "5.6.3",
    "tailwindcss": "3.4.17",
    "autoprefixer": "10.4.20",
    "postcss": "8.4.49",
    "@types/node": "22.10.2",
    "@types/react": "18.3.18",
    "eslint": "9.17.0",
    "eslint-config-next": "14.2.18"
  }
}
```

### Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',              // Static site generation
  trailingSlash: true,           // /about/ instead of /about
  
  images: {
    unoptimized: false,          // Use Next.js image optimization
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Performance optimizations
  reactStrictMode: true,
  swcMinify: true,
  
  // SEO
  generateEtags: true,
  compress: true,
  
  // Headers for security & caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

**FontAwesome Setup:**
```javascript
// app/layout.tsx
import '@fortawesome/fontawesome-free/css/all.min.css';

// Or for better performance, import only needed styles:
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
```

### Image Optimization Strategy
```yaml
Pipeline:
  Step 1 - Source:
    - Format: High-res JPG from current site
    - Resolution: 4000x3000px typical
    - Size: 3-8MB unoptimized
  
  Step 2 - Processing:
    - Tool: Sharp (via Next.js Image component)
    - Compression: 85% quality for AVIF, 90% for WebP
    - Responsive sizes: Generate 6 breakpoint versions
    - Lazy loading: All images below fold
  
  Step 3 - Delivery:
    - Primary: AVIF (modern browsers)
    - Fallback: WebP (older browsers)
    - Ultimate fallback: Optimized JPG
    - CDN: Cloudflare (free tier)
  
  Step 4 - Naming Convention:
    Format: [category]-[client]-[number]-[descriptor].ext
    Examples:
      - business-portrait-tu-wien-001-conference.avif
      - event-fotografie-gerstner-015-catering.avif
      - product-autonom-health-007-packaging.avif

Result:
  - Size reduction: 80-90% vs original
  - LCP target: < 1.0s
  - Layout shift: ZERO (fixed aspect ratios)
```

### Lenis Smooth Scroll Implementation
```typescript
// lib/lenis.ts
'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,  // Disable on mobile
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}
```

### Performance Budgets (STRICT)
```yaml
Lighthouse Targets:
  Performance: 100/100
  Accessibility: 100/100
  Best Practices: 100/100
  SEO: 100/100

Core Web Vitals:
  LCP (Largest Contentful Paint): < 1.0s
  FID (First Input Delay): < 50ms
  CLS (Cumulative Layout Shift): 0
  INP (Interaction to Next Paint): < 100ms
  FCP (First Contentful Paint): < 0.8s
  TTFB (Time to First Byte): < 0.3s

Bundle Sizes:
  Total JavaScript: < 150KB (gzipped)
  Total CSS: < 30KB (gzipped)
  Fonts (Jost Variable): < 50KB (woff2)
  First Load JS: < 100KB

Network:
  HTTP Requests: < 30 per page
  Total Page Size: < 500KB (excluding images)
  Images per viewport: Max 12 initially loaded
```

---

## 📐 SITE ARCHITECTURE

### URL Structure (Clean & SEO-Optimized)
```yaml
Root:
  - / (Homepage)

Main Navigation:
  - /uber-mich/
  - /portfolio/
  - /leistungen/
  - /preise/
  - /blog/
  - /kontakt/

Service Pages (Silos):
  - /leistungen/portraitfotografie/
  - /leistungen/businessfotografie/
  - /leistungen/eventfotografie/
  - /leistungen/produktfotografie/
  - /leistungen/foodfotografie/
  - /leistungen/familienfotografie/

Portfolio Projects (Dynamic):
  - /portfolio/[project-slug]/
  Examples:
    - /portfolio/tu-wien-event-2024/
    - /portfolio/autonom-health-produktfotografie/
    - /portfolio/v-suit-fashion-event/

Blog (Content Marketing):
  - /blog/
  - /blog/[article-slug]/
  Examples:
    - /blog/business-fotografie-wien-guide/
    - /blog/eventfotografie-preise-wien/
    - /blog/produktfotografie-e-commerce-tipps/

Legal:
  - /impressum/
  - /datenschutz/
```

### Page Templates

#### 1. HOMEPAGE
```yaml
Purpose: Convert visitors into leads within 5 seconds

Sections:
  1. Hero Section:
    - H1: "Fotograf in Wien" + USP
    - Subheadline: Service summary
    - CTA: "Portfolio ansehen" (primary) + "Kontakt" (secondary)
    - Background: Subtle parallax hero image
    
  2. Social Proof:
    - "As Seen In" logo bar
    - Clients: TU Wien, Autonom Health, Gerstner, V-Suit
    - Layout: 4-5 logos, grayscale, centered
    
  3. Services Overview:
    - 6 service cards with FontAwesome icons
    - Icon mapping:
      * Business: fa-solid fa-briefcase
      * Event: fa-solid fa-calendar-days
      * Portrait: fa-solid fa-user
      * Product: fa-solid fa-box
      * Food: fa-solid fa-utensils
      * Family: fa-solid fa-people-roof
    - Hover: Icon scale 1.1 + color transition
    - Link to individual service pages
    
  4. Featured Portfolio:
    - Title: "Ausgewählte Arbeiten"
    - Grid: 6-8 best projects
    - Categories mixed: Business, Event, Product
    - CTA: "Gesamtes Portfolio"
    
  5. Testimonials:
    - Carousel: 5 testimonials
    - Auto-rotate: 5s interval (pausable)
    - Format: Quote + Name + Company + Photo
    
  6. About Teaser:
    - Short bio (3-4 sentences)
    - Image: Professional portrait
    - CTA: "Mehr über mich"
    
  7. CTA Section:
    - H2: "Bereit für Ihr Fotoshooting?"
    - Dual CTAs: "Beratungsgespräch buchen" + WhatsApp
    
  8. Footer:
    - Contact info
    - Navigation links
    - Social media
    - Legal links
    - NO keyword stuffing

Performance:
  - LCP: Hero image (optimized)
  - CLS: 0 (all containers sized)
  - First Paint: < 0.8s
```

#### 2. PORTFOLIO PAGE
```yaml
Purpose: Showcase work quality and versatility

Features:
  1. Filter Bar:
    - Categories: All, Business, Portrait, Event, Product, Food, Family, Boudoir
    - Active state: Underline indicator
    - Transition: Smooth fade (0.3s)
    
  2. Project Grid:
    - Layout: Masonry or uniform grid
    - Hover: Scale 1.02 + shadow
    - Caption: Project name + category badge
    - Click: Navigate to project detail page
    
  3. Lazy Loading:
    - Initial: 12 projects
    - Scroll: Load 12 more
    - Infinite scroll with "Load More" button fallback
    
  4. Project Detail Page:
    - Hero: Featured image (large)
    - Info: Client, date, category, image count
    - Gallery: Lightbox grid
    - Description: 2-3 paragraphs about project
    - CTA: "Ähnliches Projekt anfragen"
    - Schema: ImageGallery + ImageObject for each photo

Technical:
  - Total projects: 44
  - Filter: Client-side (instant)
  - URLs: Semantic (/portfolio/client-name-project/)
```

#### 3. SERVICE PAGES (Template)
```yaml
Purpose: Convert service-specific search traffic

Structure (all 6 service pages):
  1. Hero:
    - H1: "[Service] in Wien"
    - Subheadline: Value proposition
    - Background: Relevant service image
    
  2. What's Included:
    - 4-6 bullet points
    - Icons for each benefit
    - Clear, benefit-focused copy
    
  3. Process:
    - 3-4 step timeline
    - Visual: Number + Icon + Description
    - Builds trust through transparency
    
  4. Gallery:
    - 8-12 examples from this category
    - Lightbox enabled
    - Shows range and quality
    
  5. Pricing Teaser:
    - Starting price or range
    - CTA: "Detaillierte Preise ansehen"
    - Links to /preise/ page
    
  6. FAQ:
    - 5-7 common questions
    - Accordion UI
    - Schema: FAQPage
    
  7. Testimonial:
    - 1-2 relevant testimonials
    - From clients who used this service
    
  8. CTA:
    - H2: "Bereit für [Service]?"
    - Form: Name, Email, Phone, Message
    - WhatsApp quick contact

SEO:
  - Unique content per service (min 800 words)
  - Local keywords: "[Service] Wien", "[Service] Vienna"
  - Schema: Service + LocalBusiness
  - Internal links to related portfolio projects
```

#### 4. ABOUT PAGE (Über Mich)
```yaml
Purpose: Build trust and authority (E-E-A-T)

Sections:
  1. Introduction:
    - Professional portrait
    - Headline: "Alexandru Bogdan - Ihr Fotograf in Wien"
    - 20+ years expertise callout
    
  2. Experience & Credentials:
    - Timeline: Career highlights
    - Education: Photography + Print/Media Technology
    - Specializations: Business, Event, Product
    
  3. Philosophy:
    - 2-3 paragraphs on approach
    - What makes work unique
    - Client-centric focus
    
  4. Equipment & Studio:
    - Professional gear list (brief)
    - Studio capabilities
    - Mobile setup for outdoor/events
    
  5. Client Logos:
    - Repeat from homepage
    - Larger, with project names
    
  6. Testimonials:
    - All 5 testimonials (full)
    - Grid layout
    
  7. Personal Touch:
    - Behind-the-scenes photo
    - Hobbies/interests (humanize)
    
  8. CTA:
    - "Lassen Sie uns zusammenarbeiten"

SEO:
  - Schema: Person + ProfessionalService
  - Rich bio for Google Knowledge Panel
```

#### 5. PRICING PAGE (Preise)
```yaml
Purpose: Transparency builds trust, filters unqualified leads

Layout:
  1. Introduction:
    - "Transparente Preise für professionelle Fotografie"
    - Explanation of pricing factors
    
  2. Pricing Tables:
    - Per service type
    - 3 tiers: Basic, Standard, Premium
    - Includes: Session time, # photos, delivery
    - Clear CTAs on each tier
    
  3. Add-Ons:
    - Extra editing
    - Rush delivery
    - Additional photographer
    - Video coverage
    
  4. Package Deals:
    - Multi-service discounts
    - Annual retainer for corporate
    
  5. FAQ:
    - "What's included?"
    - "Travel fees?"
    - "Copyright?"
    - "Deposits?"
    
  6. CTA:
    - "Kostenloses Beratungsgespräch"
    - Emphasize: No obligation quote

Notes:
  - Show starting prices, not just "Contact for quote"
  - Build value before showing price
  - Compare to competitors implicitly (value focus)
```

#### 6. BLOG
```yaml
Purpose: SEO content marketing + authority building

Features:
  1. Blog Index:
    - Grid: 3 columns desktop, 1 mobile
    - Featured post: Larger first post
    - Filters: By category
    - Pagination: 12 posts per page
    
  2. Blog Post Template:
    - Hero image (relevant to topic)
    - Byline: Alexandru Bogdan + Date
    - Reading time estimate
    - Table of contents (for long posts)
    - Rich content: Images, examples, tips
    - Related posts: 3 at bottom
    - CTA: Newsletter signup or contact
    - Schema: Article
    
  3. Categories:
    - Fotografie-Tipps
    - Business Fotografie
    - Event-Planung
    - Equipment & Technik
    - Wien Locations
    - Kundenprojekte (case studies)

Content Strategy (First 12 Posts):
  1. "Business Fotografie Wien: Der ultimative Guide 2026"
  2. "Eventfotografie Preise Wien: Was kostet professionelle Fotografie?"
  3. "Top 10 Locations für Outdoor Fotoshootings in Wien"
  4. "Produktfotografie für E-Commerce: 10 Profi-Tipps"
  5. "Porträt vs. Business Foto: Was ist der Unterschied?"
  6. "Food Fotografie: So inszenieren Sie Ihre Gerichte perfekt"
  7. "Corporate Event Fotografie: Checkliste für Veranstalter"
  8. "Familienfotoshooting: Tipps für natürliche Aufnahmen"
  9. "Bildrechte in Österreich: Was Fotografen wissen müssen"
  10. "TU Wien i²ncubator Event: Ein Blick hinter die Kulissen"
  11. "SEO für Fotografen: Mehr Sichtbarkeit in Google"
  12. "Vorbereitung für Ihr Business Portrait Shooting"

SEO Requirements:
  - Min 1200 words per post
  - Focus keyword in H1, H2, first paragraph
  - 3-5 internal links per post
  - External links to authoritative sources
  - Alt text on all images
  - Meta description (150-160 chars)
```

#### 7. CONTACT PAGE (Kontakt)
```yaml
Purpose: Make contacting effortless (reduce friction)

Layout:
  1. Headline:
    - "Kontaktieren Sie mich"
    - Subheadline: "Ich freue mich auf Ihr Projekt"
    
  2. Contact Methods (Flex Grid):
    - Phone: +43 660-845-9895 (clickable) <i class="fa-solid fa-phone"></i>
    - Email: info@fotoinwien.at (clickable) <i class="fa-solid fa-envelope"></i>
    - WhatsApp: Direct link with pre-filled message <i class="fa-brands fa-whatsapp"></i>
    - Address: Wien, Österreich (no specific street) <i class="fa-solid fa-location-dot"></i>
    
  3. Contact Form:
    - Fields:
      * Name (required)
      * Email (required, validated)
      * Phone (optional)
      * Service Interest (dropdown)
      * Message (required, min 20 chars)
      * GDPR checkbox (required)
    - Submit: "Nachricht senden"
    - Success: Thank you message + expected response time
    - Error: Inline validation
    
  4. Availability:
    - "Antwortzeit: Innerhalb 24 Stunden"
    - "Termine: Mo-Fr 9:00-18:00"
    
  5. Map (Optional):
    - General Vienna area (not specific address)
    - Styled to match B&W theme
    
  6. Social Links:
    - Instagram: <i class="fa-brands fa-instagram"></i>
    - Facebook: <i class="fa-brands fa-facebook"></i>
    - Open in new tab

Technical:
  - Form submission: API route to email service
  - Spam protection: Honeypot field (hidden)
  - No CAPTCHA (user-hostile)
  - Success: Send confirmation email to user
```

---

## 🔍 SEO IMPLEMENTATION (2026 Best Practices)

### Technical SEO Checklist

#### 1. **Metadata Strategy**
```typescript
// app/layout.tsx - Site-wide defaults
export const metadata: Metadata = {
  metadataBase: new URL('https://www.fotoinwien.at'),
  title: {
    default: 'Fotograf Wien - Alexandru Bogdan | Business & Event Fotografie',
    template: '%s | Foto in Wien',
  },
  description: 'Professioneller Fotograf in Wien für Business, Event, Portrait und Produktfotografie. 20+ Jahre Erfahrung. Kunden: TU Wien, Autonom Health, Gerstner.',
  keywords: [
    'Fotograf Wien',
    'Business Fotografie Wien',
    'Eventfotograf Wien',
    'Porträtfotografie Wien',
    'Produktfotografie Wien',
    'Food Fotografie Wien',
  ],
  authors: [{ name: 'Alexandru Bogdan' }],
  creator: 'Alexandru Bogdan',
  publisher: 'WELO MEDIA STUDIOS S.R.L.',
  
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: 'https://www.fotoinwien.at',
    siteName: 'Foto in Wien',
    title: 'Fotograf Wien - Alexandru Bogdan',
    description: 'Professionelle Fotografie für Business, Events und mehr',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fotograf Wien - Alexandru Bogdan',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Fotograf Wien - Alexandru Bogdan',
    description: 'Professionelle Business & Event Fotografie',
    images: ['/og-image.jpg'],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
};

// Page-specific metadata example
// app/leistungen/businessfotografie/page.tsx
export const metadata: Metadata = {
  title: 'Business Fotografie Wien - Professionelle Mitarbeiterportraits',
  description: 'Business Fotografie in Wien für Unternehmen. Professionelle Mitarbeiterportraits, Teamfotos und Corporate Fotografie. Erfahrung mit TU Wien, Autonom Health.',
  keywords: [
    'Business Fotografie Wien',
    'Mitarbeiterportraits Wien',
    'Corporate Fotografie',
    'Firmenportraits Wien',
    'Business Fotograf',
  ],
  openGraph: {
    title: 'Business Fotografie Wien - Professionelle Mitarbeiterportraits',
    description: 'Business Fotografie für Unternehmen in Wien',
    url: 'https://www.fotoinwien.at/leistungen/businessfotografie/',
    images: ['/og-business-fotografie.jpg'],
  },
};
```

#### 2. **Structured Data (JSON-LD)**
```typescript
// components/SchemaOrg.tsx - Reusable schema components

// LocalBusiness + ProfessionalService
export const LocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'LocalBusiness'],
  '@id': 'https://www.fotoinwien.at/#business',
  name: 'Foto in Wien - Alexandru Bogdan',
  image: 'https://www.fotoinwien.at/alexandru-bogdan-fotograf.jpg',
  url: 'https://www.fotoinwien.at',
  telephone: '+43-660-845-9895',
  email: 'info@fotoinwien.at',
  priceRange: '€€',
  
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Wien',
    addressRegion: 'Wien',
    postalCode: '1010',
    addressCountry: 'AT',
  },
  
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 48.2082,
    longitude: 16.3738,
  },
  
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  
  sameAs: [
    'https://www.instagram.com/fotoinwien',
    'https://www.facebook.com/fotoinwien',
  ],
  
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '5',
    bestRating: '5',
    worstRating: '1',
  },
  
  founder: {
    '@type': 'Person',
    '@id': 'https://www.fotoinwien.at/#founder',
    name: 'Alexandru Bogdan',
    jobTitle: 'Professional Photographer',
    knowsAbout: [
      'Business Photography',
      'Event Photography',
      'Portrait Photography',
      'Product Photography',
    ],
  },
};

// Person Schema (for About page)
export const PersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.fotoinwien.at/#founder',
  name: 'Alexandru Bogdan',
  alternateName: 'Alex Bogdan',
  
  image: 'https://www.fotoinwien.at/alexandru-bogdan-portrait.jpg',
  url: 'https://www.fotoinwien.at/uber-mich/',
  
  jobTitle: 'Professional Photographer',
  worksFor: {
    '@type': 'Organization',
    name: 'WELO MEDIA STUDIOS S.R.L.',
  },
  
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Wien',
    addressCountry: 'AT',
  },
  
  sameAs: [
    'https://www.instagram.com/fotoinwien',
    'https://www.facebook.com/fotoinwien',
  ],
  
  knowsAbout: [
    'Photography',
    'Business Photography',
    'Event Photography',
    'SEO',
    'Web Development',
  ],
  
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'TU Wien',
  },
};

// Service Schema (for each service page)
export const ServiceSchema = (service: {
  name: string;
  description: string;
  url: string;
  image: string;
  priceRange?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: service.name,
  provider: {
    '@id': 'https://www.fotoinwien.at/#business',
  },
  areaServed: {
    '@type': 'City',
    name: 'Wien',
  },
  description: service.description,
  url: service.url,
  image: service.image,
  priceRange: service.priceRange || '€€',
});

// ImageGallery Schema (for portfolio projects)
export const ImageGallerySchema = (project: {
  name: string;
  description: string;
  images: Array<{
    url: string;
    caption: string;
    width: number;
    height: number;
  }>;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: project.name,
  description: project.description,
  image: project.images.map((img) => ({
    '@type': 'ImageObject',
    url: img.url,
    caption: img.caption,
    width: img.width,
    height: img.height,
    author: {
      '@id': 'https://www.fotoinwien.at/#founder',
    },
    copyrightHolder: {
      '@id': 'https://www.fotoinwien.at/#founder',
    },
    license: 'https://www.fotoinwien.at/impressum/',
  })),
});

// FAQ Schema (for service pages)
export const FAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Article Schema (for blog posts)
export const ArticleSchema = (article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  dateModified: article.dateModified,
  author: {
    '@id': 'https://www.fotoinwien.at/#founder',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Foto in Wien',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.fotoinwien.at/logo.png',
    },
  },
});
```

#### 3. **Sitemap.xml Generation**
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fotoinwien.at';
  
  // Static pages
  const staticPages = [
    '',
    '/uber-mich',
    '/portfolio',
    '/leistungen',
    '/preise',
    '/blog',
    '/kontakt',
    '/impressum',
    '/datenschutz',
  ];
  
  // Service pages
  const services = [
    'portraitfotografie',
    'businessfotografie',
    'eventfotografie',
    'produktfotografie',
    'foodfotografie',
    'familienfotografie',
  ];
  
  // Portfolio projects (44 projects)
  const portfolioProjects = [
    'tu-wien-event-2024',
    'autonom-health-produktfotografie',
    // ... all 44 projects
  ];
  
  // Blog posts
  const blogPosts = [
    'business-fotografie-wien-guide',
    'eventfotografie-preise-wien',
    // ... all blog posts
  ];
  
  return [
    // Static pages
    ...staticPages.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    
    // Service pages
    ...services.map((service) => ({
      url: `${baseUrl}/leistungen/${service}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    
    // Portfolio projects
    ...portfolioProjects.map((project) => ({
      url: `${baseUrl}/portfolio/${project}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    
    // Blog posts
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];
}
```

#### 4. **Robots.txt**
```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://www.fotoinwien.at/sitemap.xml',
  };
}
```

#### 5. **Image SEO Best Practices**
```typescript
// All images MUST have:
<Image
  src="/path/to/image.avif"
  alt="Descriptive alt text with keywords - Business Fotografie Wien TU Event"
  width={1200}
  height={800}
  quality={85}
  priority={isAboveFold}  // Only for hero images
  placeholder="blur"
  blurDataURL="data:image/..."
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Alt text formula:
// [Main subject] - [Action/Context] - [Location if relevant] - [Client if B2B]
// Examples:
// "Business portrait - Corporate headshot session - TU Wien Vienna"
// "Event photography - Conference keynote speaker - Gerstner catering"
// "Product photography - HRV monitoring device - Autonom Health"
```

### Local SEO Strategy

#### 1. **Vienna-Specific Keywords**
```yaml
Primary Keywords (High intent):
  - Fotograf Wien (2,400/mo)
  - Business Fotograf Wien (320/mo)
  - Eventfotograf Wien (210/mo)
  - Produktfotograf Wien (170/mo)
  - Porträtfotograf Wien (140/mo)

Long-tail Keywords:
  - Business Fotografie Wien Preise (90/mo)
  - Eventfotografie Wien Kosten (70/mo)
  - Fotograf für Firmen Wien (50/mo)
  - Professionelle Produktfotos Wien (40/mo)
  - Food Fotograf Wien Restaurant (30/mo)

Location Modifiers:
  - Fotograf Innere Stadt
  - Fotograf Leopoldstadt
  - Fotograf Landstraße
  - Fotograf Mariahilf
  - Corporate Fotograf Donaustadt
```

#### 2. **Content Localization**
```yaml
Every page must include:
  - "Wien" in H1
  - "Vienna" or "Wien" mentioned 3-5 times naturally
  - References to Vienna locations where relevant
  - Client names from Vienna area

Examples:
  - "Als erfahrener Fotograf in Wien..."
  - "Ich habe bereits für führende Wiener Unternehmen wie TU Wien..."
  - "Mein Studio befindet sich im Herzen von Wien..."
  - "Outdoor Shootings an den schönsten Locations Wiens..."
```

#### 3. **Google Business Profile Optimization**
```yaml
Setup Checklist:
  - [ ] Verified listing as "Professional Service"
  - [ ] Primary category: Photographer
  - [ ] Secondary categories: Event Photographer, Portrait Studio
  - [ ] Business description (750 chars, keyword-rich)
  - [ ] Attributes: Women-led, Identifies as LGBTQ+ friendly, etc.
  - [ ] Service areas: All Vienna districts
  - [ ] Hours: Mon-Fri 9-18
  - [ ] Photos: Minimum 50 high-quality images
  - [ ] Posts: Weekly updates (new projects, tips, behind-scenes)
  - [ ] Q&A: Pre-populate 10 common questions
  - [ ] Reviews: Request after every completed project
  - [ ] Booking link: Direct to contact page
```

### Content Marketing Strategy

#### 1. **Blog Content Calendar (Year 1)**
```yaml
Q1 (Jan-Mar):
  Week 1: "Business Fotografie Wien: Der ultimative Guide 2026"
  Week 3: "Top 10 Locations für Outdoor Fotoshootings in Wien"
  Week 5: "Eventfotografie Preise Wien: Transparente Kostenübersicht"
  Week 7: "Corporate Headshots: Dos and Don'ts für perfekte Mitarbeiterportraits"
  Week 9: "TU Wien i²ncubator Event: Case Study & Behind the Scenes"
  Week 11: "Food Fotografie für Restaurants: Lighting Secrets"

Q2 (Apr-Jun):
  Week 13: "Produktfotografie für E-Commerce: 10 Profi-Tipps"
  Week 15: "Familienfotoshooting: Natürliche vs. gestellte Aufnahmen"
  Week 17: "Event Fotografie Checkliste für Veranstalter"
  Week 19: "Porträt vs. Business Foto: Was ist der Unterschied?"
  Week 21: "Bildrechte in Österreich: Was Sie wissen müssen"
  Week 23: "Vienna Photography Spots: Hidden Gems für Outdoor Portraits"

Q3 (Jul-Sep):
  Week 25: "Summer Corporate Events: Photography Planning Guide"
  Week 27: "Product Photography: White Background vs. Lifestyle"
  Week 29: "Team Building Events: Capturing Company Culture"
  Week 31: "Food Photography: Composition und Styling"
  Week 33: "LinkedIn Profilfotos: Why Professional Photos Matter"
  Week 35: "Conference Photography: Capturing Keynotes & Networking"

Q4 (Oct-Dec):
  Week 37: "Holiday Corporate Events: Photography Best Practices"
  Week 39: "Year-End Company Portraits: Bulk Booking Benefits"
  Week 41: "Product Launch Events: Photography Checklist"
  Week 43: "Austrian Business Etiquette: Corporate Photo Guidelines"
  Week 45: "2026 Photography Trends: What's Hot for Businesses"
  Week 47: "New Year, New Headshots: Why Update Your Corporate Photos"

Content Guidelines:
  - Length: 1200-2000 words
  - Images: 5-10 per post (own photos preferred)
  - CTAs: 2-3 per post (soft and hard)
  - Internal links: 3-5 to service/portfolio pages
  - External links: 1-2 to authoritative sources
  - Meta description: 150-160 chars
  - Focus keyword: H1, first 100 words, 2-3x in body
```

#### 2. **Internal Linking Strategy**
```yaml
Homepage:
  Links to:
    - All 6 service pages (from services section)
    - Portfolio page (from featured work)
    - About page (from bio teaser)
    - Contact page (from CTAs)
    - Blog page (from footer)

Service Pages:
  Links to:
    - Homepage (breadcrumb)
    - Portfolio (filtered by category)
    - Other related services (sidebar)
    - Pricing page (from pricing section)
    - Contact page (from CTAs)
    - Relevant blog posts (3-5)

Portfolio Projects:
  Links to:
    - Portfolio index (breadcrumb)
    - Service page (this project's category)
    - Next/Previous project
    - Contact page ("Similar project inquiry")
    - Client website (if allowed)

Blog Posts:
  Links to:
    - Blog index (breadcrumb)
    - 3-5 related service pages
    - 2-3 relevant portfolio projects
    - 2-3 related blog posts
    - Contact page (soft CTA)

Anchor Text Strategy:
  - Natural, varied anchor text
  - Keywords when appropriate, but not forced
  - Examples:
    * "unsere Businessfotografie Services"
    * "professionelle Eventfotografie"
    * "ähnliche Projekte in unserem Portfolio"
    * "mehr über unsere Preise erfahren"
```

---

## 📱 COMPONENTS LIBRARY

### Core Components

#### 1. **Button Component**
```typescript
// components/ui/Button.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: string; // FontAwesome class (e.g., 'fa-solid fa-arrow-right')
  iconPosition?: 'left' | 'right';
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon,
  iconPosition = 'right',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all gap-2';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'border-2 border-black text-black hover:bg-black hover:text-white',
    ghost: 'text-black hover:bg-gray-100',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const className = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;
  
  const content = (
    <>
      {icon && iconPosition === 'left' && <i className={icon} />}
      {children}
      {icon && iconPosition === 'right' && <i className={icon} />}
    </>
  );
  
  const MotionComponent = motion(href ? Link : 'button');
  
  return (
    <MotionComponent
      href={href || ''}
      onClick={onClick}
      className={className}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {content}
    </MotionComponent>
  );
}

// Usage examples:
// <Button icon="fa-solid fa-arrow-right">Portfolio ansehen</Button>
// <Button icon="fa-solid fa-phone" iconPosition="left">Anrufen</Button>
// <Button icon="fa-brands fa-whatsapp" variant="secondary">WhatsApp</Button>
```

#### 2. **Portfolio Grid Component**
```typescript
// components/PortfolioGrid.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Category = 'all' | 'business' | 'portrait' | 'event' | 'product' | 'food' | 'family' | 'boudoir';

interface Project {
  id: string;
  slug: string;
  title: string;
  category: Category[];
  featuredImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  imageCount: number;
}

interface PortfolioGridProps {
  projects: Project[];
  initialCategory?: Category;
}

export function PortfolioGrid({ projects, initialCategory = 'all' }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory);
  
  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'Alle' },
    { value: 'business', label: 'Business' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'event', label: 'Event' },
    { value: 'product', label: 'Produkt' },
    { value: 'food', label: 'Food' },
    { value: 'family', label: 'Familie' },
    { value: 'boudoir', label: 'Boudoir' },
  ];
  
  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category.includes(activeCategory));
  
  return (
    <div className="space-y-12">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`
              px-6 py-2 text-sm font-medium transition-all
              ${
                activeCategory === cat.value
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-black'
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>
      
      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/portfolio/${project.slug}`} className="group block">
                <motion.div
                  className="relative aspect-[4/3] overflow-hidden bg-gray-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={project.featuredImage.src}
                    alt={project.featuredImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </motion.div>
                
                <div className="mt-4 space-y-1">
                  <h3 className="text-lg font-medium text-black group-hover:underline">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {project.imageCount}+ Bilder
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
```

#### 3. **Lightbox Component**
```typescript
// components/Lightbox.tsx
'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface LightboxGalleryProps {
  images: Image[];
  children: React.ReactNode;
}

export function LightboxGallery({ images, children }: LightboxGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  
  const slides = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    width: img.width,
    height: img.height,
  }));
  
  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>
      
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
        animation={{ fade: 300 }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </>
  );
}
```

#### 4. **Testimonial Carousel**
```typescript
// components/TestimonialCarousel.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  image?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);
  
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  
  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <blockquote className="text-xl md:text-2xl font-light italic text-gray-800">
            "{testimonials[current].quote}"
          </blockquote>
          
          <div className="flex flex-col items-center space-y-2">
            {testimonials[current].image && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={testimonials[current].image!}
                  alt={testimonials[current].author}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div>
              <p className="font-medium text-black">
                {testimonials[current].author}
              </p>
              <p className="text-sm text-gray-600">
                {testimonials[current].position}
              </p>
              <p className="text-sm text-gray-500">
                {testimonials[current].company}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`
              w-2 h-2 rounded-full transition-all
              ${idx === current ? 'bg-black w-8' : 'bg-gray-300'}
            `}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
```

#### 5. **Contact Form**
```typescript
// components/ContactForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  gdpr: boolean;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    gdpr: false,
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const services = [
    'Business Fotografie',
    'Eventfotografie',
    'Portraitfotografie',
    'Produktfotografie',
    'Food Fotografie',
    'Familienfotografie',
    'Sonstiges',
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    
    if (!formData.gdpr) {
      setStatus('error');
      setErrorMessage('Bitte akzeptieren Sie die Datenschutzerklärung.');
      return;
    }
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          gdpr: false,
        });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition"
        />
      </div>
      
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          E-Mail *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition"
        />
      </div>
      
      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Telefon
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition"
        />
      </div>
      
      {/* Service */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium mb-2">
          Gewünschte Leistung
        </label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition"
        >
          <option value="">Bitte wählen...</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>
      
      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Nachricht *
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition resize-none"
        />
      </div>
      
      {/* GDPR */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="gdpr"
          required
          checked={formData.gdpr}
          onChange={(e) => setFormData({ ...formData, gdpr: e.target.checked })}
          className="mt-1"
        />
        <label htmlFor="gdpr" className="text-sm text-gray-600">
          Ich habe die{' '}
          <a href="/datenschutz" className="underline hover:text-black">
            Datenschutzerklärung
          </a>{' '}
          gelesen und akzeptiere diese. *
        </label>
      </div>
      
      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-black text-white py-4 font-medium hover:bg-gray-800 transition disabled:opacity-50"
        whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
        whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
      >
        {status === 'loading' ? 'Wird gesendet...' : 'Nachricht senden'}
      </motion.button>
      
      {/* Status Messages */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 text-green-800 text-center"
        >
          Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Ich melde mich
          innerhalb von 24 Stunden bei Ihnen.
        </motion.div>
      )}
      
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 text-red-800 text-center"
        >
          {errorMessage}
        </motion.div>
      )}
    </form>
  );
}
```

---

## 🚀 DEPLOYMENT & MAINTENANCE

### Deployment Checklist

#### Pre-Launch
```yaml
- [ ] All 44 portfolio projects added
- [ ] All images optimized (AVIF + WebP)
- [ ] All metadata/schemas added
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] 301 redirects from old URLs set up
- [ ] Contact form tested (sends emails)
- [ ] GDPR cookie consent implemented
- [ ] Google Analytics/Tag Manager added
- [ ] Lighthouse audit: 100/100/100/100
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Accessibility audit passed
- [ ] SSL certificate active
- [ ] CDN configured (Cloudflare)
```

#### Launch Day
```yaml
- [ ] Deploy to Hostico via static export
- [ ] Verify DNS propagation
- [ ] Test all forms and CTAs
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Update Google Business Profile with new URL
- [ ] Social media announcements
- [ ] Email existing clients about new site
- [ ] Monitor error logs for 24 hours
```

#### Post-Launch (Week 1)
```yaml
- [ ] Monitor Google Search Console for crawl errors
- [ ] Check Core Web Vitals data
- [ ] Review analytics for user behavior
- [ ] Fix any reported bugs
- [ ] A/B test CTA buttons
- [ ] Start blog content publishing
```

### Maintenance Schedule

#### Weekly
```yaml
- Publish 1 blog post
- Review analytics for traffic trends
- Check for broken links
- Monitor form submissions
- Update portfolio with new projects
```

#### Monthly
```yaml
- Google Search Console audit
- Core Web Vitals review
- Competitor analysis
- Backlink profile check
- Content performance review
- Update schema markup if needed
```

#### Quarterly
```yaml
- Full SEO audit
- Technical performance audit
- Security updates
- Dependency updates (Next.js, React, etc.)
- A/B test new layouts/CTAs
- User feedback survey
```

---

## 📊 SUCCESS METRICS

### KPIs (Track in Google Analytics)

#### Traffic Metrics
```yaml
Target (6 months post-launch):
  - Organic Sessions: +50%
  - Direct Traffic: +30%
  - Bounce Rate: < 40%
  - Avg. Session Duration: > 2 minutes
  - Pages per Session: > 2.5
```

#### Conversion Metrics
```yaml
Target:
  - Contact Form Submissions: 20/month
  - WhatsApp Clicks: 30/month
  - Phone Calls: 15/month
  - Portfolio View Duration: > 3 minutes
  - Conversion Rate: > 3%
```

#### SEO Metrics
```yaml
Target (12 months):
  - "Fotograf Wien": Top 5
  - "Business Fotograf Wien": Top 3
  - "Eventfotograf Wien": Top 3
  - Indexed Pages: 100+
  - Backlinks: 50+ (quality)
  - Domain Authority: 30+
```

#### Technical Metrics
```yaml
Maintain:
  - Lighthouse Performance: 100/100
  - LCP: < 1.0s
  - CLS: 0
  - Uptime: 99.9%
```

---

## 💬 CONTENT GUIDELINES

### Tone of Voice
```yaml
Professional yet approachable:
  - Use "ich" (first person) to build connection
  - Formal German ("Sie" not "du") for business
  - Confident but not arrogant
  - Emphasize experience and quality
  - Show personality in blog posts

Examples:
  ❌ "Wir machen die besten Fotos in Wien."
  ✅ "Mit über 20 Jahren Erfahrung erstelle ich Fotografien, die Ihre Geschichte erzählen."
  
  ❌ "Kontaktieren Sie uns für weitere Informationen."
  ✅ "Ich freue mich darauf, mehr über Ihr Projekt zu erfahren. Kontaktieren Sie mich gerne."
```

### Writing Style
```yaml
Clear and concise:
  - Short sentences (max 20 words)
  - Short paragraphs (3-4 sentences)
  - Use subheadings liberally
  - Bullet points for lists
  - Active voice preferred
  - Avoid jargon unless explaining it

SEO Writing:
  - Keyword in first 100 words
  - Natural keyword density (1-2%)
  - Synonyms and related terms
  - Answer user questions directly
  - Use "Wien" frequently but naturally
```

---

## 🔒 SECURITY & COMPLIANCE

### GDPR Requirements
```yaml
Cookie Consent:
  - Banner on first visit
  - Categories: Necessary, Analytics, Marketing
  - Opt-in for non-necessary cookies
  - Easy opt-out mechanism

Privacy Policy Must Include:
  - Data collected (name, email, phone, IP)
  - Purpose of collection
  - Data storage duration
  - Third-party services (Google Analytics, Cloudflare)
  - User rights (access, deletion, portability)
  - Contact info for data inquiries

Data Processing:
  - Form data: Encrypt in transit (HTTPS)
  - Email service: GDPR-compliant (e.g., SendGrid EU)
  - Analytics: Anonymize IPs
  - No data sharing with third parties without consent
```

### Security Headers
```javascript
// next.config.js - Security headers
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
  ];
},
```

---

## 📝 FINAL NOTES

### What Makes This Site Exceptional

1. **Performance First**: Every decision prioritizes speed
2. **SEO Excellence**: Built-in best practices, not afterthoughts
3. **User Experience**: Frictionless path to conversion
4. **Content Strategy**: Long-term organic growth plan
5. **Accessibility**: Inclusive design for all users
6. **Maintainability**: Clean code, clear documentation
7. **Icon Consistency**: FontAwesome Free only, ZERO emoji usage

### Success Factors

1. **Consistency**: Regular blog posts and portfolio updates
2. **Quality**: Every image, every word, every detail matters
3. **Measurement**: Track metrics and iterate
4. **Authenticity**: Let Alexandru's personality shine through
5. **Client Focus**: Every element serves the user's need

---

## 🎬 IMPLEMENTATION PHASES

### Phase 1: Foundation (Week 1)
- Next.js setup with all dependencies
- Design system (colors, typography, spacing)
- Core components (Button, Image, Container)
- Layout structure (Header, Footer)

### Phase 2: Homepage (Week 1)
- Hero section with parallax
- Services overview
- Featured portfolio grid
- Testimonial carousel
- CTAs and footer

### Phase 3: Portfolio (Week 2)
- Portfolio index with filters
- Lightbox implementation
- 44 project pages with galleries
- Schema markup for images

### Phase 4: Service Pages (Week 2)
- 6 service landing pages
- FAQ sections with schema
- CTAs and pricing teasers

### Phase 5: Supporting Pages (Week 3)
- About page
- Pricing page
- Contact page with form
- Legal pages (Impressum, Datenschutz)

### Phase 6: Blog Setup (Week 3)
- Blog index
- Post template
- MDX configuration
- First 3 posts

### Phase 7: SEO & Performance (Week 4)
- All metadata
- All schemas
- Sitemap generation
- Image optimization
- Lighthouse optimization to 100/100

### Phase 8: Testing & Launch (Week 4)
- Cross-browser testing
- Mobile testing
- Form testing
- Analytics setup
- Deploy to Hostico
- Post-launch monitoring

---

**DOCUMENT VERSION:** 2.0  
**LAST UPDATED:** January 21, 2026  
**STATUS:** Ready for Implementation  
**ESTIMATED TIMELINE:** 4 weeks to full launch  
**ESTIMATED EFFORT:** 120-150 hours of development

---

**This document represents the gold standard for photographer portfolio websites in 2026. Follow it precisely for exceptional results.**
