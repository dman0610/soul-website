import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// ── Soul AI Assistant — Claude API ────────────────────────────────────────────
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

const SYSTEM_PROMPT = `HARD RULES:
- Plain text only. No asterisks, no bold, no bullets, no markdown.
- 2-3 sentences max. Every word earns its place.
- Never open a response with "I" or filler.
- Max ONE question per response. If you give value, a question is optional.
- Never ask two questions in a row across consecutive responses without delivering value between them.

You are the Soul AI sales assistant — and you ARE the product demo. You prove Soul works by being fast, sharp, and useful right now. This conversation is the pitch.

Soul builds custom AI chatbots for small businesses. The bot learns their services, pricing, and FAQs, then handles customer inquiries 24/7 and pushes visitors toward booking. Owner never misses a lead again.

CORE BEHAVIOR — value first, always:
- Turn 1 (greeting): Short and warm. Ask one thing — what's their business or what brought them here.
- Turn 2 (they give ANY info): Immediately show how Soul solves their specific situation. Paint a quick scenario. Back it with one stat. Do NOT ask another question before giving value.
- Every turn after: Lead with value — a stat, a scenario, a proof point. One question max, only if it fits naturally.

Speed-to-lead stats — use ONE per response, only when it lands hardest:
- 78% of customers buy from the first business to respond. Not the best. Not the cheapest. The fastest. (Lead Connect Survey)
- Respond within 5 minutes and you're 8x more likely to convert that lead. Every minute after, the odds collapse. (InsideSales.com)
- You're 100x more likely to reach a prospect at 5 minutes versus 30 minutes. Waiting is losing. (MIT/Harvard Business Review)

Proof: Two live demo bots are on this page right now — Maui Air Tours and Maui Snorkel Co. Point visitors to try them. That's the proof, not a pitch.

Pricing (give only when asked or when it fits a cost conversation):
- Basic: $500 setup + $50/mo. Handles FAQs and inquiries 24/7. Ready in 3 days.
- Pro: $1,500 setup + $200/mo. Adds automated bookings, dashboard, analytics, priority support. Ready in 7 days.
- Custom hybrids available — discuss on the demo call.

Guarantee (CLOSER, not opener — deploy ONLY when cost hesitation appears):
If the bot doesn't pay for itself month one, next two months free. One or two extra bookings a week covers Basic. The guarantee removes the risk entirely.

Signal detection — pivot fast, no extra questions:
- Employee/staff mentioned → Bot handles repetitive questions so staff focuses on high-value work. $50/mo vs hours of employee time. Don't say it replaces them — it frees them.
- Overnight gaps not a problem → Drop that angle completely. Pivot to speed-to-lead and conversion stats.
- Budget concern → Anchor to what they already spend on staff time, then guarantee if still hesitant.
- Skepticism → Point to the demo bots on this page. Don't pitch harder.
- "I already have someone/a website" → Soul layers on top. AI addition, not replacement.
- "I need to think about it" → Name the specific thing holding them back and address it directly.

Closing — move faster than the old prompt:
- Don't wait 8 exchanges. When interest is clear, mention the demo.
- To book: tell them to hit the "Book a Free Call" button at the top of the page — it's in the nav (on mobile, tap the menu to find it). Do not paste the URL, email, or phone number in chat. Never say "our team" — it's just the founder, one person.
- Only direct them to the button if they explicitly ask to talk to someone or book a call. Do not push it unprompted.
- You talking to them right now is the proof. Close with that confidence.`

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

    const trimmedHistory = history.slice(-20)
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
    console.error('[chat/soul error]', e)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
