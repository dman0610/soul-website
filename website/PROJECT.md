# Soul Website — Project Status
*Business context and sales strategy: `business/soul_master_gameplan.md`*

---

## What We're Building

**Soul landing page** (`index.html`) — the main pitch. Space-themed, premium design. Prospects land here and immediately want what we're selling. CTA goes to "Book a Free Call." No pricing shown. Live chatbot floating bottom-right.

**Snorkel demo** (`demos/snorkel/index.html`) — fictional Maui snorkel tour company. Gorgeous, real-feeling tourism site with live chatbot. Shows exactly what a client gets.

**Helicopter demo** (`demos/helicopter/index.html`) — fictional Maui helicopter tour company. Second demo, different industry feel. Live chatbot.

---

## Brand
- Primary: `#c4620a` | Gold: `#e08820` | Rust: `#8b2a08` | Teal: `#2a9898` | BG: `#060810`
- Surface: `#0d1020` | Elevated: `#141828` | White: `#f5f5f0` | Muted: `#8a8a9a`
- Headings: Outfit | Body: DM Sans
- Aesthetic: Helix Nebula — warm amber/teal, deep space, cinematic, premium

## Tech
- Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui
- Routes: `/` (Soul) · `/demos/snorkel` · `/demos/helicopter`
- Chatbot: Botpress (free tier, 3 bots) — proxied via Next.js API routes (tokens server-side only)
- Until Botpress is live: API routes fall back to rich mock responses automatically
- Server: `npm run dev` → `http://localhost:3000`
- Screenshots: `node screenshot.mjs http://localhost:3000 desktop` + `mobile`
- Deploy: Vercel (connected to GitHub, auto-deploys on push)

---

## Page 1 — Soul Landing Page (`index.html`)

**Purpose:** Sell the service. Get them to book a free call.
**Audience:** Tourism business owners — not tourists.
**CTA:** "Book a Free Call" — one action only. No pricing on the page.

### Visual Direction
Dark, techy, premium. Deep space background with noise grain texture. Amber/gold glows. Feels like it costs money without trying.

### Hero Strategy
Headline hits the pain first: *"Your website loses bookings every night after 9pm."*
Subhead delivers the fix: *"Soul gives it a brain. AI that answers, sells, and books — 24/7."*
CTA above the fold. Chatbot visible immediately — pulses once at 4 seconds.

### Section Flow
1. **Hero** — headline (pain), subhead (solution), CTA, ambient gradient background
2. **Problem** — 3 pain points with icons: after-hours loss / repetitive questions / slow follow-up. Visceral copy, not corporate.
3. **Demo Prompt** — "See it working. Ask the bot anything." Draws attention to chatbot.
4. **How It Works** — 3 steps: We build → We train → You convert.
5. **Pricing Anchor** — "Starts at $500. Live in 7 days." No table. Confidence signal only.
6. **CTA Footer** — "Ready to stop losing bookings?" + Book a Free Call button.

### Wow Moment
Hero headline reads like they wrote it themselves. Chatbot pulse at 4 seconds creates the "wait, is that live?" reaction during demos.

### Chatbot Spec
- Position: fixed bottom-right
- Icon: yin-yang SVG, glows amber
- Mock Q&A: Soul-specific — answers questions about what Soul does, pricing range, timeline, how to get started

---

## Page 2 — Snorkel Demo (`demos/snorkel/index.html`)

**Business name:** Maui Snorkel Co. *(fictional)*
**Purpose:** Show the outcome. The real audience is the business owner watching over your shoulder.
**CTA:** "Book Your Adventure" → `#booking` anchor

### Visual Direction
Underwater / dreamy. Deep blue-green gradients (`#0a1628` → `#0d3348` → `#1a5f6a`). CSS light-ray animation filtering from above. Calm, aspirational, beautiful — not bright neon tropical.

