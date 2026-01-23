# FOTOINWIEN.AT - PRODUCTION BRIEF

## DEVELOPMENT WORKFLOW (OBLIGATORIU)

### Git Rules - MANDATORY after EVERY intervention
After EVERY work session or significant progress, Claude MUST:
1. `git add .` - Stage all changes
2. `git commit -m "[PHASE X] Description"` - Commit with detailed message
3. `git push origin master` - Push to remote

**Commit message format:**
```
[PHASE X] Brief description

- Change 1
- Change 2
- etc.
```

### Progress Log
| Date | Phase | What was done | Status |
|------|-------|---------------|--------|
| 2026-01-21 | Phase 1-2 | Project setup, Tailwind, Layout, Pages | Completed |
| 2026-01-22 | Assets | Downloaded 1545 portfolio images from fotoinwien.at | Completed |
| 2026-01-22 | Docs | Compressed CLAUDE.md from 61K to 6K chars | Completed |

**GitHub:** https://github.com/StrikeLike/Website-Foto-in-Wien

---

## PROJECT OVERVIEW

**Owner:** Alexandru Bogdan - WELO MEDIA STUDIOS S.R.L.
- 20+ years SEO expertise, WordPress developer, Professional photographer in Vienna
- Clients: TU Wien, Autonom Health, V-Suit, Gerstner, Hope for the Future

**Business Goals:**
1. Generate qualified leads from Vienna corporate market
2. Establish authority in business/event photography
3. Rank top 3 for commercial photography keywords in Vienna

---

## DESIGN SYSTEM

### Colors (Strict B&W)
```css
--color-background: #FFFFFF;
--color-text-primary: #0A0A0A;
--color-text-secondary: #4A4A4A;
--color-border: #E5E5E5;
--color-hover: #2A2A2A;
```

### Typography
```css
--font-family: 'Jost', sans-serif;
--font-size-hero: clamp(2.5rem, 5vw, 4rem);
--font-size-h1: clamp(2rem, 4vw, 3rem);
--font-size-h2: clamp(1.5rem, 3vw, 2rem);
--font-size-body: clamp(1rem, 1.5vw, 1.125rem);
```

### Spacing (8px base)
```css
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 2rem;
--space-lg: 4rem;
--space-xl: 8rem;
```

### Icons - FontAwesome Free v6+
- NO emoji anywhere
- Navigation: fa-camera, fa-briefcase, fa-user, fa-tags, fa-blog, fa-envelope
- Services: fa-building, fa-users, fa-portrait, fa-box, fa-utensils, fa-people-roof
- Actions: fa-arrow-right, fa-phone, fa-paper-plane
- Social: fa-brands fa-instagram/facebook/whatsapp

### Design Principles
- Whitespace: 64px min between sections, max-width 65ch for text
- Images: Color (not B&W), 3:2 landscape, 4:5 portrait, zero layout shift
- Motion: scale 1.02 hover, 0.4s duration, cubic-bezier(0.4, 0, 0.2, 1)
- Breakpoints: 640px/768px/1024px/1440px/1920px

---

## TECH STACK

```json
{
  "dependencies": {
    "next": "14.2.18",
    "react": "18.3.1",
    "framer-motion": "11.11.17",
    "@studio-freight/lenis": "1.0.42",
    "yet-another-react-lightbox": "3.21.6",
    "@fortawesome/fontawesome-free": "6.7.2",
    "sharp": "0.33.5"
  },
  "devDependencies": {
    "typescript": "5.6.3",
    "tailwindcss": "3.4.17"
  }
}
```

### Next.js Config
- output: 'export' (static)
- trailingSlash: true
- images: AVIF + WebP, deviceSizes: [640, 768, 1024, 1280, 1536, 1920]

### Performance Budgets
- Lighthouse: 100/100/100/100
- LCP < 1.0s, FID < 50ms, CLS: 0, INP < 100ms
- JS < 150KB, CSS < 30KB, First Load < 100KB

