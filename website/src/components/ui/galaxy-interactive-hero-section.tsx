"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Suspense, lazy } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

function HeroSplineBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'auto' }}>
      <Spline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'auto' }}
        scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
      />
      {/* Bottom fade into page content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%',
        background: 'linear-gradient(to bottom, transparent, rgba(6,8,16,0.85))',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

const BLACK_HOLE_GRADIENT =
  'radial-gradient(circle at 50% 50%, #000000 0%, #000000 10%, #1a0500 26%, #6b2504 46%, #c4620a 66%, #e08820 84%, #f5b040 100%)';

function SoulWordmark() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      {/* Pulsing amber orb behind text */}
      <div style={{
        position: 'absolute',
        width: '55vw', height: '45vh',
        background: 'radial-gradient(ellipse, rgba(196,98,10,0.2) 0%, rgba(196,98,10,0.07) 40%, transparent 70%)',
        left: '50%', top: '50%',
        animation: 'soulOrbPulse 3.5s ease infinite',
        pointerEvents: 'none',
      }} />
      {/* Soul wordmark — black hole per letter */}
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: '0.01em',
        animation: 'fadeIn 1.4s ease both',
      }}>
        {['S', 'o', 'u', 'l'].map((letter, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-outfit)',
              fontWeight: 800,
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              lineHeight: 1,
              display: 'inline-block',
              background: BLACK_HOLE_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 18px rgba(196,98,10,0.75)) drop-shadow(0 0 50px rgba(196,98,10,0.4))',
              animation: `fadeIn 1.2s ease ${i * 0.12}s both`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}

function SoulNavbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onResize = () => { if (window.innerWidth >= 768) setIsMobileOpen(false); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20,
      backgroundColor: scrolled ? 'rgba(6,8,16,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition: 'background-color 350ms ease, border-color 350ms ease, backdrop-filter 350ms ease',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px',
      }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', WebkitTapHighlightColor: 'transparent' }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Soul logo">
            <circle cx="15" cy="15" r="15" fill="#060810" />
            <path d="M15 0 A15 15 0 0 1 15 30 A7.5 7.5 0 0 1 15 15 A7.5 7.5 0 0 0 15 0 Z" fill="#c4620a" />
            <circle cx="15" cy="7.5" r="3" fill="#c4620a" />
            <circle cx="15" cy="22.5" r="3" fill="#060810" />
          </svg>
          <span style={{
            fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '21px',
            color: '#f5f5f0', letterSpacing: '-0.025em',
          }}>
            Soul
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '36px' }}>
          {[
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Pricing', href: '#pricing' },
          ].map(({ label, href }) => (
            <a key={href} href={href} style={{
              fontFamily: 'var(--font-dm-sans)', fontSize: '14px', color: '#8a8a9a',
              textDecoration: 'none', WebkitTapHighlightColor: 'transparent',
              transition: 'color 150ms ease',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#f5f5f0'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#8a8a9a'}
            >
              {label}
            </a>
          ))}
          <a href="#contact" style={{
            fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '14px',
            color: '#f5f5f0', textDecoration: 'none', padding: '9px 22px',
            borderRadius: '100px', background: '#c4620a', minHeight: '44px',
            display: 'inline-flex', alignItems: 'center',
            WebkitTapHighlightColor: 'transparent',
            transition: 'background 200ms ease',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#e08820'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#c4620a'}
          >
            Book a Free Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileOpen(v => !v)}
          style={{
            background: 'none', border: 'none', color: '#f5f5f0', cursor: 'pointer',
            padding: '10px', WebkitTapHighlightColor: 'transparent',
            minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d={isMobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{
        maxHeight: isMobileOpen ? '220px' : '0',
        overflow: 'hidden',
        transition: 'max-height 300ms ease',
        background: 'rgba(6,8,16,0.96)',
        borderTop: isMobileOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}>
        <div style={{ padding: '16px 24px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <a href="#how-it-works" onClick={() => setIsMobileOpen(false)} style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '15px', color: '#8a8a9a', textDecoration: 'none', minHeight: '44px', display: 'flex', alignItems: 'center', WebkitTapHighlightColor: 'transparent' }}>How It Works</a>
          <a href="#pricing" onClick={() => setIsMobileOpen(false)} style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '15px', color: '#8a8a9a', textDecoration: 'none', minHeight: '44px', display: 'flex', alignItems: 'center', WebkitTapHighlightColor: 'transparent' }}>Pricing</a>
          <a href="#contact" onClick={() => setIsMobileOpen(false)} style={{ fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '15px', color: '#f5f5f0', textDecoration: 'none', padding: '12px 22px', borderRadius: '100px', background: '#c4620a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '44px', WebkitTapHighlightColor: 'transparent', marginTop: '4px' }}>Book a Free Call</a>
        </div>
      </div>
    </nav>
  );
}

export const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [splineActive, setSplineActive] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSplineActive(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fallback = (
    <div style={{
      width: '100%', height: '100dvh',
      background: 'radial-gradient(ellipse at 65% 40%, rgba(196,98,10,0.1) 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(42,152,152,0.06) 0%, transparent 50%), #060810',
    }} />
  );

  return (
    <div ref={sectionRef} style={{ position: 'relative' }}>
      <SoulNavbar />
      <div style={{ position: 'relative', minHeight: '100dvh', overflow: 'hidden' }}>
        {/* Spline 3D bg — unmounted when hero is off screen */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto' }}>
          {splineActive ? (
            <Suspense fallback={fallback}>
              <HeroSplineBackground />
            </Suspense>
          ) : fallback}
        </div>

        {/* Centered Soul wordmark */}
        <SoulWordmark />
      </div>
    </div>
  );
};
