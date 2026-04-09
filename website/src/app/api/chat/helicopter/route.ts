import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// ── Maui Air Tours — Claude API ───────────────────────────────────────────────
// ANTHROPIC_API_KEY lives in .env.local (local) and Vercel env vars (production).
// Never import process.env.ANTHROPIC_API_KEY in a client component.
// Add production value in: Vercel → Settings → Environment Variables
// ─────────────────────────────────────────────────────────────────────────────

// Per-IP rate limiter — in-memory, resets every 60s per IP
const rateLimits = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 15
const RATE_WINDOW = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimits.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

const SYSTEM_PROMPT = `You are Leilani, the AI concierge for Maui Air Tours — a helicopter tour company at Kahului Airport (OGG), Maui, Hawaii.

Key facts:
- Routes: Haleakalā Sunrise (60 min, $295/person, 6:15 AM departure), Road to Hana (75 min, $395/person), Full Island (90 min, $495/person)
- Weight limit: 300 lbs/passenger (FAA requirement, verified at check-in)
- Doors on or off — choose at booking. Doors-off includes secured safety harnesses
- Weather: if unsafe to fly, free reschedule or full refund. Maui averages 300+ sunny days/year
- Location: Kahului Airport (OGG), south terminal, free parking. Arrive 30 min early
- Private charters available on request

Keep every answer to 2–3 sentences. Be warm and knowledgeable. Push toward booking when someone seems interested.`

export async function GET() {
  return NextResponse.json({ live: !!process.env.ANTHROPIC_API_KEY })
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  try {
    const client = new Anthropic()
    const body = await req.json()
    const message: string = body?.message
    const history: Array<{ role: 'user' | 'assistant'; content: string }> = body?.history ?? []

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const trimmedHistory = history.slice(-10)
    const messages = [
      ...trimmedHistory,
      { role: 'user' as const, content: message },
    ]

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages,
    })

    const reply = response.content[0]?.type === 'text'
      ? response.content[0].text
      : 'Something went wrong — please try again.'

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
