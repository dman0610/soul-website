"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function FloatingPaths({ position, paused }: { position: number; paused: boolean }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    // Deterministic color cycling — no Math.random() (avoids SSR hydration mismatch)
    stroke:
      i % 3 === 0
        ? `rgba(196,98,10,${0.12 + i * 0.008})`
        : i % 3 === 1
        ? `rgba(42,152,152,${0.08 + i * 0.006})`
        : `rgba(245,245,240,${0.04 + i * 0.003})`,
    // Deterministic duration based on index
    duration: 20 + (i % 5) * 3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.stroke}
            strokeWidth={path.width}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={paused ? { pathLength: 0.3, opacity: 0.5 } : {
              pathLength: 1,
              opacity: [0.3, 0.65, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: paused ? 0 : Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title = "Never Miss A Booking",
}: {
  title?: string;
}) {
  const words = title.split(" ");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "clip",
        background:
          "radial-gradient(ellipse at 25% 60%, rgba(196,98,10,0.09) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(42,152,152,0.06) 0%, transparent 50%), #060810",
      }}
    >
      {/* Animated path layers */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} paused={!visible} />
        <FloatingPaths position={-1} paused={!visible} />
      </div>

      {/* Top edge fade from hero */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, #060810, transparent)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Bottom edge fade into next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to top, #060810, transparent)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "4px 13px",
              borderRadius: "100px",
              marginBottom: "28px",
              border: "1px solid rgba(196,98,10,0.22)",
              background: "rgba(196,98,10,0.06)",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#c4620a",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "11.5px",
                color: "#e08820",
                letterSpacing: "0.08em",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              Always On
            </span>
          </motion.div>

          {/* Animated headline */}
          <h1
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 800,
              fontSize: "clamp(2.6rem, 7vw, 6.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "32px",
            }}
          >
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                style={{ display: "inline-block", marginRight: "0.28em" }}
              >
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.4 + wordIndex * 0.14 + letterIndex * 0.04,
                      type: "spring",
                      stiffness: 140,
                      damping: 22,
                    }}
                    style={{
                      display: "inline-block",
                      background:
                        wordIndex === words.length - 1
                          ? "linear-gradient(135deg, #e08820 0%, #c4620a 100%)"
                          : "linear-gradient(180deg, #f5f5f0 0%, rgba(245,245,240,0.75) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
              color: "#8a8a9a",
              maxWidth: "500px",
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Your AI handles every inquiry the moment it arrives — midnight,
            sunrise, or peak season rush.
          </motion.p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "1px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(196,98,10,0.55), rgba(42,152,152,0.35))",
              }}
            >
              <a
                href="/#demos"
                onClick={e => {
                  const el = document.getElementById('demos');
                  if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "13px 30px",
                  borderRadius: "13px",
                  background: "#141828",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#f5f5f0",
                  textDecoration: "none",
                  WebkitTapHighlightColor: "transparent",
                  transition:
                    "transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease",
                  minWidth: "44px",
                  minHeight: "44px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 32px rgba(196,98,10,0.28)";
                  e.currentTarget.style.backgroundColor = "#1c2236";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.backgroundColor = "#141828";
                }}
              >
                <span>See It In Action</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  style={{ opacity: 0.7, display: "inline-block" }}
                >
                  →
                </motion.span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
