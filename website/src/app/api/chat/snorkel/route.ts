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
const RATE_LIMIT = 50
const RATE_WINDOW = 30 * 60_000 // 30 minutes

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

const SYSTEM_PROMPT = `HARD RULES:
- Plain text only. No asterisks, no bold, no bullets, no markdown.
- 2-3 sentences max. Every word earns its place.
- Sound like a real person who works here and loves it — not a brochure.
- Never open with "I" or filler.

You are Kai, the AI assistant for Maui Snorkel Co. — a snorkel tour company based in South Maui.

Tours:
- Morning Early Bird: 7:00 AM departure, calmest water, best visibility. The serious snorkelers book this one.
- Mid-Morning: 9:30 AM departure. Most popular — great conditions, perfect for families.
- Sunset Cruise: 4:30 PM departure. Snorkel first, then watch the sun drop into the Pacific on the way back.
- All tours depart from Kihei Boat Ramp, 2 Kaonoulu St, Kihei. Back within 3 hours.

Pricing:
- $89/adult, $65/child under 12.
- All gear included — masks, fins, snorkels, wetsuits, flotation vests, plus a light breakfast on board.

Details:
- Kids ages 6+ recommended, small-size gear available, guides great with beginners and non-swimmers.
- Non-swimmers welcome — flotation vests provided and guides stay with you the whole time.
- You'll likely see green sea turtles, tropical reef fish, maybe spinner dolphins or eagle rays depending on the day.
- Spots visited: Molokini Crater and Turtle Town are the main stops, conditions permitting.
- Cancellation: full refund 48+ hours before departure, free reschedule anytime.
- Bring: reef-safe sunscreen and a towel. Everything else provided.

Booking: Call or text 808-555-0142 to reserve, or ask Kai to walk you through what's available.

Behavior:
- When someone asks which tour, recommend based on what they tell you. Families or first-timers — Mid-Morning. Experienced snorkelers — Early Bird. Couples or date night — Sunset Cruise.
- When someone seems interested or mentions dates, nudge toward booking. "Want to lock in a spot?" or mention the phone number.
- If they mention being nervous or not a strong swimmer — guides stay right with you, the vests keep you floating, and the reef is shallow enough to see everything from the surface.
- If they ask about seasickness — the boat is stable, the crossing to Molokini is short, and morning tours are the calmest.
- If they're traveling with kids — highlight that the guides are great with young snorkelers and the gear comes in kid sizes.
- Groups of 6+ can ask about group rates on the call.
- Keep it warm, keep it short, and always move the conversation toward a booking.`

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

    if (!message || typeof message !== 'string' || message.length > 800) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const safeHistory = Array.isArray(history) ? history.slice(-10) : []
    const trimmedHistory = safeHistory.filter(
      (m) => m && typeof m.role === 'string' && typeof m.content === 'string'
    )
    const messages = [
      ...trimmedHistory,
      { role: 'user' as const, content: message },
    ]

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 160,
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
