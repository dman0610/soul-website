import { HeroSection } from "@/components/ui/galaxy-interactive-hero-section";
import { ChatbotWidget } from "@/components/ui/chatbot-widget";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ErrorBoundary } from "@/components/ui/error-boundary";

/* ─── Module-level constants ──────────────────────────────────────── */
const PROBLEMS = [
  {
    stat: "78%",
    title: "First to respond wins",
    body: "78% of customers buy from the first business that responds — not the best, not the cheapest. The fastest.",
    source: "Lead Connect Survey",
    href: "https://www.teamgate.com/blog/lead-response-time-study-speed-impacts-revenue/",
  },
  {
    stat: "8×",
    title: "Five minutes is everything",
    body: "Respond within 5 minutes and you're 8× more likely to convert that lead. Every minute after that, the odds collapse.",
    source: "InsideSales.com Lead Response Study",
    href: "https://www.callpage.io/blog/posts/improve-lead-response-time",
  },
  {
    stat: "100×",
    title: "Speed is contact",
    body: "You're 100× more likely to reach a prospect responding in 5 minutes versus 30 minutes. Waiting is losing.",
    source: "MIT Study · Harvard Business Review",
    href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
  },
];

const CONVERSATION = [
  { role: 'user', text: "Do you have snorkel tours this Saturday?" },
  { role: 'bot',  text: "Yes! Morning departures at 7 AM and 9:30 AM from Kihei Boat Ramp. All gear included. Want me to hold a spot?" },
  { role: 'user', text: "How much does it cost?" },
  { role: 'bot',  text: "Tours are $89/person for adults, $65 for kids under 12. Groups of 6+ get 10% off. Want to book for Saturday?" },
];

