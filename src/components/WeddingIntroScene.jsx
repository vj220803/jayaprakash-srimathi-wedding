import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Inauguration Golden Glitter Sprinkle particles (bursts gently along the parting seam)
const GLITTER_PARTICLES = [
  // Upper zone
  { id: 1, type: "star", top: "18%", targetX: -90, targetY: 35, rot: -45, scale: 1.1, delay: 0 },
  { id: 2, type: "speck", top: "22%", targetX: 100, targetY: 50, rot: 30, scale: 0.95, delay: 1.5 },
  { id: 3, type: "star", top: "26%", targetX: -65, targetY: 65, rot: 50, scale: 1.0, delay: 3 },
  { id: 4, type: "speck", top: "30%", targetX: 80, targetY: 30, rot: -20, scale: 1.15, delay: 2 },
  // Middle zone (around title & lotus)
  { id: 5, type: "star", top: "36%", targetX: -115, targetY: 45, rot: -65, scale: 1.2, delay: 2.5 },
  { id: 6, type: "speck", top: "40%", targetX: 125, targetY: 60, rot: 40, scale: 1.05, delay: 3.5 },
  { id: 7, type: "star", top: "44%", targetX: -85, targetY: 75, rot: 25, scale: 0.95, delay: 4 },
  { id: 8, type: "speck", top: "48%", targetX: 90, targetY: 40, rot: -35, scale: 1.0, delay: 3 },
  { id: 9, type: "star", top: "52%", targetX: 110, targetY: 65, rot: 55, scale: 1.1, delay: 4.5 },
  { id: 10, type: "speck", top: "56%", targetX: -100, targetY: 70, rot: -45, scale: 0.9, delay: 5 },
  // Lower middle zone
  { id: 11, type: "star", top: "62%", targetX: -120, targetY: 55, rot: -30, scale: 1.05, delay: 4 },
  { id: 12, type: "speck", top: "66%", targetX: 115, targetY: 70, rot: 45, scale: 1.1, delay: 5.5 },
  { id: 13, type: "star", top: "70%", targetX: 70, targetY: 85, rot: 75, scale: 0.9, delay: 6 },
  { id: 14, type: "speck", top: "74%", targetX: -80, targetY: 45, rot: -55, scale: 1.0, delay: 5.5 },
  // Lower zone
  { id: 15, type: "star", top: "78%", targetX: -105, targetY: 40, rot: 35, scale: 1.0, delay: 6.5 },
  { id: 16, type: "speck", top: "82%", targetX: 95, targetY: 55, rot: -40, scale: 0.95, delay: 7 },
  { id: 17, type: "star", top: "86%", targetX: 60, targetY: 60, rot: 40, scale: 0.85, delay: 7.5 },
  { id: 18, type: "speck", top: "89%", targetX: -65, targetY: 40, rot: -25, scale: 0.95, delay: 8 },
];

