import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

export const OpeningCard = ({ isOpened, onOpen }) => {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const bgLayerRef = useRef(null);
  const midLayerRef = useRef(null);
  const fgLayerRef = useRef(null);
  const darkVeilRef = useRef(null);
  const centerGlowRef = useRef(null);
  const velWrapRef = useRef(null);
  const velGlowRaysRef = useRef(null);
  const typoWrapRef = useRef(null);
  const tamilMottoRef = useRef(null);
  const blessingLeadRef = useRef(null);
  const groomNameRef = useRef(null);
  const wedsRef = useRef(null);
  const brideNameRef = useRef(null);
  const buttonRef = useRef(null);
  const flareRef = useRef(null);

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Parallax tracking
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameId = useRef(null);

  // 1. Initial 7-Step Page Load Animation Sequence
  useEffect(() => {
    if (isOpened) return;

    // Reset initial states
    gsap.set(darkVeilRef.current, { opacity: 1 });
    gsap.set(centerGlowRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(velWrapRef.current, { opacity: 0, scale: 0.9, y: 20 });
    gsap.set(velGlowRaysRef.current, { opacity: 0, scale: 0.7 });
    gsap.set(
      [
        tamilMottoRef.current,
        blessingLeadRef.current,
        groomNameRef.current,
        wedsRef.current,
        brideNameRef.current,
      ],
      { opacity: 0, y: 22, filter: "blur(6px)" }
    );
    gsap.set(buttonRef.current, { opacity: 0, y: 25, scale: 0.88 });
    gsap.set(flareRef.current, { opacity: 0, scale: 0.2 });

    const loadTimeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.2,
    });

    // STEP 1 & 2: Start in darkness, soft warm golden glow blooms in sanctum
    loadTimeline
      .to(centerGlowRef.current, {
        opacity: 0.85,
        scale: 1.15,
        duration: 1.4,
        ease: "power2.inOut",
      })
      // STEP 3: Temple architecture slowly emerges from deep shadow
      .to(
        darkVeilRef.current,
        {
          opacity: 0,
          duration: 1.6,
          ease: "power2.out",
        },
        "-=0.9"
      )
      // STEP 4 & 5: Golden Vel illuminates with sacred breathing radiance
      .to(
        velWrapRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
        },
        "-=0.7"
      )
      .to(
        velGlowRaysRef.current,
        {
          opacity: 0.75,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.9"
      )
      // STEP 6: Progressive Typography Reveal Sequence
      // 6.1 "வேல் முருகா !"
      .to(
        tamilMottoRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
        },
        "-=0.5"
      )
      // 6.2 "WITH THE BLESSINGS OF LORD MURUGAN"
      .to(
        blessingLeadRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.65,
        },
        "-=0.45"
      )
      // 6.3 "JAYAPRAKASH" — Royal Groom name with majestic blur-to-sharp clear
      .to(
        groomNameRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power4.out",
        },
        "-=0.3"
      )
      // 6.4 "weds" — Ornate cursive flourish
      .to(
        wedsRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "back.out(1.5)",
        },
        "-=0.5"
      )
      // 6.5 "SRIMATHI" — Royal Bride name with regal blur-to-sharp clear
      .to(
        brideNameRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power4.out",
        },
        "-=0.4"
      )
      // STEP 7: Deep Maroon "TAP TO OPEN" Button reveals with gentle breathing glow
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "back.out(1.4)",
        },
        "-=0.2"
      );

    return () => {
      loadTimeline.kill();
    };
  }, [isOpened]);

  // 2. Desktop Subtle Mouse Parallax & Mobile Floating Breathing
  useEffect(() => {
    if (isOpened || isTransitioning) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      mousePos.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mousePos.current.targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let t = 0;
    const updateParallax = () => {
      t += 0.015;
      // Smooth lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.06;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.06;

      // Small gentle idle breathing motion combined with mouse
      const idleX = Math.sin(t * 0.5) * 0.12;
      const idleY = Math.cos(t * 0.4) * 0.12;

      const totalX = mousePos.current.x + idleX;
      const totalY = mousePos.current.y + idleY;

      // Layer 1: Background moves slowest (depth: 8px)
      if (bgLayerRef.current) {
        bgLayerRef.current.style.transform = `translate3d(${totalX * -6}px, ${totalY * -5}px, 0)`;
      }

      // Layer 2: Middleground moves medium (depth: 14px)
      if (midLayerRef.current) {
        midLayerRef.current.style.transform = `translate3d(${totalX * -14}px, ${totalY * -10}px, 0)`;
      }

      // Layer 3: Foreground petals/bokeh moves fastest (depth: 26px)
      if (fgLayerRef.current) {
        fgLayerRef.current.style.transform = `translate3d(${totalX * -24}px, ${totalY * -18}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(updateParallax);
    };

    animFrameId.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isOpened, isTransitioning]);

  // 3. Cinematic Tap-to-Open Experience: Camera Pushes In, Light Expands, Transitions to Scene 02
  const handleTapToOpen = useCallback(() => {
    if (isTransitioning || isOpened) return;
    setIsTransitioning(true);

    if (animFrameId.current) {
      cancelAnimationFrame(animFrameId.current);
    }

    const openTl = gsap.timeline({
      onComplete: () => {
        onOpen();
      },
    });

    // 1. Button softly illuminates & pulses
    openTl
      .to(buttonRef.current, {
        scale: 1.08,
        filter: "brightness(1.4) drop-shadow(0 0 25px rgba(255, 230, 150, 0.9))",
        duration: 0.35,
        ease: "power2.out",
      })
      // 2. Divine golden light spreads outward from the central Vel
      .to(
        flareRef.current,
        {
          opacity: 1,
          scale: 6.5,
          duration: 0.85,
          ease: "power2.inOut",
        },
        "-=0.15"
      )
      // 3. Vel becomes intensely radiant with divine aura
      .to(
        velWrapRef.current,
        {
          filter: "drop-shadow(0 0 35px #fff2c4) drop-shadow(0 0 60px #d4af37)",
          scale: 1.15,
          duration: 0.7,
        },
        "-=0.75"
      )
      // 4. Surrounding elements & typography dissolve softly as camera pushes forward
      .to(
        [typoWrapRef.current, buttonRef.current],
        {
          opacity: 0,
          y: -20,
          filter: "blur(8px)",
          duration: 0.5,
          ease: "power2.in",
        },
        "-=0.6"
      )
      // 5. Virtual Camera smoothly pushes forward into the temple doorway / Vel
      .to(
        cameraRef.current,
        {
          scale: 1.42,
          y: 45,
          duration: 1.35,
          ease: "power2.inOut",
        },
        "-=0.6"
      )
      // 6. Foreground flower petals accelerate past the lens with motion blur
      .to(
        fgLayerRef.current,
        {
          scale: 1.8,
          opacity: 0,
          filter: "blur(12px)",
          duration: 0.8,
          ease: "power3.in",
        },
        "-=0.9"
      )
      // 7. Full scene fades warmly into golden light, leading seamlessly into Scene 02
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.4"
      );
  }, [isTransitioning, isOpened, onOpen]);

  if (isOpened) return null;

  return (
    <div
      ref={containerRef}
      className="scene01-viewport"
      role="region"
      aria-label="Scene 01: Traditional Temple Wedding Invitation Entrance"
    >
      {/* Cinematic Ambient Backdrop for Widescreen Displays */}
      <div className="scene01-desktop-ambient-backdrop" />

      {/* Deep Temple Darkness Veil (Step 1 -> Step 3) */}
      <div ref={darkVeilRef} className="scene01-dark-veil" />

      {/* Central Sanctum Golden Ambient Light (Step 2) */}
      <div ref={centerGlowRef} className="scene01-center-sanctum-glow" />

      {/* Expanding Divine Light Flare for Tap-to-Open Transition */}
      <div ref={flareRef} className="scene01-expanding-flare" />

      {/* Virtual 2.5D Camera Stage */}
      <div ref={cameraRef} className="scene01-camera">
        
        {/* ========================================================
            BACKGROUND LAYER (Stone architecture, door, sunbeams, lamps)
           ======================================================== */}
        <div ref={bgLayerRef} className="scene01-layer layer-bg">
          {/* High-res clean South Indian temple doorway */}
          <div className="temple-frame-canvas">
            <img
              src="/assets/doors/temple-door-clean.jpg"
              alt="Ornate South Indian Temple Doorway Entrance"
              className="temple-door-full-img"
              loading="eager"
            />

            {/* Subtle Volumetric Sunbeams streaming from top-left */}
            <div className="temple-volumetric-sunbeam" />

            {/* Brass Kuthu Vilakku Lamp Flames — Realistic Micro Flicker */}
            <div className="lamp-flame-glow flame-step-left" />
            <div className="lamp-flame-glow flame-step-right" />
            <div className="lamp-flame-glow flame-fg-left" />
          </div>
        </div>

        {/* ========================================================
            MIDDLE LAYER (Vel, Typography, Banana Leaves, Button)
           ======================================================== */}
        <div ref={midLayerRef} className="scene01-layer layer-mid">
          <div className="temple-door-mid-content">
            
            {/* Swaying Banana Leaves (Left & Right) */}
            <div className="banana-plant-left">
              <img
                src="/assets/doors/banana-leaves-left.png"
                alt=""
                className="swaying-leaf-left"
                aria-hidden="true"
              />
            </div>
            <div className="banana-plant-right">
              <img
                src="/assets/doors/banana-leaves-right.png"
                alt=""
                className="swaying-leaf-right"
                aria-hidden="true"
              />
            </div>

            {/* Central Door Inscription Area */}
            <div className="door-panel-inscriptions">
              
              {/* Sacred Golden Vel of Lord Murugan */}
              <div ref={velWrapRef} className="vel-sacred-container">
                <div ref={velGlowRaysRef} className="vel-divine-rays-aura" />
                <img
                  src="/assets/doors/golden-vel-clean.png"
                  alt="Sacred Golden Vel of Lord Murugan"
                  className="golden-vel-img"
                />
              </div>

              {/* Progressive Typography Block */}
              <div ref={typoWrapRef} className="door-typo-container">
                
                {/* 1. Tamil Mantra: வேல் முருகா ! */}
                <h3 ref={tamilMottoRef} className="typo-tamil-motto">
                  வேல் முருகா !
                </h3>

                {/* 2. English Blessing Lead */}
                <p ref={blessingLeadRef} className="typo-blessing-lead">
                  WITH THE BLESSINGS OF LORD MURUGAN
                </p>

                {/* Ornate Divider Flourish */}
                <div className="typo-gold-flourish">
                  <span className="flourish-line" />
                  <span className="flourish-star">✦</span>
                  <span className="flourish-line" />
                </div>

                {/* 3. Groom's Name: JAYAPRAKASH */}
                <h1 ref={groomNameRef} className="typo-groom-name">
                  JAYAPRAKASH
                </h1>

                {/* 4. weds script connector */}
                <div ref={wedsRef} className="typo-weds-wrap">
                  <span className="typo-weds-sign">weds</span>
                </div>

                {/* 5. Bride's Name: SRIMATHI */}
                <h1 ref={brideNameRef} className="typo-bride-name">
                  SRIMATHI
                </h1>
              </div>

              {/* 7. Deep Maroon TAP TO OPEN Button */}
              <div className="door-button-anchor">
                <button
                  ref={buttonRef}
                  type="button"
                  onClick={handleTapToOpen}
                  className="maroon-tap-button"
                  aria-label="Tap to open wedding invitation"
                  disabled={isTransitioning}
                >
                  {/* Subtle breathing glow ring */}
                  <span className="btn-glow-ring" />
                  
                  {/* Small Golden Lotus Icon */}
                  <span className="btn-lotus-icon">
                    <svg
                      viewBox="0 0 24 20"
                      width="18"
                      height="15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 1.5 C10.8 6.5 10 12 12 16 C14 12 13.2 6.5 12 1.5 Z"
                        fill="#F3E098"
                      />
                      <path
                        d="M12 16 C8.5 13.5 5 10.5 4 6.5 C6.5 9 9.5 13 12 16 Z"
                        fill="#E6C87D"
                        opacity="0.9"
                      />
                      <path
                        d="M12 16 C15.5 13.5 19 10.5 20 6.5 C17.5 9 14.5 13 12 16 Z"
                        fill="#E6C87D"
                        opacity="0.9"
                      />
                      <path
                        d="M12 16 C7 16 2.5 13.5 1 11 C4 12.5 8 14.5 12 16 Z"
                        fill="#C8A45D"
                        opacity="0.8"
                      />
                      <path
                        d="M12 16 C17 16 21.5 13.5 23 11 C20 12.5 16 14.5 12 16 Z"
                        fill="#C8A45D"
                        opacity="0.8"
                      />
                      <circle cx="12" cy="16.5" r="1.5" fill="#FFEAA7" />
                    </svg>
                  </span>

                  {/* Button Text */}
                  <span className="btn-text-content">TAP TO OPEN</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================
            FOREGROUND LAYER (Drifting Petals, Warm Bokeh, Embers)
           ======================================================== */}
        <div ref={fgLayerRef} className="scene01-layer layer-fg">
          {/* Sparse Drifting Flower Petals */}
          <div className="fg-petal petal-1" />
          <div className="fg-petal petal-2" />
          <div className="fg-petal petal-3" />
          <div className="fg-petal petal-4" />
          <div className="fg-petal petal-5" />

          {/* Warm Golden Bokeh Orbs */}
          <div className="fg-bokeh bokeh-1" />
          <div className="fg-bokeh bokeh-2" />
          <div className="fg-bokeh bokeh-3" />

          {/* Sparse Golden Sparkles */}
          <div className="fg-sparkle sparkle-1">✦</div>
          <div className="fg-sparkle sparkle-2">✦</div>
        </div>

      </div>
    </div>
  );
};
