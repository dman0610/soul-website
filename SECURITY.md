# SECURITY.md — Soul Project Security Rules

*Cross-references: `CLAUDE.md` (project structure) · `website/PROJECT.md` (build status)*

---

## Core Principle

No secrets are ever:
- committed to the repository
- exposed in frontend code
- hardcoded in any file

**If unsure → do not proceed. Ask first.**

---

## Project Structure — What Gets Pushed

```
c:/Projects/soul/
├── .env                   ← NEVER pushed (local secrets only)
├── .gitignore             ← enforces this
├── CLAUDE.md              ← pushed (no secrets here)
├── SECURITY.md            ← pushed (no secrets here)
├── website/               ← pushed (all files are PUBLIC)
│   ├── index.html
│   ├── demos/
│   ├── serve.mjs          ← pushed — must never read secrets
│   ├── screenshot.mjs     ← pushed
│   └── temporary screenshots/ ← never pushed
└── business/              ← NEVER pushed (sensitive business docs)
    └── soul_master_gameplan.md
```

---

## Required `.gitignore`

```
# Secrets
.env
.env.local
.env.*

# Business docs — never public
business/

# Dependencies
node_modules/

# Screenshots — temporary, delete after review
website/temporary screenshots/

# OS noise
.DS_Store
Thumbs.db
```

---

## Secret Management

### Where `.env` Lives
Always at project root: `c:/Projects/soul/.env`
Never inside `website/` — that folder is public.

```env
# Example — never commit this file
ANTHROPIC_API_KEY=your_key_here
BOTPRESS_ADMIN_TOKEN=your_token_here
```

Access only via Node:
```js
const key = process.env.ANTHROPIC_API_KEY;
```

---

## Frontend Rule — Critical

**Everything in `website/` is public. Treat it that way.**

`index.html`, `demos/`, `serve.mjs`, `screenshot.mjs` — all git-pushed, all visible to anyone.

Never put in any file inside `website/`:
- API keys or tokens
- Private endpoint URLs
- Admin credentials
- Environment variables read inline

### `serve.mjs` — Special Warning
This file lives inside `website/` and is git-pushed. If you ever add backend logic that requires a key, **move that logic outside `website/`** or proxy it. Do not add `process.env` reads to `serve.mjs` for sensitive values.

---

## Botpress (Current Demo Platform)

Botpress embed is safe — it uses only a public bot ID in the script tag:

```html
<!-- This is PUBLIC — bot ID is not a secret -->
<script src="https://cdn.botpress.cloud/webchat/v2/inject.js"></script>
<script src="https://files.bpcontent.cloud/YOUR_BOT_ID/webchat.js"></script>
```

**Never expose:**
- Botpress admin credentials
- Botpress API tokens (used for training bots via API)
- Workspace secrets from the Botpress dashboard

If Botpress tokens are ever needed in code → `.env` + backend proxy only.

---

## Claude API — When You Upgrade

When swapping Botpress for a custom Claude API backend (the product you're selling to clients), the architecture must be:

```
Browser (public)
    ↓
Your backend server (private — outside website/)
    ↓  reads ANTHROPIC_API_KEY from .env
Anthropic API
```

**Never do this:**
```js
// index.html or any frontend file — WRONG
const response = await fetch("https://api.anthropic.com/v1/messages", {
  headers: { "x-api-key": "sk-ant-..." }  // key is now public
});
```

**Always do this:**
```js
// Frontend calls YOUR server, not Anthropic directly
const response = await fetch("/api/chat", {
  method: "POST",
  body: JSON.stringify({ message: userInput })
});
// Your server (outside website/) holds the key and calls Anthropic
```

The backend server file should live at `c:/Projects/soul/server/` — outside `website/`, never git-pushed with secrets embedded.

---

## Git — Pre-Push Checklist

Before every `git push`:
- [ ] `.env` is in `.gitignore` and not staged
- [ ] `business/` is in `.gitignore` and not staged
- [ ] No API keys, tokens, or credentials in any staged file
- [ ] `website/temporary screenshots/` not staged
- [ ] `serve.mjs` contains no hardcoded secrets

Run this to catch accidental key patterns before pushing:
```bash
git diff --staged | grep -i "api_key\|secret\|token\|sk-ant\|bearer"
```

---

## Screenshots

Per `CLAUDE.md`: delete every screenshot immediately after reviewing.

Additional rules:
- Never capture a screenshot that has a key or token visible on screen
- Never paste screenshot content into chat, docs, or logs if it contains credentials
- `website/temporary screenshots/` is in `.gitignore` as a backup — but deletion is still required

---

## If a Secret Is Exposed

1. **Revoke immediately** — don't wait, don't investigate first. Revoke first.
2. Generate a new key/token
3. Update `.env` with the new value
4. Audit git history: `git log --all --full-history -- .env`
5. If committed: use `git filter-repo` or contact the platform's security team
6. Check all services that used the exposed key for unauthorized activity

---

## Security Mindset

Assume:
- All frontend code is visible to everyone
- All git commits are permanent (even "deleted" ones)
- `website/` is a public folder the moment it's pushed
- Any leak is exploitable immediately

If something feels unsafe → it is. Stop and ask.
