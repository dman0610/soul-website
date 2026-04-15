"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
}

interface HistoryEntry {
  role: 'user' | 'assistant';
  content: string;
}

const SOUL_FAQ = [
  {
    q: "What is Soul?",
    a: "Soul builds custom AI chatbots for tourism businesses — trained on your specific services, pricing, and FAQs. It answers questions, handles bookings, and follows up 24/7.",
  },
  {
    q: "How much does it cost?",
    a: "Basic is $500 setup plus $50/month — handles FAQs and inquiries 24/7, ready in 3 days. Pro is $1,500 setup plus $200/month — adds automated bookings, dashboard, and analytics, ready in 7 days.",
  },
  {
    q: "How fast does it launch?",
    a: "Basic launches in 3 days. Pro launches in 7 days. We gather your info, build the bot, train it on your business, and hand it over ready to go.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 10-minute demo — we'll show you the bot live and answer any questions. Hit 'Book a Free Call' above, email 8soul.ai8@gmail.com, or call/text 801-647-3408.",
  },
];

const SEED_MESSAGES: Message[] = [
  {
    id: 'seed-0',
    role: 'bot',
    text: "Hey — you're talking to a Soul bot right now. This is exactly what we build for tourism businesses. What kind of business are you running?",
  },
];

// ─── Yin-Yang Icon ────────────────────────────────────────────────────────────
function YinYangIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="13" cy="13" r="13" fill="#060810" />
      <path d="M13 0 A13 13 0 0 1 13 26 A6.5 6.5 0 0 1 13 13 A6.5 6.5 0 0 0 13 0 Z" fill="#f5f5f0" />
      <circle cx="13" cy="6.5" r="2.6" fill="#f5f5f0" />
      <circle cx="13" cy="19.5" r="2.6" fill="#060810" />
    </svg>
  );
}

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: open ? '1px solid rgba(196,98,10,0.3)' : '1px solid rgba(255,255,255,0.07)',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'border-color 150ms ease',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '12px 14px', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: '8px', WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-dm-sans)', fontSize: '13px',
          color: '#f5f5f0', fontWeight: 500, lineHeight: 1.4,
        }}>
          {q}
        </span>
        <svg
          width="14" height="14" fill="none" stroke="#8a8a9a" viewBox="0 0 24 24"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms ease' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div style={{
          padding: '0 14px 12px',
          fontFamily: 'var(--font-dm-sans)', fontSize: '13px',
          color: '#b0b0c0', lineHeight: 1.6,
        }}>
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────
interface ChatbotWidgetProps {
  endpoint?: string;
}

