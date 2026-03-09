# Lalitham Academy — Website

A premium, fully responsive static website for **Lalitham Academy** — a learning platform offering fun and meaningful programs in English, Telugu, Yoga, Arts, Dance, Maths, and more for children and adults.

---

## Live Preview

Open `index.html` directly in any modern browser. No build step or server required.

---

## Project Structure

```
Lalitham_Academy/
│
├── index.html              # Main HTML file (single-page)
├── css/
│   └── styles.css          # Complete design system & all section styles
├── js/
│   └── script.js           # All interactive JS features
├── images/
│   └── placeholders/       # Image assets directory
└── README.md
```

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Navbar** | Sticky glassmorphism navbar with mobile hamburger menu |
| 2 | **Hero** | Full-screen hero with animated gradient blobs, Telugu tagline, stat counters, and CTA buttons |
| 3 | **Features** | 4 feature highlight cards (Small Batches, Certified Teachers, Class Recordings, Parent Updates) |
| 4 | **Courses** | 3-column plan layout — Basic, Advanced (Popular), and One-to-One Coaching with Google Form links |
| 5 | **Pricing** | Transparent 3-tier pricing cards with feature lists |
| 6 | **How It Works** | 4-step horizontal process timeline |
| 7 | **About** | Split layout — academy description + gradient feature card with stats |
| 8 | **Contact** | Contact details + enrollment form with JS validation |
| 9 | **Footer** | Gradient purple footer with quick links, social icons, and copyright |

---

## Courses Offered

### Basic Plan — ₹499 / batch (Up to 20 students)
- Rubik's Cube Basics
- Multiplication Tables
- Handwriting Improvement
- Yoga for Kids
- Yoga for Women
- Exercise for Kids
- Exercise for Elders
- Dance for Kids
- Dance for Women
- Basic Drawing
- Crafts & Lipan Art
- Amaravya Keerthanas

### Advanced Plan — Small batch (5 students)
| Course | Price |
|--------|-------|
| English 360° | ₹1,500/month |
| Phonics | ₹1,500/month |
| Grammar | ₹1,500/month |
| Telugu | ₹899/month |
| Hindi | ₹1,300/month |
| Speed Maths | ₹1,300/month |
| Karrasamu Classes | ₹1,500/month |

### One-to-One Individual Coaching
| Course | Price |
|--------|-------|
| English 360° | ₹3,000/month |
| Phonics | ₹3,000/month |
| Grammar | ₹3,000/month |
| Telugu | ₹2,500/month |
| Hindi | ₹2,500/month |
| Speed Maths | ₹3,000/month |
| Karrasamu Classes | ₹3,000/month |

---

## Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic page structure |
| **CSS3** | Custom design system with CSS variables, Flexbox, Grid, animations |
| **Vanilla JavaScript** | Interactivity — no frameworks or libraries |
| **Google Fonts** | Poppins (300–800 weight) |

No React. No Tailwind. No Bootstrap. No build tools required.

---

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Primary Gradient | `#7C3AED → #9333EA` | Buttons, accents, badges |
| Accent Green | `#22C55E` | Success states, premium buttons |
| WhatsApp | `#25D366 → #128C7E` | WhatsApp CTAs |
| Background | `#F8FAFC` | Page background |
| Card | `#FFFFFF` | Card surfaces |
| Border Radius | `14px` (cards), `9999px` (pills) | Rounded UI |
| Shadow | `0 10px 30px rgba(0,0,0,0.08)` | Card elevation |

### Typography
- **Font:** Poppins (Google Fonts)
- Hero Title: `48–56px`, weight `800`
- Section Titles: `32–40px`, weight `700`
- Body: `16px`, weight `400`
- Small / Labels: `12–14px`

---

## JavaScript Features

| Feature | Details |
|---------|---------|
| Sticky Navbar | Glassmorphism blur + shadow applied on scroll |
| Mobile Menu | Hamburger toggle with slide-in overlay, closes on Escape / outside click |
| Smooth Scroll | All `#anchor` links scroll smoothly with navbar offset |
| Active Nav Links | IntersectionObserver highlights current section in navbar |
| Scroll Reveal | Elements fade + slide in as they enter the viewport (staggered cascade) |
| Stat Counters | Animated number counters (ease-out-quad) triggered once on viewport entry |
| Form Validation | Required field checks, 10-digit phone validation, live error clearing |
| Ripple Effect | JS-powered click ripple on all `.ripple` buttons (cursor-origin precise) |
| 3D Card Tilt | Subtle perspective tilt on feature and step cards (desktop / hover only) |
| Phone Formatter | Auto-strips non-digits, caps at 10 characters |
| Back to Top | Appears after 400px scroll, smooth scrolls to top |

---

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| Desktop `> 1024px` | 3-column courses, 4-column features, full navbar |
| Tablet `≤ 1024px` | 2-column courses, 2-column features, stacked pricing |
| Mobile `≤ 768px` | Single column everything, hamburger menu, stacked hero CTAs |
| Small Mobile `≤ 420px` | Single column features, tighter stat grid |

---

## Google Form Links

| Plan | Button | Form URL |
|------|--------|----------|
| Basic | Register ₹499 | `https://docs.google.com/forms/d/e/1FAIpQLScH4xSnAo28DzSEDHgjxZU913V_LssJOuUF2FtlFEBvXIWhKQ/viewform` |
| Advanced | Register for Demo | `https://docs.google.com/forms/d/e/1FAIpQLScz7Pd_kMbqs5bxfNYQVtpIICanEPwtyRazUgUarWypaCBxBw/viewform` |
| One-to-One | Book 1-to-1 | `https://docs.google.com/forms/d/e/1FAIpQLScz7Pd_kMbqs5bxfNYQVtpIICanEPwtyRazUgUarWypaCBxBw/viewform` |

All form links open in a new tab with `rel="noopener noreferrer"`.

---

## Contact

| Channel | Details |
|---------|---------|
| Phone | +91 96763 02549 |
| Email | info@lalithamacademy.com |
| WhatsApp | https://wa.me/919676302549 |

---

## Accessibility

- All decorative elements use `aria-hidden="true"`
- Interactive elements have `aria-label` attributes
- Form fields use `<label>` with `for` attributes
- `role="alert"` and `aria-live="polite"` on form success message
- Keyboard navigation fully supported (Escape closes mobile menu)
- `prefers-reduced-motion` media query disables all animations for users who prefer it

---

## Browser Support

Works in all modern browsers:

- Chrome / Edge (Chromium) — full support
- Firefox — full support
- Safari — full support (webkit prefixes included for `backdrop-filter` and `background-clip`)

---

## License

This website and its content are the property of **Lalitham Academy**.
All rights reserved © 2024 Lalitham Academy.
