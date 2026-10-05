import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MandalaDivider,
  LotusMotif,
  NameFlourish,
  AmpersandMedallion,
  NamesUnderlineFrame,
  GoldenLotusDivider,
} from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

export const CoupleReveal = () => {
  const containerRef = useRef(null);
  const coupleImgRef = useRef(null);
  const peacockImgRef = useRef(null);
  const featherShimmerRef = useRef(null);
  const centerFlareRef = useRef(null);

  // Dedicated refs for the names & invitation typography block
  const namesBlockRef = useRef(null);
  const namesAuraBeamRef = useRef(null);
  const leftFlourishRef = useRef(null);
  const groomRef = useRef(null);
  const ampersandRef = useRef(null);
  const brideRef = useRef(null);
  const rightFlourishRef = useRef(null);
  const namesFrameRef = useRef(null);
  const calligraphyLeadRef = useRef(null);
  const serifBodyRef = useRef(null);
  const lotusDividerRef = useRef(null);
  const tamilQuoteRef = useRef(null);

  const [hasAnimated, setHasAnimated] = useState(false);
  const namesTimelineRef = useRef(null);
  const namesRevealedRef = useRef(false);

  // Dedicated calligraphy-style reveal animation for the names and invitation message
  const playNamesAndQuoteReveal = (force = false) => {
    if (namesRevealedRef.current && !force) {
      return;
    }
    namesRevealedRef.current = true;

    if (namesTimelineRef.current) {
      namesTimelineRef.current.kill();
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Initial states:
    // Groom & Bride start completely masked from right (clipPath inset)
    // so they reveal smoothly left-to-right as if written by an invisible calligraphy brush!
    gsap.set(namesAuraBeamRef.current, { scaleX: 0, opacity: 0 });
    gsap.set(groomRef.current, {
      clipPath: "inset(-14px 100% -14px 0%)",
      opacity: 1,
    });
    gsap.set(leftFlourishRef.current, {
      opacity: 0,
      scaleX: 0,
      transformOrigin: "right center",
    });
    gsap.set(ampersandRef.current, {
      opacity: 0,
      scale: 0.35,
    });
    gsap.set(brideRef.current, {
      clipPath: "inset(-14px 100% -14px 0%)",
      opacity: 1,
    });
    gsap.set(rightFlourishRef.current, {
      opacity: 0,
      scaleX: 0,
      transformOrigin: "left center",
    });
    gsap.set(namesFrameRef.current, {
      opacity: 0,
      scaleX: 0,
      transformOrigin: "center center",
    });
    gsap.set(calligraphyLeadRef.current, {
      opacity: 0,
      y: 18,
    });
    gsap.set(serifBodyRef.current, {
      opacity: 0,
      y: 16,
    });
    gsap.set(lotusDividerRef.current, {
      opacity: 0,
      scale: 0.6,
      transformOrigin: "center center",
    });
    gsap.set(tamilQuoteRef.current, {
      opacity: 0,
      y: 14,
    });

    tl
      // 0. Soft golden aura beam sweeps across
      .to(namesAuraBeamRef.current, {
        opacity: 0.85,
        scaleX: 1,
        duration: 0.35,
        ease: "power2.out",
      })
      .to(
        namesAuraBeamRef.current,
        {
          opacity: 0,
          scaleX: 1.3,
          duration: 0.25,
          ease: "power2.in",
        },
        "-=0.08"
      )
      // 1. JAYAPRAKASH calligraphy brush wipe reveal (smooth left to right)
      .to(
        groomRef.current,
        {
          clipPath: "inset(-14px 0% -14px 0%)",
          duration: 0.85,
          ease: "power1.inOut",
        },
        "-=0.15"
      )
      // Left flourish unrolls gracefully
      .to(
        leftFlourishRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.65"
      )
      // 2. Center "&" circular sunburst medallion blooms in
      .to(
        ampersandRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.15"
      )
      // 3. SRIMATHI calligraphy brush wipe reveal (smooth left to right)
      .to(
        brideRef.current,
        {
          clipPath: "inset(-14px 0% -14px 0%)",
          duration: 0.8,
          ease: "power1.inOut",
        },
        "-=0.1"
      )
      // Right flourish unrolls gracefully
      .to(
        rightFlourishRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.55"
      )
      // 4. Subtle ornamental underline frame expands under names
      .to(
        namesFrameRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.35"
      )
      // 5. Cursive Calligraphy Lead Line: "Together with their beloved families,"
      .to(
        calligraphyLeadRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
        },
        "-=0.25"
      )
      // 6. Elegant Serif Body Lines: "cordially invite you and your esteemed family..."
      .to(
        serifBodyRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
        },
        "-=0.4"
      )
      // 7. Auspicious Golden Lotus Divider blooms
      .to(
        lotusDividerRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.35"
      )
      // 8. Sacred Tamil Wedding Blessing in Noto Serif Tamil
      .to(
        tamilQuoteRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.35"
      );

    namesTimelineRef.current = tl;
    return tl;
  };

  // 1. Peacock feathers opening & couple arrival animation
  const playPeacockCoupleReveal = () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Step 0: Initial states for peacock and couple
    gsap.set(peacockImgRef.current, {
      scale: 0.65,
      scaleY: 0.7,
      opacity: 0,
      filter: "brightness(0.6) blur(6px)",
      transformOrigin: "bottom center",
    });
    gsap.set(coupleImgRef.current, {
      y: 90,
      scale: 0.82,
      opacity: 0,
      filter: "blur(4px)",
    });
    gsap.set(centerFlareRef.current, {
      scale: 0,
      opacity: 0,
    });
    gsap.set(featherShimmerRef.current, {
      opacity: 0,
      scale: 0.6,
    });

    // Step 1: Peacock enters and feathers expand open in a glorious fan arc
    tl.to(peacockImgRef.current, {
      opacity: 1,
      scale: 1.05,
      scaleY: 1.02,
      filter: "brightness(1.2) blur(0px) drop-shadow(0 0 35px rgba(228, 196, 119, 0.75))",
      duration: 1.6,
      ease: "power2.out",
    })
      // Feather shimmering wave travels across
      .to(
        featherShimmerRef.current,
        {
          opacity: 0.9,
          scale: 1.4,
          duration: 1,
          ease: "sine.inOut",
        },
        "-=1.1"
      )
      .to(
        featherShimmerRef.current,
        {
          opacity: 0,
          scale: 1.8,
          duration: 0.6,
        },
        "-=0.4"
      )
      // Step 2: Radiant golden burst flare explodes from center of feathers
      .to(
        centerFlareRef.current,
        {
          scale: 2.5,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .to(
        centerFlareRef.current,
        {
          scale: 3.2,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.1"
      )
      // Step 3: Couple emerges and arrives from within the opened peacock plumage
      .to(
        coupleImgRef.current,
        {
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px) drop-shadow(0 20px 45px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 30px rgba(228, 196, 119, 0.6))",
          duration: 1.5,
          ease: "power2.out",
        },
        "-=0.8"
      )
      // Peacock feathers gently settle into throne position framing the couple
      .to(
        peacockImgRef.current,
        {
          scale: 1,
          filter: "brightness(1) blur(0px) drop-shadow(0 15px 30px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 20px rgba(200, 164, 93, 0.4))",
          duration: 1,
        },
        "-=0.8"
      );

    tl.eventCallback("onComplete", () => {
      // Gentle continuous floating when idle once reveal completes
      gsap.to(coupleImgRef.current, {
        y: -6,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(peacockImgRef.current, {
        y: -8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    setHasAnimated(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial hidden states
      gsap.set(peacockImgRef.current, {
        scale: 0.65,
        scaleY: 0.7,
        opacity: 0,
        filter: "brightness(0.6) blur(6px)",
        transformOrigin: "bottom center",
      });
      gsap.set(coupleImgRef.current, {
        y: 80,
        scale: 0.82,
        opacity: 0,
        filter: "blur(4px)",
      });
      gsap.set(centerFlareRef.current, { scale: 0, opacity: 0 });
      gsap.set(featherShimmerRef.current, { opacity: 0, scale: 0.6 });

      // 1. Trigger peacock reveal when scrolling into the peacock stage
      ScrollTrigger.create({
        trigger: ".peacock-couple-stage",
        start: "top 78%",
        once: true,
        onEnter: () => {
          playPeacockCoupleReveal();
        },
      });

      // 2. Trigger names block reveal when user scrolls into the names section
      ScrollTrigger.create({
        trigger: namesBlockRef.current,
        start: "top 78%",
        once: true,
        onEnter: () => {
          if (!namesRevealedRef.current) {
            playNamesAndQuoteReveal(true);
          }
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="couple-reveal-section" id="couple-reveal">
      {/* Authentic South Indian Temple Mandapam Archway Background */}
      <div className="couple-temple-bg">
        <img
          src="/assets/backgrounds/temple-mandapam-arch.jpg"
          alt="Temple Mandapam Arch with Marigold & Mango Thoranam"
          className="mandapam-bg-img"
          loading="lazy"
        />
        <div className="mandapam-bg-overlay" />
        <div className="mandapam-golden-glow" />
      </div>

      <div className="couple-reveal-inner">
        {/* Section Pre-Header */}
        <div className="section-pre-header">
          <span className="subtle-pre-title">TWO SOULS • ONE SACRED DESTINY</span>
          <LotusMotif size={28} />
        </div>

        {/* The Peacock Feathers Opening & Couple Arrival Stage */}
        <div className="peacock-couple-stage">
          {/* Central Radiant Golden Flare Burst */}
          <div ref={centerFlareRef} className="peacock-feather-burst-flare" />

          {/* Golden feather shimmer wave */}
          <div ref={featherShimmerRef} className="peacock-feather-shimmer-ring" />

          {/* Royal Peacock Whose Feathers Open Wide */}
          <div className="peacock-plumage-wrapper">
            <img
              ref={peacockImgRef}
              src="/assets/peacock/peacock-hero.png"
              alt="Royal Peacock with Golden Feathers Opening"
              className="peacock-hero-img-opening"
              loading="eager"
            />
          </div>

          {/* Jayaprakash & Srimathi — Emerging From The Peacock's Feather Plumes */}
          <div className="couple-arrival-wrapper">
            <div className="couple-golden-aura-halo" />
            <img
              ref={coupleImgRef}
              src="/assets/couple/couple-hero.png"
              alt="Jayaprakash & Srimathi in Traditional South Indian Attire"
              className="couple-arrival-img"
              loading="eager"
            />
          </div>
        </div>

        {/* Replay Arrival Micro Button */}
        {hasAnimated && (
          <button
            onClick={() => {
              namesRevealedRef.current = false;
              playPeacockCoupleReveal();
            }}
            className="replay-arrival-btn"
            title="Replay Peacock Feather Opening & Couple Arrival"
          >
            <span className="replay-icon">✨</span>
            <span>Replay Peacock Reveal</span>
          </button>
        )}

        {/* Names & Auspicious Typography Block with Dedicated Calligraphy Entrance Animation */}
        <div ref={namesBlockRef} className="couple-names-block">
          {/* Subtle Golden Beam */}
          <div ref={namesAuraBeamRef} className="names-aura-beam" />

          {/* Luxury Wedding Serif Names Row flanked by Royal Flourishes & Center Medallion */}
          <div className="names-title-row">
            <span ref={leftFlourishRef} className="name-flourish-wrap flourish-wrap-left">
              <NameFlourish direction="left" />
            </span>

            <h1 ref={groomRef} className="couple-name-groom gold-text">
              JAYAPRAKASH
            </h1>

            <div ref={ampersandRef} className="ampersand-medallion-anchor">
              <AmpersandMedallion />
            </div>

            <h1 ref={brideRef} className="couple-name-bride gold-text">
              SRIMATHI
            </h1>

            <span ref={rightFlourishRef} className="name-flourish-wrap flourish-wrap-right">
              <NameFlourish direction="right" />
            </span>
          </div>

          {/* Delicate Underline Frame directly below names */}
          <div ref={namesFrameRef} className="names-frame-wrap">
            <NamesUnderlineFrame />
          </div>

          {/* Invitation Message & Sacred Tamil Blessing */}
          <div className="couple-invitation-message">
            {/* Lead Calligraphy Line in Great Vibes */}
            <p ref={calligraphyLeadRef} className="invite-calligraphy-lead">
              Together with their beloved families,
            </p>

            {/* Body Invitation Lines in Cormorant Garamond Luxury Serif */}
            <p ref={serifBodyRef} className="invite-serif-body">
              cordially invite you and your esteemed family to shower your
              <br className="desktop-break" />
              {" "}warmest blessings upon the sacred celebration of their wedding.
            </p>

            {/* Auspicious Golden Lotus Motif Divider */}
            <div ref={lotusDividerRef} className="quote-lotus-divider">
              <GoldenLotusDivider size={32} />
            </div>

            {/* Sacred Tamil Wedding Blessing in Noto Serif Tamil */}
            <p ref={tamilQuoteRef} className="tamil-traditional-quote auspicious-wedding-blessing">
              <span className="tamil-quote-mark left">“</span>
              <span className="tamil-quote-text">இருமனம் இணைந்து, இல்லறம் சிறந்து, வாழையடி வாழையென வாழ்க பல்லாண்டு!</span>
              <span className="tamil-quote-mark right">”</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
