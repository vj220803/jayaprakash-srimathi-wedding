import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const WeddingInfoScene = () => {
  const sectionRef = useRef(null);
  const cameraRef = useRef(null);
  const bgLayerRef = useRef(null);
  const midLayerRef = useRef(null);
  const fgLayerRef = useRef(null);

  // Text refs for staggered scroll reveal
  const titleRef = useRef(null);
  const divider1Ref = useRef(null);
  const dateBlockRef = useRef(null);
  const timeBlockRef = useRef(null);
  const divider2Ref = useRef(null);
  const venueBlockRef = useRef(null);
  const kuralBlockRef = useRef(null);

  // Environmental micro-animation refs
  const leftLeafRef = useRef(null);
  const rightLeafRef = useRef(null);
  const leftFeatherRef = useRef(null);
  const rightFeatherRef = useRef(null);
  const sanctumGlowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Master Scroll-Triggered Cinematic Camera Push & 2.5D Parallax
      const cameraTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Background moves slow with gentle zoom forward
      cameraTl.fromTo(
        bgLayerRef.current,
        { scale: 1.0, y: -20 },
        { scale: 1.12, y: 30, ease: "none" }
      );

      // Middle ground moves slightly faster
      cameraTl.fromTo(
        midLayerRef.current,
        { y: 40 },
        { y: -30, ease: "none" },
        0
      );

      // Foreground elements (leaves, peacock feathers) glide across camera edges
      cameraTl.fromTo(
        leftFeatherRef.current,
        { y: 50, rotate: -4, scale: 0.95 },
        { y: -60, rotate: 6, scale: 1.08, ease: "none" },
        0
      );

      cameraTl.fromTo(
        rightFeatherRef.current,
        { y: 60, rotate: 4, scale: 0.95 },
        { y: -70, rotate: -6, scale: 1.08, ease: "none" },
        0
      );

      cameraTl.fromTo(
        leftLeafRef.current,
        { y: 30, rotate: -2 },
        { y: -45, rotate: 3, ease: "none" },
        0
      );

      cameraTl.fromTo(
        rightLeafRef.current,
        { y: 30, rotate: 2 },
        { y: -45, rotate: -3, ease: "none" },
        0
      );

      // 2. Sequential Information Reveal Timeline (Steps 2 to 7)
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 35%",
          scrub: 1,
        },
      });

      // Step 2: Sanctum light brightens softly
      revealTl.fromTo(
        sanctumGlowRef.current,
        { opacity: 0.2, scale: 0.8 },
        { opacity: 0.85, scale: 1.2, duration: 1.5, ease: "power2.out" }
      );

      // Step 3: Title Entrance — “திருமண வரவேற்பு விழா”
      revealTl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
        0.3
      );

      // Step 4: Date Reveal — Gold Divider draws outward + 01 NOVEMBER 2026 fades in
      revealTl.fromTo(
        divider1Ref.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.0, ease: "power2.inOut" },
        0.7
      );

      revealTl.fromTo(
        dateBlockRef.current,
        { opacity: 0, y: 25, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
        0.9
      );

      // Step 5: Time Reveal — 7:00 AM — 11:00 AM + Sunday
      revealTl.fromTo(
        timeBlockRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" },
        1.3
      );

      // Step 6: Venue Reveal — V.R. MAHAL (A/C), KOTTALUR, PENNAGARAM – METTUR MAIN ROAD
      revealTl.fromTo(
        divider2Ref.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: "power2.inOut" },
        1.6
      );

      revealTl.fromTo(
        venueBlockRef.current,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4, ease: "power3.out" },
        1.8
      );

      // Step 7: Sacred Tamil Quote — Thirukkural blessing
      revealTl.fromTo(
        kuralBlockRef.current,
        { opacity: 0, y: 25, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.3, ease: "power2.out" },
        2.2
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene04-info-section"
      id="wedding-info-scene"
      aria-label="Scene 04: Wedding Information and Patrika Details"
    >
      {/* Virtual Camera Container for Depth & Scale */}
      <div ref={cameraRef} className="scene04-camera-stage">

        {/* ========================================================
            BACKGROUND LAYER (Temple interior corridor, light rays, lamps)
           ======================================================== */}
        <div ref={bgLayerRef} className="scene04-layer scene04-bg-layer">
          <div className="scene04-corridor-frame">
            <img
              src="/assets/backgrounds/scene4-temple-corridor.jpg"
              alt="Sacred South Indian Temple Interior Sanctuary"
              className="scene04-bg-img"
              loading="lazy"
            />

            {/* Volumetric Sunbeam Sweep */}
            <div className="scene04-sunbeam-overlay" />

            {/* Central Sanctum Breathing Golden Ambient Light */}
            <div ref={sanctumGlowRef} className="scene04-sanctum-glow" />

            {/* Realistic Small Oil Lamp Flame Flickers */}
            <div className="scene04-flame-glow flame-arch-top" />
            <div className="scene04-flame-glow flame-arch-left" />
            <div className="scene04-flame-glow flame-arch-right" />
            <div className="scene04-flame-glow flame-step-lamp-l" />
            <div className="scene04-flame-glow flame-step-lamp-r" />
            <div className="scene04-flame-glow flame-fg-left-pot" />
          </div>
        </div>

        {/* ========================================================
            MIDDLEGROUND LAYER (Information Typography & Dividers)
           ======================================================== */}
        <div ref={midLayerRef} className="scene04-layer scene04-mid-layer">
          <div className="scene04-content-container">

            {/* STEP 3: Title Entrance */}
            <div ref={titleRef} className="scene04-title-group">
              <span className="scene04-tamil-header-motto">॥ சுபமுகூர்த்த நன்னாளில் ॥</span>
              <h2 className="scene04-main-tamil-title">
                திருமண வரவேற்பு விழா
              </h2>
              <p className="scene04-english-sub-lead">
                INVITATION TO THE AUSPICIOUS WEDDING CELEBRATION
              </p>
            </div>

            {/* Gold Divider 1 (Draws outward from center) */}
            <div ref={divider1Ref} className="scene04-gold-divider divider-center">
              <span className="divider-line" />
              <span className="divider-motif">✦</span>
              <span className="divider-line" />
            </div>

            {/* STEP 4: Date Reveal */}
            <div ref={dateBlockRef} className="scene04-date-block">
              <p className="scene04-date-pre">THE AUSPICIOUS DATE</p>
              <h3 className="scene04-date-display">
                01 NOVEMBER 2026
              </h3>
            </div>

            {/* STEP 5: Time Reveal */}
            <div ref={timeBlockRef} className="scene04-time-block">
              <div className="scene04-time-pill">
                <span className="time-clock-icon">☀️</span>
                <span className="time-hours-text">7:00 AM — 11:00 AM</span>
              </div>
              <p className="scene04-day-text">
                ஞாயிற்றுக்கிழமை • SUNDAY
              </p>
            </div>

            {/* Gold Divider 2 */}
            <div ref={divider2Ref} className="scene04-gold-divider divider-center">
              <span className="divider-line" />
              <span className="divider-motif">༺ ✦ ༻</span>
              <span className="divider-line" />
            </div>

            {/* STEP 6: Venue Reveal (From Patrika: V.R. Mahal (A/C), Kottalur, Pennagaram – Mettur Main Road) */}
            <div ref={venueBlockRef} className="scene04-venue-block">
              <span className="scene04-venue-badge">திருமண மஹால் • VENUE</span>
              <h3 className="scene04-venue-name">
                V.R. MAHAL (A/C)
              </h3>
              <p className="scene04-venue-locality">
                KOTTALUR
              </p>
              <p className="scene04-venue-road">
                PENNAGARAM – METTUR MAIN ROAD
              </p>
            </div>

            {/* STEP 7: Sacred Thirukkural Quote from Patrika */}
            <div ref={kuralBlockRef} className="scene04-kural-container">
              <div className="kural-glow-aura" />
              <div className="kural-symbol">❦</div>
              <blockquote className="kural-verses-text">
                “அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை<br />
                பண்பும் பயனும் அது”
              </blockquote>
              <cite className="kural-author-cite">— குறள்</cite>
            </div>

          </div>
        </div>

        {/* ========================================================
            FOREGROUND LAYER (Peacock Feathers, Banana Leaves, Petals)
           ======================================================== */}
        <div ref={fgLayerRef} className="scene04-layer scene04-fg-layer">
          {/* Subtle 3D Swaying Banana Leaves at edges */}
          <div ref={leftLeafRef} className="scene04-edge-leaf leaf-pos-left">
            <img
              src="/assets/doors/banana-leaves-left.png"
              alt=""
              className="edge-leaf-img"
              aria-hidden="true"
            />
          </div>

          <div ref={rightLeafRef} className="scene04-edge-leaf leaf-pos-right">
            <img
              src="/assets/doors/banana-leaves-right.png"
              alt=""
              className="edge-leaf-img"
              aria-hidden="true"
            />
          </div>

          {/* Peacock Feather Motifs on Bottom Edges */}
          <div ref={leftFeatherRef} className="scene04-feather-edge feather-pos-left">
            <img
              src="/assets/peacock/feather-single.png"
              alt=""
              className="edge-feather-img"
              aria-hidden="true"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>

          <div ref={rightFeatherRef} className="scene04-feather-edge feather-pos-right">
            <img
              src="/assets/peacock/feather-single.png"
              alt=""
              className="edge-feather-img flipped"
              aria-hidden="true"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>

          {/* Soft Floating Pink Lotus & Jasmine Petals */}
          <div className="scene04-floating-petal petal-s4-1" />
          <div className="scene04-floating-petal petal-s4-2" />
          <div className="scene04-floating-petal petal-s4-3" />
          <div className="scene04-floating-petal petal-s4-4" />

          {/* Sparse Golden Sparkles */}
          <span className="scene04-sparkle sp1">✦</span>
          <span className="scene04-sparkle sp2">✦</span>
          <span className="scene04-sparkle sp3">✦</span>
        </div>

      </div>
    </section>
  );
};
