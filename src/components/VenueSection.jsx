import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const VenueSection = () => {
  const containerRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const bgImageRef = useRef(null);
  const facadeGlowRef = useRef(null);
  const goldBloomRef = useRef(null);
  const lampLeftRef = useRef(null);
  const lampRightRef = useRef(null);
  const leavesLeftRef = useRef(null);
  const leavesRightRef = useRef(null);
  const headerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const dividerRef = useRef(null);
  const venueNameRef = useRef(null);
  const addressRef = useRef(null);
  const dateTimeRef = useRef(null);
  const lineRef = useRef(null);
  const actionsRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // 1. Initial states: Venue building starts in a soft, dreamy dusk silhouette with deep blur & warm golden amber mist
      gsap.set(bgImageRef.current, {
        opacity: 0.25,
        scale: 1.12,
        y: 45,
        filter: "blur(14px) brightness(0.45) saturate(0.75)",
        transformOrigin: "center 40%",
      });
      gsap.set(facadeGlowRef.current, {
        opacity: 0,
        scale: 0.6,
      });
      gsap.set(goldBloomRef.current, {
        opacity: 0,
        scale: 0.7,
      });
      gsap.set([lampLeftRef.current, lampRightRef.current], {
        opacity: 0,
        scale: 0.6,
      });
      gsap.set(leavesLeftRef.current, {
        opacity: 0,
        x: -45,
        rotation: -8,
      });
      gsap.set(leavesRightRef.current, {
        opacity: 0,
        x: 45,
        rotation: 8,
      });
      gsap.set([eyebrowRef.current, titleRef.current, dividerRef.current], {
        opacity: 0,
        y: 18,
      });
      gsap.set([venueNameRef.current, addressRef.current, dateTimeRef.current, lineRef.current, actionsRef.current], {
        opacity: 0,
        y: 20,
      });

      // 2. Phased ScrollTrigger Timeline (Cinematic Entry Sequence)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 72%",
          once: true,
        },
        defaults: { ease: "power2.out" },
      });

      tl
        // Step 1: Golden Divine Aura & sunrise bloom ignites behind the palace
        .to(
          facadeGlowRef.current,
          {
            opacity: 0.9,
            scale: 1.25,
            duration: 1.8,
            ease: "power2.out",
          },
          0
        )
        .to(
          facadeGlowRef.current,
          {
            opacity: 0.55,
            scale: 1.05,
            duration: 1.2,
            ease: "sine.inOut",
          },
          1.2
        )
        .to(
          goldBloomRef.current,
          {
            opacity: 0.8,
            scale: 1.1,
            duration: 1.6,
            ease: "power2.out",
          },
          0.1
        )
        // Step 2: The Royal Venue Building smoothly glides up, de-blurring into crisp grandeur, illuminated by golden dawn light
        .to(
          bgImageRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1.02,
            filter: "blur(0px) brightness(1.06) saturate(1.1)",
            duration: 2.1,
            ease: "power3.out",
          },
          0.15
        )
        .to(
          bgImageRef.current,
          {
            filter: "blur(0px) brightness(1.0) saturate(1.0)",
            duration: 1.0,
            ease: "sine.out",
          },
          1.8
        )
        // Step 3: Foreground Banana Leaves part gently like ceremonial curtains welcoming the guest
        .to(
          [leavesLeftRef.current, leavesRightRef.current],
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 1.4,
            stagger: 0.15,
            ease: "power2.out",
          },
          0.5
        )
        // Step 4: Corner Brass Lamps ignite with living flame glow
        .to(
          [lampLeftRef.current, lampRightRef.current],
          {
            opacity: 1,
            scale: 1,
            duration: 1.0,
            stagger: 0.2,
            ease: "power2.out",
          },
          0.7
        )
        // Step 5: Eyebrow "JOIN US IN CELEBRATION" reveals smoothly
        .to(
          eyebrowRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
          },
          0.9
        )
        // Step 6: "THE AUSPICIOUS VENUE" title unfolds with royal presence
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
          },
          1.1
        )
        // Step 7: Golden diamond divider
        .to(
          dividerRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "power2.out",
          },
          1.3
        )
        // Step 8: Hero Venue Name "V.R. MAHAL (A/C)" glides into position
        .to(
          venueNameRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          1.45
        )
        // Step 9: Location & Timing Information
        .to(
          [addressRef.current, dateTimeRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
          },
          1.65
        )
        // Step 10: Ornamental Gold Divider Line
        .to(
          lineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          1.85
        )
        // Step 11: Action Buttons float into place
        .to(
          actionsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "back.out(1.5)",
          },
          2.0
        );

      // 3. Parallax Camera Drift: Continuous subtle approach on scroll without interfering with image entrance
      gsap.fromTo(
        bgCanvasRef.current,
        { yPercent: -2 },
        {
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // 4. Idle ambient golden glow respiration
      gsap.to(goldBloomRef.current, {
        opacity: 0.65,
        scale: 1.05,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.5,
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  // Helper to open Google Calendar event
  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Jayaprakash & Srimathi Wedding");
    const details = encodeURIComponent(
      "With the divine blessings of Lord Murugan, celebrating the wedding of Jayaprakash & Srimathi at V.R. Mahal (A/C), Kottalur."
    );
    const location = encodeURIComponent(
      "V.R. Mahal (A/C), Kottalur, Pennagaram – Mettur Main Road, Dharmapuri District, Tamil Nadu"
    );
    // 2026-11-01 from 07:00 to 11:00 IST (UTC+5:30 -> 01:30 UTC to 05:30 UTC)
    const dates = "20261101T013000Z/20261101T053000Z";
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gCalUrl, "_blank");
  };

  const handleGetDirections = () => {
    // Opens Google Maps to V.R. Mahal Kottalur
    window.open(
      "https://maps.google.com/?q=VR+Mahal+Kottalur+Pennagaram+Mettur+Main+Road",
      "_blank"
    );
  };

  return (
    <section
      ref={containerRef}
      className="venue-cinematic-scene"
      id="venue-section"
      aria-label="The Auspicious Venue V.R. Mahal"
    >
      {/* Layer 1: Background VR Mahal Hero Image (Full-Viewport Canvas) */}
      <div ref={bgCanvasRef} className="venue-bg-canvas">
        <img
          ref={bgImageRef}
          src="/assets/venue/wide_cinematic_golden_warm_softly_lit_wedding_v.png"
          alt="V.R. Mahal (A/C), Kottalur"
          className="venue-bg-hero-img"
          loading="eager"
        />
      </div>

      {/* Layer 2: Atmospheric Dark Teal Vignette & Golden Warm Temple Glow */}
      <div className="venue-cinematic-overlay-teal-vignette" aria-hidden="true" />
      <div ref={facadeGlowRef} className="venue-facade-divine-glow" aria-hidden="true" />
      <div ref={goldBloomRef} className="venue-gold-atmosphere-bloom" aria-hidden="true" />
      <div className="venue-blend-gradient-top" aria-hidden="true" />
      <div className="venue-blend-gradient-bottom" aria-hidden="true" />

      {/* Layer 3: Brass Lamp Warm Glow Accents (Lighting the corner kuthu vilakkus) */}
      <div ref={lampLeftRef} className="venue-lamp-pulse-glow venue-lamp-left" aria-hidden="true" />
      <div ref={lampRightRef} className="venue-lamp-pulse-glow venue-lamp-right" aria-hidden="true" />

      {/* Layer 4: Sparse Gold Dust & Sacred Petals Atmosphere */}
      <div className="venue-floating-particles-layer" aria-hidden="true">
        <span className="venue-particle p1" />
        <span className="venue-particle p2" />
        <span className="venue-particle p3" />
        <span className="venue-particle p4" />
        <span className="venue-particle p5" />
        <span className="venue-particle p6" />
        <span className="venue-petal pet1" />
        <span className="venue-petal pet2" />
        <span className="venue-petal pet3" />
      </div>

      {/* Layer 5: Foreground Photorealistic Banana Leaves for 2.5D Depth */}
      <div className="venue-foreground-framing-leaves" aria-hidden="true">
        <img
          ref={leavesLeftRef}
          src="/assets/doors/banana-leaves-left.png"
          alt=""
          className="venue-foreground-leaf venue-leaf-top-left"
        />
        <img
          ref={leavesRightRef}
          src="/assets/doors/banana-leaves-right.png"
          alt=""
          className="venue-foreground-leaf venue-leaf-top-right"
        />
      </div>

      {/* Layer 6: Scene Typography & Presentation (NO Card Container, Pure Scene Integration) */}
      <div className="venue-scene-content-wrapper">
        {/* Upper Zone: Eyebrow, Title & Sacred Diamond */}
        <header ref={headerRef} className="venue-scene-header">
          <span ref={eyebrowRef} className="venue-eyebrow">
            JOIN US IN CELEBRATION
          </span>
          <h2 ref={titleRef} className="venue-title">
            THE AUSPICIOUS VENUE
          </h2>
          <span ref={dividerRef} className="venue-divider-icon" aria-hidden="true">
            ✦
          </span>
        </header>

        {/* Lower Zone: Venue Identity, Location, Date & Action Buttons */}
        <div className="venue-scene-details-block">
          {/* Hero Venue Name */}
          <h3 ref={venueNameRef} className="venue-name-hero">
            V.R. MAHAL (A/C)
          </h3>

          {/* Location Information */}
          <div ref={addressRef} className="venue-address-block">
            <p className="venue-location-lead">
              Kottalur, Pennagaram – Mettur Main Road
            </p>
            <p className="venue-location-sub">
              DHARMAPURI DISTRICT, TAMIL NADU
            </p>
          </div>

          {/* Date & Time */}
          <div ref={dateTimeRef} className="venue-datetime-block">
            <span className="venue-date-highlight">01 NOVEMBER 2026</span>
            <span className="venue-time-highlight">SUNDAY • 7:00 AM – 11:00 AM</span>
          </div>

          {/* Ornamental Gold Divider */}
          <div ref={lineRef} className="venue-ornamental-line" aria-hidden="true">
            <span className="line-half" />
            <span className="line-diamond">✦</span>
            <span className="line-half" />
          </div>

          {/* Elegant Action Buttons */}
          <div ref={actionsRef} className="venue-cinematic-actions">
            <button
              onClick={handleGetDirections}
              className="venue-btn-cinematic venue-btn-directions"
              aria-label="Get Directions to V.R. Mahal in Google Maps"
            >
              <span className="venue-btn-icon" aria-hidden="true">📍</span>
              <span className="venue-btn-text">GET DIRECTIONS</span>
              <span className="venue-btn-arrow" aria-hidden="true">→</span>
            </button>

            <button
              onClick={handleAddToCalendar}
              className="venue-btn-cinematic venue-btn-calendar"
              aria-label="Add wedding to Google Calendar"
            >
              <span className="venue-btn-icon" aria-hidden="true">✦</span>
              <span className="venue-btn-text">ADD TO CALENDAR</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
