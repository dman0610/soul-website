"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
}

const SEED_MESSAGES: Message[] = [
  {
    id: 'seed-0',
    role: 'bot',
    text: "Hi there. I'm your Soul AI assistant — trained on this business. Ask me anything about tours, pricing, gear, or how to book.",
  },
];

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pulsed, setPulsed] = useState(false);
  const [pulseNow, setPulseNow] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 320);
    }
  }, [isOpen]);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat/soul', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: data.reply ?? "I'm not sure about that — try asking about tour times, pricing, or gear.",
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: "Sorry, something went wrong. Try again in a moment.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send();
  };

  // Yin-yang SVG icon
  const YinYangIcon = () => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="13" cy="13" r="13" fill="#060810" />
      <path d="M13 0 A13 13 0 0 1 13 26 A6.5 6.5 0 0 1 13 13 A6.5 6.5 0 0 0 13 0 Z" fill="#f5f5f0" />
      <circle cx="13" cy="6.5" r="2.6" fill="#f5f5f0" />
      <circle cx="13" cy="19.5" r="2.6" fill="#060810" />
    </svg>
  );

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '92px',
            right: '24px',
            left: 'auto',
            width: '360px',
            maxWidth: 'calc(100vw - 32px)',
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
                <svg width="20" height="20" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                  <circle cx="13" cy="13" r="13" fill="#060810" />
                  <path d="M13 0 A13 13 0 0 1 13 26 A6.5 6.5 0 0 1 13 13 A6.5 6.5 0 0 0 13 0 Z" fill="#f5f5f0" />
                  <circle cx="13" cy="6.5" r="2.6" fill="#f5f5f0" />
                  <circle cx="13" cy="19.5" r="2.6" fill="#060810" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '14px', color: '#f5f5f0', lineHeight: 1.2 }}>Soul AI</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2a9898', display: 'inline-block' }} />
                  <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '11px', color: '#8a8a9a' }}>Online — typically replies instantly</span>
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

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 16px 8px',
            display: 'flex', flexDirection: 'column', gap: '10px',
            maxHeight: '320px', minHeight: '200px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.08) transparent',
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="chat-msg"
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? 'rgba(196,98,10,0.18)'
                    : 'rgba(255,255,255,0.06)',
                  border: msg.role === 'user'
                    ? '1px solid rgba(196,98,10,0.25)'
                    : '1px solid rgba(255,255,255,0.07)',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '13.5px',
                  lineHeight: 1.55,
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

          {/* Quick replies */}
          <div style={{ padding: '6px 16px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['Tour times?', 'What does it cost?', 'What gear do I need?'].map((q) => (
              <button
                key={q}
                onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50); }}
                style={{
                  background: 'rgba(196,98,10,0.07)', border: '1px solid rgba(196,98,10,0.2)',
                  color: '#c4620a', fontFamily: 'var(--font-dm-sans)', fontSize: '11.5px',
                  padding: '4px 10px', borderRadius: '100px', cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent', minHeight: '28px',
                  transition: 'background 150ms ease, border-color 150ms ease',
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
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
                outline: 'none', transition: 'border-color 150ms ease',
                minHeight: '44px',
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
                transition: 'background 200ms ease',
              }}
              aria-label="Send message"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Powered by */}
          <div style={{ padding: '6px 16px 12px', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '10.5px', color: 'rgba(138,138,154,0.5)', letterSpacing: '0.04em' }}>
              Powered by Soul AI
            </span>
          </div>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(v => !v)}
        className={pulseNow ? 'chat-pulse' : ''}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 50,
          width: '56px', height: '56px', borderRadius: '50%',
          background: '#c4620a', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(196,98,10,0.35), 0 2px 8px rgba(0,0,0,0.4)',
          WebkitTapHighlightColor: 'transparent',
          transition: 'transform 200ms ease, background 200ms ease, box-shadow 200ms ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 28px rgba(196,98,10,0.5), 0 2px 8px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(196,98,10,0.35), 0 2px 8px rgba(0,0,0,0.4)';
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg width="20" height="20" fill="none" stroke="#f5f5f0" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <YinYangIcon />
        )}
      </button>
    </>
  );
}