export function ChatbotWidget({ endpoint = '/api/chat/soul' }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Default to 'faq' — upgrades to 'live' when ANTHROPIC_API_KEY is set
  const [mode, setMode] = useState<'live' | 'faq'>('faq');
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [pulsed, setPulsed] = useState(false);
  const [pulseNow, setPulseNow] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check API status on mount — upgrade to live if Claude API key is configured
  useEffect(() => {
    fetch(endpoint)
      .then(r => r.json())
      .then(d => { if (d.live) setMode('live'); })
      .catch(() => {}); // stay in faq mode on any error
  }, [endpoint]);

  // Pulse once at 4 seconds
  useEffect(() => {
    if (pulsed || isOpen) return;
    const t = setTimeout(() => {
      setPulseNow(true);
      setPulsed(true);
      setTimeout(() => setPulseNow(false), 1400);
    }, 4000);
    return () => clearTimeout(t);
  }, [pulsed, isOpen]);


  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on open (live mode)
  useEffect(() => {
    if (!isOpen || mode !== 'live') return;
    const t = setTimeout(() => inputRef.current?.focus(), 320);
    return () => clearTimeout(t);
  }, [isOpen, mode]);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setUserMsgCount(prev => prev + 1);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      const reply = data.reply ?? "I'm not sure about that — try asking about tour times, pricing, or gear.";
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: reply,
      }]);
      // Update conversation history (last 20 messages = 10 exchanges)
      setHistory(prev => [
        ...prev,
        { role: 'user' as const, content: text },
        { role: 'assistant' as const, content: reply },
      ].slice(-20));
    } catch {
      // On failure, fall back to FAQ mode
      setMode('faq');
    } finally {
      setIsLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send();
  };

  return (
    <>
      {/* ── Chat Panel ─────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '92px',
            right: '24px',
            left: 'auto',
            width: '360px',
            maxWidth: 'calc(100% - 32px)',
            zIndex: 51,
            background: '#141828',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '20px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(196,98,10,0.08)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'chatSlideIn 300ms ease both',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(255,255,255,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: '#0d1020', border: '1px solid rgba(196,98,10,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <YinYangIcon />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '14px', color: '#f5f5f0', lineHeight: 1.2 }}>
                  Soul AI
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: mode === 'live' ? '#2a9898' : '#8a8a9a',
                    display: 'inline-block',
                  }} />
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: '#8a8a9a' }}>
                    {mode === 'live' ? 'Online — replies instantly' : 'Setting up — quick answers below'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', color: '#8a8a9a',
                padding: '6px', borderRadius: '6px', WebkitTapHighlightColor: 'transparent',
                minWidth: '32px', minHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'color 150ms ease',
              }}
              aria-label="Close chat"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── FAQ Mode ── */}
          {mode === 'faq' && (
            <div style={{
              flex: 1, overflowY: 'auto', padding: '16px',
              display: 'flex', flexDirection: 'column', gap: '8px',
              maxHeight: '420px',
              scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent',
            }}>
              <p style={{
                fontFamily: 'var(--font-dm-sans)', fontSize: '13px',
                color: '#8a8a9a', margin: '0 0 6px', lineHeight: 1.5,
              }}>
                Our AI assistant is getting set up. Quick answers:
              </p>
              {SOUL_FAQ.map((item, i) => (
                <FaqItem
                  key={i}
                  q={item.q}
                  a={item.a}
                  open={expandedFaq === i}
                  onToggle={() => setExpandedFaq(expandedFaq === i ? null : i)}
                />
              ))}
              <a
                href="https://calendly.com/dmanfergie/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block', textAlign: 'center', marginTop: '8px',
                  padding: '12px 16px', borderRadius: '12px',
                  background: '#c4620a', color: '#f5f5f0',
                  fontFamily: 'var(--font-dm-sans)', fontSize: '13.5px', fontWeight: 600,
                  textDecoration: 'none', WebkitTapHighlightColor: 'transparent',
                  transition: 'background-color 150ms ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#d4720a'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#c4620a'}
              >
                Book a Free Call →
              </a>
            </div>
          )}

          {/* ── Live Chat Mode ── */}
          {mode === 'live' && (
            <>
              <div style={{
                flex: 1, overflowY: 'auto', padding: '16px 16px 8px',
                display: 'flex', flexDirection: 'column', gap: '10px',
                maxHeight: '320px', minHeight: '200px',
                scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent',
              }}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '82%', padding: '10px 14px',
                      borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: msg.role === 'user' ? 'rgba(196,98,10,0.18)' : 'rgba(255,255,255,0.06)',
                      border: msg.role === 'user' ? '1px solid rgba(196,98,10,0.25)' : '1px solid rgba(255,255,255,0.07)',
                      fontFamily: 'var(--font-dm-sans)', fontSize: '13.5px', lineHeight: 1.55,
                      color: msg.role === 'user' ? '#f5f5f0' : '#d0d0d8',
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      padding: '10px 16px', borderRadius: '16px 16px 16px 4px',
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)',
                      display: 'flex', gap: '4px', alignItems: 'center',
                    }}>
                      {[0, 160, 320].map((delay) => (
                        <span key={delay} style={{
                          width: '5px', height: '5px', borderRadius: '50%',
                          background: '#8a8a9a', display: 'inline-block',
                          animation: `fadeInUp 600ms ease ${delay}ms infinite alternate`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input row */}
              {userMsgCount >= 50 ? (
                <div style={{
                  padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', flexDirection: 'column', gap: '10px',
                }}>
                  <p style={{
                    margin: 0, fontFamily: 'var(--font-dm-sans)', fontSize: '13px',
                    color: '#8a8a9a', textAlign: 'center', lineHeight: 1.5,
                  }}>
                    You've reached the demo limit — book a call to keep chatting.
                  </p>
                  <a
                    href="https://calendly.com/dmanfergie/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block', textAlign: 'center', padding: '11px 16px',
                      borderRadius: '12px', background: '#c4620a', color: '#f5f5f0',
                      fontFamily: 'var(--font-dm-sans)', fontSize: '13.5px', fontWeight: 600,
                      textDecoration: 'none', WebkitTapHighlightColor: 'transparent',
                      transition: 'background-color 150ms ease',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#d4720a'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#c4620a'}
                  >
                    Book a Free Call →
                  </a>
                </div>
              ) : (
                <div style={{
                  padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', gap: '8px', alignItems: 'center',
                }}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Ask anything about this business..."
                    disabled={isLoading}
                    style={{
                      flex: 1, background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.09)', borderRadius: '12px',
                      padding: '10px 14px', color: '#f5f5f0',
                      fontFamily: 'var(--font-dm-sans)', fontSize: '13.5px',
                      outline: 'none', transition: 'border-color 150ms ease', minHeight: '44px',
                    }}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(196,98,10,0.4)'}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.09)'}
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim() || isLoading}
                    style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: input.trim() && !isLoading ? '#c4620a' : 'rgba(196,98,10,0.2)',
                      border: 'none', cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                      color: '#f5f5f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, WebkitTapHighlightColor: 'transparent',
                      transition: 'background-color 200ms ease',
                    }}
                    aria-label="Send message"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}

          {/* Powered by */}
          <div style={{ padding: '6px 16px 12px', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '10.5px', color: '#8a8a9a', letterSpacing: '0.04em' }}>
              Powered by Soul AI
            </span>
          </div>
        </div>
      )}

      {/* ── Floating Trigger Button ─────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(v => !v)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 50,
          width: '56px', height: '56px', borderRadius: '50%',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isOpen ? '#141828' : 'transparent',
          boxShadow: isOpen ? 'none' : undefined,
          WebkitTapHighlightColor: 'transparent',
          transition: 'transform 200ms ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg width="20" height="20" fill="none" stroke="#f5f5f0" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span
            className={`chat-glow${pulseNow ? ' chat-pulse' : ''}`}
            style={{ borderRadius: '50%', display: 'flex', lineHeight: 0 }}
          >
            <YinYangIcon />
          </span>
        )}
      </button>
    </>
  );
}
