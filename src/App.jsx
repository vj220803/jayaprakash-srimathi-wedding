import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { OpeningCard } from "./components/OpeningCard";
import { DateReveal } from "./components/DateReveal";
import { MuruganScene } from "./components/MuruganScene";
import { WeddingIntroScene } from "./components/WeddingIntroScene";
import { CoupleReveal } from "./components/CoupleReveal";
import { VenueSection } from "./components/VenueSection";
import { FamilyBlessings } from "./components/FamilyBlessings";
import { PetalCanvas } from "./components/PetalCanvas";
import { MusicControl } from "./components/MusicControl";
import { toggleDivineAudio, startDivineAudio } from "./utils/audioSynth";

import "./App.css";

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== "undefined") {
  window.__gsap = gsap;
  window.__ScrollTrigger = ScrollTrigger;
}

function App() {
  const [isOpened, setIsOpened] = useState(
    () => typeof window !== "undefined" && window.location.search.includes("open")
  );
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const lenisRef = useRef(null);
  const mainContainerRef = useRef(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      infinite: false,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.__lenis = null;
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Handle invitation opening
  const handleOpenInvitation = () => {
    setIsOpened(true);
    // Start ambient temple soundscape on user interaction
    startDivineAudio();
    setIsMusicPlaying(true);

    // Scroll slightly to trigger ScrollTrigger smoothly
    setTimeout(() => {
      ScrollTrigger.refresh();
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 100);
  };

  const handleToggleMusic = () => {
    const playing = toggleDivineAudio(setIsMusicPlaying);
    setIsMusicPlaying(playing);
  };

  return (
    <div ref={mainContainerRef} className="wedding-app-root">
      {/* Background Wedding Music Track (Place your Tamil song as wedding-bgm.mp3 in public/assets/audio/) */}
      <audio
        id="wedding-bg-audio"
        src="/assets/audio/wedding-bgm.mp3"
        loop
        preload="auto"
        playsInline
      />

      {/* Floating Canvas Petals & Light Embers */}
      <PetalCanvas />

      {/* Floating Audio & WhatsApp Share Controls — revealed once opened */}
      {isOpened && (
        <MusicControl
          isPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
        />
      )}

      {/* Initial Luxury Opening Card Overlay */}
      {!isOpened && (
        <OpeningCard
          isOpened={isOpened}
          onOpen={handleOpenInvitation}
        />
      )}

      {/* Main Continuous Cinematic Invitation Flow */}
      <main className={`cinematic-main-experience ${isOpened ? "invitation-active" : "invitation-pre-open"}`}>
        {/* Scene 1: Divine Sanctum — Lord Murugan & Vel */}
        <MuruganScene isOpened={isOpened} />

        {/* Scene 2: Wedding Invitation Intro — Ceremonial Curtains Opening & Invitation Revelation */}
        <WeddingIntroScene isOpened={isOpened} />

        {/* Scene 3: Interactive Date Reveal Scratch Card */}
        <DateReveal isOpened={isOpened} />

        {/* Scene 3: The Royal Peacock, Couple Reveal & Invitation Message */}
        <CoupleReveal />

        {/* Scene 4: V.R. MAHAL VENUE REVEAL — The Auspicious Venue & Directions */}
        <VenueSection />

        {/* Scene 5: Emotional Closing Chapter — Family Blessings & Warm Welcome */}
        <FamilyBlessings />
      </main>
    </div>
  );
}

export default App;