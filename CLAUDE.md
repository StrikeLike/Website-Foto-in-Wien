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
| 2026-01-25 | Docs | Added Security, Glassmorphism, Carousel specs | Completed |
| 2026-01-25 | Phase 2 | Elegant backgrounds all pages + glassmorphism | Completed |
| 2026-01-26 | Phase 2 | Interactive mouse parallax for 20 background effects | Completed |
| 2026-02-01 | Phase 2 | Scroll transition test pages (sticky overlap + scale + parallax + DoF) | Completed |
| 2026-02-03 | Phase 2 | New homepage with dark/light mode, photography backgrounds, no scroll overlap | Completed |
| 2026-02-03 | Docs | Created TASKS-UIUX.md with 70+ improvement tasks organized by priority | Completed |

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

### Glassmorphism Design System
Premium frosted glass effects pentru elemente UI elegante:

```css
/* Light glass - for dark backgrounds */
.glass {
  @apply backdrop-blur-xl rounded-3xl;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Dark glass - for light backgrounds */
.glass-dark {
  @apply backdrop-blur-xl rounded-3xl;
  background: rgba(27, 27, 27, 0.03);
  border: 1px solid rgba(27, 27, 27, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

/* Glass card with 3D depth */
.glass-card-3d {
  @apply backdrop-blur-xl rounded-3xl;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px 2px rgba(0,0,0,0.02), 0 4px 8px rgba(0,0,0,0.02), 0 16px 32px rgba(0,0,0,0.04);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.glass-card-3d:hover {
  transform: translateY(-8px) scale(1.02);
}

/* Glass on dark sections */
.glass-card-on-dark {
  @apply backdrop-blur-xl rounded-3xl;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

/* Glass button */
.btn-glass {
  @apply backdrop-blur-md px-6 py-3 rounded-full font-semibold;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Glass shimmer effect */
.glass-shimmer::after {
  content: '';
  position: absolute;
  top: 0; left: -100%; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}
.glass-shimmer:hover::after { left: 100%; }
```

**Usage Guidelines:**
- Use `.glass` pe backgrounds întunecate (hero sections, dark overlays)
- Use `.glass-dark` pe backgrounds albe/deschise
- Minimum `backdrop-blur-xl` pentru efect vizibil
- Combine cu `rounded-3xl` pentru modern look
- Add `hover:scale-[1.02]` pentru interactive elements

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

**Homepage:** Hero + Social Proof (client logos) + Services (6 cards) + **Ausgewählte Arbeiten (Carousel)** + Testimonials + About Teaser + CTA + Footer

### Ausgewählte Arbeiten - Carousel Component
Apple-style horizontal scroll carousel (similar to shop.fotoinwien.at):

```typescript
// components/home/FeaturedWorks.tsx
interface CarouselProps {
  children: ReactNode;
  showArrows?: boolean;   // Desktop navigation arrows
  showFades?: boolean;    // Edge fade gradients
}
```

**Carousel CSS (globals.css):**
```css
/* Main carousel container */
.carousel-container {
  @apply flex gap-6 overflow-x-auto scroll-smooth pb-4;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.carousel-container::-webkit-scrollbar { display: none; }

/* Carousel item - fixed width */
.carousel-item {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 280px;  /* Mobile */
}
@media (min-width: 640px) { .carousel-item { width: 300px; } }
@media (min-width: 1024px) { .carousel-item { width: 320px; } }

/* Navigation arrows */
.carousel-arrow {
  @apply absolute top-1/2 -translate-y-1/2 z-20;
  @apply w-12 h-12 rounded-full flex items-center justify-center;
  @apply bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200/50;
  @apply hover:bg-white hover:shadow-xl hover:scale-110;
  @apply disabled:opacity-30 disabled:cursor-not-allowed;
}
.carousel-arrow-left { left: -24px; }
.carousel-arrow-right { right: -24px; }

/* Hide arrows on mobile (native swipe) */
@media (max-width: 1023px) { .carousel-arrow { display: none; } }

/* Edge fade gradients */
.carousel-fade-left {
  @apply absolute top-0 bottom-4 w-16 z-10 pointer-events-none;
  background: linear-gradient(to right, rgba(255,255,255,0.9), transparent);
}
.carousel-fade-right {
  @apply absolute top-0 bottom-4 w-16 z-10 pointer-events-none;
  background: linear-gradient(to left, rgba(255,255,255,0.9), transparent);
}
```

**Implementation Notes:**
- Cards: 340px mobile, 380px tablet, 420px desktop
- Gap: 20px between cards
- Snap scroll pentru smooth navigation
- Arrows visible doar pe desktop (lg+)
- Fade edges indică mai mult content
- Animation: `animate-slide-in-right-viewport` cu stagger delay
- Card style: alternating dark/light backgrounds precum Apple Store

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

### Security Headers (next.config.js)
```javascript
headers: [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;" }
]
```

---

## SECURITY BEST PRACTICES

### 1. Input Validation & Sanitization
- **Contact Form:** Validate all inputs server-side (even for static site via Netlify/Vercel functions)
- **Email validation:** Use regex + DNS MX record check
- **Phone validation:** Austrian format (+43...)
- **Rate limiting:** Max 5 submissions per IP per hour
- **Honeypot field:** Hidden field to catch bots

### 2. XSS Prevention
- Never use `dangerouslySetInnerHTML` without sanitization
- Use DOMPurify for any user-generated content
- Escape all dynamic content in templates
- CSP headers block inline scripts from external sources

### 3. CSRF Protection
- Use SameSite=Strict cookies
- Include CSRF tokens in forms (if using server functions)
- Validate Origin/Referer headers

### 4. Dependency Security
```bash
# Run before every deployment
npm audit
npm audit fix
# Use Snyk for continuous monitoring
npx snyk test
```

### 5. Image Security
- Validate file types server-side (magic bytes, not just extension)
- Strip EXIF metadata from uploaded images
- Use signed URLs for any dynamic image serving
- Implement max file size limits (10MB)

### 6. API Security (Contact Form Endpoints)
- Use HTTPS only (enforce via HSTS)
- Implement request throttling
- Validate Content-Type headers
- Log all form submissions (without sensitive data)

### 7. Static Site Specific
- No exposed `.env` files (use `.env.local` + `.gitignore`)
- No API keys in client-side code
- Use environment variables for analytics IDs
- robots.txt: block sensitive paths

### 8. Hosting Security (Hostico/Vercel)
- Enable automatic HTTPS
- Configure HSTS (min 1 year)
- Enable DDoS protection
- Set up WAF rules if available
- Regular backups (weekly minimum)

### 9. Monitoring & Alerts
- Set up uptime monitoring (UptimeRobot free tier)
- Google Search Console security alerts
- Monitor for unauthorized changes (git hooks)

### 10. Pre-Launch Security Checklist
- [ ] All dependencies updated & audited
- [ ] Security headers configured
- [ ] CSP policy tested and working
- [ ] Contact form rate-limited
- [ ] No sensitive data in git history
- [ ] HTTPS enforced
- [ ] robots.txt configured
- [ ] Error pages don't leak info
- [ ] Admin paths protected (if any)

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

**VERSION:** 2.1 | **UPDATED:** January 25, 2026