### Hero Strategy
Full-viewport ocean gradient. Subtle animated light rays (opacity pulse keyframes).
- Headline: *"See Maui From Below."*
- Subhead: *"Snorkel tours departing daily from Kihei. Gear included. All skill levels welcome."*
- CTA + trust signals: ⭐⭐⭐⭐⭐ "500+ five-star tours"

### Section Flow
1. **Hero** — full viewport, ocean gradient, headline, CTA, trust signals
2. **Tours** — 2–3 tour cards (Morning Snorkel, Sunset Cruise, Private Charter). Price, duration, group size.
3. **What's Included** — icon row: gear / instruction / photos / drinks
4. **Reviews** — 2–3 realistic fake reviews. Real Maui names. Specific details ("We saw a green sea turtle — kids were speechless.")
5. **Booking CTA** — full-width. "Ready to go?" + button.

### Wow Moment
The underwater light-ray animation in the hero. Subtle, not gimmicky. Page feels alive before they read a word.

### Chatbot Spec
- Position: fixed bottom-right
- Icon: beach shack SVG, glows teal
- Mock Q&A: snorkel-specific — times, gear included, kids policy, meeting point, weather/cancellation

---

## Page 3 — Helicopter Demo (`demos/helicopter/index.html`)

**Business name:** Maui Air Tours *(fictional)*
**Purpose:** Show range. Proves Soul works for premium operators, not just budget ones.
**CTA:** "Reserve Your Flight" → `#booking` anchor

### Visual Direction
Cinematic. Powerful. Dark gradient (`#0a0a0f` → `#1a0f05`) with amber/gold glow from lower-left suggesting sunrise over ocean. Bold type. Minimal text. High contrast. Feels expensive.

### Hero Strategy
Full-viewport. Massive headline. Amber sunrise glow built entirely in CSS — no image needed.
- Headline: *"Maui From 3,000 Feet."*
- Subhead: *"Private helicopter tours over Haleakalā, the Road to Hana, and the Nā Pali coastline."*
- CTA + trust signals: "FAA Certified · Private Charters · Doors On or Off"

### Section Flow
1. **Hero** — cinematic, dark, minimal, powerful
2. **Routes** — 3 route cards (Haleakalā Sunrise, Full Island, Road to Hana). Duration, price range, capacity.
3. **The Experience** — 2-column split. Left: strong atmospheric copy. Right: gradient panel with pull quote.
4. **Safety & Trust** — FAA certified, pilot bios (fictional but professional), fleet info.
5. **Reserve CTA** — "Private charters available. Limited seats daily." + button.

### Wow Moment
The amber glow in the hero creates sunrise without a single image. Giant cinematic type. The contrast between this and the snorkel demo proves the system adapts — same Soul quality, completely different feel.

### Chatbot Spec
- Position: fixed bottom-right
- Icon: compass rose SVG, glows gold
- Mock Q&A: helicopter-specific — flight duration, weight limits, doors on/off, meeting location, weather policy, pricing tiers

---

## Build Priority

1. Soul landing page — company face, needed first
2. Snorkel demo — most relevant to Wave 1 targets (boat/snorkel operators)
3. Helicopter demo — shows range

If time is tight: ship Soul + Snorkel. Helicopter follows.

---

## Build Status

**Soul Landing Page**
- [ ] Pass 1 complete
- [ ] Pass 2 complete
- [ ] Chatbot mock widget working
- [ ] Mobile verified at 390px
- [ ] Complete

**Snorkel Demo**
- [x] Pass 1 complete
- [x] Pass 2 complete
- [x] Chatbot mock widget working
- [x] Mobile verified at 390px
- [ ] Complete

**Helicopter Demo**
- [x] Pass 1 complete
- [x] Pass 2 complete
- [x] Chatbot mock widget working
- [x] Mobile verified at 390px
- [x] Complete

**Chatbot**
- [ ] Botpress account set up
- [ ] Soul bot trained and wired
- [ ] Snorkel bot trained and wired
- [ ] Helicopter bot trained and wired
- [ ] Mock widgets replaced with live Botpress embeds

---

*Living document. Check boxes as milestones complete. Update after every session.*
