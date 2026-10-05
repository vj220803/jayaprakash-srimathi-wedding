import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MandalaDivider, LotusMotif, CornerFiligree } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

export const StorySection = () => {
  const containerRef = useRef(null);
  const cardMainRef = useRef(null);
  const textNarrativeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 30%",
          scrub: 1.1,
        },
      });

      tl.fromTo(
        cardMainRef.current,
        { opacity: 0, scale: 0.9, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4 }
      ).fromTo(
        textNarrativeRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="story-section-wrapper" id="story-section">
      <div className="story-section-header">
        <span className="story-lead-tag">A SACRED BOND</span>
        <h2 className="story-title gold-text">A BEAUTIFUL JOURNEY AWAITS</h2>
        <MandalaDivider maxWidth={320} />
      </div>

      <div className="story-content-grid">
        {/* Left: Cinematic Framed Portrait of the Couple */}
        <div ref={cardMainRef} className="story-portrait-frame-wrap">
          <div className="portrait-outer-frame">
            <CornerFiligree position="top-left" size={50} />
            <CornerFiligree position="top-right" size={50} />
            <CornerFiligree position="bottom-left" size={50} />
            <CornerFiligree position="bottom-right" size={50} />

            <div className="portrait-matting">
              <img
                src="/assets/couple/couple-hero.png"
                alt="Jayaprakash & Srimathi"
                className="story-couple-img"
                loading="lazy"
              />
              <div className="portrait-gold-plaque">
                <span className="plaque-names gold-text">JAYAPRAKASH & SRIMATHI</span>
                <span className="plaque-date">01 . 11 . 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Poetic narrative of sacred matrimony */}
        <div ref={textNarrativeRef} className="story-narrative-text">
          <LotusMotif size={36} className="story-lotus" />
          
          <h3 className="story-quote-title">
            "Two paths converge under the divine grace of Lord Murugan, weaving a lifelong tapestry of love, respect, and shared dreams."
          </h3>

          <p className="story-verse">
            As Jayaprakash and Srimathi step into this holy union of hearts and families, 
            they seek the heartfelt presence and blessings of all near and dear.
          </p>

          <div className="story-highlights-box">
            <div className="highlight-item">
              <span className="highlight-gem">✦</span>
              <div>
                <strong>Rooted in Heritage</strong>
                <p>Cherishing our rich South Indian values and timeless wedding customs.</p>
              </div>
            </div>

            <div className="highlight-item">
              <span className="highlight-gem">✦</span>
              <div>
                <strong>Blessed by Elders</strong>
                <p>Surrounded by the prayers and affection of loving families.</p>
              </div>
            </div>

            <div className="highlight-item">
              <span className="highlight-gem">✦</span>
              <div>
                <strong>United for a Lifetime</strong>
                <p>Stepping forward hand in hand towards an auspicious tomorrow.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
