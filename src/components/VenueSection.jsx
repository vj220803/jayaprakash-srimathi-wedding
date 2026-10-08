import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const VenueSection = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const actionsRef = useRef(null);
  const scrollPromptRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // 1. Initial states for cinematic reveal
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 36,
        scale: 0.96,
        filter: "blur(10px) brightness(0.7)",
      });
      gsap.set(glowRef.current, {
        opacity: 0,
        scale: 0.7,
      });
      gsap.set(actionsRef.current, {
        opacity: 0,
        y: 20,
      });
      if (scrollPromptRef.current) {
        gsap.set(scrollPromptRef.current, {
          opacity: 0,
          y: 15,
        });
      }

      // 2. Phased ScrollTrigger Timeline (Cinematic Entry Sequence)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 76%",
          once: true,
        },
        defaults: { ease: "power2.out" },
      });

      tl
        // Step 1: Golden Divine Aura blooms behind the mandapam
        .to(
          glowRef.current,
          {
            opacity: 0.85,
            scale: 1.15,
            duration: 1.6,
            ease: "power2.out",
          },
          0
        )
        // Step 2: The Royal Mandapam Venue Card glides up with crisp illumination
        .to(
          cardRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px) brightness(1.0)",
            duration: 1.8,
            ease: "power3.out",
          },
          0.15
        )
        // Step 3: Interactive Action Buttons float in smoothly
        .to(
          actionsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "back.out(1.4)",
          },
          0.85
        )
        // Step 4: Unified Scroll prompt reveals
        .to(
          scrollPromptRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          1.1
        );

      // Ambient breathing glow
      gsap.to(glowRef.current, {
        opacity: 0.55,
        scale: 1.05,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  // Helper to open Google Calendar event
  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Jayaprakash & Srimathi Wedding");
    const details = encodeURIComponent(
      "With the divine blessings of Lord Murugan, celebrating the wedding of Jayaprakash & Srimathi at VR Mahal - Kottaiyur."
    );
    const location = encodeURIComponent(
      "VR Mahal - Kottaiyur, Pennagaram – Mecheri Main Road, Dharmapuri District, Tamil Nadu"
    );
    // 2026-11-01 from 07:00 to 11:00 IST (UTC+5:30 -> 01:30 UTC to 05:30 UTC)
    const dates = "20261101T013000Z/20261101T053000Z";
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gCalUrl, "_blank");
  };

  const handleGetDirections = () => {
    // Opens Google Maps to VR Mahal - Kottaiyur
    window.open(
      "https://maps.app.goo.gl/3rqpNQTgvSsA5hLv6?g_st=aw",
      "_blank"
    );
  };

  // Smooth scroll to next scene (Family Blessings & Warm Welcome)
  const handleScrollToFamily = () => {
    const familyEl = document.getElementById("family-blessings");
    if (familyEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(familyEl, { duration: 1.4 });
      } else {
        familyEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="venue-cinematic-scene"
      id="venue-section"
      aria-label="The Auspicious Venue VR Mahal - Kottaiyur"
    >
      {/* Semantic Headings for SEO and Screen Readers */}
      <div className="sr-only">
        <h2>THE AUSPICIOUS VENUE</h2>
        <h3>VR MAHAL - Kottaiyur</h3>
        <p>Pennagaram – Mecheri Main Road, Dharmapuri District, Tamil Nadu</p>
        <p>01 November 2026, Sunday • 7:00 AM – 11:00 AM</p>
      </div>

      {/* Atmospheric Background & Radiance Bloom */}
      <div className="venue-cinematic-overlay-teal-vignette" aria-hidden="true" />
      <div ref={glowRef} className="venue-facade-divine-glow" aria-hidden="true" />
      <div className="venue-blend-gradient-top" aria-hidden="true" />
      <div className="venue-blend-gradient-bottom" aria-hidden="true" />

      {/* Sparse Gold Dust & Sacred Lotus Petals Atmosphere */}
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

      {/* Central Content Area */}
      <div className="venue-scene-content-wrapper">
        {/* The Auspicious Venue Royal Invitation Poster Card */}
        <div
          ref={cardRef}
          className="venue-poster-card"
          onClick={handleGetDirections}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleGetDirections();
            }
          }}
          aria-label="View VR Mahal - Kottaiyur on Google Maps"
          title="Click to view location on Google Maps"
        >
          <img
            src="/assets/venue/vr_mahal_mandapam_theme.jpg"
            alt="The Auspicious Venue: VR Mahal - Kottaiyur, Pennagaram – Mecheri Main Road. 01 November 2026, Sunday 7:00 AM – 11:00 AM"
            className="venue-poster-image"
            loading="eager"
          />
          <div className="venue-card-gloss-sheen" aria-hidden="true" />
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

        {/* Floating Scroll Indicator Prompt to Proceed to Family Blessings */}
        <div
          ref={scrollPromptRef}
          className="scene-scroll-prompt in-flow venue-scroll-prompt"
          onClick={handleScrollToFamily}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleScrollToFamily();
            }
          }}
          aria-label="Scroll down to view family blessings and welcome"
        >
          <div className="prompt-aura-glow" aria-hidden="true" />
          <div className="prompt-pill-inner">
            <span className="prompt-star-icon">✦</span>
            <span className="prompt-main-text">SCROLL DOWN</span>
            <span className="prompt-down-arrow" aria-hidden="true">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};
