import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// ── Maui Snorkel Co. — Claude API ─────────────────────────────────────────────
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

const SYSTEM_PROMPT = `You are the AI assistant for Maui Snorkel Co. — a snorkel tour company in South Maui.

Key facts:
- Departures: 7:00 AM, 9:30 AM, 4:30 PM (sunset) from Kihei Boat Ramp, 2 Kaonoulu St, Kihei, HI 96753
- Duration: back within 3 hours
- Pricing: $89/adult, $65/child under 12. All gear included — masks, fins, snorkels, wetsuits, flotation vests, light breakfast
- Kids: ages 6+ recommended, small-size gear available, guides great with beginners
- Cancellation: full refund 48+ hours before departure; free reschedule anytime
- Bring: reef-safe sunscreen and a towel — everything else provided

Keep every answer to 2–3 sentences. Be warm and helpful. Push toward booking when someone seems interested.`

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
  } catch (e) {
    console.error('[chat/snorkel error]', e)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
