# CLAUDE.md — Soul Build System

Read `website/PROJECT.md` first. Always. This file is *how* to build. PROJECT.md is *what* and *why*. If they conflict — stop and ask before proceeding.

---

## Project Structure

```
c:/Projects/soul/
├── CLAUDE.md                  ← you are here
├── website/                   ← all site files (git-pushed) — Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx       ← Soul marketing landing page
│   │   │   ├── layout.tsx     ← Root layout (fonts, metadata)
│   │   │   └── globals.css    ← Brand CSS variables
│   │   ├── components/
│   │   │   └── ui/            ← shadcn + custom components
│   │   └── lib/utils.ts
│   ├── public/
│   ├── screenshot.mjs         ← Puppeteer screenshot tool
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── temporary screenshots/ ← delete after every review
│   ├── node_modules/
│   ├── PROJECT.md             ← website build status
│   └── TODO.md                ← active build checklist
└── business/                  ← never git-pushed
    └── soul_master_gameplan.md
```

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · @splinetool/react-spline

File access restricted to `c:/Projects/soul/` only.
Do not access `C:/Users/dmanf/` except for the Puppeteer Chrome cache path below.

---

## Every Session — Required Flow

1. Read `website/PROJECT.md` — build status and current state
2. Read `business/soul_master_gameplan.md` — business context and priorities
3. Check `website/TODO.md` — what's next
4. **Start the dev server** (if not already running): `cd website && npm run dev` — runs in background, serves at http://localhost:3000
5. Invoke `frontend-design` skill before writing any frontend code
6. Begin build — no stalling, no unnecessary questions

**Before writing any code that touches APIs, keys, or external services — read `SECURITY.md` first. No exceptions.**

Do not add sections. Do not expand scope. Improve quality, not quantity.
Always update `website/TODO.md` and `website/PROJECT.md` when milestones complete.

---

## Task Assignment Protocol

When the user assigns any task:

1. **Ask upfront questions first** — identify all ambiguities before starting (max 3 questions). Do not begin work until answered.
2. **Create `.claude/task.local.md`** — full checklist of every step required. Use `- [ ]` format.
3. **Work through the checklist** — check off each item with `- [x]` immediately upon completion.
4. **Do not stop** — the Stop hook reads `task.local.md` and blocks Claude from stopping until all items are checked.
5. **When all items are checked** — delete `.claude/task.local.md`. Hook will allow stop.

**To cancel mid-task:** say "stop" or "cancel" → Claude deletes the task file and stops cleanly.
**Emergency unblock:** delete `c:/Projects/soul/.claude/task.local.md` manually, or press Escape / Ctrl+C.

### `.claude/task.local.md` format
```markdown
# Task: [task name]

## Upfront Questions
- Q: [question] → A: [answer]

## Checklist
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3
```

---

## Core Principle — This Is the Product

**The chatbot is what they're buying. The website is the frame.**

When a prospect sees the Soul site or a demo site, the design *is* the pitch. It must be immediately, viscerally impressive — the kind of site that makes a Maui tourism business owner say "I want that for my business" before they read a single word.

- Beauty over adequacy. If it looks like a template, start over.
- Every section must feel intentional, designed, considered — not assembled.
- Obsess over the first 3 seconds. That's when the sale is won or lost.
- If it feels generic, expected, or forgettable — it is not done.

---

## Chatbot System

**Platform:** Botpress (demos). Advertise to clients as Custom Claude API.

### Botpress Embed Placeholder
Include this comment block in every page `<head>` until Botpress is configured:
```html
<!-- ═══════════════════════════════════════════════════ -->
<!-- BOTPRESS EMBED — add real snippet after Botpress setup -->
<!-- <script src="https://cdn.botpress.cloud/webchat/v2/inject.js"></script> -->
<!-- <script src="https://files.bpcontent.cloud/YOUR_BOT_ID/webchat.js"></script> -->
<!-- ═══════════════════════════════════════════════════ -->
```

### Mock Chat Widget (required until Botpress is live)
Every page needs a working chat trigger built in HTML/CSS/JS — no Botpress required.

