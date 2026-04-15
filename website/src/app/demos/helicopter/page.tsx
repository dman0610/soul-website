"use client";

import { useState, useEffect, useRef } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  :root {
    --bg:       #060608;
    --surface:  #0d0b10;
    --elevated: #141218;
    --amber:    #c4620a;
    --gold:     #e08820;
    --rust:     #8b2a08;
    --white:    #f5f4f0;
    --muted:    #8a8490;
    --font-display: var(--font-outfit), 'Outfit', sans-serif;
    --font-body:    var(--font-dm-sans), 'DM Sans', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--white);
    font-family: var(--font-body);
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-display);
    letter-spacing: -0.03em;
    line-height: 1.05;
  }

  /* ── Keyframes ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scrollBounce {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50%       { transform: translateY(8px); opacity: 1; }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes grainMove {
    0%   { transform: translate(0, 0); }
    25%  { transform: translate(-2%, -1%); }
    50%  { transform: translate(1%, 2%); }
    75%  { transform: translate(2%, -1%); }
    100% { transform: translate(0, 0); }
  }
  @keyframes compassSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes navSlide {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes amberGlow {
    0%, 100% { opacity: 0.6; }
    50%       { opacity: 1; }
  }

  /* ── Navbar ── */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 20px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 300ms ease, box-shadow 300ms ease, padding 300ms ease;
    animation: navSlide 600ms ease both;
  }
  .nav.scrolled {
    background: rgba(6,6,8,0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 1px 0 rgba(255,255,255,0.06);
    padding: 14px 48px;
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .nav-logo svg { width: 18px; height: 18px; flex-shrink: 0; }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 36px;
    list-style: none;
  }
  .nav-links a {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(245,244,240,0.6);
    text-decoration: none;
    transition: color 200ms ease;
  }
  .nav-links a:hover { color: var(--white); }
  .nav-cta {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--white);
    background: var(--amber);
    border: none;
    padding: 10px 22px;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    transition: background 200ms ease, transform 150ms ease, box-shadow 200ms ease;
  }
  .nav-cta:hover {
    background: var(--gold);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(196,98,10,0.4);
  }
  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 4px;
    min-width: 44px;
    min-height: 44px;
    align-items: center;
    justify-content: center;
  }
  .nav-hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--white);
    border-radius: 2px;
    transition: transform 250ms ease, opacity 250ms ease;
  }
  .nav-mobile {
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(6,6,8,0.97);
    z-index: 99;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
  }
  .nav-mobile.open { display: flex; }
  .nav-mobile a {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--white);
    text-decoration: none;
    transition: color 200ms ease;
  }
  .nav-mobile a:hover { color: var(--gold); }
  .nav-mobile-close {
    position: absolute;
    top: 24px; right: 24px;
    background: none;
    border: none;
    color: var(--white);
    font-size: 28px;
    cursor: pointer;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── Hero ── */
  .hero {
    position: relative;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0 64px 88px;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background-image: url('/HELITOURDEMO.png');
    background-size: cover;
    background-position: center 30%;
    background-attachment: scroll;
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to top, rgba(6,6,8,0.97) 0%, rgba(6,6,8,0.55) 35%, rgba(6,6,8,0.1) 60%, rgba(6,6,8,0.45) 100%),
      radial-gradient(ellipse at 10% 90%, rgba(196,98,10,0.4) 0%, transparent 50%),
      radial-gradient(ellipse at 85% 10%, rgba(139,42,8,0.12) 0%, transparent 40%);
  }
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 780px;
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold);
    border: 1px solid rgba(224,136,32,0.3);
    background: rgba(196,98,10,0.08);
    padding: 6px 14px;
    border-radius: 2px;
    margin-bottom: 28px;
    animation: fadeIn 800ms ease both;
  }
  .hero-badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--gold);
    animation: amberGlow 2s ease infinite;
  }
  .hero-headline {
    font-size: clamp(54px, 9vw, 118px);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 0.95;
    color: var(--white);
    margin-bottom: 28px;
    animation: fadeUp 700ms 150ms ease both;
  }
  .hero-headline em {
    font-style: normal;
    color: var(--gold);
  }
  .hero-sub {
    font-size: clamp(15px, 2vw, 18px);
    font-weight: 400;
    line-height: 1.6;
    color: rgba(245,244,240,0.72);
    max-width: 520px;
    margin-bottom: 44px;
    animation: fadeUp 700ms 280ms ease both;
  }
  .hero-ctas {
    display: flex;
    align-items: center;
    gap: 16px;
    animation: fadeUp 700ms 380ms ease both;
    flex-wrap: wrap;
  }
  .btn-primary {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--white);
    background: var(--amber);
    border: none;
    padding: 15px 32px;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: background 200ms ease, transform 150ms ease, box-shadow 200ms ease;
    min-height: 44px;
  }
  .btn-primary:hover {
    background: var(--gold);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(196,98,10,0.45);
  }
  .btn-ghost {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(245,244,240,0.8);
    background: transparent;
    border: 1px solid rgba(245,244,240,0.2);
    padding: 14px 28px;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 200ms ease, color 200ms ease, background 200ms ease;
    min-height: 44px;
  }
  .btn-ghost:hover {
    border-color: rgba(245,244,240,0.5);
    color: var(--white);
    background: rgba(245,244,240,0.05);
  }
  .hero-scroll {
    position: absolute;
    bottom: 36px;
    right: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 2;
    animation: fadeIn 1s 600ms ease both;
  }
  .hero-scroll span {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(245,244,240,0.4);
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
  .hero-scroll svg {
    animation: scrollBounce 2s ease infinite;
    opacity: 0.5;
  }

  /* ── Routes ── */
  .section-routes {
    padding: 120px 64px;
    background: var(--bg);
    position: relative;
  }
  .section-routes::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent);
  }
  .routes-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 72px;
  }
  .section-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 16px;
  }
  .section-title {
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 800;
    color: var(--white);
  }
  .routes-note {
    font-size: 13px;
    color: var(--muted);
    max-width: 200px;
    text-align: right;
    line-height: 1.6;
  }
  .routes-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .route-card {
    display: grid;
    grid-template-columns: 100px 1fr auto;
    align-items: center;
    gap: 48px;
    padding: 40px 48px;
    background: var(--surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-left: 3px solid transparent;
    cursor: pointer;
    transition: background 250ms ease, border-left-color 250ms ease, transform 250ms ease;
    position: relative;
    overflow: hidden;
  }
  .route-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 0% 50%, rgba(196,98,10,0.06) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 250ms ease;
  }
  .route-card:hover {
    background: #0f0d14;
    border-left-color: var(--amber);
    transform: translateX(4px);
  }
  .route-card:hover::after { opacity: 1; }
  .route-num {
    font-family: var(--font-display);
    font-size: 56px;
    font-weight: 900;
    color: var(--amber);
    opacity: 0.35;
    line-height: 1;
    letter-spacing: -0.05em;
    transition: opacity 250ms ease;
  }
  .route-card:hover .route-num { opacity: 0.7; }
  .route-info { display: flex; flex-direction: column; gap: 10px; }
  .route-name {
    font-family: var(--font-display);
    font-size: clamp(22px, 3vw, 30px);
    font-weight: 700;
    color: var(--white);
    letter-spacing: -0.02em;
  }
  .route-desc {
    font-size: 14px;
    line-height: 1.6;
    color: rgba(245,244,240,0.52);
    max-width: 480px;
  }
  .route-meta {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  .route-meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    letter-spacing: 0.04em;
    color: rgba(245,244,240,0.5);
  }
  .route-meta-item svg { color: var(--amber); opacity: 0.7; flex-shrink: 0; }
  .route-price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    flex-shrink: 0;
  }
  .route-price-label {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .route-price-amount {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 800;
    color: var(--gold);
    letter-spacing: -0.03em;
  }
  .route-arrow {
    width: 36px; height: 36px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
    flex-shrink: 0;
    transition: border-color 250ms ease, color 250ms ease, background 250ms ease;
    margin-top: 8px;
  }
  .route-card:hover .route-arrow {
    border-color: var(--amber);
    color: var(--amber);
    background: rgba(196,98,10,0.1);
  }

  /* ── Experience ── */
  .section-experience {
    display: grid;
    grid-template-columns: 1fr 420px;
    min-height: 560px;
    position: relative;
  }
  .experience-left {
    padding: 100px 80px 100px 64px;
    background: var(--surface);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  .experience-left::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0; right: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent);
  }
  .experience-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 24px;
  }
  .experience-headline {
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 800;
    color: var(--white);
    margin-bottom: 32px;
    max-width: 520px;
  }
  .experience-headline em {
    font-style: italic;
    color: var(--gold);
  }
  .experience-body {
    font-size: 16px;
    line-height: 1.8;
    color: rgba(245,244,240,0.65);
    max-width: 500px;
  }
  .experience-body p + p { margin-top: 20px; }
  .experience-right {
    position: relative;
    background:
      radial-gradient(ellipse at 20% 80%, rgba(196,98,10,0.22) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(139,42,8,0.15) 0%, transparent 50%),
      #0a0810;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 64px 48px;
    overflow: hidden;
  }
  .experience-right::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  .experience-quote-mark {
    font-family: var(--font-display);
    font-size: 120px;
    font-weight: 900;
    color: var(--amber);
    opacity: 0.15;
    line-height: 0.8;
    align-self: flex-start;
    position: relative;
    z-index: 1;
    margin-bottom: -24px;
  }
  .experience-quote {
    font-family: var(--font-display);
    font-size: clamp(20px, 2.5vw, 26px);
    font-weight: 700;
    line-height: 1.35;
    color: var(--white);
    letter-spacing: -0.02em;
    position: relative;
    z-index: 1;
    margin-bottom: 32px;
  }
  .experience-attribution {
    align-self: flex-start;
    position: relative;
    z-index: 1;
  }
  .experience-attrib-name {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 0.04em;
  }
  .experience-attrib-title {
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 0.04em;
    margin-top: 3px;
  }
  .experience-divider {
    width: 40px;
    height: 2px;
    background: linear-gradient(to right, var(--amber), transparent);
    align-self: flex-start;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
  }

  /* ── Safety ── */
  .section-safety {
    padding: 120px 64px;
    background: var(--bg);
    position: relative;
  }
  .section-safety::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent);
  }
  .safety-header { margin-bottom: 72px; }
  .safety-pillars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    margin-bottom: 72px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.04);
  }
  .safety-pillar {
    padding: 52px 40px;
    background: var(--surface);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .safety-pillar-icon {
    width: 48px; height: 48px;
    border-radius: 8px;
    background: rgba(196,98,10,0.1);
    border: 1px solid rgba(196,98,10,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--amber);
  }
  .safety-stat {
    font-family: var(--font-display);
    font-size: 52px;
    font-weight: 900;
    color: var(--white);
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .safety-stat span { color: var(--amber); }
  .safety-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--white);
    letter-spacing: 0.01em;
  }
  .safety-sub {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }
  .pilot-strip {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 40px;
    padding: 40px 48px;
    background: var(--surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-left: 3px solid var(--amber);
  }
  .pilot-avatar {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--amber), var(--rust));
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 800;
    color: var(--white);
    flex-shrink: 0;
  }
  .pilot-info { display: flex; flex-direction: column; gap: 6px; }
  .pilot-name {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    color: var(--white);
    letter-spacing: -0.02em;
  }
  .pilot-title {
    font-size: 13px;
    color: var(--amber);
    font-weight: 600;
    letter-spacing: 0.04em;
  }
  .pilot-creds {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }
  .fleet-badge {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    flex-shrink: 0;
  }
  .fleet-badge-label {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .fleet-badge-value {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 0.02em;
  }

  /* ── Reserve CTA ── */
  .section-reserve {
    position: relative;
    padding: 120px 64px;
    text-align: center;
    overflow: hidden;
    background: var(--surface);
  }
  .section-reserve::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 50%, rgba(196,98,10,0.18) 0%, transparent 65%),
      radial-gradient(ellipse at 0% 100%, rgba(139,42,8,0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 100% 0%, rgba(196,98,10,0.08) 0%, transparent 50%);
  }
  .section-reserve::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 40px,
      rgba(255,255,255,0.012) 40px,
      rgba(255,255,255,0.012) 41px
    );
  }
  .reserve-content {
    position: relative;
    z-index: 1;
    max-width: 640px;
    margin: 0 auto;
  }
  .reserve-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 24px;
  }
  .reserve-headline {
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 800;
    color: var(--white);
    letter-spacing: -0.03em;
    margin-bottom: 20px;
  }
  .reserve-sub {
    font-size: 16px;
    color: rgba(245,244,240,0.6);
    line-height: 1.6;
    margin-bottom: 48px;
  }
  .reserve-ctas {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .btn-reserve {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--bg);
    background: var(--white);
    border: none;
    padding: 15px 36px;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: background 200ms ease, transform 150ms ease, box-shadow 200ms ease;
    min-height: 44px;
  }
  .btn-reserve:hover {
    background: var(--gold);
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(196,98,10,0.35);
  }
  .btn-call {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(245,244,240,0.8);
    background: transparent;
    border: 1px solid rgba(245,244,240,0.25);
    padding: 14px 28px;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 200ms ease, color 200ms ease;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-call:hover {
    border-color: rgba(245,244,240,0.6);
    color: var(--white);
  }

  /* ── Footer ── */
  .footer {
    padding: 40px 64px;
    background: var(--bg);
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }
  .footer-left {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .footer-brand {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
  }
  .footer-location {
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 0.03em;
  }
  .footer-copy {
    font-size: 12px;
    color: var(--muted);
  }
  .footer-soul {
    font-size: 12px;
    color: var(--muted);
    text-decoration: none;
    letter-spacing: 0.03em;
    transition: color 200ms ease;
  }
  .footer-soul:hover { color: var(--gold); }
  .footer-soul span { color: var(--amber); }

  /* ── Chat Widget ── */
  .chat-trigger {
    position: fixed;
    bottom: 24px; right: 24px;
    z-index: 50;
    width: 56px; height: 56px;
    border-radius: 50%;
    background: var(--amber);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 32px rgba(196,98,10,0.4);
    transition: background 200ms ease, transform 150ms ease, box-shadow 200ms ease;
  }
  .chat-trigger:hover {
    background: var(--gold);
    transform: scale(1.08);
    box-shadow: 0 12px 40px rgba(196,98,10,0.55);
  }
  .chat-panel {
    position: fixed;
    bottom: 92px; right: 24px;
    z-index: 50;
    width: 360px;
    background: var(--elevated);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: slideInRight 280ms ease both;
    max-height: 520px;
  }
  .chat-header {
    padding: 16px 20px;
    background: linear-gradient(135deg, rgba(196,98,10,0.15), rgba(139,42,8,0.1));
    border-bottom: 1px solid rgba(255,255,255,0.07);
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .chat-avatar {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--amber), var(--rust));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .chat-header-info { flex: 1; }
  .chat-bot-name {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    color: var(--white);
  }
  .chat-bot-status {
    font-size: 11px;
    color: var(--gold);
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .chat-bot-status::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #4ade80;
    flex-shrink: 0;
  }
  .chat-close {
    background: none;
    border: none;
    color: var(--muted);
    font-size: 18px;
    cursor: pointer;
    min-width: 32px;
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: color 200ms ease, background 200ms ease;
  }
  .chat-close:hover { color: var(--white); background: rgba(255,255,255,0.05); }
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-height: 340px;
  }
  .chat-messages::-webkit-scrollbar { width: 4px; }
  .chat-messages::-webkit-scrollbar-track { background: transparent; }
  .chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
  .msg {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .msg-bot { align-items: flex-start; }
  .msg-user { align-items: flex-end; }
  .msg-label {
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 0 4px;
  }
  .msg-bubble {
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 13.5px;
    line-height: 1.55;
    max-width: 86%;
  }
  .msg-bot .msg-bubble {
    background: rgba(255,255,255,0.06);
    color: rgba(245,244,240,0.9);
    border-bottom-left-radius: 3px;
  }
  .msg-user .msg-bubble {
    background: var(--amber);
    color: var(--white);
    border-bottom-right-radius: 3px;
  }
  .chat-input-row {
    padding: 14px 16px;
    border-top: 1px solid rgba(255,255,255,0.07);
    display: flex;
    gap: 10px;
  }
  .chat-input {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 9px 14px;
    font-size: 13px;
    color: var(--white);
    font-family: var(--font-body);
    outline: none;
    transition: border-color 200ms ease;
  }
  .chat-input::placeholder { color: var(--muted); }
  .chat-input:focus { border-color: rgba(196,98,10,0.5); }
  .chat-send {
    width: 38px; height: 38px;
    border-radius: 6px;
    background: var(--amber);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    transition: background 200ms ease;
    flex-shrink: 0;
  }
  .chat-send:hover { background: var(--gold); }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .section-experience {
      grid-template-columns: 1fr;
    }
    .experience-right {
      padding: 64px 48px;
    }
    .route-card {
      grid-template-columns: 64px 1fr auto;
      gap: 28px;
      padding: 32px 32px;
    }
    .route-num { font-size: 42px; }
    .pilot-strip {
      grid-template-columns: auto 1fr;
      gap: 24px;
    }
    .fleet-badge { display: none; }
  }

  @media (max-width: 768px) {
    .nav { padding: 16px 20px; }
    .nav.scrolled { padding: 12px 20px; }
    .nav-links, .nav-cta { display: none; }
    .nav-hamburger { display: flex; }
    .hero { padding: 0 20px 80px; }
    .hero-scroll { right: 20px; bottom: 24px; }
    .section-routes { padding: 80px 20px; }
    .routes-header { flex-direction: column; align-items: flex-start; gap: 16px; }
    .routes-note { text-align: left; max-width: none; }
    .route-card {
      grid-template-columns: 48px 1fr;
      gap: 16px;
      padding: 28px 24px;
    }
    .route-num { font-size: 34px; }
    .route-card > div:last-child {
      grid-column: 2;
    }
    .route-price { align-items: flex-start; flex-direction: row; align-items: center; gap: 12px; }
    .route-price-label { display: none; }
    .route-price-amount { font-size: 22px; }
    .route-arrow { display: none; }
    .section-experience { grid-template-columns: 1fr; }
    .experience-left { padding: 64px 20px; }
    .experience-right { padding: 64px 20px; }
    .section-safety { padding: 80px 20px; }
    .safety-pillars { grid-template-columns: 1fr; }
    .pilot-strip {
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 28px 24px;
    }
    .pilot-avatar { display: none; }
    .fleet-badge { display: none; }
    .section-reserve { padding: 80px 20px; }
    .footer { padding: 32px 20px; flex-direction: column; align-items: flex-start; }
    .chat-panel {
      right: 16px; left: 16px;
      width: auto;
      bottom: 88px;
    }
  }

  /* ── Scroll Reveal ── */
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 600ms ease, transform 600ms ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 100ms; }
  .reveal-delay-2 { transition-delay: 200ms; }
  .reveal-delay-3 { transition-delay: 300ms; }
