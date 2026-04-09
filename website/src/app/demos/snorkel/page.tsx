"use client";

import { useState, useEffect, useRef } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";

/* ─── Light Ray Animation ─────────────────────────────────────────── */
const lightRayCSS = `
  @keyframes rayDrift {
    0%   { opacity: 0.03; transform: skewX(-12deg) translateX(-8px); }
    50%  { opacity: 0.11; transform: skewX(-12deg) translateX(4px); }
    100% { opacity: 0.03; transform: skewX(-12deg) translateX(-8px); }
  }
  @keyframes rayDriftSlow {
    0%   { opacity: 0.05; transform: skewX(-8deg) translateX(6px); }
    50%  { opacity: 0.14; transform: skewX(-8deg) translateX(-4px); }
    100% { opacity: 0.05; transform: skewX(-8deg) translateX(6px); }
  }
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes chatPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(42,152,152,0.5); }
    50%       { box-shadow: 0 0 0 14px rgba(42,152,152,0); }
  }
  @keyframes waveFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }
  @keyframes msgSlideIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* ─── Navbar ──────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: scrolled ? "rgba(10,22,40,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      transition: "background-color 350ms ease, border-color 350ms ease",
    }}>

      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px",
      }}>
        {/* Logo */}
        <a href="/demos/snorkel" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", WebkitTapHighlightColor: "transparent" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="Maui Snorkel Co logo">
            <circle cx="16" cy="16" r="16" fill="#0d3348" />
            <ellipse cx="16" cy="19" rx="7" ry="5" stroke="#2a9898" strokeWidth="1.5" fill="none" />
            <circle cx="16" cy="13" r="4" fill="#2a9898" opacity="0.9" />
            <path d="M12 10 Q16 7 20 10" stroke="#f5f5f0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </svg>
          <span style={{
            fontFamily: "var(--font-outfit)", fontWeight: 700, fontSize: "20px",
            color: "#f5f5f0", letterSpacing: "-0.02em",
          }}>
            Maui Snorkel Co.
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "32px" }}>
          {[
            { label: "Tours", href: "#tours" },
            { label: "What's Included", href: "#included" },
            { label: "Reviews", href: "#reviews" },
          ].map(({ label, href }) => (
            <a key={href} href={href} style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "rgba(245,245,240,0.7)",
              textDecoration: "none", WebkitTapHighlightColor: "transparent",
              transition: "color 150ms ease",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,245,240,0.7)"}
            >
              {label}
            </a>
          ))}
          <a href="#booking" style={{
            fontFamily: "var(--font-outfit)", fontWeight: 600, fontSize: "14px",
            color: "#0a1628", textDecoration: "none", padding: "9px 22px",
            borderRadius: "100px", background: "#2a9898", minHeight: "44px",
            display: "inline-flex", alignItems: "center",
            WebkitTapHighlightColor: "transparent",
            transition: "background-color 200ms ease, transform 200ms ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#3ab8b8"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2a9898"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >
            Book Your Adventure
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(v => !v)}
          style={{
            background: "none", border: "none", color: "#f5f5f0", cursor: "pointer",
            padding: "10px", WebkitTapHighlightColor: "transparent",
            minWidth: "44px", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center",
          }}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{
        maxHeight: mobileOpen ? "260px" : "0",
        overflow: "hidden",
        transition: "max-height 300ms ease",
        background: "rgba(10,22,40,0.97)",
        borderTop: mobileOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}>
        <div style={{ padding: "16px 24px 20px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {["Tours|#tours", "What's Included|#included", "Reviews|#reviews"].map(item => {
            const [label, href] = item.split("|");
            return (
              <a key={href} href={href} onClick={() => setMobileOpen(false)} style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", color: "rgba(245,245,240,0.8)", textDecoration: "none", minHeight: "44px", display: "flex", alignItems: "center", WebkitTapHighlightColor: "transparent" }}>{label}</a>
            );
          })}
          <a href="#booking" onClick={() => setMobileOpen(false)} style={{ fontFamily: "var(--font-outfit)", fontWeight: 600, fontSize: "15px", color: "#0a1628", textDecoration: "none", padding: "12px 22px", borderRadius: "100px", background: "#2a9898", display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "44px", WebkitTapHighlightColor: "transparent", marginTop: "8px" }}>Book Your Adventure</a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section style={{
      position: "relative", minHeight: "100dvh", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* Hero image */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url(/snorkel-hero.png)",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundAttachment: "scroll",
      }} />

      {/* Depth gradient overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to bottom, rgba(10,22,40,0.52) 0%, rgba(10,22,40,0.2) 40%, rgba(10,22,40,0.55) 75%, rgba(10,22,40,0.92) 100%)",
      }} />

      {/* Light rays */}
      {[
        { left: "18%", width: "90px", delay: "0s", dur: "6s", anim: "rayDrift" },
        { left: "32%", width: "60px", delay: "1.2s", dur: "8s", anim: "rayDriftSlow" },
        { left: "48%", width: "110px", delay: "0.5s", dur: "7s", anim: "rayDrift" },
        { left: "61%", width: "75px", delay: "2s", dur: "9s", anim: "rayDriftSlow" },
        { left: "76%", width: "85px", delay: "0.8s", dur: "6.5s", anim: "rayDrift" },
      ].map((ray, i) => (
        <div key={i} style={{
          position: "absolute", top: 0, left: ray.left,
          width: ray.width, height: "70%",
          background: "linear-gradient(to bottom, rgba(180,230,255,0.18) 0%, rgba(100,200,220,0.06) 60%, transparent 100%)",
          transform: `skewX(-12deg)`,
          animation: `${ray.anim} ${ray.dur} ease-in-out ${ray.delay} infinite`,
          pointerEvents: "none", zIndex: 2,
          filter: "blur(8px)",
        }} />
      ))}

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 10, textAlign: "center",
        padding: "0 24px", maxWidth: "820px", margin: "0 auto",
      }}>
        {/* Trust badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "5px 14px", borderRadius: "100px", marginBottom: "28px",
          border: "1px solid rgba(42,152,152,0.35)", background: "rgba(42,152,152,0.12)",
          backdropFilter: "blur(8px)",
          animation: "heroFadeUp 0.8s ease 0.2s both",
        }}>
          <span style={{ color: "#fbbf24", fontSize: "13px", letterSpacing: "1px" }}>★★★★★</span>
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "rgba(245,245,240,0.85)", letterSpacing: "0.04em" }}>
            500+ Five-Star Tours
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--font-outfit)", fontWeight: 800,
          fontSize: "clamp(2.8rem, 8vw, 7rem)",
          letterSpacing: "-0.03em", lineHeight: 1.0,
          color: "#f5f5f0",
          margin: "0 0 20px",
          animation: "heroFadeUp 0.9s ease 0.35s both",
          textShadow: "0 2px 30px rgba(0,0,0,0.5)",
        }}>
          See Maui<br />
          <span style={{
            background: "linear-gradient(135deg, #4dd4d4 0%, #2a9898 60%, #1a7070 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            From Below.
          </span>
        </h1>

        {/* Subhead */}
        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: "rgba(245,245,240,0.82)", lineHeight: 1.65,
          maxWidth: "520px", margin: "0 auto 36px",
          animation: "heroFadeUp 0.9s ease 0.5s both",
        }}>
          Snorkel tours departing daily from Kihei Boat Ramp.<br />
          Gear included. All skill levels welcome.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap",
          animation: "heroFadeUp 0.9s ease 0.65s both",
        }}>
          <a href="#booking" style={{
            fontFamily: "var(--font-outfit)", fontWeight: 700, fontSize: "16px",
            color: "#0a1628", textDecoration: "none", padding: "15px 34px",
            borderRadius: "100px", background: "#2a9898",
            WebkitTapHighlightColor: "transparent", minHeight: "44px",
            display: "inline-flex", alignItems: "center",
            boxShadow: "0 4px 24px rgba(42,152,152,0.45)",
            transition: "background-color 200ms ease, transform 200ms ease, box-shadow 200ms ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#3ab8b8"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(42,152,152,0.55)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2a9898"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px rgba(42,152,152,0.45)"; }}
          >
            Book Your Adventure
          </a>
          <a href="#tours" style={{
            fontFamily: "var(--font-outfit)", fontWeight: 600, fontSize: "16px",
            color: "#f5f5f0", textDecoration: "none", padding: "15px 34px",
            borderRadius: "100px", border: "1.5px solid rgba(245,245,240,0.3)",
            background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)",
            WebkitTapHighlightColor: "transparent", minHeight: "44px",
            display: "inline-flex", alignItems: "center",
            transition: "border-color 200ms ease, background-color 200ms ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,240,0.6)"; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,240,0.3)"; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.06)"; }}
          >
            View Tours
          </a>
        </div>

        {/* Trust row */}
        <div style={{
          display: "flex", gap: "28px", justifyContent: "center", flexWrap: "wrap",
          marginTop: "40px",
          animation: "heroFadeUp 0.9s ease 0.8s both",
        }}>
          {["🐢  Sea Turtles Guaranteed*", "🤿  All Gear Included", "📍  Kihei Boat Ramp"].map(item => (
            <span key={item} style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "13px",
              color: "rgba(245,245,240,0.65)", letterSpacing: "0.02em",
            }}>{item}</span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
        zIndex: 10, animation: "waveFloat 2.5s ease-in-out infinite",
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(245,245,240,0.45)" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

/* ─── Tours ───────────────────────────────────────────────────────── */
function ToursSection() {
  const tours = [
    {
      name: "Morning Snorkel",
      emoji: "🌊",
      tagline: "The classic Maui experience.",
      desc: "Depart at 7:00 AM or 9:30 AM from Kihei Boat Ramp. Two prime reef sites, abundant sea life, and calm morning waters. Perfect for families and first-timers.",
      price: "$79",
      unit: "/ person",
      duration: "3 hours",
      group: "Up to 12 guests",
      departures: "Daily · 7:00 AM & 9:30 AM",
      highlight: false,
    },
    {
      name: "Sunset Cruise",
      emoji: "🌅",
      tagline: "Golden hour on the water.",
      desc: "Set sail as the sun dips toward Lānaʻi. Snorkel at Molokini Crater, then drift back watching the sky turn amber. Drinks and light snacks included.",
      price: "$99",
      unit: "/ person",
      duration: "2.5 hours",
      group: "Up to 16 guests",
      departures: "Daily · 4:30 PM",
      highlight: true,
    },
    {
      name: "Private Charter",
      emoji: "⚓",
      tagline: "Your boat, your schedule.",
      desc: "Book the entire vessel for your group. Choose your sites, set your pace. Ideal for proposals, family reunions, or anyone who doesn't want to share.",
      price: "$599",
      unit: "/ boat",
      duration: "4 hours",
      group: "Up to 6 guests",
      departures: "By request · Any time",
      highlight: false,
    },
  ];

  return (
    <section id="tours" style={{
      background: "linear-gradient(to bottom, #0a1628, #0d2540)",
      padding: "96px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "400px",
        background: "radial-gradient(ellipse, rgba(42,152,152,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "4px 14px", borderRadius: "100px", marginBottom: "16px",
            border: "1px solid rgba(42,152,152,0.25)", background: "rgba(42,152,152,0.07)",
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2a9898", display: "inline-block" }} />
            <span style={{ fontSize: "11.5px", color: "#2a9898", letterSpacing: "0.08em", fontFamily: "var(--font-dm-sans)", fontWeight: 500, textTransform: "uppercase" as const }}>
              Choose Your Adventure
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-outfit)", fontWeight: 800,
            fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
            letterSpacing: "-0.03em", lineHeight: 1.1, color: "#f5f5f0", margin: 0,
          }}>
            Three ways to see<br />the reef.
          </h2>
        </div>

        {/* Tour cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px",
        }}>
          {tours.map((tour) => (
            <div key={tour.name} style={{
              position: "relative",
              background: tour.highlight ? "linear-gradient(145deg, #0d3348, #0f3f58)" : "#0d1f35",
              border: tour.highlight ? "1px solid rgba(42,152,152,0.35)" : "1px solid rgba(255,255,255,0.07)",
              borderRadius: "20px", padding: "32px",
              boxShadow: tour.highlight ? "0 0 40px rgba(42,152,152,0.12), 0 20px 40px rgba(0,0,0,0.3)" : "0 20px 40px rgba(0,0,0,0.2)",
              transition: "transform 250ms ease, box-shadow 250ms ease",
              cursor: "default",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = tour.highlight ? "0 0 50px rgba(42,152,152,0.18), 0 28px 48px rgba(0,0,0,0.35)" : "0 28px 48px rgba(0,0,0,0.3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = tour.highlight ? "0 0 40px rgba(42,152,152,0.12), 0 20px 40px rgba(0,0,0,0.3)" : "0 20px 40px rgba(0,0,0,0.2)"; }}
            >
              {tour.highlight && (
                <div style={{
                  position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)",
                  background: "#2a9898", color: "#0a1628", fontFamily: "var(--font-outfit)",
                  fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em",
                  padding: "4px 14px", borderRadius: "0 0 10px 10px", textTransform: "uppercase" as const,
                }}>
                  Most Popular
                </div>
              )}
              <div style={{ fontSize: "2.2rem", marginBottom: "16px" }}>{tour.emoji}</div>
              <h3 style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, fontSize: "1.4rem", color: "#f5f5f0", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                {tour.name}
              </h3>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#2a9898", margin: "0 0 14px", fontWeight: 500 }}>
                {tour.tagline}
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "#8a9aaa", lineHeight: 1.65, margin: "0 0 24px" }}>
                {tour.desc}
              </p>

              {/* Details */}
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px", marginBottom: "28px" }}>
                {[
                  { icon: "⏱", label: tour.duration },
                  { icon: "👥", label: tour.group },
                  { icon: "📅", label: tour.departures },
                ].map(({ icon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "14px", opacity: 0.7 }}>{icon}</span>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "rgba(245,245,240,0.65)" }}>{label}</span>
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "20px" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-outfit)", fontWeight: 800, fontSize: "2rem", color: "#f5f5f0", letterSpacing: "-0.03em" }}>
                    {tour.price}
                  </span>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8a9aaa", marginLeft: "4px" }}>
                    {tour.unit}
                  </span>
                </div>
                <a href="#booking" style={{
                  fontFamily: "var(--font-outfit)", fontWeight: 600, fontSize: "14px",
                  color: tour.highlight ? "#0a1628" : "#f5f5f0",
                  background: tour.highlight ? "#2a9898" : "rgba(42,152,152,0.15)",
                  border: tour.highlight ? "none" : "1px solid rgba(42,152,152,0.3)",
                  textDecoration: "none", padding: "10px 20px",
                  borderRadius: "100px", minHeight: "44px",
                  display: "inline-flex", alignItems: "center",
                  WebkitTapHighlightColor: "transparent",
                  transition: "background-color 200ms ease, transform 150ms ease",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── What's Included ─────────────────────────────────────────────── */
function IncludedSection() {
  const items = [
    { icon: "🤿", title: "Full Snorkel Gear", desc: "Masks, fins, snorkels, and wetsuits for every guest. Premium equipment, cleaned between every tour." },
    { icon: "🐠", title: "Expert Guides", desc: "Our certified marine naturalists know every reef, every turtle route, and every hidden spot." },
    { icon: "📸", title: "Underwater Photos", desc: "Our guides capture the magic. Download your photos same day — no extra charge." },
    { icon: "🥤", title: "Drinks & Snacks", desc: "Fresh water, Gatorade, and light snacks on board. Sunset tours include beer, wine, and pupus." },
  ];

  return (
    <section id="included" style={{
      background: "#0a1628",
      padding: "96px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative wave line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(to right, transparent, rgba(42,152,152,0.3), transparent)",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Asymmetric layout: headline left, items right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "60px",
          alignItems: "start",
        }}>
          {/* Left: headline block */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "4px 14px", borderRadius: "100px", marginBottom: "20px",
              border: "1px solid rgba(42,152,152,0.25)", background: "rgba(42,152,152,0.07)",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2a9898", display: "inline-block" }} />
              <span style={{ fontSize: "11.5px", color: "#2a9898", letterSpacing: "0.08em", fontFamily: "var(--font-dm-sans)", fontWeight: 500, textTransform: "uppercase" as const }}>
                Everything Included
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-outfit)", fontWeight: 800,
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              letterSpacing: "-0.03em", lineHeight: 1.1, color: "#f5f5f0",
              margin: "0 0 20px",
            }}>
              Show up.<br />We handle<br />the rest.
            </h2>
            <p style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "15px",
              color: "#8a9aaa", lineHeight: 1.7, maxWidth: "340px",
            }}>
              No gear to rent. No extras to buy. Just bring sunscreen and your sense of adventure.
            </p>
            <div style={{
              marginTop: "32px",
              padding: "20px 24px",
              background: "rgba(42,152,152,0.07)",
              border: "1px solid rgba(42,152,152,0.15)",
              borderRadius: "14px",
              borderLeft: "3px solid #2a9898",
            }}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "rgba(245,245,240,0.75)", lineHeight: 1.65, margin: 0 }}>
                <em>&ldquo;We saw four green sea turtles on the morning tour. The guides knew exactly where to find them. My kids still talk about it.&rdquo;</em>
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "#2a9898", margin: "10px 0 0", fontWeight: 600 }}>
                — Kealani M., Lahaina
              </p>
            </div>
          </div>

          {/* Right: 2×2 icon grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {items.map((item) => (
              <div key={item.title} style={{
                background: "#0d1f35",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px", padding: "24px",
                transition: "border-color 250ms ease, transform 250ms ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(42,152,152,0.25)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "12px" }}>{item.icon}</div>
                <h4 style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, fontSize: "1rem", color: "#f5f5f0", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                  {item.title}
                </h4>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8a9aaa", lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Reviews ─────────────────────────────────────────────────────── */
function ReviewsSection() {
  const reviews = [
    {
      name: "Nalani K.",
      location: "Kihei, Maui",
      stars: 5,
      date: "March 2026",
      text: "We booked the morning snorkel for my husband's birthday and it was absolutely magical. We swam with three green sea turtles and a reef shark passed underneath us — the guide was so calm about it which helped us stay calm too. Underwater photos came out incredible. Already planning to go back.",
    },
    {
      name: "Marcus & Jen T.",
      location: "Seattle, WA",
      stars: 5,
      date: "February 2026",
      text: "First time snorkeling — both of us were nervous. The guides were incredibly patient and had us comfortable in the water within minutes. The gear fit perfectly and the reef was stunning. We saw a whole family of spinner dolphins on the way back. Genuinely one of the best things we've ever done on a vacation.",
    },
    {
      name: "Priya S.",
      location: "San Francisco, CA",
      stars: 5,
      date: "January 2026",
      text: "Sunset cruise was worth every penny. Molokini Crater is otherworldly — the clarity of the water, the colors of the fish, I felt like I was inside a nature documentary. The wine and snacks on the way back with that sky? Perfect end to a perfect trip. Book this. Don't think about it.",
    },
  ];

  return (
    <section id="reviews" style={{
      background: "linear-gradient(to bottom, #0a1628, #0d2540)",
      padding: "96px 24px",
      position: "relative",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "4px 14px", borderRadius: "100px", marginBottom: "16px",
            border: "1px solid rgba(42,152,152,0.25)", background: "rgba(42,152,152,0.07)",
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2a9898", display: "inline-block" }} />
            <span style={{ fontSize: "11.5px", color: "#2a9898", letterSpacing: "0.08em", fontFamily: "var(--font-dm-sans)", fontWeight: 500, textTransform: "uppercase" as const }}>
              Real Guests
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-outfit)", fontWeight: 800,
            fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
            letterSpacing: "-0.03em", lineHeight: 1.1, color: "#f5f5f0", margin: "0 0 8px",
          }}>
            They came for the reef.
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", color: "#8a9aaa" }}>
            They stayed for the turtles.
          </p>
        </div>

        {/* Review cards — staggered grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px",
        }}>
          {reviews.map((r, i) => (
            <div key={r.name} style={{
              background: "#0d1f35",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "20px", padding: "28px 28px 24px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
              transform: i === 1 ? "translateY(0)" : undefined,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, fontSize: "15px", color: "#f5f5f0", margin: "0 0 2px" }}>{r.name}</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "#8a9aaa", margin: 0 }}>{r.location} · {r.date}</p>
                </div>
                <span style={{ color: "#fbbf24", fontSize: "13px", letterSpacing: "1px" }}>
                  {"★".repeat(r.stars)}
                </span>
              </div>
              <p style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "14px",
                color: "rgba(245,245,240,0.75)", lineHeight: 1.7, margin: 0,
              }}>
                &ldquo;{r.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Aggregate trust bar */}
        <div style={{
          marginTop: "48px", textAlign: "center",
          display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap",
        }}>
          {[
            { num: "500+", label: "Five-Star Tours" },
            { num: "4.97", label: "Average Rating" },
            { num: "8 yrs", label: "On the Water" },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-outfit)", fontWeight: 800, fontSize: "2rem", color: "#2a9898", letterSpacing: "-0.03em" }}>
                {num}
              </div>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8a9aaa", marginTop: "2px" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Booking CTA ─────────────────────────────────────────────────── */
function BookingSection() {
  return (
    <section id="booking" style={{
      background: "#0a1628",
      padding: "96px 24px",
      position: "relative", overflow: "hidden", textAlign: "center",
    }}>
      {/* Teal glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(42,152,152,0.12) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "var(--font-outfit)", fontWeight: 800,
          fontSize: "clamp(2rem, 5vw, 4rem)",
          letterSpacing: "-0.03em", lineHeight: 1.05,
          color: "#f5f5f0", margin: "0 0 16px",
        }}>
          Ready to go?
        </h2>
        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
          color: "#8a9aaa", lineHeight: 1.7, margin: "0 auto 36px", maxWidth: "480px",
        }}>
          Tours depart daily. Spots fill fast in season. Questions? Ask our AI assistant — it knows everything.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="tel:+18085550123" style={{
            fontFamily: "var(--font-outfit)", fontWeight: 700, fontSize: "16px",
            color: "#0a1628", textDecoration: "none", padding: "15px 36px",
            borderRadius: "100px", background: "#2a9898",
            boxShadow: "0 4px 24px rgba(42,152,152,0.4)",
            WebkitTapHighlightColor: "transparent", minHeight: "44px",
            display: "inline-flex", alignItems: "center", gap: "8px",
            transition: "background-color 200ms ease, transform 200ms ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#3ab8b8"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2a9898"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >
            <span>📞</span> Call (808) 555-0123
          </a>
          <a href="mailto:aloha@mauisnorkelco.com" style={{
            fontFamily: "var(--font-outfit)", fontWeight: 600, fontSize: "16px",
            color: "#f5f5f0", textDecoration: "none", padding: "15px 36px",
            borderRadius: "100px", border: "1.5px solid rgba(42,152,152,0.4)",
            background: "rgba(42,152,152,0.08)",
            WebkitTapHighlightColor: "transparent", minHeight: "44px",
            display: "inline-flex", alignItems: "center", gap: "8px",
            transition: "border-color 200ms ease, background-color 200ms ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(42,152,152,0.7)"; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(42,152,152,0.14)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(42,152,152,0.4)"; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(42,152,152,0.08)"; }}
          >
            <span>✉️</span> Email Us
          </a>
        </div>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "#7a8a9a", marginTop: "20px" }}>
          *Sea turtle sightings based on 94% of morning tours, March–November.
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      background: "#060e1a",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "32px 24px",
      textAlign: "center",
    }}>
      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#7a8a9a", margin: 0 }}>
        © 2026 Maui Snorkel Co. · Kihei Boat Ramp, Maui, HI · Aloha.
      </p>
      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "#6a7a8a", marginTop: "6px" }}>
        Powered by{" "}
        <a href="/" style={{ color: "rgba(196,98,10,0.7)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(196,98,10,1)"}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(196,98,10,0.7)"}
        >Soul AI</a>
      </p>
    </footer>
  );
}

/* ─── Chat Widget ─────────────────────────────────────────────────── */
const SNORKEL_FAQ = [
  { q: "What time do tours start?", a: "Morning tours depart at 7:00 AM and 9:30 AM daily. Sunset tour at 4:30 PM. All depart from Kihei Boat Ramp." },
  { q: "What gear is included?", a: "Everything — masks, fins, snorkels, wetsuits, and flotation vests. Just bring reef-safe sunscreen and a towel." },
  { q: "How much does it cost?", a: "$89/person for adults, $65 for kids under 12. All gear, instruction, and a light breakfast included." },
  { q: "Where do we meet?", a: "Kihei Boat Ramp — 2 Kaonoulu St, Kihei, HI 96753. Free parking right there." },
];

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [mode, setMode] = useState<"live" | "faq">("faq");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [history, setHistory] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Aloha! I'm Kai, your Maui Snorkel Co. assistant. Ask me anything about tours, gear, or availability." },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check Claude API status on mount — upgrades to live when ANTHROPIC_API_KEY is set
  useEffect(() => {
    fetch("/api/chat/snorkel")
      .then(r => r.json())
      .then(d => { if (d.live) setMode("live"); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 4000);
    const t2 = setTimeout(() => setPulse(false), 6500);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (mode === "live") messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, mode]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;
    setMessages(prev => [...prev, { from: "user", text }]);
    setInput("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat/snorkel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      const reply = data.reply ?? "Let me connect you with our team — call us at (808) 555-0121.";
      setMessages(prev => [...prev, { from: "bot", text: reply }]);
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

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div style={{
          position: "fixed", bottom: "92px", right: "24px",
          width: "min(360px, calc(100vw - 48px))",
          background: "#0d2540",
          border: "1px solid rgba(42,152,152,0.25)",
          borderRadius: "20px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(42,152,152,0.1)",
          zIndex: 49, overflow: "hidden",
          display: "flex", flexDirection: "column" as const,
          animation: "chatSlideIn 300ms ease both",
        }}>
          {/* Header */}
          <div style={{
            padding: "16px 20px",
            background: "linear-gradient(135deg, #0d3348, #0f3f58)",
            borderBottom: "1px solid rgba(42,152,152,0.15)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(42,152,152,0.2)", border: "1px solid rgba(42,152,152,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
              }}>🏖️</div>
              <div>
                <div style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, fontSize: "14px", color: "#f5f5f0" }}>Kai · Maui Snorkel Co.</div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: mode === "live" ? "#4ade80" : "#8a9aaa", display: "inline-block" }} />
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "#8a9aaa" }}>
                    {mode === "live" ? "Online now" : "Setting up — quick answers below"}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{
              background: "none", border: "none", cursor: "pointer", color: "#8a9aaa",
              padding: "6px", borderRadius: "6px", WebkitTapHighlightColor: "transparent",
              minWidth: "32px", minHeight: "32px", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* FAQ Mode */}
          {mode === "faq" && (
            <div style={{
              flex: 1, overflowY: "auto" as const, padding: "16px",
              display: "flex", flexDirection: "column" as const, gap: "8px", maxHeight: "400px",
              scrollbarWidth: "thin" as const,
            }}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8a9aaa", margin: "0 0 6px", lineHeight: 1.5 }}>
                Our AI assistant is getting set up. Quick answers:
              </p>
              {SNORKEL_FAQ.map((item, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: expandedFaq === i ? "1px solid rgba(42,152,152,0.4)" : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px", overflow: "hidden", transition: "border-color 150ms ease",
                }}>
                  <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} style={{
                    width: "100%", textAlign: "left" as const, background: "none", border: "none",
                    padding: "12px 14px", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px",
                    WebkitTapHighlightColor: "transparent",
                  }}>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#f5f5f0", fontWeight: 500, lineHeight: 1.4 }}>{item.q}</span>
                    <svg width="14" height="14" fill="none" stroke="#8a9aaa" viewBox="0 0 24 24" style={{ flexShrink: 0, transform: expandedFaq === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms ease" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFaq === i && (
                    <div style={{ padding: "0 14px 12px", fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#8ab8c8", lineHeight: 1.6 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
              <a href="tel:+18085550121" style={{
                display: "block", textAlign: "center" as const, marginTop: "8px",
                padding: "12px 16px", borderRadius: "12px",
                background: "#2a9898", color: "#f5f5f0",
                fontFamily: "var(--font-dm-sans)", fontSize: "13.5px", fontWeight: 600,
                textDecoration: "none", WebkitTapHighlightColor: "transparent",
                transition: "background-color 150ms ease",
              }}>
                Call Us: (808) 555-0121 →
              </a>
            </div>
          )}

          {/* Live Chat Mode */}
          {mode === "live" && (
            <>
              <div style={{ padding: "16px 16px 8px", display: "flex", flexDirection: "column" as const, gap: "10px", maxHeight: "280px", overflowY: "auto" as const, scrollbarWidth: "thin" as const }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{
                      maxWidth: "82%", padding: "10px 14px",
                      borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.from === "user" ? "#2a9898" : "#1a3550",
                      color: msg.from === "user" ? "#0a1628" : "rgba(245,245,240,0.88)",
                      fontFamily: "var(--font-dm-sans)", fontSize: "13px", lineHeight: 1.55,
                      fontWeight: msg.from === "user" ? 600 : 400,
                    }}>{msg.text}</div>
                  </div>
                ))}
                {isLoading && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ padding: "10px 16px", borderRadius: "16px 16px 16px 4px", background: "#1a3550", display: "flex", gap: "4px", alignItems: "center" }}>
                      {[0, 160, 320].map(delay => (
                        <span key={delay} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2a9898", display: "inline-block", animation: `fadeInUp 600ms ease ${delay}ms infinite alternate` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div style={{ padding: "12px 16px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", background: "#1a3550", borderRadius: "12px", padding: "8px 8px 8px 14px", border: "1px solid rgba(42,152,152,0.15)" }}>
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
                    placeholder="Ask about tours, gear, availability…"
                    disabled={isLoading}
                    style={{ flex: 1, background: "none", border: "none", outline: "none", fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#f5f5f0", minHeight: "44px" }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    style={{
                      background: input.trim() && !isLoading ? "#2a9898" : "rgba(42,152,152,0.3)",
                      border: "none", borderRadius: "8px", width: "36px", height: "36px",
                      cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, WebkitTapHighlightColor: "transparent",
                      transition: "background-color 150ms ease",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a1628" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 50,
          width: "56px", height: "56px", borderRadius: "50%",
          background: "linear-gradient(135deg, #2a9898, #1a7070)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(42,152,152,0.45)",
          animation: pulse ? "chatPulse 0.9s ease 2" : "none",
          WebkitTapHighlightColor: "transparent",
          transition: "transform 200ms ease, box-shadow 200ms ease",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 28px rgba(42,152,152,0.6)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(42,152,152,0.45)"; }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5f5f0" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f5f5f0" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */
export default function SnorkelPage() {
  return (
    <>
      <style>{lightRayCSS}</style>
      <main style={{ background: "#0a1628", overflowX: "hidden" }}>
        <Navbar />
        <HeroSection />
        <ToursSection />
        <IncludedSection />
        <ReviewsSection />
        <BookingSection />
        <Footer />
        <ErrorBoundary>
          <ChatWidget />
        </ErrorBoundary>
      </main>
    </>
  );
}