**Trigger button:**
- Position: `fixed; bottom: 24px; right: 24px; z-index: 50`
- Size: 56×56px circle
- Icon: per PROJECT.md spec for each page (yin-yang / shack / compass)
- On click: toggle mock chat panel open/closed

**Mock panel:** pre-populate 2–3 exchanges that open automatically. Use specific Maui details:
```
Visitor: What time do tours start?
Bot: Morning snorkel tours depart at 7:00 AM and 9:30 AM daily from Kihei Boat Ramp. Want me to check availability?
Visitor: Do you provide gear?
Bot: Yes — masks, fins, snorkels, and wetsuits are all included. Nothing to bring except sunscreen.
```

**Pulse animation (required — fires once, 4 seconds after load):**
```css
@keyframes chatPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(196, 98, 10, 0.4); }
  50%       { box-shadow: 0 0 0 14px rgba(196, 98, 10, 0); }
}
```
This is the "wait, is that thing live?" moment during every demo. Do not skip it.

### Mobile Chat Panel Rules
- Panel: `left: 16px; right: 16px; width: auto` — never overflows screen
- Trigger button must not overlap any CTA button — verify at 390px

---

## Local Server

```bash
cd website && npm run dev
# Serves at http://localhost:3000 (Next.js dev server)
```
- Never screenshot a `file:///` URL — always use localhost
- If server is already running, do not start a second instance
- `serve.mjs` is no longer used — `npm run dev` replaces it

---

## Screenshot Workflow

```bash
# Desktop (1440px)
node website/screenshot.mjs http://localhost:3000 desktop

# Mobile (390px)
node website/screenshot.mjs http://localhost:3000 mobile
```

- Puppeteer: `website/node_modules/puppeteer/`
- Chrome cache: `C:/Users/dmanf/.cache/puppeteer/`
- Screenshots save to: `website/temporary screenshots/`
- **Delete every screenshot immediately after reviewing** — never accumulate
- Both viewports required after every build pass
- Be precise when comparing: "heading is 48px but should be ~36px" not "looks too big"

### Iteration Loop (minimum 2 passes — hard rule)
After every screenshot:
1. Identify the weakest section — be specific
2. Fix ONE thing: hierarchy, contrast, or spacing
3. Make ONE bold change that elevates the page
4. Re-screenshot both viewports
5. Repeat until success criteria checklist passes

---

## Output Defaults

- One Next.js page per site — `src/app/page.tsx` for Soul, `src/app/demos/snorkel/page.tsx` etc. for demos
- Tailwind CSS v4 (installed, no CDN needed)
- Fonts loaded via `next/font/google` in `layout.tsx` — Outfit + DM Sans
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first — every build must work on iPhone, Android, and desktop
- Components go in `src/components/ui/` — use shadcn primitives where applicable
- `"use client"` directive required on any component with hooks or interactivity

---

## Brand & Design System

### Colors — Brand Only (no Tailwind defaults for primary UI)
```css
--bg:        #060810;   /* void — main background */
--surface:   #0d1020;   /* elevated cards and sections */
--elevated:  #141828;   /* floating panels, nav, modals */
--amber:     #c4620a;   /* primary brand */
--gold:      #e08820;   /* accent */
--rust:      #8b2a08;   /* dark accent */
--teal:      #2a9898;   /* contrast accent */
--white:     #f5f5f0;   /* headings */
--muted:     #8a8a9a;   /* body, secondary text */
```
Never use Tailwind's default palette (no `indigo-500`, `blue-600`, `gray-700`) for brand elements.

### Typography
Fonts loaded via `next/font/google` in `src/app/layout.tsx` — no `<link>` tag needed.
```css
h1, h2, h3 { font-family: var(--font-outfit), sans-serif; letter-spacing: -0.03em; line-height: 1.1; }
body, p     { font-family: var(--font-dm-sans), sans-serif; line-height: 1.7; }
```
- Body minimum: 14px. Hero headline minimum at 390px: 28px.

