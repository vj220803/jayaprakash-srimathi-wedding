import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KuthuVilakku } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

// Traditional Delicate Gold Divider: ─── ❖ ───
const TraditionalGoldDivider = ({ className = "" }) => (
  <div className={`family-gold-divider-wrap ${className}`} aria-hidden="true">
    <svg width="180" height="18" viewBox="0 0 180 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="trad-gold-divider-svg">
      <line x1="8" y1="9" x2="68" y2="9" stroke="url(#goldLineGrad)" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="72" cy="9" r="1.5" fill="#E5C77A" />
      {/* Central 8-pointed floral rosette / diamond */}
      <path d="M90 2.5 L92.2 7.2 L97 9 L92.2 10.8 L90 15.5 L87.8 10.8 L83 9 L87.8 7.2 Z" fill="url(#goldStarGrad)" />
      <circle cx="90" cy="9" r="1.4" fill="#FFFDF2" />
      <circle cx="108" cy="9" r="1.5" fill="#E5C77A" />
      <line x1="112" y1="9" x2="172" y2="9" stroke="url(#goldLineGrad)" strokeWidth="0.8" strokeLinecap="round" />
      <defs>
        <linearGradient id="goldLineGrad" x1="0" y1="0" x2="180" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C49A32" stopOpacity="0" />
          <stop offset="30%" stopColor="#E5BE57" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#FFF2C4" />
          <stop offset="70%" stopColor="#E5BE57" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#C49A32" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="goldStarGrad" x1="83" y1="2.5" x2="97" y2="15.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFDF2" />
          <stop offset="40%" stopColor="#FCE09B" />
          <stop offset="70%" stopColor="#E5BE57" />
          <stop offset="100%" stopColor="#8C6716" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Top Delicate Lotus Crown Ornament
const TopLotusCrown = () => (
  <div className="family-top-lotus-crown" aria-hidden="true">
    <svg width="64" height="34" viewBox="0 0 64 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="top-lotus-svg">
      <line x1="6" y1="18" x2="22" y2="18" stroke="url(#goldLineGrad)" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="25" cy="18" r="1.2" fill="#E5C77A" />
      {/* Central upright lotus petal */}
      <path d="M32 3 C30 11 28 17 32 21 C36 17 34 11 32 3 Z" fill="url(#goldStarGrad)" />
      {/* Left flared petal */}
      <path d="M32 21 C26 17 21 13 23 8 C26 9 30 14 32 21 Z" fill="url(#goldStarGrad)" />
      {/* Right flared petal */}
      <path d="M32 21 C38 17 43 13 41 8 C38 9 34 14 32 21 Z" fill="url(#goldStarGrad)" />
      <circle cx="39" cy="18" r="1.2" fill="#E5C77A" />
      <line x1="42" y1="18" x2="58" y2="18" stroke="url(#goldLineGrad)" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  </div>
);

// Bottom Delicate Floral Accent
const BottomFloralAccent = () => (
  <div className="family-bottom-floral-accent" aria-hidden="true">
    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="bottom-lotus-svg">
      <path d="M20 2 L22.5 8 L28 10.5 L22.5 13 L20 19 L17.5 13 L12 10.5 L17.5 8 Z" fill="url(#goldStarGrad)" />
      <circle cx="20" cy="10.5" r="1.5" fill="#FFFDF2" />
      <circle cx="10" cy="10.5" r="1" fill="#E5C77A" />
      <circle cx="30" cy="10.5" r="1" fill="#E5C77A" />
    </svg>
  </div>
);

export const FamilyBlessings = () => {
  const containerRef = useRef(null);

  // Atmospheric & Parallax Refs
  const bgGlowRef = useRef(null);
  const leftLeafRef = useRef(null);
  const rightLeafRef = useRef(null);
  const lampLeftRef = useRef(null);
  const lampRightRef = useRef(null);

  // Animation Stage Refs
  const topCrownRef = useRef(null);
  const withBlessingsRef = useRef(null);
  const ourFamiliesRef = useRef(null);
  const titleDividerRef = useRef(null);
  const familyImgRef = useRef(null);
  const familyGlowRef = useRef(null);
  const calligraphyLineRef = useRef(null);
  const welcomeSubRef = useRef(null);
  const subDividerRef = useRef(null);
  const blessingBlockRef = useRef(null);
  const tamilDividerRef = useRef(null);
  const tamilBlockRef = useRef(null);
  const bottomEmblemRef = useRef(null);

  // Smooth scroll back to the top of the wedding invitation
  const handleScrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Subtle idle ambient breeze on banana leaves (ultra-gentle 1.5 deg sway)
      gsap.to(leftLeafRef.current, {
        rotation: 1.8,
        y: -6,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(rightLeafRef.current, {
        rotation: -1.8,
        y: -6,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.8,
      });

      // 2. Subtle organic flame pulse on corner brass kuthu vilakku lamps
      gsap.to([lampLeftRef.current, lampRightRef.current], {
        opacity: 0.95,
        scale: 1.03,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });

      // 3. Master Cinematic Phased ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: topCrownRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // STEP 1: Atmospheric Golden Light begins warming the background
      tl.to(bgGlowRef.current, {
        opacity: 0.9,
        scale: 1.15,
        duration: 1.3,
        ease: "power2.out",
      })

      // STEP 2: Top Crown & Heading Reveal
      .fromTo(
        topCrownRef.current,
        { opacity: 0, y: 16, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power2.out" },
        "-=0.9"
      )
      .fromTo(
        withBlessingsRef.current,
        { opacity: 0, y: 14, letterSpacing: "0.18em" },
        { opacity: 1, y: 0, letterSpacing: "0.28em", duration: 0.75, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        ourFamiliesRef.current,
        { opacity: 0, y: 18, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" },
        "-=0.45"
      )

      // STEP 3: Gold Ornament Divider below heading
      .fromTo(
        titleDividerRef.current,
        { opacity: 0, scaleX: 0.5 },
        { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )

      // STEP 4: HERO MOMENT — Family Gathering Illustration emerges from darkness
      .fromTo(
        familyGlowRef.current,
        { opacity: 0, scale: 0.75 },
        { opacity: 0.85, scale: 1.1, duration: 1.2, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(
        familyImgRef.current,
        {
          opacity: 0,
          y: 25,
          scale: 0.94,
          filter: "brightness(0.65) blur(3px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "brightness(1) blur(0px)",
          duration: 1.4,
          ease: "power2.out",
        },
        "-=1.0"
      )

      // STEP 5: Calligraphy — "With hearts full of joy," (handwriting-style masked reveal)
      .fromTo(
        calligraphyLineRef.current,
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", opacity: 0 },
        { clipPath: "polygon(0% 0%, 120% 0%, 120% 100%, 0% 100%)", opacity: 1, duration: 1.1, ease: "power2.out" },
        "-=0.25"
      )
      // "our families welcome you to celebrate the beginning of their beautiful journey."
      .fromTo(
        welcomeSubRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        subDividerRef.current,
        { opacity: 0, scaleX: 0.6 },
        { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )

      // STEP 6: Supporting Blessing Message
      .fromTo(
        blessingBlockRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        tamilDividerRef.current,
        { opacity: 0, scaleX: 0.6 },
        { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )

      // STEP 7: Sacred Tamil Message & Bottom Accent
      .fromTo(
        tamilBlockRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        bottomEmblemRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="family-blessings-section"
      id="family-blessings"
      aria-label="Family Blessings and Welcome"
    >
      {/* 2.5D Atmospheric Depth Background */}
      <div className="family-atmosphere-bg">
        <div ref={bgGlowRef} className="family-golden-radiance" aria-hidden="true" />
        <div className="family-mandapam-vignette" aria-hidden="true" />
      </div>

      {/* Foreground Natural Banana Leaves for Cinematic Framing */}
      <div className="family-framing-leaves" aria-hidden="true">
        <img
          ref={leftLeafRef}
          src="/assets/doors/banana-leaves-left.png"
          alt=""
          className="family-leaf-sway leaf-left"
        />
        <img
          ref={rightLeafRef}
          src="/assets/doors/banana-leaves-right.png"
          alt=""
          className="family-leaf-sway leaf-right"
        />
      </div>

      {/* Flanking Corner Brass Kuthu Vilakku Lamps */}
      <div ref={lampLeftRef} className="family-corner-lamp lamp-pos-left" aria-hidden="true">
        <KuthuVilakku size={44} />
      </div>
      <div ref={lampRightRef} className="family-corner-lamp lamp-pos-right" aria-hidden="true">
        <KuthuVilakku size={44} />
      </div>

      {/* Sparse Drifting Flower Petals & Golden Dust */}
      <div className="family-floating-particles" aria-hidden="true">
        <span className="fam-particle fp1" />
        <span className="fam-particle fp2" />
        <span className="fam-particle fp3" />
        <span className="fam-petal fpet1" />
        <span className="fam-petal fpet2" />
        <span className="fam-petal fpet3" />
      </div>

      {/* Main Content Flow — Seamless Pure Scene Integration (NO Card Box) */}
      <div className="family-content-wrapper">
        {/* Upper Zone: Traditional Lotus Crown & Royal Title */}
        <header className="family-header-zone">
          <div ref={topCrownRef}>
            <TopLotusCrown />
          </div>

          <p ref={withBlessingsRef} className="family-eyebrow">
            WITH THE BLESSINGS OF
          </p>

          <h2 ref={ourFamiliesRef} className="family-main-title gold-text">
            OUR FAMILIES
          </h2>

          <div ref={titleDividerRef}>
            <TraditionalGoldDivider />
          </div>
        </header>

        {/* Center Zone: HERO MOMENT — Family Gathering Illustration */}
        <div className="family-hero-stage">
          <div ref={familyGlowRef} className="family-stage-aura" aria-hidden="true" />
          <div className="family-image-container">
            <img
              ref={familyImgRef}
              src="/assets/family/family-gathering-hero.png"
              alt="Jayaprakash, Srimathi and both families gathered together in traditional South Indian wedding attire, showering blessings and flower petals"
              className="family-hero-image"
              loading="eager"
            />
          </div>
        </div>

        {/* Lower Zone: Calligraphy Welcome & Blessings */}
        <div className="family-invitation-words">
          {/* Main Calligraphy Line: With hearts full of joy, */}
          <p ref={calligraphyLineRef} className="family-calligraphy-joy">
            With hearts full of joy,
          </p>

          {/* Sub Welcome Line */}
          <div ref={welcomeSubRef} className="family-welcome-sub-block">
            <p className="welcome-sub-line">
              our families welcome you to celebrate
            </p>
            <p className="welcome-sub-line">
              the beginning of their beautiful journey.
            </p>
          </div>

          <div ref={subDividerRef}>
            <TraditionalGoldDivider />
          </div>

          {/* Supporting Blessing Paragraph */}
          <div ref={blessingBlockRef} className="family-blessing-body">
            <p className="blessing-line">
              Your esteemed presence, heartfelt prayers,
            </p>
            <p className="blessing-line">
              and warm blessings will make this auspicious day
            </p>
            <p className="blessing-line">
              truly unforgettable.
            </p>
          </div>

          {/* Sacred Tamil Closing Lines */}
          <div ref={tamilDividerRef}>
            <TraditionalGoldDivider />
          </div>

          <div ref={tamilBlockRef} className="family-tamil-closing-block">
            <p className="tamil-closing-line lead">
              இவண்: மணமக்கள் மற்றும் குடும்பத்தினர்
            </p>
            <p className="tamil-closing-line sub">
              !! அன்புடன் - உங்கள் அனைவரையும் வரவேற்கிறோம் !!
            </p>
          </div>

          {/* Bottom Delicate Accent */}
          <div ref={bottomEmblemRef}>
            <BottomFloralAccent />
          </div>

          {/* Return to Top Button at the End of Invitation */}
          <div
            className="scene-scroll-prompt in-flow family-scroll-prompt"
            onClick={handleScrollToTop}
            role="button"
            tabIndex={0}
            aria-label="Back to beginning of wedding invitation"
          >
            <div className="prompt-aura-glow" aria-hidden="true" />
            <div className="prompt-pill-inner">
              <span className="prompt-star-icon">✦</span>
              <span className="prompt-main-text">BACK TO TOP</span>
              <span className="prompt-down-arrow prompt-up-arrow" aria-hidden="true">↑</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyBlessings;
