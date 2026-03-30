import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// ── Maui Snorkel Co. — Botpress Proxy ────────────────────────────────────────
// Tokens live in .env.local (local) and Vercel env vars (production).
// Never import process.env.BOTPRESS_* in a client component.
//
// To activate: set BOTPRESS_SNORKEL_WEBHOOK_URL (+ optionally BOTPRESS_SNORKEL_TOKEN)
// in Vercel → Settings → Environment Variables, then redeploy.
// ─────────────────────────────────────────────────────────────────────────────

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

const MOCK: Record<string, string[]> = {
  book: [
    "I can help you hold a spot! Tours run daily — which date are you looking at? We usually have availability with 24 hours notice.",
    "Booking is easy. Which date works for you? Morning tours leave at 7:00 AM and 9:30 AM, sunset at 4:30 PM.",
  ],
  price: [
    "Adult snorkel tours are $89/person — masks, fins, wetsuits, and snacks all included. Kids under 12 are $65.",
    "It's $89 per adult, $65 for kids under 12. Everything's included — gear, instruction, flotation, and a light breakfast.",
  ],
  time: [
    "We run three departures daily: 7:00 AM, 9:30 AM, and 4:30 PM (sunset) — all from Kihei Boat Ramp. Back within 3 hours.",
    "Morning tours leave at 7:00 AM and 9:30 AM from Kihei Boat Ramp. Sunset tour at 4:30 PM. All back within 3 hours.",
  ],
  gear: [
    "Everything's included — masks, fins, snorkels, wetsuits, and flotation vests. Just bring reef-safe sunscreen and a towel.",
    "All gear is provided. Wetsuits for the cooler mornings, everything else year-round. Reef-safe sunscreen and a towel is all you need.",
  ],
  kids: [
    "Kids are very welcome! We recommend ages 6+ for the morning tours. Kids under 12 are $65. We have small-size gear and our guides are great with beginners.",
    "Absolutely kid-friendly. Ages 6+ work best. Kids under 12 get a $65 rate and our guides keep it fun and safe.",
  ],
  cancel: [
    "We offer full refunds for cancellations 48+ hours before departure. Within 48 hours we can reschedule for any available date — no fee.",
    "48-hour cancellation policy. Cancel before that for a full refund, or reschedule anytime at no charge.",
  ],
  location: [
    "We depart from Kihei Boat Ramp — 2 Kaonoulu St, Kihei, HI 96753. Free parking right there.",
    "Kihei Boat Ramp on South Maui — 2 Kaonoulu St. Easy to find, free parking nearby.",
  ],
  default: [
    "Aloha! I can help with tour times, gear, pricing, booking, kids policies, or where to meet. What would you like to know?",
    "Happy to help! Ask me about availability, what's included, where we meet, or how to book.",
  ],
}

function matchCategory(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('book') || m.includes('reserv') || m.includes('availab') || m.includes('hold') || m.includes('sign up')) return 'book'
  if (m.includes('price') || m.includes('cost') || m.includes('how much') || m.includes('$') || m.includes('fee') || m.includes('rate')) return 'price'
  if (m.includes('time') || m.includes('hour') || m.includes('when') || m.includes('depart') || m.includes('start') || m.includes('schedule') || m.includes('sunset')) return 'time'
  if (m.includes('gear') || m.includes('equipment') || m.includes('bring') || m.includes('wetsuit') || m.includes('snorkel') || m.includes('mask') || m.includes('fin')) return 'gear'
  if (m.includes('kid') || m.includes('child') || m.includes('age') || m.includes('young') || m.includes('family')) return 'kids'
  if (m.includes('cancel') || m.includes('refund') || m.includes('reschedule') || m.includes('weather') || m.includes('policy')) return 'cancel'
  if (m.includes('where') || m.includes('location') || m.includes('address') || m.includes('park') || m.includes('kihei') || m.includes('ramp') || m.includes('meet')) return 'location'
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
    const webhookUrl = process.env.BOTPRESS_SNORKEL_WEBHOOK_URL
    if (webhookUrl) {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (process.env.BOTPRESS_SNORKEL_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.BOTPRESS_SNORKEL_TOKEN}`
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
