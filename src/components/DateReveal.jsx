import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playSacredChime } from "../utils/audioSynth";
import { KuthuVilakku, LotusMotif } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

export const DateReveal = ({ isOpened }) => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const underlayRef = useRef(null);
  const auraGlowRef = useRef(null);
  const promptRef = useRef(null);
  const particlesRef = useRef(null);

  // Dedicated refs for choreographed entrance sequence
  const bgImgRef = useRef(null);
  const lotusRef = useRef(null);
  const titleRef = useRef(null);
  const flourishRef = useRef(null);
  const cardWrapperRef = useRef(null);
  const cardEntranceFlareRef = useRef(null);
  const shockwaveRef = useRef(null);
  const lampLeftRef = useRef(null);
  const lampRightRef = useRef(null);
  const hintPillRef = useRef(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);
  const lastPos = useRef(null);
  const moveThrottle = useRef(0);
  const hasTriggeredReveal = useRef(false);

  // Initialize and draw the antique gold foil plaque on the canvas
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.scale(dpr, dpr);

    // Fallback metallic gold gradient drawing function
    const drawFallbackPlaque = () => {
      ctx.globalCompositeOperation = "source-over";
      const w = rect.width;
      const h = rect.height;

      // Rich metallic antique gold radial/linear gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "#8C6221");
      grad.addColorStop(0.2, "#D4AF37");
      grad.addColorStop(0.4, "#FCE09B");
      grad.addColorStop(0.6, "#AA771C");
      grad.addColorStop(0.85, "#F3D382");
      grad.addColorStop(1, "#7A5016");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Ornate inner frame border
      ctx.strokeStyle = "rgba(255, 235, 170, 0.85)";
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, w - 20, h - 20);

      // Subtle distress speckles
      ctx.fillStyle = "rgba(100, 60, 10, 0.15)";
      for (let i = 0; i < 60; i++) {
        const sx = Math.random() * w;
        const sy = Math.random() * h;
        ctx.fillRect(sx, sy, 2, 2);
      }

      // Center Icon: Finger tap/scratch icon
      ctx.fillStyle = "#3D2405";
      ctx.strokeStyle = "#3D2405";
      ctx.lineWidth = 1.8;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const cx = w / 2;
      const cy = h / 2 - 14;

      // Touch ripple arches
      ctx.beginPath();
      ctx.arc(cx, cy - 14, 6, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy - 14, 10, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();

      // Hand icon pointing up
      ctx.beginPath();
      ctx.moveTo(cx - 3, cy + 14);
      ctx.lineTo(cx - 3, cy - 8);
      ctx.arc(cx, cy - 8, 3, Math.PI, 0);
      ctx.lineTo(cx + 3, cy + 2);
      ctx.lineTo(cx + 8, cy + 6);
      ctx.lineTo(cx + 7, cy + 14);
      ctx.closePath();
      ctx.stroke();

      // SCRATCH TO REVEAL text
      ctx.font = "bold 13px 'Cinzel', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "0.22em";
      ctx.fillText("SCRATCH TO REVEAL", cx, cy + 28);

      // Divider below text
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy + 42);
      ctx.lineTo(cx - 8, cy + 42);
      ctx.moveTo(cx + 8, cy + 42);
      ctx.lineTo(cx + 45, cy + 42);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy + 42, 2.5, 0, Math.PI * 2);
      ctx.fill();
    };

    // Load authentic cropped gold plaque artwork
    const img = new Image();
    img.src = "/assets/decorations/plaque_crop.png";
    img.onload = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
    };
    img.onerror = () => {
      drawFallbackPlaque();
    };
  }, []);

  // Set up canvas on mount and window resize
  useEffect(() => {
    setupCanvas();

    const handleResize = () => {
      if (!hasTriggeredReveal.current) {
        setupCanvas();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setupCanvas]);

  // Cinematic Entrance Animation Sequence when scrolled into view
  useEffect(() => {
    if (!isOpened) return;

    const ctx = gsap.context(() => {
      // 1. Initial states setup: elements start hidden, ready to animate in sequence
      gsap.set(bgImgRef.current, { scale: 1.08, filter: "brightness(0.18) saturate(1.1) contrast(1.15)" });
      gsap.set(lotusRef.current, { opacity: 0, y: -24, scale: 0.65, rotation: -12 });
      gsap.set(titleRef.current, { opacity: 0, y: 28, filter: "blur(10px)" });
      gsap.set(flourishRef.current, { opacity: 0, scaleX: 0 });
      gsap.set([lampLeftRef.current, lampRightRef.current], { opacity: 0, y: 30, scale: 0.85 });
      gsap.set(cardEntranceFlareRef.current, { opacity: 0, scale: 0.2 });
      gsap.set(shockwaveRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(cardWrapperRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.82,
        rotationX: 16,
        filter: "brightness(0.65) blur(6px)",
        transformPerspective: 800,
      });
      gsap.set(hintPillRef.current, { opacity: 0, y: 16, scale: 0.85 });

      // 2. Entrance timeline triggered as user scrolls to the Date Reveal card
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardWrapperRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            if (!hasTriggeredReveal.current) {
              setupCanvas();
            }
          },
          onRefresh: (self) => {
            if (self.progress > 0 && !hasTriggeredReveal.current) {
              setupCanvas();
            }
          },
        },
        defaults: { ease: "power2.out" },
      });

      entranceTl
        // Step 1: Temple sanctum background illuminates & gently settles
        .to(
          bgImgRef.current,
          {
            scale: 1.02,
            filter: "brightness(0.24) saturate(1.22) contrast(1.15)",
            duration: 1.8,
            ease: "sine.out",
          },
          0
        )
        // Step 2: Sacred golden lotus motif blooms into position from above with divine rotation
        .to(
          lotusRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.75,
            ease: "back.out(2)",
          },
          0
        )
        // Step 3: Calligraphy title "A date written by destiny…" glides up smoothly, de-blurring into crisp gold
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
          0.15
        )
        // Step 4: Golden diamond flourish expands outward
        .to(
          flourishRef.current,
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          0.35
        )
        // Step 5: Radiant golden sunburst flare bursts from behind the card (peacock-style entrance drama)
        .to(
          cardEntranceFlareRef.current,
          {
            opacity: 0.95,
            scale: 2.5,
            duration: 0.65,
            ease: "power2.out",
          },
          0.4
        )
        .to(
          cardEntranceFlareRef.current,
          {
            opacity: 0.35,
            scale: 1.35,
            duration: 0.7,
            ease: "power2.inOut",
          },
          0.85
        )
        // Step 6: Antique Gold Scratch Plaque glides up into center with majestic 3D presence
        .to(
          cardWrapperRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            filter: "brightness(1) blur(0px)",
            duration: 1.1,
            ease: "power3.out",
          },
          0.45
        )
        // Step 7: Flanking Kuthu Vilakku brass lamps illuminate from sides
        .to(
          [lampLeftRef.current, lampRightRef.current],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
          },
          0.7
        )
        // Step 8: "Swipe or Tap to Reveal" hint floats into position
        .to(
          hintPillRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.6)",
          },
          0.95
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isOpened, setupCanvas]);

  // Trigger completion sequence when scratched threshold is reached
  const triggerRevealComplete = useCallback(() => {
    if (hasTriggeredReveal.current) return;
    hasTriggeredReveal.current = true;
    setIsRevealed(true);
    setScratchPercent(100);

    // Auspicious temple chime sound
    playSacredChime();

    // Haptic vibration feedback on mobile
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([40, 60, 40]);
    }

    const canvas = canvasRef.current;
    if (canvas) {
      gsap.to(canvas, {
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        onComplete: () => {
          canvas.style.display = "none";
        },
      });
    }

    // Expanding golden shockwave ring
    if (shockwaveRef.current) {
      gsap.fromTo(
        shockwaveRef.current,
        { scale: 0.75, opacity: 0.95 },
        { scale: 2.2, opacity: 0, duration: 1.25, ease: "power2.out" }
      );
    }

    // Radiant golden bloom behind revealed date
    if (auraGlowRef.current) {
      gsap.fromTo(
        auraGlowRef.current,
        { opacity: 0, scale: 0.65 },
        { opacity: 1, scale: 1.35, duration: 1.0, yoyo: true, repeat: 1, ease: "power2.out" }
      );
    }

    // Triumphant arrival scale bounce for revealed wedding date underlay
    if (underlayRef.current) {
      gsap.fromTo(
        underlayRef.current,
        { scale: 0.93 },
        { scale: 1, duration: 0.85, ease: "back.out(1.6)" }
      );
    }

    // Spawn celebratory shower of golden glitter, stardust, and auspicious flower petals
    if (particlesRef.current && containerRef.current) {
      const container = particlesRef.current;
      const containerRect = containerRef.current.getBoundingClientRect();
      const cardRect = cardWrapperRef.current?.getBoundingClientRect() || containerRect;

      const originX = (cardRect.left + cardRect.width / 2) - containerRect.left;
      const originY = (cardRect.top + cardRect.height / 2) - containerRect.top;

      // 1. Auspicious South Indian Wedding Flower Petals (Rose, Marigold, Jasmine)
      const petalTypes = [
        { bg: "linear-gradient(135deg, #e63946, #c9184a)", shadow: "rgba(201, 24, 74, 0.45)" }, // Royal Crimson Rose
        { bg: "linear-gradient(135deg, #ff758f, #ff4d6d)", shadow: "rgba(255, 77, 109, 0.45)" }, // Soft Rose Pink
        { bg: "linear-gradient(135deg, #ffb703, #fb8500)", shadow: "rgba(251, 133, 0, 0.5)" },  // Auspicious Marigold
        { bg: "linear-gradient(135deg, #ffd166, #ffb703)", shadow: "rgba(255, 183, 3, 0.45)" }, // Golden Chammanti
        { bg: "linear-gradient(135deg, #ffffff, #ffeaa7)", shadow: "rgba(255, 234, 167, 0.5)" }, // Fragrant Jasmine
      ];

      const petalCount = 36;
      for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("div");
        petal.className = "celebration-petal";

        const type = petalTypes[i % petalTypes.length];
        const w = 12 + Math.random() * 12;
        const h = 8 + Math.random() * 9;

        petal.style.width = `${w}px`;
        petal.style.height = `${h}px`;
        petal.style.background = type.bg;
        petal.style.boxShadow = `0 2px 7px ${type.shadow}`;
        petal.style.borderRadius = i % 2 === 0
          ? "65% 35% 65% 35% / 45% 60% 40% 55%"
          : "50% 50% 50% 0%";
        petal.style.left = `${originX + (Math.random() - 0.5) * 60}px`;
        petal.style.top = `${originY + (Math.random() - 0.5) * 35}px`;

        container.appendChild(petal);

        // Petal physics: Upward celebratory burst fountain, then fluttering downward gravity drift
        const burstAngle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8;
        const burstSpeed = 90 + Math.random() * 190;
        const burstX = Math.cos(burstAngle) * burstSpeed;
        const burstY = Math.sin(burstAngle) * burstSpeed;

        const fallDistance = 180 + Math.random() * 320;
        const driftX = burstX + (Math.random() - 0.5) * 160;
        const duration = 3.0 + Math.random() * 1.4;

        const tl = gsap.timeline({
          onComplete: () => petal.remove(),
        });

        // Phase 1: Upward explosion fountain with 3D spin
        tl.to(petal, {
          x: burstX,
          y: burstY,
          rotationZ: (Math.random() - 0.5) * 280,
          rotationY: Math.random() * 360,
          rotationX: Math.random() * 360,
          scale: 0.95 + Math.random() * 0.35,
          duration: 0.7 + Math.random() * 0.25,
          ease: "power2.out",
        })
        // Phase 2: Gentle fluttering floating fall with wind sway
        .to(petal, {
          x: driftX,
          y: burstY + fallDistance,
          rotationZ: (Math.random() - 0.5) * 720,
          rotationY: Math.random() * 720,
          rotationX: Math.random() * 540,
          opacity: 0,
          duration: duration - 0.75,
          ease: "sine.inOut",
        });
      }

      // 2. Radiant Golden Glitter & Stardust Sparkles
      const sparkleSymbols = ["✦", "★", "✧", "◆", "•"];
      const sparkleCount = 42;
      for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement("span");
        sparkle.className = "celebration-sparkle";
        sparkle.textContent = sparkleSymbols[i % sparkleSymbols.length];

        const size = 11 + Math.random() * 14;
        sparkle.style.fontSize = `${size}px`;
        sparkle.style.left = `${originX + (Math.random() - 0.5) * 60}px`;
        sparkle.style.top = `${originY + (Math.random() - 0.5) * 30}px`;

        container.appendChild(sparkle);

        const angle = Math.random() * Math.PI * 2;
        const dist = 70 + Math.random() * 200;
        const targetX = Math.cos(angle) * dist;
        const targetY = Math.sin(angle) * dist - 60; // Bias upward fountain

        gsap.to(sparkle, {
          x: targetX,
          y: targetY,
          opacity: 0,
          scale: 0.2 + Math.random() * 1.3,
          rotationZ: (Math.random() - 0.5) * 360,
          duration: 1.2 + Math.random() * 1.3,
          ease: "power3.out",
          onComplete: () => sparkle.remove(),
        });
      }
    }

    // Scroll prompt fades in smoothly
    if (promptRef.current) {
      gsap.fromTo(
        promptRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.5, ease: "back.out(1.4)" }
      );
    }
  }, []);

  // Sample cleared pixels to calculate percentage
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || hasTriggeredReveal.current) return;

    try {
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      const w = canvas.width;
      const h = canvas.height;

      // Sample a 10x10 grid (100 sample points)
      const stepX = Math.max(1, Math.floor(w / 10));
      const stepY = Math.max(1, Math.floor(h / 10));
      let cleared = 0;
      let total = 0;

      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      for (let y = Math.floor(stepY / 2); y < h; y += stepY) {
        for (let x = Math.floor(stepX / 2); x < w; x += stepX) {
          const alphaIndex = (y * w + x) * 4 + 3;
          total++;
          if (data[alphaIndex] < 128) {
            cleared++;
          }
        }
      }

      const percent = total > 0 ? (cleared / total) * 100 : 0;
      setScratchPercent(Math.round(percent));

      if (percent >= 50) {
        triggerRevealComplete();
      }
    } catch {
      // Fallback in case of CORS or read error
    }
  }, [triggerRevealComplete]);

  // Convert pointer event to canvas coordinates
  const getCanvasPoint = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    return {
      x: (e.clientX - rect.left) * dpr,
      y: (e.clientY - rect.top) * dpr,
      rawX: e.clientX,
      rawY: e.clientY,
    };
  };

  // Erase pixels between two points with feathered round brush
  const eraseLine = (p1, p2) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const brushRadius = 26 * dpr;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = brushRadius * 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    // Spawn tiny golden sparks under pointer
    if (particlesRef.current && Math.random() < 0.45) {
      const container = particlesRef.current;
      const spark = document.createElement("span");
      spark.className = "scratch-drag-sparkle";
      spark.textContent = Math.random() < 0.6 ? "✦" : "✧";
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        spark.style.left = `${p2.rawX - containerRect.left}px`;
        spark.style.top = `${p2.rawY - containerRect.top}px`;
        container.appendChild(spark);

        gsap.to(spark, {
          y: -20 - Math.random() * 12,
          x: (Math.random() - 0.5) * 16,
          opacity: 0,
          scale: 0.45,
          duration: 0.55,
          ease: "power2.out",
          onComplete: () => spark.remove(),
        });
      }
    }
  };

  // Erase single point for tap/click
  const erasePoint = (p) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const radius = 32 * dpr;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  // Pointer event handlers
  const handlePointerDown = (e) => {
    if (hasTriggeredReveal.current) return;
    isDrawing.current = true;
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch {}

    const pt = getCanvasPoint(e);
    lastPos.current = pt;
    erasePoint(pt);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing.current || hasTriggeredReveal.current) return;
    e.preventDefault();

    const pt = getCanvasPoint(e);
    if (lastPos.current) {
      eraseLine(lastPos.current, pt);
    } else {
      erasePoint(pt);
    }
    lastPos.current = pt;

    moveThrottle.current++;
    if (moveThrottle.current % 4 === 0) {
      checkScratchPercentage();
    }
  };

  const handlePointerUp = (e) => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    lastPos.current = null;
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch {}
    checkScratchPercentage();
  };

  // Smooth scroll to next scene (The Royal Couple Reveal)
  const handleScrollToCouple = () => {
    const coupleEl = document.getElementById("couple-reveal");
    if (coupleEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(coupleEl, { offset: 0, duration: 1.4 });
      } else {
        coupleEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="date-reveal-scratch-section"
      id="date-reveal"
      aria-label="Auspicious Wedding Date Reveal"
    >
      {/* Authentic South Indian Temple Sanctum Backdrop — Full-Bleed Edge-to-Edge */}
      <div className="date-sanctum-bg-layer">
        <img
          ref={bgImgRef}
          src="/assets/backgrounds/scene4-temple-corridor.jpg"
          alt="Traditional Temple Sanctum Corridor"
          className="date-sanctum-img"
          loading="eager"
        />
        <div className="date-sanctum-vignette" />
        <div className="date-ambient-glow" />
      </div>

      {/* Dynamic Sparkles & Shimmer Particles Container */}
      <div ref={particlesRef} className="date-particles-host" aria-hidden="true" />

      {/* Main Continuous Devotional Content Stage (Seamless, Same Ratio & Layout as Other Pages) */}
      <div ref={stageRef} className="date-reveal-content">
        {/* Header Block: Sacred Lotus & Calligraphy Title */}
        <div className="date-header-block">
          <div ref={lotusRef} className="date-header-lotus">
            <LotusMotif size={36} />
          </div>
          <h2 ref={titleRef} className="date-destiny-calligraphy">
            A date written by destiny…
          </h2>
          <div ref={flourishRef} className="date-destiny-flourish">
            <span className="destiny-line" />
            <span className="destiny-diamond">◆</span>
            <span className="destiny-line" />
          </div>
        </div>

        {/* Central Stage: Scratch Card with Flanking Auspicious Lamps */}
        <div className="date-central-stage">
          {/* Left Kuthu Vilakku with Living Flame Glow */}
          <div ref={lampLeftRef} className="date-flank-lamp date-lamp-left" aria-hidden="true">
            <div className="date-lamp-flame-aura" />
            <KuthuVilakku size={52} />
          </div>

          {/* Central Ceremonial Scratch Card Plaque Unit */}
          <div ref={cardWrapperRef} className="scratch-card-wrapper">
            {/* Divine Golden Sunburst Entrance Flare (Peacock-style Dramatic Entrance Radiance) */}
            <div ref={cardEntranceFlareRef} className="date-card-entrance-flare" aria-hidden="true" />

            {/* Auspicious Golden Shockwave Ring on Scratch Reveal */}
            <div ref={shockwaveRef} className="date-reveal-shockwave" aria-hidden="true" />

            {/* Golden Divine Aura Glow behind Revealed Date */}
            <div ref={auraGlowRef} className="date-revealed-aura-glow" />

            {/* UNDERLAYER: Sacred Wedding Date Content */}
            <div
              ref={underlayRef}
              className={`date-revealed-underlay ${isRevealed ? "revealed-active" : ""}`}
              role="region"
              aria-label="Revealed Wedding Date: 01 November 2026, Sunday"
            >
              {/* Delicate Antique Gold Filigree Inner Frame */}
              <div className="revealed-filigree-frame">
                <span className="frame-corner corner-tl">✦</span>
                <span className="frame-corner corner-tr">✦</span>
                <span className="frame-corner corner-bl">✦</span>
                <span className="frame-corner corner-br">✦</span>
              </div>

              <div className="revealed-date-core">
                <div className="revealed-auspicious-tag">
                  <span className="tag-sparkle">✦</span>
                  <span>AUSPICIOUS WEDDING DATE</span>
                  <span className="tag-sparkle">✦</span>
                </div>

                {/* Giant Date Number */}
                <div className="revealed-huge-date">01</div>

                {/* Month & Year */}
                <div className="revealed-month-year">NOVEMBER 2026</div>

                {/* Gold Divider Line */}
                <div className="revealed-gold-divider">
                  <span className="divider-line" />
                  <span className="divider-diamond">◆</span>
                  <span className="divider-line" />
                </div>

                {/* Day & Auspicious Tamil Note */}
                <div className="revealed-day-tamil">
                  <span className="day-name">SUNDAY</span>
                  <span className="day-bullet">•</span>
                  <span className="tamil-day">சுபமுகூர்த்த நாள்</span>
                </div>
              </div>
            </div>

            {/* OVERLAYER: Interactive Scratch Canvas */}
            <canvas
              ref={canvasRef}
              className={`date-scratch-canvas ${isRevealed ? "scratched-out" : ""}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              title="Scratch to reveal wedding date"
              aria-hidden="true"
            />

            {/* Antique Gold Foil Light Sheen Sweep Overlay */}
            {!isRevealed && (
              <div className="card-shimmer-sweep" aria-hidden="true" />
            )}

            {/* Subtle Scratch Guidance Tooltip (Disappears once scratching begins) */}
            {!isRevealed && scratchPercent < 15 && (
              <div
                ref={hintPillRef}
                className="scratch-hint-pill"
                onClick={triggerRevealComplete}
                title="Click or scratch to reveal"
              >
                <span className="hint-hand-icon">👆</span>
                <span className="hint-label">Swipe or Tap to Reveal</span>
              </div>
            )}
          </div>

          {/* Right Kuthu Vilakku with Living Flame Glow */}
          <div ref={lampRightRef} className="date-flank-lamp date-lamp-right" aria-hidden="true">
            <div className="date-lamp-flame-aura" />
            <KuthuVilakku size={52} />
          </div>
        </div>

        {/* Guidance Prompt to Proceed to Couple Section */}
        <div
          ref={promptRef}
          className={`scroll-to-couple-prompt ${isRevealed ? "prompt-visible" : ""}`}
        >
          <button
            type="button"
            onClick={handleScrollToCouple}
            className="scroll-couple-action-btn"
            aria-label="Scroll down to meet the bride and groom"
          >
            <span className="btn-lotus-accent">
              <svg viewBox="0 0 24 20" width="18" height="15" fill="none">
                <path d="M12 1.5 C10.8 6.5 10 12 12 16 C14 12 13.2 6.5 12 1.5 Z" fill="#F3E098" />
                <path d="M12 16 C8.5 13.5 5 10.5 4 6.5 C6.5 9 9.5 13 12 16 Z" fill="#E6C87D" opacity="0.9" />
                <path d="M12 16 C15.5 13.5 19 10.5 20 6.5 C17.5 9 14.5 13 12 16 Z" fill="#E6C87D" opacity="0.9" />
                <circle cx="12" cy="16.5" r="1.5" fill="#FFEAA7" />
              </svg>
            </span>
            <span className="btn-prompt-text">Scroll to Meet the Couple</span>
            <span className="btn-down-arrow">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
};
