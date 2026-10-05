import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VelEmblem, MandalaDivider, LotusMotif, CornerFiligree } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

export const FinalInvitation = ({ onReplay }) => {
  const containerRef = useRef(null);
  const contentCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentCardRef.current,
        { opacity: 0, scale: 0.92, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      "You're cordially invited to the Wedding Celebrations of Jayaprakash & Srimathi on 01 November 2026 (7:00 AM – 11:00 AM) at V.R. Mahal (A/C), Kottalur! 🌸✨\n\nWith the divine blessings of Lord Murugan.\n" +
        window.location.href
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <footer ref={containerRef} className="final-invitation-section" id="final-invitation">
      <div className="final-sanctum-glow" />

      <div ref={contentCardRef} className="final-invitation-card">
        <CornerFiligree position="top-left" className="final-corner-filigree" size={48} />
        <CornerFiligree position="top-right" className="final-corner-filigree" size={48} />
        <CornerFiligree position="bottom-left" className="final-corner-filigree" size={48} />
        <CornerFiligree position="bottom-right" className="final-corner-filigree" size={48} />

        <div className="final-card-inner">
          <VelEmblem size={55} className="final-vel-icon" />

          <p className="final-blessing-tamil">॥ ஓம் சரவணபவ ॥</p>
          <p className="final-blessing-sub">WITH THE BLESSINGS OF LORD MURUGAN</p>

          <MandalaDivider maxWidth={280} />

          <div className="final-names-group">
            <h2 className="final-groom gold-text">JAYAPRAKASH</h2>
            <span className="final-ampersand">&</span>
            <h2 className="final-bride gold-text">SRIMATHI</h2>
          </div>

          <div className="final-date-badge">
            <span className="final-date-str">01 NOVEMBER 2026</span>
          </div>

          <div className="final-two-events-bar">
            <span>7:00 AM — 11:00 AM</span>
            <span className="bar-separator">•</span>
            <span>SUNDAY • V.R. MAHAL</span>
          </div>

          <div className="final-emotional-callout">
            <LotusMotif size={32} />
            <h3 className="final-callout-heading">WE WOULD LOVE TO CELEBRATE WITH YOU</h3>
            <p className="final-callout-body">
              Your esteemed presence, heartfelt prayers, and warm blessings
              will make this auspicious day truly unforgettable.
            </p>
          </div>

          {/* Social Share & Replay Action */}
          <div className="final-actions-row">
            <button
              onClick={handleShareWhatsApp}
              className="final-share-whatsapp-btn"
              aria-label="Share Wedding Invitation on WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.92-9.91-9.92zm5.78 14c-.24.68-1.39 1.3-1.92 1.38-.5.08-1.13.12-3.62-.91-3.18-1.32-5.23-4.57-5.39-4.78-.16-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.11-2.66.29-.32.63-.4 84-.4.21 0 .42.01.6.02.19.01.44-.07.69.53.25.6.86 2.1.94 2.25.08.16.13.34.02.55-.1.21-.16.34-.31.52-.16.18-.33.4-.48.54-.16.16-.33.34-.14.66.19.32.84 1.38 1.8 2.23 1.24 1.1 2.28 1.44 2.6 1.6.32.16.51.13.7-.08.19-.21.82-.95 1.04-1.28.22-.32.44-.27.73-.16.29.11 1.84.87 2.16 1.03.32.16.53.24.61.37.08.13.08.76-.16 1.44z" />
              </svg>
              <span>Share on WhatsApp</span>
            </button>

            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="final-scroll-top-btn"
              aria-label="Back to Top"
            >
              <span>Back to Top ↑</span>
            </button>
          </div>

          <div className="final-family-signoff">
            <p className="tamil-sign">இவண்: மணமக்கள் மற்றும் குடும்பத்தினர்</p>
            <p className="subham-sign">॥ சுபமஸ்து • மங்கலம் உண்டாகட்டும் ॥</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