`;

// ─── Compass Rose SVG ──────────────────────────────────────────────────────────
function CompassIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" opacity="0.4"/>
      <path d="M12 3L13.5 10.5H10.5L12 3Z" fill="white"/>
      <path d="M12 21L10.5 13.5H13.5L12 21Z" fill="white" opacity="0.5"/>
      <path d="M21 12L13.5 13.5V10.5L21 12Z" fill="white" opacity="0.5"/>
      <path d="M3 12L10.5 10.5V13.5L3 12Z" fill="white" opacity="0.5"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>
  );
}

function LogoStar() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1L10.5 7.5H17L11.5 11.5L13.5 18L9 14L4.5 18L6.5 11.5L1 7.5H7.5L9 1Z" fill="#e08820"/>
    </svg>
  );
}

// ─── Chat Widget ──────────────────────────────────────────────────────────────
const HELI_FAQ = [
  { q: "How much do tours cost?", a: "From $349/person — 60-min Haleakalā Sunrise. Road to Hana is $425, Full Island Circuit is $499. Private charters quoted on request." },
  { q: "How long are the flights?", a: "60 to 90 minutes depending on route. Add 30 minutes pre-flight. All depart from Kahului Airport (OGG)." },
  { q: "Is there a weight limit?", a: "Yes — 300 lbs per passenger for safety and aircraft balance. This is an FAA requirement, verified at check-in." },
  { q: "What if weather is bad?", a: "We monitor conditions hourly. If we can't fly safely, we reschedule for free or issue a full refund. Maui averages 300+ sunny days a year." },
];

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleMsg, setBubbleMsg] = useState("");
  const engagedRef = useRef(false);
  const goodbyeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mode, setMode] = useState<"live" | "faq">("faq");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [history, setHistory] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Aloha! I'm Leilani, your Maui Air Tours concierge. Ask me about routes, pricing, or how to reserve your flight." },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check Claude API status on mount — upgrades to live when ANTHROPIC_API_KEY is set
  useEffect(() => {
    fetch("/api/chat/helicopter")
      .then(r => r.json())
      .then(d => { if (d.live) setMode("live"); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const introPrompts = [
      "Aloha! I'm Leilani — ask me anything about our Maui flights!",
      "Hi there! I'm Leilani, your tour concierge. I'd love to help you plan something special.",
      "Aloha! Thinking about a Maui flight? I'm here whenever you're ready.",
    ];
    const psstPrompts = ["Psst, over here!", "Ready to fly?", "Ask me anything!"];
    const timers: ReturnType<typeof setTimeout>[] = [];
    function add(fn: () => void, ms: number) {
      const t = setTimeout(fn, ms); timers.push(t);
    }
    function schedulePsst() {
      const delay = 15000 + Math.random() * 15000;
      add(() => {
        if (engagedRef.current) return;
        setBubbleMsg(psstPrompts[Math.floor(Math.random() * psstPrompts.length)]);
        setShowBubble(true);
        add(() => {
          if (engagedRef.current) return;
          setShowBubble(false);
          schedulePsst();
        }, 60000);
      }, delay);
    }
    add(() => {
      if (engagedRef.current) return;
      setBubbleMsg(introPrompts[Math.floor(Math.random() * introPrompts.length)]);
      setShowBubble(true);
      add(() => {
        if (engagedRef.current) return;
        setShowBubble(false);
        schedulePsst();
      }, 60000);
    }, 800);
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (mode === "live" && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages, mode]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;
    setMessages(prev => [...prev, { type: "user", text }]);
    setInput("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat/helicopter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      const reply = data.reply ?? "Let me check on that — feel free to call us at (808) 555-0192.";
      setMessages(prev => [...prev, { type: "bot", text: reply }]);
      setHistory(prev => [
        ...prev,
        { role: "user" as const, content: text },
        { role: "assistant" as const, content: reply },
      ].slice(-10));
    } catch {
      setMode("faq");
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    const goodbyes = [
      "Safe travels!",
      "Mahalo!",
      "Happy to help!",
      "Fly safe!",
      "Blue skies!",
      "Come back soon!",
      "Until next time!",
      "Aloha!",
    ];
    setOpen(false);
    setBubbleMsg(goodbyes[Math.floor(Math.random() * goodbyes.length)]);
    setShowBubble(true);
    if (goodbyeTimerRef.current) clearTimeout(goodbyeTimerRef.current);
    goodbyeTimerRef.current = setTimeout(() => setShowBubble(false), 10000);
  }

  return (
    <>
      {open && (
        <div className="chat-panel" style={{ animation: "chatSlideIn 300ms ease both" }}>
          <div className="chat-header">
            <div className="chat-avatar">
              <CompassIcon />
            </div>
            <div className="chat-header-info">
              <div className="chat-bot-name">Leilani</div>
              <div className="chat-bot-status" style={{ color: mode === "live" ? "#4ade80" : "var(--muted)" }}>
                {mode === "live" ? "Online now" : "Setting up — quick answers below"}
              </div>
            </div>
            <button className="chat-close" onClick={handleClose} aria-label="Close chat">✕</button>
          </div>

          {/* FAQ Mode */}
          {mode === "faq" && (
            <div style={{
              flex: 1, overflowY: "auto" as const, padding: "16px",
              display: "flex", flexDirection: "column" as const, gap: "8px", maxHeight: "400px",
              scrollbarWidth: "thin" as const,
            }}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "var(--muted)", margin: "0 0 6px", lineHeight: 1.5 }}>
                Our AI assistant is getting set up. Quick answers:
              </p>
              {HELI_FAQ.map((item, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: expandedFaq === i ? "1px solid rgba(224,136,32,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px", overflow: "hidden", transition: "border-color 150ms ease",
                }}>
                  <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} style={{
                    width: "100%", textAlign: "left" as const, background: "none", border: "none",
                    padding: "11px 14px", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px",
                    WebkitTapHighlightColor: "transparent",
                  }}>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "var(--white)", fontWeight: 500, lineHeight: 1.4 }}>{item.q}</span>
                    <svg width="13" height="13" fill="none" stroke="var(--muted)" viewBox="0 0 24 24" style={{ flexShrink: 0, transform: expandedFaq === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms ease" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFaq === i && (
                    <div style={{ padding: "0 14px 11px", fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
              <a href="tel:+18085550192" style={{
                display: "block", textAlign: "center" as const, marginTop: "8px",
                padding: "11px 16px", borderRadius: "10px",
                background: "var(--gold)", color: "#0a0a10",
                fontFamily: "var(--font-dm-sans)", fontSize: "13.5px", fontWeight: 600,
                textDecoration: "none", WebkitTapHighlightColor: "transparent",
                transition: "opacity 150ms ease",
              }}>
                Call Us: (808) 555-0192 →
              </a>
            </div>
          )}

          {/* Live Chat Mode */}
          {mode === "live" && (
            <>
              <div className="chat-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`msg msg-${msg.type}`}>
                    {msg.type === "bot" && <span className="msg-label">Leilani</span>}
                    <div className="msg-bubble">{msg.text}</div>
                  </div>
                ))}
                {isLoading && (
                  <div className="msg msg-bot">
                    <span className="msg-label">Leilani</span>
                    <div className="msg-bubble" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                      {[0, 160, 320].map(delay => (
                        <span key={delay} style={{
                          width: "5px", height: "5px", borderRadius: "50%",
                          background: "var(--muted)", display: "inline-block",
                          animation: `fadeIn 600ms ease ${delay}ms infinite alternate`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="chat-input-row">
                <input
                  className="chat-input"
                  placeholder="Ask about flights, pricing, availability..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
                  disabled={isLoading}
                />
                <button className="chat-send" onClick={handleSend} disabled={!input.trim() || isLoading} aria-label="Send">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 2L2 7L7 9L9 14L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {/* Chat bubble hint */}
      <div
        aria-live="polite"
        style={{
          position: "fixed", bottom: "96px", right: "8px", zIndex: 49,
          opacity: showBubble ? 1 : 0,
          transform: showBubble ? "translateY(0) scale(1)" : "translateY(10px) scale(0.97)",
          transition: "opacity 300ms ease, transform 300ms ease",
          pointerEvents: showBubble ? "auto" : "none",
          maxWidth: "240px",
        }}
      >
        <div style={{
          background: "#1d1820",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "14px 14px 4px 14px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(196,98,10,0.10)",
          padding: "10px 28px 10px 14px",
          position: "relative",
        }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#c4620a", marginBottom: "4px", letterSpacing: "0.06em" }}>
            LEILANI
          </div>
          <p style={{ fontSize: "13px", color: "#e8e6e0", lineHeight: 1.5, margin: 0 }}>
            {bubbleMsg}
          </p>
          <button
            onClick={() => setShowBubble(false)}
            style={{
              position: "absolute", top: "6px", right: "8px",
              background: "none", border: "none", cursor: "pointer",
              color: "#6a6870", fontSize: "14px", lineHeight: 1,
              padding: "2px 4px", WebkitTapHighlightColor: "transparent",
            }}
            aria-label="Dismiss"
          >×</button>
        </div>
        <div style={{
          position: "absolute", bottom: "-7px", right: "22px",
          width: 0, height: 0,
          borderLeft: "7px solid transparent",
          borderRight: "3px solid transparent",
          borderTop: "7px solid #1d1820",
        }} />
      </div>

      <button
        className="chat-trigger"
        onClick={() => { engagedRef.current = true; setShowBubble(false); if (goodbyeTimerRef.current) clearTimeout(goodbyeTimerRef.current); if (open) { handleClose(); } else { setOpen(true); } }}
        aria-label={open ? "Close chat" : "Chat with us"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <CompassIcon />
        )}
      </button>
    </>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#" className="nav-logo">
          <LogoStar />
          Maui Air Tours
        </a>
        <ul className="nav-links">
          <li><a href="#routes">Routes</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#safety">Safety</a></li>
        </ul>
        <a href="#booking" className="nav-cta">Reserve Your Flight</a>
        <button className="nav-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`nav-mobile${mobileOpen ? " open" : ""}`}>
        <button className="nav-mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
        <a href="#routes" onClick={() => setMobileOpen(false)}>Routes</a>
        <a href="#experience" onClick={() => setMobileOpen(false)}>Experience</a>
        <a href="#safety" onClick={() => setMobileOpen(false)}>Safety</a>
        <a href="#booking" onClick={() => setMobileOpen(false)} style={{ color: "var(--gold)" }}>Reserve Your Flight</a>
      </div>
    </>
  );
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function HelicopterDemo() {
  useScrollReveal();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <Navbar />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">FAA Certified · Private Charters · Doors On or Off</div>
          <h1 className="hero-headline">
            Maui From<br /><em>3,000 Feet.</em>
          </h1>
          <p className="hero-sub">
            Private helicopter tours over Haleakalā, the Road to Hana,
            and the Nā Pali coastline. See what no road can reach.
          </p>
          <div className="hero-ctas">
            <a href="#booking" className="btn-primary">
              Reserve Your Flight
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#routes" className="btn-ghost">View Routes</a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2V14M3 9L8 14L13 9" stroke="rgba(245,244,240,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── Routes ── */}
      <section className="section-routes" id="routes">
        <div className="routes-header reveal">
          <div>
            <div className="section-eyebrow">Choose Your Flightpath</div>
            <h2 className="section-title">Three Routes.<br />One Island.</h2>
          </div>
          <p className="routes-note">All flights depart from Kahului Airport. Private charter available on request.</p>
        </div>
        <div className="routes-list">
          {[
            {
              num: "01",
              name: "Haleakalā Sunrise",
              desc: "Chase the sunrise above the clouds. Watch dawn break over the summit crater of Haleakalā — the House of the Sun — as Maui wakes below you. Our most-requested experience.",
              duration: "60 min",
              guests: "2–4 guests",
              departs: "6:15 AM",
              price: "$349",
            },
            {
              num: "02",
              name: "Road to Hana",
              desc: "The Road to Hana winds through 617 curves. From above, it's a ribbon of green cutting through ancient rainforest and black-sand beaches. No traffic required.",
              duration: "75 min",
              guests: "2–4 guests",
              departs: "9:00 AM",
              price: "$425",
            },
            {
              num: "03",
              name: "Full Island Circuit",
              desc: "West Maui Mountains, the Nā Pali sea cliffs, Haleakalā, Iao Valley, and the coral reefs of Molokini — all in one flight. The definitive aerial portrait of Maui.",
              duration: "90 min",
              guests: "2–4 guests",
              departs: "Flexible",
              price: "$499",
            },
          ].map((r, i) => (
            <div key={i} className={`route-card reveal reveal-delay-${i + 1}`}>
              <div className="route-num">{r.num}</div>
              <div className="route-info">
                <div className="route-name">{r.name}</div>
                <p className="route-desc">{r.desc}</p>
                <div className="route-meta">
                  <div className="route-meta-item">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M6.5 3.5V6.5L8.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {r.duration}
                  </div>
                  <div className="route-meta-item">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1C4.567 1 3 2.567 3 4.5C3 7.5 6.5 12 6.5 12C6.5 12 10 7.5 10 4.5C10 2.567 8.433 1 6.5 1Z" stroke="currentColor" strokeWidth="1.2"/>
                    </svg>
                    Kahului Airport
                  </div>
                  <div className="route-meta-item">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 9.5L6 7L8 8L11 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {r.guests}
                  </div>
                  <div className="route-meta-item">Departs {r.departs}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
                <div className="route-price">
                  <span className="route-price-label">From</span>
                  <span className="route-price-amount">{r.price}</span>
                  <span style={{ fontSize: "11px", color: "var(--muted)" }}>per person</span>
                </div>
                <div className="route-arrow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="section-experience" id="experience">
        <div className="experience-left">
          <div className="experience-eyebrow reveal">The Experience</div>
          <h2 className="experience-headline reveal reveal-delay-1">
            No road reaches<br />these places.<br /><em>No trail. Just sky.</em>
          </h2>
          <div className="experience-body reveal reveal-delay-2">
            <p>
              Maui's most extraordinary landscapes exist beyond every road. The waterfall-threaded cliffs of the West Maui Mountains. The raw volcanic floor of Haleakalā. The black-sand coves tucked between lava fields along the Hana coast.
            </p>
            <p>
              Our Bell 407 carries you directly over all of it — low and slow, windows sealed or wide open, with noise-canceling headsets and a pilot narrating every landmark. No tour buses. No crowds. Just you and the island from 3,000 feet.
            </p>
            <p>
              Most guests describe the silence after landing the same way: they don't have words for it. That's the one thing we can't explain in advance.
            </p>
          </div>
        </div>
        <div className="experience-right">
          <div className="experience-quote-mark">"</div>
          <blockquote className="experience-quote">
            I've flown over 40 countries. Nothing prepared me for Maui at 3,000 feet.
          </blockquote>
          <div className="experience-divider" />
          <div className="experience-attribution">
            <div className="experience-attrib-name">Captain Daniel Reeves</div>
            <div className="experience-attrib-title">Chief Pilot · 18 years · 4,200+ flights</div>
          </div>
        </div>
      </section>

      {/* ── Safety ── */}
      <section className="section-safety" id="safety">
        <div className="safety-header reveal">
          <div className="section-eyebrow">Safety & Credentials</div>
          <h2 className="section-title">Built on<br />4,200 flights.</h2>
        </div>
        <div className="safety-pillars">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2L4 5.5V10.5C4 14.5 7 18 11 19.5C15 18 18 14.5 18 10.5V5.5L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M8 11L10 13L14 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              stat: "FAA",
              statSuffix: "",
              label: "Part 135 Certified",
              sub: "Every aircraft and pilot certified under FAA Part 135 Air Carrier operations. Safety is not optional.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M3 14L8 9L11 12L15 7L19 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 18H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
              stat: "4,200",
              statSuffix: "+",
              label: "Flights Completed",
              sub: "Over a decade of aerial tours across Maui's most demanding terrain — without a single incident.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 3L19 7V15L11 19L3 15V7L11 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M11 3V19M3 7L19 15M19 7L3 15" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeLinejoin="round"/>
                </svg>
              ),
              stat: "Bell",
              statSuffix: " 407",
              label: "Doors On or Off",
              sub: "Our Bell 407 supports open-door flying for photographers and those who want nothing between them and the view.",
            },
          ].map((p, i) => (
            <div key={i} className={`safety-pillar reveal reveal-delay-${i + 1}`}>
              <div className="safety-pillar-icon">{p.icon}</div>
              <div className="safety-stat">{p.stat}<span>{p.statSuffix}</span></div>
              <div className="safety-label">{p.label}</div>
              <div className="safety-sub">{p.sub}</div>
            </div>
          ))}
        </div>
        <div className="pilot-strip reveal">
          <div className="pilot-avatar">DR</div>
          <div className="pilot-info">
            <div className="pilot-name">Captain Daniel Reeves</div>
            <div className="pilot-title">Chief Pilot, Maui Air Tours</div>
            <div className="pilot-creds">
              ATP Certificate · 6,800+ total flight hours · Commercial helicopter rating · Former search-and-rescue pilot, U.S. Coast Guard Auxiliary. Based on Maui since 2006.
            </div>
          </div>
          <div className="fleet-badge">
            <div className="fleet-badge-label">Our Fleet</div>
            <div className="fleet-badge-value">Bell 407</div>
            <div style={{ fontSize: "11px", color: "var(--muted)", textAlign: "right" }}>4 passengers certified<br />Noise-reducing headsets</div>
          </div>
        </div>
      </section>

      {/* ── Reserve CTA ── */}
      <section className="section-reserve" id="booking">
        <div className="reserve-content">
          <div className="reserve-eyebrow reveal">Limited Seats Daily</div>
          <h2 className="reserve-headline reveal reveal-delay-1">
            Private charters<br />available now.
          </h2>
          <p className="reserve-sub reveal reveal-delay-2">
            Book early — sunrise slots fill weeks out. Our team will confirm your flight and send a full pre-flight brief within 24 hours.
          </p>
          <div className="reserve-ctas reveal reveal-delay-3">
            <a href="#booking" className="btn-reserve">
              Reserve Your Flight
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="tel:+18085550192" className="btn-call">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2.5C2 2.5 2 4 4 6C6 8 8 9.5 11.5 11.5C11.5 11.5 12 11 12 10C12 9 11 8.5 10 8C9 7.5 8.5 7 8.5 7C8.5 7 8 7.5 7.5 7.5C7 7.5 5 5.5 5 5C5 4.5 5.5 4 5.5 4C5.5 4 5 3.5 4.5 2.5C4 1.5 2.5 1 2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              (808) 555-0192
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-left">
          <div className="footer-brand">✦ Maui Air Tours</div>
          <div className="footer-location">Kahului Airport · OGG · Maui, HI 96732</div>
        </div>
        <div className="footer-copy">© 2025 Maui Air Tours. All rights reserved.</div>
        <a href="/" className="footer-soul">Powered by <span>Soul AI</span></a>
      </footer>

      {/* ── Chat Widget ── */}
      <ErrorBoundary>
        <ChatWidget />
      </ErrorBoundary>
    </>
  );
}
