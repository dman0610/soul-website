# SECURITY.md — Soul API Key Rules

Read this before writing any code that touches APIs, keys, or external services.

---

## The One Rule

**API keys and tokens never go in code. Ever.**

No hardcoding. No `const token = "bp_..."`. No committing `.env.local`.
Keys live in two places only: your local `.env.local` (gitignored) and the Vercel dashboard.

---

## How the Proxy Pattern Works

```
Browser chatbot widget
  └─ POST /api/chat/soul        ← Next.js API route (runs on server)
  └─ POST /api/chat/snorkel
  └─ POST /api/chat/helicopter
           │
           └─ reads BOTPRESS_*_WEBHOOK_URL + BOTPRESS_*_TOKEN from process.env
           └─ forwards request to Botpress
           └─ returns reply to browser

The browser never sees the token. It only talks to /api/chat/*.
```

Never import `process.env.BOTPRESS_*` in a client component (`"use client"`).
Only read env vars in `src/app/api/` route handlers.

---

## Environment Variables

### Local development — `.env.local`
- Gitignored. Never committed. Lives on your machine only.
- Copy `.env.example`, fill in values, save as `.env.local`.
- Restart `npm run dev` after changes.

### Production — Vercel dashboard
- Go to: Project → Settings → Environment Variables
- Add each key manually. Vercel injects them at build/runtime.
- You never push keys to GitHub. Vercel reads them from its own vault.

### Safe to commit — `.env.example`
- Contains key names only, no real values.
- Documents what keys are needed so the project is self-explanatory.

---

## Botpress Env Vars (all server-side only)

| Variable | Description |
|---|---|
| `BOTPRESS_SOUL_WEBHOOK_URL` | Inbound webhook URL for the Soul AI assistant bot |
| `BOTPRESS_SOUL_TOKEN` | Auth token for the Soul bot |
| `BOTPRESS_SNORKEL_WEBHOOK_URL` | Inbound webhook URL for the Maui Snorkel Co. bot |
| `BOTPRESS_SNORKEL_TOKEN` | Auth token for the Snorkel bot |
| `BOTPRESS_HELI_WEBHOOK_URL` | Inbound webhook URL for the Maui Air Tours bot |
| `BOTPRESS_HELI_TOKEN` | Auth token for the Helicopter bot |

Get these from: **Botpress Cloud → your bot → Integrations → HTTP Integration**

---

## Checklist Before Pushing

- [ ] `.env.local` is in `.gitignore`
- [ ] `git status` does not show `.env.local` as staged or tracked
- [ ] No `process.env.*` reads in any `"use client"` component
- [ ] No token strings in any `.tsx`, `.ts`, or `.js` file
- [ ] `.env.example` has key names but no values