/* ─── Problem Section ─────────────────────────────────────────────── */
function ProblemSection() {
  const problems = PROBLEMS;

  return (
    <section style={{
      background: '#0d1020', padding: '96px 24px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative glow */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-8%', width: '520px', height: '520px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,98,10,0.055) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '56px', maxWidth: '560px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '4px 13px', borderRadius: '100px', marginBottom: '18px',
            border: '1px solid rgba(196,98,10,0.22)', background: 'rgba(196,98,10,0.06)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#c4620a', display: 'inline-block' }} />
            <span style={{ fontSize: '11.5px', color: '#e08820', letterSpacing: '0.08em', fontFamily: 'var(--font-dm-sans)', fontWeight: 500, textTransform: 'uppercase' }}>
              The Problem
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-outfit)', fontWeight: 800,
            fontSize: 'clamp(1.85rem, 3.5vw, 3.2rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1, color: '#f5f5f0',
          }}>
            You&apos;re losing business<br />every single night.
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {problems.map((p) => (
            <a key={p.stat} href={p.href} target="_blank" rel="noopener noreferrer" className="soul-card" style={{
              display: 'block', textDecoration: 'none',
              background: '#060810',
              border: '1px solid rgba(255,255,255,0.06)',
              borderLeft: '4px solid #c4620a',
              borderRadius: '14px',
              padding: '32px 28px',
            }}>
              <div style={{
                fontFamily: 'var(--font-outfit)', fontWeight: 800,
                fontSize: '3.2rem', color: '#2a9898', lineHeight: 1,
                letterSpacing: '-0.04em', marginBottom: '14px',
              }}>
                {p.stat}
              </div>
              <div style={{
                fontFamily: 'var(--font-outfit)', fontWeight: 700,
                fontSize: '1.05rem', color: '#f5f5f0',
                letterSpacing: '-0.01em', marginBottom: '10px',
              }}>
                {p.title}
              </div>
              <p style={{
                fontFamily: 'var(--font-dm-sans)', fontSize: '14px',
                color: '#8a8a9a', lineHeight: 1.65, marginBottom: '16px',
              }}>
                {p.body}
              </p>
              <div style={{
                fontFamily: 'var(--font-dm-sans)', fontSize: '11px',
                color: '#e08820', letterSpacing: '0.06em', fontWeight: 500,
                borderTop: '1px solid rgba(196,98,10,0.15)', paddingTop: '12px',
              }}>
                ↗ {p.source}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Solution Section ────────────────────────────────────────────── */
function SolutionSection() {
  const conversation = CONVERSATION;

  return (
    <section id="demo" style={{
      background: '#060810', padding: '96px 24px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Teal glow top-left */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%', width: '450px', height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(42,152,152,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '64px',
        alignItems: 'center',
      }}>
        {/* Left: copy */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '4px 13px', borderRadius: '100px', marginBottom: '18px',
            border: '1px solid rgba(42,152,152,0.25)', background: 'rgba(42,152,152,0.06)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2a9898', display: 'inline-block' }} />
            <span style={{ fontSize: '11.5px', color: '#2a9898', letterSpacing: '0.08em', fontFamily: 'var(--font-dm-sans)', fontWeight: 500, textTransform: 'uppercase' }}>
              The Solution
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-outfit)', fontWeight: 800,
            fontSize: 'clamp(1.85rem, 3.2vw, 3rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: '#f5f5f0', marginBottom: '20px',
          }}>
            An AI that knows<br />your business cold.
          </h2>
          <p style={{
            fontFamily: 'var(--font-dm-sans)', fontSize: '16px',
            color: '#8a8a9a', lineHeight: 1.75, marginBottom: '32px',
            maxWidth: '400px',
          }}>
            We train it on your tours, prices, meeting spots, gear lists,
            and FAQs. Visitors get real answers — not contact forms.
          </p>

          {/* Feature bullets */}
          {[
            "Answers questions 24/7, including after hours",
            "Trained specifically on your business",
            "Captures leads even when you don't answer",
            "Connects to your booking system",
          ].map((feat) => (
            <div key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginTop: '2px', flexShrink: 0 }} aria-hidden="true">
                <circle cx="9" cy="9" r="9" fill="rgba(196,98,10,0.15)" />
                <path d="M5.5 9l2.5 2.5 4.5-5" stroke="#c4620a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14.5px', color: '#b0b0be', lineHeight: 1.5 }}>
                {feat}
              </span>
            </div>
          ))}
        </div>

        {/* Right: chat preview */}
        <div style={{
          background: '#141828',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
        }}>
          {/* Chat header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(255,255,255,0.02)',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: '#0d1020', border: '1px solid rgba(196,98,10,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <circle cx="13" cy="13" r="13" fill="#060810" />
                <path d="M13 0C13 7.18 7.18 13 0 13C7.18 13 13 18.82 13 26C13 11.596 19.5 0 13 0Z" fill="#f5f5f0" opacity="0.9" />
                <circle cx="13" cy="6.5" r="2.8" fill="#f5f5f0" />
                <circle cx="13" cy="19.5" r="2.8" fill="#060810" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '13px', color: '#f5f5f0', lineHeight: 1.2 }}>
                Maui Snorkel Co. AI
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2a9898', display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: '#8a8a9a' }}>Online</span>
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
              {['#c4620a', '#2a9898', '#8a8a9a'].map((c, i) => (
                <span key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, opacity: i === 2 ? 0.3 : 0.7 }} />
              ))}
            </div>
          </div>

          {/* Messages */}
          <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {conversation.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%', padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? 'rgba(196,98,10,0.16)' : 'rgba(255,255,255,0.06)',
                  border: msg.role === 'user' ? '1px solid rgba(196,98,10,0.22)' : '1px solid rgba(255,255,255,0.06)',
                  fontFamily: 'var(--font-dm-sans)', fontSize: '13px', lineHeight: 1.55,
                  color: msg.role === 'user' ? '#f5f5f0' : '#c8c8d8',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Fake input bar */}
          <div style={{
            margin: '0 16px 16px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12.5px', color: 'rgba(138,138,154,0.45)', flex: 1 }}>
              Ask about tours, pricing, gear...
            </span>
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: 'rgba(196,98,10,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="12" height="12" fill="none" stroke="#c4620a" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Bottom label */}
          <div style={{ padding: '0 16px 14px', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '10px', color: 'rgba(138,138,154,0.4)', letterSpacing: '0.05em' }}>
              Powered by Soul AI — try the live version →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ────────────────────────────────────────────────── */