### Elevation System (3 tiers — use all three per page)
```css
/* Base — page background */
background: var(--bg);

/* Elevated — cards, content sections */
background: var(--surface);
border: 1px solid rgba(255,255,255,0.06);

/* Floating — nav, chat panel, modals */
background: var(--elevated);
border: 1px solid rgba(255,255,255,0.10);
box-shadow: 0 20px 60px rgba(0,0,0,0.5);
```

### Backgrounds — Required Depth (use at least 2 per page)
```css
/* Layered radial gradients */
background:
  radial-gradient(ellipse at 20% 50%, rgba(196,98,10,0.12) 0%, transparent 60%),
  radial-gradient(ellipse at 80% 20%, rgba(42,152,152,0.08) 0%, transparent 50%),
  #060810;

/* Image overlays */
background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
mix-blend-mode: multiply;
```

### Motion — Strict Rules
**NEVER use `transition-all`.**

Only animate these properties: `transform`, `opacity`, `color`, `background-color`, `box-shadow`

Durations:
- UI hover/click: `150ms–250ms ease`
- Panels, hero elements: `300ms–500ms ease`
- Scroll-triggered: `600ms ease` with `animation-fill-mode: both`

---

## Mobile Rules (Non-Negotiable)

- `min-height: 100dvh` — never `100vh` (iOS Safari breaks it)
- `background-attachment: scroll` only — never `fixed` (iOS breaks it)
- Touch targets: minimum 44×44px on all buttons, links, nav items, FAQ rows
- `-webkit-tap-highlight-color: transparent` on all interactive elements
- Grids: single column at ≤768px — no exceptions
- No horizontal scroll — ever
- Fixed elements (nav, chat button): must not overlap each other or page content
- Chat popup: `left: 16px; right: 16px; width: auto` on mobile
- Section padding: desktop `96px 48px` / mobile `64px 20px`
- Decorative large elements (orbs, SVGs): must scale or clip — never cause overflow

---

## Anti-Generic Guardrails

- No flat shadows — layered, color-tinted, low opacity only
- No repeated section patterns (3-col grid → 3-col grid)
- Every section must feel compositionally different from the one above it
- At least one section per page must break the expected layout (full-bleed, diagonal, offset grid, asymmetric split)
- Hover, focus-visible, and active states required on every clickable element
- Copy must be real — no lorem ipsum, write Maui-specific text
- No emoji used as design elements

---

## Success Criteria (Hard Stop — Do Not Ship Until All Pass)

- [ ] Visually impressive in under 3 seconds — no reading required
- [ ] Chatbot trigger is visible on load and pulses at 4 seconds
- [ ] Mock chat panel opens with a real-feeling conversation
- [ ] Page purpose is clear without reading
- [ ] CTA appears above the fold and at the bottom
- [ ] No section looks templated
- [ ] Strong typographic hierarchy on every section
- [ ] Mobile: no horizontal scroll at 390px
- [ ] Mobile: chat button doesn't overlap CTA or content
- [ ] Mobile: all touch targets ≥44×44px
- [ ] Zero instances of `transition-all`
- [ ] Zero Tailwind default colors used for brand elements
- [ ] `min-height: 100dvh` on full-height sections
- [ ] Botpress embed placeholder comment present and clearly marked
- [ ] `TODO.md` and `PROJECT.md` updated

---

## Benchmark

Ask: *If a Maui surf shop owner saw this on a competitor's site, would they feel behind?*

If yes → it's done. If not → find the weakest section and fix it.

---

## What Claude Code Must Not Do

- Add sections or features not defined in PROJECT.md
- Use lorem ipsum — write real Maui tourism copy
- Stop after one screenshot pass
- Use `transition-all`
- Use Tailwind default palette for brand elements
- Use `100vh` for full-height sections
- Use `background-attachment: fixed`
- Let screenshots accumulate in `temporary screenshots/`
- Start a second server instance if one is running
- Access any path outside `c:/Projects/soul/` (except Puppeteer cache)
- Make design decisions that contradict PROJECT.md without asking first
