import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// ── Soul AI Assistant — Botpress Proxy ────────────────────────────────────────
// Tokens live in .env.local (local) and Vercel env vars (production).
// Never import process.env.BOTPRESS_* in a client component.
//
// To activate: set BOTPRESS_SOUL_WEBHOOK_URL (+ optionally BOTPRESS_SOUL_TOKEN)
// in Vercel → Settings → Environment Variables, then redeploy.
// ─────────────────────────────────────────────────────────────────────────────

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

const MOCK: Record<string, string[]> = {
  what: [
    "Soul builds custom AI chatbots for tourism businesses — trained on your specific services, pricing, and FAQs. It answers questions, handles bookings, and follows up 24/7.",
    "Think of Soul as a staff member who never sleeps. It answers every inquiry the moment it arrives — midnight, peak season, or during your busiest day on the water.",
  ],
  price: [
    "Soul starts at $500 for the build and setup. Optional support is $150/month — that covers updates, retraining, and monitoring. No contracts.",
    "It's a $500 one-time build. If you want ongoing updates and priority support, that's $150/month — totally optional.",
  ],
  time: [
    "Most bots go live in 7 days. We gather your info, build the bot, train it on your business, and hand it over ready to go.",
    "7 days from kickoff to live. We handle everything — you just review and approve before launch.",
  ],
  book: [
    "Book a free 20-minute call and we'll walk through exactly what Soul would look like for your business. No pitch, just a demo. Use the button above or email us at hello@soulgrowth.ai.",
    "The fastest way to get started is a free call — 20 minutes, we show you the bot live, you ask questions. Hit 'Book a Free Call' above.",
  ],
  default: [
    "Great question. I can walk you through what Soul does, how much it costs, how fast it launches, or how to book a call. What do you want to know?",
    "Happy to help. Ask me about pricing, timeline, how it works, or how to get started.",
  ],
}

function matchCategory(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('what') || m.includes('how does') || m.includes('explain') || m.includes('tell me')) return 'what'
  if (m.includes('price') || m.includes('cost') || m.includes('how much') || m.includes('$') || m.includes('fee') || m.includes('plan')) return 'price'
  if (m.includes('time') || m.includes('long') || m.includes('fast') || m.includes('when') || m.includes('days') || m.includes('launch')) return 'time'
  if (m.includes('book') || m.includes('call') || m.includes('start') || m.includes('sign') || m.includes('get started') || m.includes('contact')) return 'book'
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
    const webhookUrl = process.env.BOTPRESS_SOUL_WEBHOOK_URL
    if (webhookUrl) {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (process.env.BOTPRESS_SOUL_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.BOTPRESS_SOUL_TOKEN}`
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