export const WeddingIntroScene = ({ isOpened }) => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cameraRef = useRef(null);
  const bgImgRef = useRef(null);
  const centralBloomRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const seamGlowRef = useRef(null);
  const glitterItemsRef = useRef([]);
  const hasOpenedRef = useRef(false);
  const playCurtainsOpeningRef = useRef(null);

  // Content refs
  const motifRef = useRef(null);
  const headingFamiliesRef = useRef(null);
  const inviteLeadLine1Ref = useRef(null);
  const inviteLeadLine2Ref = useRef(null);
  const titleWrapRef = useRef(null);
  const titleRef = useRef(null);
  const titleGlowRef = useRef(null);
  const dividerRef = useRef(null);
  const quoteLine1Ref = useRef(null);
  const quoteLine2Ref = useRef(null);
  const quoteLine3Ref = useRef(null);
  const flourishRef = useRef(null);

  // Decorative refs
  const lampLeftRef = useRef(null);
  const lampRightRef = useRef(null);
  const leafLeftRef = useRef(null);
  const leafRightRef = useRef(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Reduced-motion fallback: keep curtains open and show content immediately
        gsap.set(curtainLeftRef.current, { xPercent: -82, scaleX: 0.88 });
        gsap.set(curtainRightRef.current, { xPercent: 82, scaleX: 0.88 });
        gsap.set(seamGlowRef.current, { opacity: 0 });
        gsap.set(
          [
            motifRef.current,
            headingFamiliesRef.current,
            inviteLeadLine1Ref.current,
            inviteLeadLine2Ref.current,
            titleRef.current,
            dividerRef.current,
            quoteLine1Ref.current,
            quoteLine2Ref.current,
            quoteLine3Ref.current,
            flourishRef.current,
          ],
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
        );
        gsap.set(titleRef.current, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
        gsap.set(centralBloomRef.current, { opacity: 0.65, scale: 1 });
        if (glitterItemsRef.current) gsap.set(glitterItemsRef.current, { opacity: 0 });
        return;
      }

      // Initial States: Curtains Fully Closed, Seam Light Radiating, Content Hidden
      gsap.set(curtainLeftRef.current, {
        xPercent: 0,
        scaleX: 1,
        skewY: 0,
        rotation: 0,
        transformOrigin: "top left",
      });
      gsap.set(curtainRightRef.current, {
        xPercent: 0,
        scaleX: 1,
        skewY: 0,
        rotation: 0,
        transformOrigin: "top right",
      });
      gsap.set(seamGlowRef.current, { opacity: 0.95, scaleX: 1 });

      // Initial State for Inauguration Glitter: Hidden at center seam
      if (glitterItemsRef.current && glitterItemsRef.current.length > 0) {
        gsap.set(glitterItemsRef.current, {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 0,
          rotation: 0,
        });
      }

      gsap.set(centralBloomRef.current, { opacity: 0.12, scale: 0.75 });
      gsap.set(bgImgRef.current, { scale: 1.0, filter: "brightness(0.32) saturate(1.15)" });

      gsap.set(motifRef.current, { opacity: 0, scale: 0.82, y: -18, filter: "blur(6px)" });
      gsap.set(headingFamiliesRef.current, { opacity: 0, y: 16, filter: "blur(5px)" });
      gsap.set([inviteLeadLine1Ref.current, inviteLeadLine2Ref.current], {
        opacity: 0,
        y: 18,
        filter: "blur(6px)",
      });

      // Masked Calligraphy Title Initial State: Hidden via clip-path
      gsap.set(titleRef.current, {
        opacity: 0,
        scale: 0.96,
        clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)",
        filter: "blur(6px)",
      });
      gsap.set(titleGlowRef.current, { opacity: 0, scale: 0.6 });

      gsap.set(dividerRef.current, { opacity: 0, scaleX: 0 });
      gsap.set([quoteLine1Ref.current, quoteLine2Ref.current, quoteLine3Ref.current], {
        opacity: 0,
        y: 14,
        filter: "blur(4px)",
      });
      gsap.set(flourishRef.current, { opacity: 0, scale: 0.7 });

      gsap.set([leafLeftRef.current, leafRightRef.current], { opacity: 0, y: 15 });
      gsap.set([lampLeftRef.current, lampRightRef.current], { opacity: 0.3 });

      // Automatic Grand Incoming Animation: Plays automatically when user reaches the curtains page
      const playCurtainsOpening = () => {
        if (hasOpenedRef.current) return;
        hasOpenedRef.current = true;

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => {
            // Ambient gentle fabric respiration and breathing once settled
            gsap.to(curtainLeftRef.current, {
              rotation: -0.6,
              y: -3,
              duration: 4.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
            gsap.to(curtainRightRef.current, {
              rotation: 0.6,
              y: -3,
              duration: 5.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
            gsap.to(centralBloomRef.current, {
              scale: 1.22,
              opacity: 0.92,
              duration: 3.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
            gsap.to(titleGlowRef.current, {
              scale: 1.18,
              opacity: 0.7,
              duration: 4.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        });

        // Step 1: Curtains smoothly and majestically glide open automatically (1.8s)
        tl.to(
          seamGlowRef.current,
          { opacity: 0, scaleX: 3.5, duration: 0.6, ease: "power2.out" },
          0
        )
        .to(
          curtainLeftRef.current,
          {
            xPercent: -82,
            scaleX: 0.88,
            skewY: -1.2,
            duration: 1.8,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          curtainRightRef.current,
          {
            xPercent: 82,
            scaleX: 0.88,
            skewY: 1.2,
            duration: 1.8,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          [curtainLeftRef.current, curtainRightRef.current],
          {
            skewY: 0,
            duration: 0.5,
            ease: "sine.out",
          },
          1.7
        );

        // Step 2: Auspicious Inauguration Golden Glitter Sprinkle
        GLITTER_PARTICLES.forEach((p, idx) => {
          const el = glitterItemsRef.current[idx];
          if (!el) return;
          const startSec = 0.1 + p.delay * 0.04;
          tl.to(
            el,
            {
              x: p.targetX,
              y: p.targetY,
              scale: p.scale,
              rotation: p.rot,
              opacity: 1,
              duration: 0.75,
              ease: "power2.out",
            },
            startSec
          );
          tl.to(
            el,
            {
              y: p.targetY + 20,
              scale: p.scale * 0.3,
              opacity: 0,
              duration: 0.5,
              ease: "power1.in",
            },
            startSec + 0.65
          );
        });

        // Step 3: Central Sanctum Light Bloom awakens behind parting curtains
        tl.to(
          centralBloomRef.current,
          { opacity: 0.92, scale: 1.18, duration: 1.4, ease: "power2.out" },
          0.2
        )
        .to(
          bgImgRef.current,
          {
            scale: 1.04,
            filter: "brightness(0.55) saturate(1.25)",
            duration: 1.6,
            ease: "sine.out",
          },
          0.1
        )
        .to(
          [lampLeftRef.current, lampRightRef.current],
          { opacity: 0.95, duration: 0.9 },
          0.3
        )
        .to(
          [leafLeftRef.current, leafRightRef.current],
          { opacity: 0.85, y: 0, duration: 0.9 },
          0.3
        );

        // Step 4: Sacred Gold Lotus Motif descends into view
        tl.to(
          motifRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "back.out(1.4)",
          },
          0.5
        );

        // Step 5: "TOGETHER WITH OUR BELOVED FAMILIES" reveals
        tl.to(
          headingFamiliesRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.out",
          },
          0.8
        );

        // Step 6: "WE CORDIALLY INVITE YOU / TO BE A PART OF OUR" emerges
        tl.to(
          inviteLeadLine1Ref.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power2.out",
          },
          1.1
        )
        .to(
          inviteLeadLine2Ref.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power2.out",
          },
          1.25
        );

        // Step 7: "Wedding Celebration" sweeps open in rich gold
        tl.to(
          titleRef.current,
          {
            opacity: 1,
            scale: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power2.out",
          },
          1.5
        )
        .to(
          titleGlowRef.current,
          {
            opacity: 0.75,
            scale: 1.12,
            duration: 0.85,
            ease: "power2.out",
          },
          1.55
        );

        // Step 8: Auspicious Gold Divider draws outward
        tl.to(
          dividerRef.current,
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.55,
            ease: "power2.inOut",
          },
          1.9
        );

        // Step 9: Emotional Invitation Lines reveal one-by-one automatically
        tl.to(
          quoteLine1Ref.current,
          {
            opacity: 0.95,
            y: 0,
            filter: "blur(0px)",
            duration: 0.45,
            ease: "power2.out",
          },
          2.1
        )
        .to(
          quoteLine2Ref.current,
          {
            opacity: 0.95,
            y: 0,
            filter: "blur(0px)",
            duration: 0.45,
            ease: "power2.out",
          },
          2.3
        )
        .to(
          quoteLine3Ref.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.45,
            ease: "power2.out",
          },
          2.5
        );

        // Step 10: Delicate End Flourish settles in
        tl.to(
          flourishRef.current,
          {
            opacity: 0.85,
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
          },
          2.7
        );
      };

      playCurtainsOpeningRef.current = playCurtainsOpening;

      // Automatically trigger opening when the curtains scene scrolls into view
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          playCurtainsOpening();
        },
        onRefresh: (self) => {
          if (self.progress > 0 && !hasOpenedRef.current) {
            playCurtainsOpening();
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Ensure ScrollTrigger triggers if already visible upon opening or refresh
  useEffect(() => {
    if (isOpened && sectionRef.current) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
        const rect = sectionRef.current?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight * 0.75 && !hasOpenedRef.current) {
          playCurtainsOpeningRef.current?.();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpened]);

  return (
    <section
      ref={sectionRef}
      className="intro-cinematic-scene"
      id="wedding-intro-scene"
      aria-label="Scene 02: Traditional Ceremonial Curtain Opening & Wedding Invitation"
      onClick={() => playCurtainsOpeningRef.current?.()}
    >
      {/* ========================================================
          BACKGROUND: Sacred Temple Sanctum Backdrop spanning 100% width edge-to-edge
         ======================================================== */}
      <div className="intro-sanctum-bg-layer" aria-hidden="true">
        <img
          ref={bgImgRef}
          src="/assets/intro/intro_temple_sanctum_bg.jpg"
          alt="Sacred South Indian Temple Corridor Sanctuary"
          className="intro-sanctum-bg-img"
          loading="eager"
        />

        {/* Vignette Gradients (Protects contrast & smooth transition to next section) */}
        <div className="intro-vignette-top" />
        <div className="intro-vignette-bottom" />
        <div className="intro-vignette-sides" />

        {/* Central Volumetric Golden Light Bloom behind Typography */}
        <div ref={centralBloomRef} className="intro-central-light-bloom" />

        {/* Living Flame Auras over Background Lamps */}
        <div ref={lampLeftRef} className="intro-lamp-flame intro-flame-left" />
        <div ref={lampRightRef} className="intro-lamp-flame intro-flame-right" />

        {/* Subtle Outer Banana Leaf Greenery Peeking Behind Curtains */}
        <div ref={leafLeftRef} className="intro-edge-leaf intro-leaf-left">
          <img
            src="/assets/doors/banana-leaves-left.png"
            alt=""
            className="intro-leaf-img"
            loading="lazy"
          />
        </div>
        <div ref={leafRightRef} className="intro-edge-leaf intro-leaf-right">
          <img
            src="/assets/doors/banana-leaves-right.png"
            alt=""
            className="intro-leaf-img"
            loading="lazy"
          />
        </div>

        {/* Sparse Floating Gold Dust Particles */}
        <div className="intro-particles-overlay">
          <span className="intro-sparkle intro-sp-1">✦</span>
          <span className="intro-sparkle intro-sp-2">✦</span>
          <span className="intro-sparkle intro-sp-3">✦</span>
          <span className="intro-sparkle intro-sp-4">✦</span>
        </div>
      </div>

      {/* Soft Ambient Blends to eliminate any hard cut lines with adjacent scenes */}
      <div className="intro-top-blend" aria-hidden="true" />
      <div className="intro-bottom-blend" aria-hidden="true" />

      <div ref={stageRef} className="intro-stage">
        {/* ========================================================
            CONTENT LAYER: Sacred Invitation Typography (100% HTML/CSS)
           ======================================================== */}
        <div ref={cameraRef} className="intro-content-container">
          <div className="intro-content-card">
            {/* 1. Small Gold Lotus / Floral Motif */}
            <div ref={motifRef} className="intro-lotus-wrap" aria-hidden="true">
              <svg
                className="intro-lotus-svg"
                viewBox="0 0 54 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="introLotusGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF9E6" />
                    <stop offset="40%" stopColor="#F5D78E" />
                    <stop offset="80%" stopColor="#C8A45D" />
                    <stop offset="100%" stopColor="#96742A" />
                  </linearGradient>
                </defs>
                <path
                  d="M27 3 C24 13 22 24 27 33 C32 24 30 13 27 3 Z"
                  fill="url(#introLotusGold)"
                  stroke="#FFEEC2"
                  strokeWidth="0.8"
                />
                <path
                  d="M27 33 C19 28 14 18 19 12 C24 18 25 27 27 33 Z"
                  fill="url(#introLotusGold)"
                  opacity="0.9"
                />
                <path
                  d="M27 33 C35 28 40 18 35 12 C30 18 29 27 27 33 Z"
                  fill="url(#introLotusGold)"
                  opacity="0.9"
                />
                <path
                  d="M27 33 C14 31 6 24 11 18 C17 23 21 30 27 33 Z"
                  fill="url(#introLotusGold)"
                  opacity="0.75"
                />
                <path
                  d="M27 33 C40 31 48 24 43 18 C37 23 33 30 27 33 Z"
                  fill="url(#introLotusGold)"
                  opacity="0.75"
                />
                <circle cx="27" cy="35" r="2.2" fill="#D32F2F" />
              </svg>
            </div>

            {/* 2. Small Spaced Serif Heading */}
            <h3 ref={headingFamiliesRef} className="intro-sub-families">
              TOGETHER WITH OUR BELOVED FAMILIES
            </h3>

            {/* 3. Refined Serif Lead Lines */}
            <div className="intro-invite-lead-block">
              <p ref={inviteLeadLine1Ref} className="intro-invite-lead-line">
                WE CORDIALLY INVITE YOU
              </p>
              <p ref={inviteLeadLine2Ref} className="intro-invite-lead-line">
                TO BE A PART OF OUR
              </p>
            </div>

            {/* 4. Main Calligraphic Script Heading: Wedding Celebration */}
            <div ref={titleWrapRef} className="intro-wedding-title-wrap">
              <div ref={titleGlowRef} className="intro-wedding-title-glow" aria-hidden="true" />
              <h2 ref={titleRef} className="intro-wedding-title">
                Wedding Celebration
              </h2>
            </div>

            {/* 5. Delicate Gold Divider Line */}
            <div ref={dividerRef} className="intro-gold-divider" aria-hidden="true">
              <span className="divider-arm divider-arm-left" />
              <span className="divider-center-motif">✦</span>
              <span className="divider-arm divider-arm-right" />
            </div>

            {/* 6. Emotional Invitation Line */}
            <div className="intro-quote-container">
              <p ref={quoteLine1Ref} className="intro-quote-line">
                Two hearts found their way to each other,
              </p>
              <p ref={quoteLine2Ref} className="intro-quote-line">
                and from this moment on
              </p>
              <p ref={quoteLine3Ref} className="intro-quote-line intro-quote-accent">
                every road leads home.
              </p>
            </div>

            {/* 7. Subtle End Flourish */}
            <div ref={flourishRef} className="intro-end-flourish" aria-hidden="true">
              <span className="intro-flourish-char">❦</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            PRIMARY FOREGROUND: Ceremonial Dark Teal Velvet Curtains
           ======================================================== */}
        <div className="intro-curtains-stage" aria-hidden="true">
          {/* Left Curtain Panel (covers 0% - 50.5% when closed) */}
          <div ref={curtainLeftRef} className="intro-curtain-panel intro-curtain-left">
            <div className="intro-curtain-img-viewport">
              <img
                src="/assets/intro/ceremonial_curtains_hd.jpg"
                alt=""
                className="intro-curtain-img intro-curtain-img-left"
                loading="eager"
              />
            </div>
            {/* Antique Gold Embroidered Border & Seam Trim */}
            <div className="intro-curtain-trim intro-trim-left" />
            <div className="intro-curtain-shadow-edge intro-shadow-left" />
          </div>

          {/* Right Curtain Panel (covers 49.5% - 100% when closed) */}
          <div ref={curtainRightRef} className="intro-curtain-panel intro-curtain-right">
            <div className="intro-curtain-img-viewport">
              <img
                src="/assets/intro/ceremonial_curtains_hd.jpg"
                alt=""
                className="intro-curtain-img intro-curtain-img-right"
                loading="eager"
              />
            </div>
            {/* Antique Gold Embroidered Border & Seam Trim */}
            <div className="intro-curtain-trim intro-trim-right" />
            <div className="intro-curtain-shadow-edge intro-shadow-right" />
          </div>

          {/* Center Seam Parting Light Slit */}
          <div ref={seamGlowRef} className="intro-curtains-seam-glow" />

          {/* Ceremonial Inauguration Golden Glitter Sprinkle */}
          <div className="intro-ceremonial-glitter-stage" aria-hidden="true">
            {GLITTER_PARTICLES.map((item, idx) => (
              <span
                key={item.id}
                ref={(el) => (glitterItemsRef.current[idx] = el)}
                className={`intro-glitter-particle intro-glitter-${item.type}`}
                style={{ top: item.top }}
              >
                {item.type === "star" ? "✦" : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
