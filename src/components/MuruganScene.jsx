import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KuthuVilakku } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

export const MuruganScene = ({ isOpened }) => {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const bgLayerRef = useRef(null);
  const divineAuraRef = useRef(null);
  const titleGlowRef = useRef(null);
  const shlokaRef = useRef(null);
  const leadRef = useRef(null);
  const titleRef = useRef(null);
  const dividerRef = useRef(null);
  const quoteRef = useRef(null);
  const quoteLine1Ref = useRef(null);
  const quoteLine2Ref = useRef(null);
  const quoteAttributionRef = useRef(null);
  const muruganImgRef = useRef(null);
  const celestialFlareRef = useRef(null);
  const celestialRaysRef = useRef(null);
  const crownHaloRef = useRef(null);
  const lampLeftRef = useRef(null);
  const lampRightRef = useRef(null);
  const leafLeftRef = useRef(null);
  const leafRightRef = useRef(null);
  const hasPlayedRef = useRef(false);

  // Cinematic incoming animation sequence
  const playMuruganEntrance = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        // Idle gentle float on Lord Murugan only AFTER grand entrance completes
        gsap.to(muruganImgRef.current, {
          y: -6,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        // Idle continuous celestial rays slow rotation
        gsap.to(celestialRaysRef.current, {
          rotation: "+=360",
          duration: 90,
          repeat: -1,
          ease: "none",
        });
      },
    });

    // Initial state setup: screen starts in dark, calm temple sanctum
    gsap.set(cameraRef.current, { scale: 1.02 });
    gsap.set(bgLayerRef.current, { opacity: 0 });
    gsap.set([leafLeftRef.current, leafRightRef.current], {
      opacity: 0,
      y: 18,
    });
    gsap.set(shlokaRef.current, {
      opacity: 0,
      y: 14,
      letterSpacing: "0.08em",
    });
    gsap.set(leadRef.current, {
      opacity: 0,
      y: 12,
      letterSpacing: "0.22em",
    });
    gsap.set(titleGlowRef.current, { opacity: 0, scale: 0.75 });
    gsap.set(titleRef.current, {
      opacity: 0,
      y: 18,
      scale: 0.96,
      filter: "blur(6px)",
    });
    gsap.set(dividerRef.current, { opacity: 0, scaleX: 0 });
    gsap.set([quoteLine1Ref.current, quoteLine2Ref.current, quoteAttributionRef.current], {
      opacity: 0,
      y: 12,
      filter: "blur(4px)",
    });
    gsap.set(celestialFlareRef.current, { opacity: 0, scale: 0.15 });
    gsap.set(celestialRaysRef.current, { opacity: 0, scale: 0.35, rotation: -25 });
    gsap.set(crownHaloRef.current, { opacity: 0, scale: 0.6 });
    gsap.set(divineAuraRef.current, { opacity: 0, scale: 0.55 });
    gsap.set(muruganImgRef.current, {
      opacity: 0,
      y: 0,
      scale: 0.86,
      filter: "blur(22px) brightness(2.6) saturate(1.3)",
      transformOrigin: "center 65%",
    });
    gsap.set([lampLeftRef.current, lampRightRef.current], {
      opacity: 0,
      scale: 0.88,
      y: 16,
    });

    tl
      // STEP 1 — INITIAL ATMOSPHERE (0s - 1.8s)
      // Subtle camera push-in: scale 1.02 -> 1.05 over 6.8s
      .to(
        cameraRef.current,
        {
          scale: 1.05,
          duration: 6.8,
          ease: "sine.out",
        },
        0
      )
      // Slowly reveal temple / gopuram background from darkness
      .to(
        bgLayerRef.current,
        {
          opacity: 1,
          duration: 1.8,
          ease: "power2.out",
        },
        0.1
      )
      // Banana leaves frame edges with very gentle natural sway
      .to(
        [leafLeftRef.current, leafRightRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: "power2.out",
          stagger: 0.2,
        },
        0.3
      )

      // STEP 2 — TAMIL BLESSING (Reveals First) (~0.6s)
      .to(
        shlokaRef.current,
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.18em",
          duration: 0.95,
          ease: "power2.out",
        },
        0.6
      )

      // STEP 3 — ENGLISH BLESSING (~1.5s)
      .to(
        leadRef.current,
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.28em",
          duration: 0.85,
          ease: "power2.out",
        },
        1.5
      )

      // STEP 4 — LORD MURUGAN TITLE & GOLDEN AURA (~2.3s)
      .to(
        titleGlowRef.current,
        {
          opacity: 0.65,
          scale: 1.05,
          duration: 1.0,
          ease: "power2.out",
        },
        2.25
      )
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power3.out",
        },
        2.3
      )
      .to(
        dividerRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        2.85
      )

      // STEP 5 — THIRUKKURAL QUOTE (Two Stages + Attribution) (~3.2s)
      // Line 1 appears softly
      .to(
        quoteLine1Ref.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        },
        3.2
      )
      // Line 2 follows shortly after
      .to(
        quoteLine2Ref.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        },
        3.8
      )
      // Attribution appears last
      .to(
        quoteAttributionRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power2.out",
        },
        4.35
      )

      // STEP 6 — CELESTIAL DIVINE LIGHT AWAKENING & SACRED ARRIVAL
      // 6.1: Soft, soothing Celestial Light Beam & delicate Sunburst Rays bloom at the sanctum center
      .to(
        celestialFlareRef.current,
        {
          opacity: 0.75,
          scale: 1.6,
          duration: 1.3,
          ease: "power2.out",
        },
        3.25
      )
      .to(
        celestialRaysRef.current,
        {
          opacity: 0.36,
          scale: 1.15,
          rotation: 25,
          duration: 2.0,
          ease: "power2.out",
        },
        3.25
      )
      .to(
        divineAuraRef.current,
        {
          opacity: 0.72,
          scale: 1.12,
          duration: 1.6,
          ease: "power2.out",
        },
        3.35
      )
      // 6.2: Lord Murugan gracefully manifests out of the heart of the celestial golden light
      .to(
        muruganImgRef.current,
        {
          opacity: 1,
          duration: 1.1,
          ease: "power2.inOut",
        },
        3.45
      )
      .to(
        muruganImgRef.current,
        {
          scale: 1.02,
          duration: 1.8,
          ease: "power2.out",
        },
        3.45
      )
      .to(
        muruganImgRef.current,
        {
          filter: "blur(0px) brightness(1.0) saturate(1.0)",
          duration: 1.2,
          ease: "power2.out",
        },
        3.45
      )
      .to(
        muruganImgRef.current,
        {
          scale: 1,
          duration: 0.8,
          ease: "sine.out",
        },
        4.5
      )
      // 6.3: Celestial light bloom softens into a tranquil, eye-soothing golden halo
      .to(
        celestialFlareRef.current,
        {
          opacity: 0,
          scale: 1.3,
          duration: 1.2,
          ease: "sine.out",
        },
        4.4
      )
      .to(
        celestialRaysRef.current,
        {
          opacity: 0.1,
          duration: 1.3,
          ease: "sine.out",
        },
        4.4
      )
      .to(
        crownHaloRef.current,
        {
          opacity: 0.75,
          scale: 1,
          duration: 1.0,
          ease: "power2.out",
        },
        4.5
      )
      .to(
        divineAuraRef.current,
        {
          opacity: 0.52,
          scale: 1.02,
          duration: 1.2,
          ease: "sine.inOut",
        },
        4.6
      )
      // STEP 7 — FLANKING LAMPS (Warm brass lamps illuminate with living flame auras)
      .to(
        [lampLeftRef.current, lampRightRef.current],
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          stagger: 0.15,
        },
        4.7
      );

    hasPlayedRef.current = true;
  };

  // Play animation when the invitation door opens
  useEffect(() => {
    if (isOpened && !hasPlayedRef.current) {
      const timer = setTimeout(() => {
        playMuruganEntrance();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpened]);

  // Devotional idle lighting, living flame respiration, and scroll choreography
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Divine Aura subtle breathing pulse (opacity 0.65 -> 0.8 -> 0.65 over 4.2s)
      gsap.to(divineAuraRef.current, {
        opacity: 0.82,
        scale: 1.05,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax depth with ScrollTrigger across layers
      // Background Raja Gopuram moves slowly in perspective
      gsap.to(bgLayerRef.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Foreground auspicious wedding banana trees move gently with camera parallax
      gsap.to(leafLeftRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(leafRightRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      // ScrollTrigger for replay if scrolled back into view
      ScrollTrigger.create({
        trigger: sceneRef.current,
        start: "top 65%",
        onEnter: () => {
          if (isOpened && !hasPlayedRef.current) {
            playMuruganEntrance();
          }
        },
      });
    }, sceneRef);

    return () => ctx.revert();
  }, [isOpened]);

  return (
    <section ref={sceneRef} className="murugan-scene-section" id="murugan-scene">
      {/* 2.5D Cinematic Camera Stage */}
      <div ref={cameraRef} className="murugan-camera-stage">
        {/* Layer 1: Background — Authentic Tamil Nadu Temple Gopuram */}
        <div ref={bgLayerRef} className="murugan-sanctum-bg">
          <img
            src="/assets/backgrounds/tamil-nadu-temple-gopuram.jpg"
            alt="Tamil Nadu Temple Raja Gopuram"
            className="murugan-temple-bg-img"
            loading="eager"
          />
          <div className="temple-bg-vignette" />
          <div className="temple-light-cone" />
          <div className="temple-golden-aura" />
        </div>

        {/* Ambient Sacred Temple Particles & Gold Embers */}
        <div className="murugan-temple-particles" aria-hidden="true">
          <span className="temple-ember e1" />
          <span className="temple-ember e2" />
          <span className="temple-ember e3" />
          <span className="temple-ember e4" />
          <span className="temple-ember e5" />
          <span className="temple-ember e6" />
        </div>

        {/* Subtle Peacock Feather Motif Accent in Midground Atmosphere */}
        <div className="murugan-feather-accent" aria-hidden="true">
          <svg width="42" height="84" viewBox="0 0 50 100" fill="none" className="feather-accent-svg">
            <defs>
              <linearGradient id="muruganFeatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2A9D8F" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#D4AF37" stopOpacity="0.35" />
                <stop offset="80%" stopColor="#1D3557" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#E76F51" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path d="M25 95 C25 60 25 35 25 15" stroke="rgba(212, 175, 55, 0.35)" strokeWidth="1.2" />
            <ellipse cx="25" cy="22" rx="14" ry="18" fill="url(#muruganFeatherGrad)" />
            <circle cx="25" cy="22" r="7.5" fill="rgba(3, 20, 24, 0.6)" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="25" cy="22" r="3.5" fill="#0E4C57" />
          </svg>
        </div>

        {/* Layer 2: Main Devotional Text & Divine Centerpiece */}
        <div className="murugan-scene-content">
          <div className="murugan-devotional-text">
            {/* Sacred Tamil Mantra with Calligraphy Progressive Reveal */}
            <div className="tamil-shloka-container">
              <p ref={shlokaRef} className="tamil-shloka">
                ॥ வெற்றிவேல் முருகனுக்கு அரோகரா ॥
              </p>
            </div>

            {/* Classical English Lead */}
            <h2 ref={leadRef} className="murugan-english-lead">
              WITH THE DIVINE BLESSINGS OF
            </h2>

            {/* LORD MURUGAN — Refined Classical Typography with Sacred Gold Bloom */}
            <div className="murugan-title-wrapper">
              <div ref={titleGlowRef} className="murugan-title-golden-aura" aria-hidden="true" />
              <h1 ref={titleRef} className="murugan-title">
                LORD MURUGAN
              </h1>
            </div>

            {/* Delicate Sacred Gold Divider */}
            <div ref={dividerRef} className="murugan-divider-wrap">
              <div className="murugan-sacred-line left" />
              <div className="murugan-center-motif">
                <span className="motif-star">✦</span>
                <svg width="22" height="18" viewBox="0 0 24 20" fill="none" className="motif-lotus-svg" aria-hidden="true">
                  <defs>
                    <linearGradient id="motifGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF4D0" />
                      <stop offset="50%" stopColor="#E5C77A" />
                      <stop offset="100%" stopColor="#C8A45D" />
                    </linearGradient>
                  </defs>
                  <path d="M12 1.5 C10.8 6.5 10 12 12 16 C14 12 13.2 6.5 12 1.5 Z" fill="url(#motifGoldGrad)" />
                  <path d="M12 7 C8.5 7 5 11 4.5 16 C8 16 11 12 12 7 Z" fill="url(#motifGoldGrad)" opacity="0.85" />
                  <path d="M12 7 C15.5 7 19 11 19.5 16 C16 16 13 12 12 7 Z" fill="url(#motifGoldGrad)" opacity="0.85" />
                </svg>
                <span className="motif-star">✦</span>
              </div>
              <div className="murugan-sacred-line right" />
            </div>

            {/* Sacred Tamil Divine Blessing — Floating Naturally in the Temple Atmosphere (NO CARD BOX!) */}
            <div ref={quoteRef} className="murugan-floating-blessing">
              <p className="kural-lines">
                <span ref={quoteLine1Ref} className="kural-line kural-line-1">
                  “செந்தில் ஆண்டவன் திருவருளால் மங்கலங்கள் பொங்க,
                </span>
                <span ref={quoteLine2Ref} className="kural-line kural-line-2">
                  இல்லறத்தில் மகிழ்ச்சியும் நலமும் பெருகி வாழ்க!”
                </span>
              </p>
              <span ref={quoteAttributionRef} className="kural-attribution">— தெய்வீக ஆசி</span>
            </div>
          </div>

          {/* Layer 3: Lord Murugan Central Visual Stage with Living Lamps */}
          <div className="murugan-visual-stage">
            {/* Left Kuthu Vilakku with Living Flame Glow */}
            <div ref={lampLeftRef} className="sanctum-lamp sanctum-lamp-left">
              <div className="lamp-glow-aura" />
              <KuthuVilakku size={56} />
            </div>

            {/* Central Murugan Artwork Container */}
            <div className="murugan-artwork-container">
              {/* Sacred Celestial Rotating Rays */}
              <div ref={celestialRaysRef} className="murugan-celestial-rays" aria-hidden="true" />

              {/* Radiant Celestial Light Flare Centerpiece */}
              <div ref={celestialFlareRef} className="murugan-celestial-light-flare" aria-hidden="true" />

              {/* Soft Divine Golden Light Aura behind Lord Murugan */}
              <div ref={divineAuraRef} className="murugan-divine-aura" aria-hidden="true" />

              {/* Crown Halo */}
              <div ref={crownHaloRef} className="murugan-crown-halo" aria-hidden="true" />

              <img
                ref={muruganImgRef}
                src="/assets/murugan/murugan-vel.png"
                alt="Lord Murugan with Sacred Vel and Peacock"
                className="murugan-hero-img"
                loading="eager"
              />
            </div>

            {/* Right Kuthu Vilakku with Living Flame Glow */}
            <div ref={lampRightRef} className="sanctum-lamp sanctum-lamp-right">
              <div className="lamp-glow-aura" />
              <KuthuVilakku size={56} />
            </div>
          </div>
        </div>

        {/* Layer 4: Traditional Auspicious Wedding Banana Trees (Vazhai Maram) Framing the Sanctum */}
        <div ref={leafLeftRef} className="sanctum-vazhai-tree sanctum-vazhai-left" aria-hidden="true">
          <div className="vazhai-trunk-layer">
            <img
              src="/assets/decorations/banana-tree-trunk.png"
              alt=""
              className="vazhai-part-img"
              loading="eager"
            />
          </div>
          <div className="vazhai-canopy-layer vazhai-canopy-anim-left">
            <img
              src="/assets/decorations/banana-tree-canopy.png"
              alt=""
              className="vazhai-part-img"
              loading="eager"
            />
          </div>
        </div>

        <div ref={leafRightRef} className="sanctum-vazhai-tree sanctum-vazhai-right" aria-hidden="true">
          <div className="vazhai-trunk-layer">
            <img
              src="/assets/decorations/banana-tree-trunk.png"
              alt=""
              className="vazhai-part-img"
              loading="eager"
            />
          </div>
          <div className="vazhai-canopy-layer vazhai-canopy-anim-right">
            <img
              src="/assets/decorations/banana-tree-canopy.png"
              alt=""
              className="vazhai-part-img"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
