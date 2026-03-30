import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// ── Maui Air Tours — Botpress Proxy ──────────────────────────────────────────
// Tokens live in .env.local (local) and Vercel env vars (production).
// Never import process.env.BOTPRESS_* in a client component.
//
// To activate: set BOTPRESS_HELI_WEBHOOK_URL (+ optionally BOTPRESS_HELI_TOKEN)
// in Vercel → Settings → Environment Variables, then redeploy.
// ─────────────────────────────────────────────────────────────────────────────

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

const MOCK: Record<string, string[]> = {
  book: [
    "I'd love to get you in the air. What date are you looking at? Sunrise slots fill 2–3 weeks out, so earlier is better.",
    "Reservations are easy — which date and route interests you most? I can check availability right now.",
  ],
  price: [
    "Prices range from $295/person for the 60-minute Haleakalā Sunrise tour up to $495/person for the Full Island route. Private charters are custom-quoted.",
    "The Haleakalā Sunrise is $295/person (60 min). Full Island is $495/person (90 min). Road to Hana is $395/person (75 min). Private charters available on request.",
  ],
  time: [
    "Tours range from 60 to 90 minutes depending on the route. The Haleakalā Sunrise departs at 6:15 AM — doors open at 5:45 AM for pre-flight briefing.",
    "60–90 minutes in the air, depending on the route. Add 30 minutes pre-flight. Sunrise tour is our earliest at 6:15 AM departure.",
  ],
  weight: [
    "For safety and aircraft balance, we require all passengers to be under 300 lbs. Weights are verified at check-in — this is an FAA requirement, not optional.",
    "The weight limit is 300 lbs per passenger — this is required for flight certification and aircraft balance. Verified at check-in.",
  ],
  doors: [
    "Doors on or off — your choice when booking. Doors-off gives you unobstructed photography and a more immersive experience. We provide secured safety harnesses either way.",
    "We fly both doors on and doors off. Doors off means you're strapped in with a harness but fully open to the air — incredible for photography. Just let us know your preference.",
  ],
  weather: [
    "Weather in Maui is generally excellent, but we monitor conditions hourly. If we can't fly safely, we'll reschedule you at no charge or issue a full refund.",
    "Safety is non-negotiable. If weather prevents safe flight, we reschedule for free or refund completely. Most days we fly — Maui averages 300+ sunny days a year.",
  ],
  location: [
    "We depart from Kahului Airport (OGG) — Maui's main airport. Parking is free. Our terminal is on the south side, separate from commercial flights.",
    "All flights depart from Kahului Airport (OGG). Easy to find — south side terminal, free parking. Plan to arrive 30 minutes before your tour time.",
  ],
  default: [
    "Aloha — I'm Leilani, your Maui Air Tours concierge. Ask me about routes, pricing, weight limits, doors on or off, weather policy, or how to reserve your flight.",
    "Happy to help. I can answer questions about our tours, pricing, what to expect, or how to book. What would you like to know?",
  ],
}

function matchCategory(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('book') || m.includes('reserv') || m.includes('availab') || m.includes('hold') || m.includes('schedule')) return 'book'
  if (m.includes('price') || m.includes('cost') || m.includes('how much') || m.includes('$') || m.includes('fee') || m.includes('rate') || m.includes('charge')) return 'price'
  if (m.includes('time') || m.includes('long') || m.includes('duration') || m.includes('when') || m.includes('depart') || m.includes('hour') || m.includes('minute')) return 'time'
  if (m.includes('weight') || m.includes('limit') || m.includes('lbs') || m.includes('pound') || m.includes('heavy')) return 'weight'
  if (m.includes('door') || m.includes('open') || m.includes('photo') || m.includes('window')) return 'doors'
  if (m.includes('weather') || m.includes('rain') || m.includes('cancel') || m.includes('refund') || m.includes('cloud') || m.includes('wind')) return 'weather'
  if (m.includes('where') || m.includes('location') || m.includes('address') || m.includes('park') || m.includes('airport') || m.includes('ogg') || m.includes('kahului') || m.includes('meet')) return 'location'
  return 'default'
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const message: string = body?.message

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // ── Botpress proxy (runs when env vars are set) ───────────────────────────
    const webhookUrl = process.env.BOTPRESS_HELI_WEBHOOK_URL
    if (webhookUrl) {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (process.env.BOTPRESS_HELI_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.BOTPRESS_HELI_TOKEN}`
      }
      const bpRes = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ message }),
      })
      const data = await bpRes.json()
      const reply = data.reply ?? data.text ?? data.responses?.[0]?.text ?? data.answer
      if (reply) return NextResponse.json({ reply })
    }

    // ── Mock fallback (used when Botpress is not configured) ──────────────────
    await new Promise(r => setTimeout(r, 500 + Math.random() * 400))
    return NextResponse.json({ reply: pick(MOCK[matchCategory(message)] ?? MOCK.default) })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
