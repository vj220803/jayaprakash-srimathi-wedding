import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MandalaDivider, KuthuVilakku, LotusMotif, CornerFiligree } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

export const EventTimeline = () => {
  const sectionRef = useRef(null);
  const engagementCardRef = useRef(null);
  const weddingCardRef = useRef(null);
  const timelineThreadRef = useRef(null);
  const centerNodeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 30%",
          scrub: 1.1,
        },
      });

      tl
        // 1. Thread grows down
        .fromTo(
          timelineThreadRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 1.5, ease: "none" }
        )
        // 2. Engagement emerges from left
        .fromTo(
          engagementCardRef.current,
          { opacity: 0, x: -60, scale: 0.92 },
          { opacity: 1, x: 0, scale: 1, duration: 1.2 },
          0.2
        )
        // 3. Center lamp illuminates
        .fromTo(
          centerNodeRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.8 },
          0.6
        )
        // 4. Wedding emerges from right
        .fromTo(
          weddingCardRef.current,
          { opacity: 0, x: 60, scale: 0.92 },
          { opacity: 1, x: 0, scale: 1, duration: 1.2 },
          0.8
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="events-timeline-section" id="events-section">
      <div className="events-section-header">
        <span className="events-subtitle-lead">PROGRAM OF CELEBRATIONS</span>
        <h2 className="events-main-title gold-text">TWO SACRED CEREMONIES</h2>
        <p className="events-date-sub">1 NOVEMBER 2026</p>
        <MandalaDivider maxWidth={340} />
      </div>

      <div className="events-timeline-container">
        {/* Golden connecting vine line */}
        <div ref={timelineThreadRef} className="timeline-golden-thread" />

        {/* Central Auspicious Lamp Node */}
        <div ref={centerNodeRef} className="timeline-center-lamp-node">
          <KuthuVilakku size={44} />
        </div>

        {/* =========================================
            EVENT 01: MORNING — ENGAGEMENT
        ========================================= */}
        <div ref={engagementCardRef} className="event-ceremony-card event-morning">
          <CornerFiligree position="top-left" size={45} />
          <CornerFiligree position="bottom-right" size={45} />

          <div className="ceremony-time-badge">
            <span className="sun-icon">☀️</span>
            <span className="badge-text">MORNING CEREMONY</span>
          </div>

          <div className="ceremony-header">
            <span className="ceremony-icon-symbol">💍</span>
            <h3 className="ceremony-name gold-text">ENGAGEMENT</h3>
            <p className="ceremony-tamil">நிச்சயதார்த்தம்</p>
          </div>

          <div className="ceremony-details">
            <div className="ceremony-date-line">
              <span className="cal-dot">✦</span>
              <strong>1 NOVEMBER 2026</strong>
            </div>
            <div className="ceremony-timing-placeholder">
              <span>Time: </span>
              <span className="time-val">Morning Auspicious Muhurtham</span>
            </div>
            <p className="ceremony-description">
              The joyous ring exchange and sacred formal declaration of engagement,
              witnessed by beloved family, elders, and revered well-wishers.
            </p>
          </div>
        </div>

        {/* =========================================
            EVENT 02: EVENING — WEDDING
        ========================================= */}
        <div ref={weddingCardRef} className="event-ceremony-card event-evening">
          <CornerFiligree position="top-right" size={45} />
          <CornerFiligree position="bottom-left" size={45} />

          <div className="ceremony-time-badge">
            <span className="moon-icon">🌙</span>
            <span className="badge-text">EVENING CEREMONY</span>
          </div>

          <div className="ceremony-header">
            <span className="ceremony-icon-symbol">💐</span>
            <h3 className="ceremony-name gold-text">WEDDING</h3>
            <p className="ceremony-tamil">திருமணம் & வரவேற்பு</p>
          </div>

          <div className="ceremony-details">
            <div className="ceremony-date-line">
              <span className="cal-dot">✦</span>
              <strong>1 NOVEMBER 2026</strong>
            </div>
            <div className="ceremony-timing-placeholder">
              <span>Time: </span>
              <span className="time-val">Evening Sacred Muhurtham & Celebration</span>
            </div>
            <p className="ceremony-description">
              The sacred rites of matrimony, the tying of the sacred Mangalsutra (Thali),
              showers of fragrant flower petals, and grand evening reception festivities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