---

## SITE ARCHITECTURE

### URLs
```
/ (Homepage)
/uber-mich/
/portfolio/
/portfolio/[project-slug]/
/leistungen/
/leistungen/[service]/ (portraitfotografie, businessfotografie, eventfotografie, produktfotografie, foodfotografie, familienfotografie)
/preise/
/blog/
/blog/[article-slug]/
/kontakt/
/impressum/
/datenschutz/
```

### Page Structure

**Homepage:** Hero + Social Proof (client logos) + Services (6 cards) + Featured Portfolio (6-8) + Testimonials + About Teaser + CTA + Footer

**Portfolio:** Filter bar (All, Business, Portrait, Event, Product, Food, Family, Boudoir) + Grid + Lazy load 12 items

**Service Pages:** Hero + What's Included + Process + Gallery (8-12) + Pricing Teaser + FAQ (5-7) + Testimonial + CTA

**About:** Portrait + Bio + Timeline + Equipment + Client Logos + Testimonials + CTA

**Pricing:** Intro + Tables (Basic/Standard/Premium per service) + Add-ons + Package Deals + FAQ + CTA

**Blog:** Grid 3col + Featured post + Categories + Pagination 12/page

**Contact:** Methods (Phone/Email/WhatsApp/Address) + Form (Name, Email, Phone, Service, Message, GDPR) + Availability + Social

---

## SEO

### Metadata
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://www.fotoinwien.at'),
  title: { default: 'Fotograf Wien - Alexandru Bogdan | Business & Event Fotografie', template: '%s | Foto in Wien' },
  description: 'Professioneller Fotograf in Wien für Business, Event, Portrait und Produktfotografie. 20+ Jahre Erfahrung.',
  openGraph: { type: 'website', locale: 'de_AT', siteName: 'Foto in Wien' },
  robots: { index: true, follow: true }
};
```

### Schema Types
- LocalBusiness + ProfessionalService (site-wide)
- Person (About page)
- Service (each service page)
- ImageGallery + ImageObject (portfolio)
- FAQPage (service pages)
- Article (blog posts)

### Keywords
Primary: Fotograf Wien, Business Fotograf Wien, Eventfotograf Wien, Produktfotograf Wien, Porträtfotograf Wien

### Local SEO Rules
- "Wien" in every H1
- Vienna mentioned 3-5x per page naturally
- Client names from Vienna area

---

## CONTENT GUIDELINES

### Tone
- First person "ich"
- Formal German "Sie"
- Confident, not arrogant

### Writing
- Short sentences (max 20 words)
- Short paragraphs (3-4 sentences)
- Active voice
- Keyword in first 100 words
- Natural density 1-2%

---

## GDPR & SECURITY

### Cookie Consent
- Banner on first visit
- Categories: Necessary, Analytics, Marketing
- Opt-in for non-necessary

### Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

---

## IMPLEMENTATION PHASES

1. **Foundation:** Next.js setup, design system, core components, layout
2. **Homepage:** Hero, services, portfolio grid, testimonials, CTAs
3. **Portfolio:** Index with filters, lightbox, project pages, schema
4. **Services:** 6 landing pages, FAQs, CTAs
5. **Supporting:** About, Pricing, Contact, Legal pages
6. **Blog:** Index, post template, MDX
7. **SEO:** Metadata, schemas, sitemap, optimization
8. **Launch:** Testing, analytics, deploy to Hostico

---

## CHECKLISTS

### Pre-Launch
- All portfolio projects added
- Images optimized (AVIF + WebP)
- All metadata/schemas
- Sitemap + robots.txt
- Contact form working
- GDPR consent
- Analytics
- Lighthouse 100/100/100/100

### Launch
- Deploy to Hostico
- Submit sitemap to GSC
- Update Google Business Profile
- Monitor 24h

---

**VERSION:** 2.0 | **UPDATED:** January 21, 2026