function HowItWorksSection() {
  const steps = [
    {
      n: "01",
      title: "We learn your business",
      body: "You answer 10 questions about your tours, pricing, and customers. We handle everything else from there.",
    },
    {
      n: "02",
      title: "We build your AI",
      body: "Your chatbot gets trained on your specific tours, prices, FAQs, gear lists, and booking flow.",
    },
    {
      n: "03",
      title: "You start capturing leads",
      body: "The chatbot goes live on your site. Visitors get real answers. You get booking inquiries — even at 2am.",
    },
  ];

  return (
    <section id="how-it-works" style={{
      background: '#0d1020', padding: '96px 24px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative amber glow bottom-left */}
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,98,10,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '4px 13px', borderRadius: '100px', marginBottom: '18px',
            border: '1px solid rgba(196,98,10,0.22)', background: 'rgba(196,98,10,0.06)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#c4620a', display: 'inline-block' }} />
            <span style={{ fontSize: '11.5px', color: '#e08820', letterSpacing: '0.08em', fontFamily: 'var(--font-dm-sans)', fontWeight: 500, textTransform: 'uppercase' }}>
              How It Works
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-outfit)', fontWeight: 800,
            fontSize: 'clamp(1.85rem, 3.5vw, 3.2rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1, color: '#f5f5f0',
          }}>
            Live in 7 days.
          </h2>
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2px',
          position: 'relative',
        }}>
          {steps.map((step, i) => (
            <div key={step.n} style={{ position: 'relative' }}>
              {/* Connector line (desktop, between steps) */}
              {i < steps.length - 1 && (
                <div style={{
                  display: 'none', // hidden on mobile
                  position: 'absolute', top: '28px', right: '-1px',
                  width: '100%', height: '1px',
                  background: 'linear-gradient(to right, rgba(196,98,10,0.3), rgba(196,98,10,0.08))',
                  zIndex: 0,
                }} className="step-line" />
              )}

              <div style={{ padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                {/* Circle */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  border: '2px solid rgba(196,98,10,0.4)',
                  background: 'rgba(196,98,10,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-outfit)', fontWeight: 800,
                    fontSize: '18px', color: '#c4620a', letterSpacing: '-0.02em',
                  }}>
                    {step.n}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-outfit)', fontWeight: 700,
                  fontSize: '1.1rem', color: '#f5f5f0',
                  letterSpacing: '-0.01em', marginBottom: '10px',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-dm-sans)', fontSize: '14px',
                  color: '#8a8a9a', lineHeight: 1.7, maxWidth: '260px', margin: '0 auto',
                }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Demo Showcase ───────────────────────────────────────────────── */
function DemoShowcaseSection() {
  const demos = [
    {
      slug: 'snorkel',
      name: 'Maui Snorkel Co.',
      category: 'Ocean Tours',
      accent: '#2a9898',
      accentBg: 'rgba(42,152,152,0.08)',
      accentBorder: 'rgba(42,152,152,0.2)',
      description: 'Full underwater tourism experience — tours, pricing, gear, and booking in one AI.',
      href: '/demos/snorkel',
      photo: '/snorkel-hero.png',
      overlayColor: 'rgba(10,22,40,0.45)',
    },
    {
      slug: 'helicopter',
      name: 'Maui Air Tours',
      category: 'Helicopter Tours',
      accent: '#c4620a',
      accentBg: 'rgba(196,98,10,0.08)',
      accentBorder: 'rgba(196,98,10,0.2)',
      description: 'Premium aerial experience — routes, pricing, safety, and availability all handled.',
      href: '/demos/helicopter',
      photo: '/HELITOURDEMO.png',
      overlayColor: 'rgba(10,10,15,0.45)',
    },
  ];

  return (
    <section id="demos" style={{
      background: '#060810', padding: '96px 24px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '4px 13px', borderRadius: '100px', marginBottom: '18px',
            border: '1px solid rgba(196,98,10,0.22)', background: 'rgba(196,98,10,0.06)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#c4620a', display: 'inline-block' }} />
            <span style={{ fontSize: '11.5px', color: '#e08820', letterSpacing: '0.08em', fontFamily: 'var(--font-dm-sans)', fontWeight: 500, textTransform: 'uppercase' }}>
              Live Demos
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-outfit)', fontWeight: 800,
            fontSize: 'clamp(1.85rem, 3.5vw, 3.2rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1, color: '#f5f5f0', marginBottom: '14px',
          }}>
            See it on a real business.
          </h2>
          <p style={{
            fontFamily: 'var(--font-dm-sans)', fontSize: '15.5px',
            color: '#8a8a9a', maxWidth: '400px', margin: '0 auto', lineHeight: 1.65,
          }}>
            Two Maui tourism businesses. Two Soul AIs. Both live.
          </p>
        </div>

        {/* Demo cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {demos.map((demo) => {
            const isLive = true;
            const CardWrapper = 'a' as React.ElementType;
            const wrapperProps = { href: demo.href, style: { textDecoration: 'none', display: 'block' } as React.CSSProperties };
            return (
              <CardWrapper
                key={demo.slug}
                {...wrapperProps}
              >
                <div
                  className={`soul-demo-card ${demo.slug}`}
                  style={{
                    background: '#0d1020',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    cursor: isLive ? 'pointer' : 'default',
                    position: 'relative',
                  }}
                >
                  {/* Photo banner */}
                  <div style={{
                    height: '180px',
                    backgroundImage: `url(${demo.photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderBottom: `1px solid ${demo.accentBorder}`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    {/* Overlay for text legibility */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: demo.overlayColor,
                    }} />

                    {/* Status badge */}
                    <div style={{
                      position: 'absolute', top: '12px', right: '12px',
                      padding: '3px 10px', borderRadius: '100px',
                      background: demo.accentBg,
                      border: `1px solid ${demo.accentBorder}`,
                      display: 'flex', alignItems: 'center', gap: '5px',
                    }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: demo.accent, display: 'inline-block', animation: 'liveDotPulse 2s ease-in-out infinite', willChange: 'transform, opacity' }} />
                      <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '10.5px', color: demo.accent, fontWeight: 500 }}>
                        Live
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '24px 24px 28px' }}>
                    <div style={{ marginBottom: '6px' }}>
                      <span style={{
                        fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: demo.accent,
                        textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500,
                      }}>
                        {demo.category}
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1.15rem',
                      color: '#f5f5f0', letterSpacing: '-0.01em', marginBottom: '10px',
                    }}>
                      {demo.name}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-dm-sans)', fontSize: '13.5px',
                      color: '#8a8a9a', lineHeight: 1.65, marginBottom: '20px',
                    }}>
                      {demo.description}
                    </p>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '13px',
                      color: demo.accent,
                    }}>
                      View Live Demo →
                    </div>
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing Section ─────────────────────────────────────────────── */
function PricingSection() {
  const basicFeatures = [
    "Custom-built, brand-trained AI chatbot on your website",
    "3 manual prompt/instruction edits per month",
    "Standard maintenance, hosting, and API coverage",
  ];

  const proFeatures = [
    "Everything in the Basic tier",
    "Complex, multi-step conversation handling",
    "Direct calendar syncing for automated bookings",
    "Custom Client Dashboard — secure login portal",
    "Real-Time Control: edit bot behavior from your dashboard",
    "Data & Insights: chat logs, questions, booking analytics",
    "Priority support and continuous system monitoring",
  ];

  const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
      <circle cx="8" cy="8" r="8" fill="rgba(196,98,10,0.15)" />
      <path d="M4.5 8l2.2 2.2 4-4.5" stroke="#c4620a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ArrowIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M2.5 7h9M7.5 3.5L11 7l-3.5 3.5" stroke="#e08820" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ClockIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="5" stroke="#8a8a9a" strokeWidth="1.2" />
      <path d="M6 3.5v2.5l1.5 1.5" stroke="#8a8a9a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );

  return (
    <section id="pricing" style={{
      background: '#0d1020', padding: '96px 24px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div style={{
        position: 'absolute', bottom: '-10%', left: '28%',
        width: '560px', height: '420px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(196,98,10,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '10%', right: '18%',
        width: '400px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(42,152,152,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '4px 13px', borderRadius: '100px', marginBottom: '18px',
            border: '1px solid rgba(196,98,10,0.22)', background: 'rgba(196,98,10,0.06)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#c4620a', display: 'inline-block' }} />
            <span style={{ fontSize: '11.5px', color: '#e08820', letterSpacing: '0.08em', fontFamily: 'var(--font-dm-sans)', fontWeight: 500, textTransform: 'uppercase' }}>
              Pricing
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-outfit)', fontWeight: 800,
            fontSize: 'clamp(1.85rem, 3.5vw, 3.2rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1, color: '#f5f5f0',
            marginBottom: '16px',
          }}>
            Two tiers.<br />Total flexibility.
          </h2>
          <p style={{
            fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(15px, 1.8vw, 17px)',
            color: '#8a8a9a', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto 20px',
          }}>
            At Soul, we build AI solutions that grow with you. Every tier includes a dedicated partnership approach — because your AI should be as adaptable as your business.
          </p>
          <a href="https://calendly.com/dmanfergie/30min" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: 'var(--font-dm-sans)', fontSize: '14px', fontWeight: 600,
            color: '#e08820', textDecoration: 'none',
            WebkitTapHighlightColor: 'transparent',
          }}>
            Not sure where to start? Book a Free 10-Minute Consultation
            <ArrowIcon />
          </a>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '36px',
        }}>
          {/* ── Basic Card ── */}
          <div style={{
            background: '#141828',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '22px',
            padding: '36px 36px 32px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Tier pill + timeline */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '4px 11px', borderRadius: '100px',
                border: '1px solid rgba(196,98,10,0.3)', background: 'rgba(196,98,10,0.08)',
                fontFamily: 'var(--font-dm-sans)', fontSize: '11px', fontWeight: 600,
                color: '#e08820', letterSpacing: '0.07em', textTransform: 'uppercase',
              }}>Basic</div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#8a8a9a',
              }}>
                <ClockIcon />
                Ready in 3 days
              </div>
            </div>

            {/* Name */}
            <div style={{
              fontFamily: 'var(--font-outfit)', fontWeight: 700,
              fontSize: '1.15rem', color: '#f5f5f0', marginBottom: '24px',
            }}>
              Customer Engagement Bot
            </div>

            {/* Setup price */}
            <div style={{ marginBottom: '6px' }}>
              <div style={{
                fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: '#8a8a9a',
                textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px',
              }}>Setup & Integration</div>
              <div style={{
                fontFamily: 'var(--font-outfit)', fontWeight: 800,
                fontSize: '3.2rem', color: '#c4620a', letterSpacing: '-0.04em', lineHeight: 1,
              }}>$500</div>
              <div style={{
                fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#8a8a9a', marginTop: '5px',
              }}>$100 upfront deposit · $400 on launch</div>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '20px 0' }} />

            {/* Monthly */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1.25rem', color: '#f5f5f0' }}>$50</span>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: '#8a8a9a' }}>/mo</span>
              </div>
              <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#8a8a9a', marginTop: '3px' }}>
                API usage costs fully included
              </div>
            </div>

            {/* Features */}
            <div style={{ marginBottom: '28px', flex: 1 }}>
              {basicFeatures.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                  <CheckIcon />
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13.5px', color: '#b0b0be', lineHeight: 1.55 }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="https://calendly.com/dmanfergie/30min" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', padding: '15px', borderRadius: '12px',
              background: 'rgba(196,98,10,0.12)', border: '1px solid rgba(196,98,10,0.3)',
              color: '#e08820', fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '15px',
              textDecoration: 'none', minHeight: '52px',
              WebkitTapHighlightColor: 'transparent',
            }}>
              Book a Free Consultation
            </a>
          </div>

          {/* ── Pro Card ── */}
          <div style={{
            background: '#141828',
            border: '1px solid rgba(196,98,10,0.25)',
            borderRadius: '22px',
            padding: '36px 36px 32px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(196,98,10,0.08) inset',
            display: 'flex', flexDirection: 'column',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Amber top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
              background: 'linear-gradient(90deg, #c4620a, #e08820, #c4620a)',
              borderRadius: '22px 22px 0 0',
            }} />

            {/* Tier pill + Most Popular badge + timeline */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '4px 11px', borderRadius: '100px',
                  border: '1px solid rgba(196,98,10,0.3)', background: 'rgba(196,98,10,0.08)',
                  fontFamily: 'var(--font-dm-sans)', fontSize: '11px', fontWeight: 600,
                  color: '#e08820', letterSpacing: '0.07em', textTransform: 'uppercase',
                }}>Pro</div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '3px 9px', borderRadius: '100px',
                  background: '#c4620a',
                  fontFamily: 'var(--font-dm-sans)', fontSize: '10px', fontWeight: 700,
                  color: '#f5f5f0', letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>Most Popular</div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#8a8a9a',
              }}>
                <ClockIcon />
                Ready in 7 days
              </div>
            </div>

            {/* Name */}
            <div style={{
              fontFamily: 'var(--font-outfit)', fontWeight: 700,
              fontSize: '1.15rem', color: '#f5f5f0', marginBottom: '24px',
            }}>
              Automated Booking & Analytics Engine
            </div>

            {/* Setup price */}
            <div style={{ marginBottom: '6px' }}>
              <div style={{
                fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: '#8a8a9a',
                textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px',
              }}>Setup & Integration</div>
              <div style={{
                fontFamily: 'var(--font-outfit)', fontWeight: 800,
                fontSize: '3.2rem', color: '#c4620a', letterSpacing: '-0.04em', lineHeight: 1,
              }}>$1,500</div>
              <div style={{
                fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#8a8a9a', marginTop: '5px',
              }}>$200 upfront deposit · $1,300 on launch</div>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '20px 0' }} />

            {/* Monthly */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1.25rem', color: '#f5f5f0' }}>$200</span>
                <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: '#8a8a9a' }}>/mo</span>
              </div>
              <div style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '12px', color: '#8a8a9a', marginTop: '3px' }}>
                API usage costs fully included
              </div>
            </div>

            {/* Features */}
            <div style={{ marginBottom: '28px', flex: 1 }}>
              {proFeatures.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                  <CheckIcon />
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '13.5px', color: '#b0b0be', lineHeight: 1.55 }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="https://calendly.com/dmanfergie/30min" target="_blank" rel="noopener noreferrer" className="soul-cta-primary" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', padding: '15px', borderRadius: '12px',
              background: '#c4620a', color: '#f5f5f0',
              fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '15px',
              textDecoration: 'none', minHeight: '52px',
              WebkitTapHighlightColor: 'transparent',
            }}>
              Book a Free Consultation
            </a>
          </div>
        </div>

        {/* Adaptable Pricing callout */}
        <div style={{
          maxWidth: '680px', margin: '0 auto',
          padding: '32px 36px',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '18px',
          background: 'rgba(255,255,255,0.02)',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-outfit)', fontWeight: 700,
            fontSize: '1.1rem', color: '#f5f5f0', marginBottom: '10px',
          }}>
            Adaptable Pricing for Adaptable Work
          </div>
          <p style={{
            fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: '#8a8a9a',
            lineHeight: 1.7, marginBottom: '16px',
          }}>
            Don&apos;t need the whole Pro package, but want more than Basic? We are flexible. If you want specific features from the Pro tier — like the custom dashboard — without the full automated booking engine, let&apos;s talk. We can build a custom hybrid tier that fits your exact operational needs and budget.
          </p>
          <a href="https://calendly.com/dmanfergie/30min" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: 'var(--font-dm-sans)', fontSize: '14px', fontWeight: 600,
            color: '#e08820', textDecoration: 'none',
            WebkitTapHighlightColor: 'transparent',
          }}>
            Book your Free 10-Minute Consultation today
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Footer ──────────────────────────────────────────────────── */
function CTAFooter() {
  return (
    <section id="contact" style={{
      background: '#060810', padding: '120px 24px',
      position: 'relative', overflow: 'hidden', textAlign: 'center',
    }}>
      {/* Dramatic amber radial from center */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(196,98,10,0.10) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(196,98,10,0.2), transparent)',
      }} />

      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          padding: '4px 13px', borderRadius: '100px', marginBottom: '24px',
          border: '1px solid rgba(196,98,10,0.22)', background: 'rgba(196,98,10,0.06)',
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#c4620a', display: 'inline-block', animation: 'liveDotPulse 2s ease-in-out infinite', willChange: 'transform, opacity' }} />
          <span style={{ fontSize: '11.5px', color: '#e08820', letterSpacing: '0.08em', fontFamily: 'var(--font-dm-sans)', fontWeight: 500 }}>
            Free call · No obligation
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-outfit)', fontWeight: 800,
          fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
          letterSpacing: '-0.03em', lineHeight: 1.05, color: '#f5f5f0', marginBottom: '20px',
        }}>
          Every night without it,<br />
          <span style={{ color: '#c4620a' }}>someone else gets the booking.</span>
        </h2>

        <p style={{
          fontFamily: 'var(--font-dm-sans)', fontSize: '16px',
          color: '#8a8a9a', lineHeight: 1.75, marginBottom: '40px',
        }}>
          Free 20-minute call. I&apos;ll show you exactly what it looks like
          for your business — no slides, no pitch deck, just a live demo.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <a href="https://calendly.com/dmanfergie/30min" target="_blank" rel="noopener noreferrer" className="soul-cta-primary" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px 40px', borderRadius: '100px',
            background: '#c4620a', color: '#f5f5f0',
            fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '16px',
            textDecoration: 'none', minHeight: '54px', minWidth: '220px',
            WebkitTapHighlightColor: 'transparent',
          }}
          >
            Book Your Free Call
          </a>

          <a href="mailto:8soul.ai8@gmail.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: '#e08820',
            textDecoration: 'none', WebkitTapHighlightColor: 'transparent',
            minHeight: '44px',
          }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            8soul.ai8@gmail.com
          </a>

          <a href="tel:+18016473408" style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: '#e08820',
            textDecoration: 'none', WebkitTapHighlightColor: 'transparent',
            minHeight: '44px',
          }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 9a2 2 0 00-2 2v.5a16 16 0 0016 16H17a2 2 0 002-2v-3.5a1 1 0 00-1-1h-3a1 1 0 00-1 1v1a11 11 0 01-11-11v-1a1 1 0 00-1-1H4a1 1 0 00-1 1V9z" />
            </svg>
            801-647-3408
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main style={{ background: '#060810', overflowX: 'hidden', position: 'relative' }}>
      <HeroSection />
      <BackgroundPaths title="Never Miss A Booking" />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <DemoShowcaseSection />
      <PricingSection />
      <CTAFooter />
      <ErrorBoundary>
        <ChatbotWidget />
      </ErrorBoundary>
    </main>
  );
}
