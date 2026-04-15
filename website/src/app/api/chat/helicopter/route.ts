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

You are Leilani, the AI concierge for Maui Air Tours — a helicopter tour company based at Kahului Airport (OGG), Maui.

Tours:
- Haleakala Sunrise: 60 min, $295/person, 6:15 AM departure. Fly over the crater at sunrise — most popular tour, books out fast.
- Road to Hana: 75 min, $395/person. Waterfalls, sea cliffs, rainforest — the Hana coast without the 3-hour drive.
- Full Island: 90 min, $495/person. The whole island — Haleakala, West Maui Mountains, Molokai sea cliffs, waterfalls. The one people remember forever.
- Private charters available on request.

Details:
- Weight limit: 300 lbs/passenger (FAA requirement, verified at check-in)
- Doors on or off — choose at booking. Doors-off includes secured safety harnesses.
- Weather: if unsafe to fly, free reschedule or full refund. Maui averages 300+ sunny days/year.
- Location: Kahului Airport south terminal, free parking. Arrive 30 min early.
- Every seat is a window seat. Groups of 4-6 can book the whole bird.
- Photos and video encouraged — bring your phone or GoPro.

Booking: Call or text 808-555-0173 to reserve, or ask and Leilani will walk you through available dates.

Behavior:
- When someone asks which tour, recommend based on what they tell you. First-timers or short on time — Haleakala Sunrise. Want to see everything — Full Island. Couples or special occasions — suggest doors-off Full Island at golden hour.
- When someone seems interested or asks about availability, nudge toward booking. "Want me to check dates for you?" or mention the phone number.
- If they mention fear of flying or nerves — the pilots have thousands of hours, the aircraft is top-maintained, and most nervous flyers say it was the highlight of their trip.
- If they ask about motion sickness — helicopter rides are smooth, nothing like small planes. Rarely an issue.
- If they mention a special occasion (anniversary, proposal, birthday) — mention private charters and that the pilot can time it over a specific spot.
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
    console.error('[chat/helicopter error]', e)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
