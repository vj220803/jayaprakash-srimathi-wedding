import React from "react";

// Sacred Vel of Lord Murugan
export const VelEmblem = ({ className = "", size = 60 }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 100 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`vel-emblem-svg ${className}`}
  >
    <defs>
      <linearGradient id="goldVelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D0" />
        <stop offset="30%" stopColor="#E5C77A" />
        <stop offset="70%" stopColor="#C8A45D" />
        <stop offset="100%" stopColor="#8C6A21" />
      </linearGradient>
      <filter id="velGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Vel Spearhead */}
    <path
      d="M50 8 C53 25 78 48 78 72 C78 92 65 102 50 102 C35 102 22 92 22 72 C22 48 47 25 50 8 Z"
      fill="url(#goldVelGrad)"
      stroke="#FFE599"
      strokeWidth="1.5"
      filter="url(#velGlow)"
    />
    {/* Vel Center Ridge */}
    <path d="M50 12 L50 98" stroke="#FFEEC2" strokeWidth="2" strokeLinecap="round" />
    {/* Sacred Vibhuti & Kumkum stripes on Vel */}
    <line x1="38" y1="62" x2="62" y2="62" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="38" y1="68" x2="62" y2="68" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="38" y1="74" x2="62" y2="74" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="50" cy="68" r="2.8" fill="#D32F2F" />
    {/* Staff / Shaft */}
    <rect x="47.5" y="100" width="5" height="46" rx="2" fill="url(#goldVelGrad)" />
    {/* Decorative Ring collars on staff */}
    <circle cx="50" cy="105" r="4.5" stroke="#FFF2C4" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="120" r="4" stroke="#FFF2C4" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="144" r="5" fill="url(#goldVelGrad)" />
  </svg>
);

// Traditional Kuthu Vilakku (Auspicious Brass Oil Lamp)
export const KuthuVilakku = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size * 1.6}
    viewBox="0 0 80 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`kuthu-vilakku-svg ${className}`}
  >
    <defs>
      <linearGradient id="lampGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2C2" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8C651A" />
      </linearGradient>
      <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#FF4500" />
        <stop offset="50%" stopColor="#FFB703" />
        <stop offset="100%" stopColor="#FFF7CC" />
      </linearGradient>
    </defs>
    {/* Flame */}
    <path
      d="M40 4 C35 12 33 18 36 24 C38 27 42 27 44 24 C47 18 45 12 40 4 Z"
      fill="url(#flameGrad)"
      className="lamp-flame-anim"
    />
    {/* Lamp Crown / Bird motif */}
    <circle cx="40" cy="27" r="3.5" fill="url(#lampGrad)" />
    {/* Top bowl for oil */}
    <path d="M22 34 C28 40 52 40 58 34 L54 44 C48 47 32 47 26 44 Z" fill="url(#lampGrad)" />
    {/* Central Stem */}
    <path d="M37 45 L37 98 L43 98 L43 45 Z" fill="url(#lampGrad)" />
    {/* Stem Nodes */}
    <ellipse cx="40" cy="60" rx="7" ry="3" fill="#FFF2C2" />
    <ellipse cx="40" cy="80" rx="8" ry="3.5" fill="#FFF2C2" />
    {/* Stepped Pedestal Base */}
    <path d="M28 98 L52 98 L56 108 L24 108 Z" fill="url(#lampGrad)" />
    <path d="M16 109 L64 109 L68 122 C55 126 25 126 12 122 Z" fill="url(#lampGrad)" stroke="#FFE89E" strokeWidth="1" />
  </svg>
);

// Ornate Corner Filigree for Invitation Cards & Section Borders
export const CornerFiligree = ({ position = "top-left", className = "", size = 70 }) => {
  const transforms = {
    "top-left": "",
    "top-right": "scale(-1, 1)",
    "bottom-left": "scale(1, -1)",
    "bottom-right": "scale(-1, -1)",
  };

  const posStyles = {
    "top-left": { top: "10px", left: "10px" },
    "top-right": { top: "10px", right: "10px" },
    "bottom-left": { bottom: "10px", left: "10px" },
    "bottom-right": { bottom: "10px", right: "10px" },
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        ...(posStyles[position] || {}),
        transform: transforms[position] || "",
        transformOrigin: "center",
        pointerEvents: "none",
        zIndex: 2,
      }}
      className={`corner-filigree-svg ${className}`}
    >
      <defs>
        <linearGradient id="cornerGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3CD" />
          <stop offset="40%" stopColor="#E2C172" />
          <stop offset="70%" stopColor="#C8A45D" />
          <stop offset="100%" stopColor="#96742A" />
        </linearGradient>
      </defs>
      <path
        d="M6 94 V24 C6 14.0589 14.0589 6 24 6 H94"
        stroke="url(#cornerGold)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M12 94 V30 C12 20.0589 20.0589 12 30 12 H94"
        stroke="url(#cornerGold)"
        strokeWidth="1"
        strokeDasharray="2 4"
      />
      {/* Intricate Corner Flourish */}
      <circle cx="22" cy="22" r="5" fill="none" stroke="url(#cornerGold)" strokeWidth="1.5" />
      <circle cx="22" cy="22" r="2" fill="url(#cornerGold)" />
      <path
        d="M22 6 C28 14 36 20 48 20 C36 20 30 28 30 40 C30 28 22 22 6 22"
        fill="none"
        stroke="url(#cornerGold)"
        strokeWidth="1.5"
      />
      <circle cx="8" cy="8" r="3" fill="url(#cornerGold)" />
    </svg>
  );
};

// Ornate Mandala Divider with Center Jewel
export const MandalaDivider = ({ className = "", width = "100%", maxWidth = 420 }) => (
  <div
    className={`mandala-divider-wrap ${className}`}
    style={{ width, maxWidth, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <svg viewBox="0 0 400 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E2C172" stopOpacity="0" />
          <stop offset="25%" stopColor="#C8A45D" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFF3CD" />
          <stop offset="75%" stopColor="#C8A45D" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#E2C172" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Side lines */}
      <line x1="20" y1="15" x2="170" y2="15" stroke="url(#dividerGrad)" strokeWidth="1.5" />
      <line x1="230" y1="15" x2="380" y2="15" stroke="url(#dividerGrad)" strokeWidth="1.5" />
      {/* Center Motif */}
      <circle cx="200" cy="15" r="7" fill="#C8A45D" stroke="#FFF7DD" strokeWidth="1.5" />
      <circle cx="200" cy="15" r="3" fill="#D32F2F" />
      {/* Petals around center */}
      <path d="M190 15 C194 11 198 13 200 15 C198 17 194 19 190 15 Z" fill="#E2C172" />
      <path d="M210 15 C206 11 202 13 200 15 C202 17 206 19 210 15 Z" fill="#E2C172" />
      <circle cx="178" cy="15" r="2.5" fill="#E2C172" />
      <circle cx="222" cy="15" r="2.5" fill="#E2C172" />
    </svg>
  </div>
);

// Blooming Auspicious Lotus Motif
export const LotusMotif = ({ className = "", size = 36 }) => (
  <svg
    width={size}
    height={size * 0.8}
    viewBox="0 0 60 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`lotus-motif-svg ${className}`}
  >
    <defs>
      <linearGradient id="lotusGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#A83D5D" />
        <stop offset="60%" stopColor="#E87A9A" />
        <stop offset="100%" stopColor="#FFE0E9" />
      </linearGradient>
    </defs>
    {/* Center petal */}
    <path
      d="M30 6 C27 18 25 32 30 40 C35 32 33 18 30 6 Z"
      fill="url(#lotusGrad)"
      stroke="#FFF0F5"
      strokeWidth="0.8"
    />
    {/* Inner side petals */}
    <path
      d="M30 40 C22 34 16 22 22 14 C27 22 28 32 30 40 Z"
      fill="url(#lotusGrad)"
      opacity="0.9"
    />
    <path
      d="M30 40 C38 34 44 22 38 14 C33 22 32 32 30 40 Z"
      fill="url(#lotusGrad)"
      opacity="0.9"
    />
    {/* Outer side petals */}
    <path
      d="M30 40 C18 38 8 28 14 22 C22 28 26 36 30 40 Z"
      fill="url(#lotusGrad)"
      opacity="0.75"
    />
    <path
      d="M30 40 C42 38 52 28 46 22 C38 28 34 36 30 40 Z"
      fill="url(#lotusGrad)"
      opacity="0.75"
    />
  </svg>
);

// Regal Golden Calligraphic Flourish flanking the Couple Names
export const NameFlourish = ({ direction = "left", className = "" }) => (
  <svg
    viewBox="0 0 110 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`name-flourish-svg flourish-${direction} ${className}`}
    style={{ transform: direction === "right" ? "scaleX(-1)" : undefined }}
  >
    <defs>
      <linearGradient id={`flourishGold_${direction}`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8C6A21" stopOpacity="0.3" />
        <stop offset="35%" stopColor="#C8A45D" />
        <stop offset="70%" stopColor="#FFF2C4" />
        <stop offset="100%" stopColor="#E5BE57" />
      </linearGradient>
    </defs>
    {/* Main graceful S-curve scroll */}
    <path
      d="M108 16 C85 16 75 7 50 7 C28 7 14 18 6 13 C3 11 2 7 6 5 C10 3 15 7 13 11 C11 15 5 18 2 16"
      stroke={`url(#flourishGold_${direction})`}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    {/* Secondary upper leaf flourish */}
    <path
      d="M48 7 C55 12 65 15 78 15 C90 15 100 16 108 16"
      stroke={`url(#flourishGold_${direction})`}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.75"
    />
    {/* Lower curl accent */}
    <path
      d="M38 10 C32 16 26 24 16 24 C10 24 8 20 12 17 C15 15 18 17 18 19"
      stroke={`url(#flourishGold_${direction})`}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Terminal gold jewels/dots */}
    <circle cx="108" cy="16" r="2.2" fill="#FFF2C4" />
    <circle cx="50" cy="7" r="1.6" fill="#E5BE57" />
    <circle cx="6" cy="5" r="1.4" fill="#FFF2C4" />
  </svg>
);

// Ornate Circular Gold Sunburst Medallion housing the Ampersand &
export const AmpersandMedallion = ({ className = "" }) => (
  <div className={`couple-ampersand-medallion ${className}`}>
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="medallion-ornament-svg"
    >
      <defs>
        <radialGradient id="medallionBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B3C44" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#041E23" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#021013" />
        </radialGradient>
        <linearGradient id="medallionGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF2" />
          <stop offset="30%" stopColor="#FCE09B" />
          <stop offset="70%" stopColor="#C8A45D" />
          <stop offset="100%" stopColor="#8C6716" />
        </linearGradient>
      </defs>
      
      {/* Dark teal jewel background */}
      <circle cx="32" cy="32" r="24" fill="url(#medallionBg)" />

      {/* 8-Pointed Ornate Sunburst Fleurons */}
      {/* Cardinal: N, S, E, W */}
      <path d="M32 4 L34.5 10 L32 9 L29.5 10 Z" fill="url(#medallionGold)" />
      <path d="M32 60 L34.5 54 L32 55 L29.5 54 Z" fill="url(#medallionGold)" />
      <path d="M4 32 L10 34.5 L9 32 L10 29.5 Z" fill="url(#medallionGold)" />
      <path d="M60 32 L54 34.5 L55 32 L54 29.5 Z" fill="url(#medallionGold)" />
      {/* Diagonals: NE, SE, SW, NW */}
      <circle cx="49" cy="15" r="1.8" fill="url(#medallionGold)" />
      <circle cx="49" cy="49" r="1.8" fill="url(#medallionGold)" />
      <circle cx="15" cy="49" r="1.8" fill="url(#medallionGold)" />
      <circle cx="15" cy="15" r="1.8" fill="url(#medallionGold)" />

      {/* Outer Fine Gold Ring */}
      <circle cx="32" cy="32" r="24" stroke="url(#medallionGold)" strokeWidth="1.2" />
      {/* Dotted Accent Ring */}
      <circle cx="32" cy="32" r="21" stroke="#E5BE57" strokeWidth="0.8" strokeDasharray="1.5 2.5" opacity="0.85" />
      {/* Inner Fine Gold Ring */}
      <circle cx="32" cy="32" r="18" stroke="url(#medallionGold)" strokeWidth="0.9" />
    </svg>
    <span className="ampersand-char">&</span>
  </div>
);

// Delicate Golden Underline Frame extending below the Names
export const NamesUnderlineFrame = ({ className = "" }) => (
  <div className={`names-underline-frame ${className}`}>
    <svg
      viewBox="0 0 760 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="names-frame-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="frameGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E5BE57" stopOpacity="0.15" />
          <stop offset="15%" stopColor="#E5BE57" stopOpacity="0.75" />
          <stop offset="85%" stopColor="#FFF2C4" />
          <stop offset="100%" stopColor="#E5BE57" />
        </linearGradient>
        <linearGradient id="frameGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#E5BE57" stopOpacity="0.15" />
          <stop offset="15%" stopColor="#E5BE57" stopOpacity="0.75" />
          <stop offset="85%" stopColor="#FFF2C4" />
          <stop offset="100%" stopColor="#E5BE57" />
        </linearGradient>
      </defs>
      {/* Left side rule with end curl and center swoop */}
      <path
        d="M20 10 C25 6 32 6 35 10 C38 13 34 16 30 16 H340 C352 16 360 21 368 28"
        stroke="url(#frameGradLeft)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Right side rule with end curl and center swoop */}
      <path
        d="M740 10 C735 6 728 6 725 10 C722 13 726 16 730 16 H420 C408 16 400 21 392 28"
        stroke="url(#frameGradRight)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Small accent dots at ends */}
      <circle cx="20" cy="10" r="1.8" fill="#FFF2C4" />
      <circle cx="740" cy="10" r="1.8" fill="#FFF2C4" />
      <circle cx="368" cy="28" r="1.5" fill="#E5BE57" />
      <circle cx="392" cy="28" r="1.5" fill="#E5BE57" />
    </svg>
  </div>
);

// Auspicious Golden Lotus Divider for Wedding Blessings
export const GoldenLotusDivider = ({ className = "", size = 32 }) => (
  <div className={`golden-lotus-divider-wrap ${className}`}>
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 54 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="golden-lotus-svg"
    >
      <defs>
        <linearGradient id="lotusGoldGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#8C6716" />
          <stop offset="35%" stopColor="#C8A45D" />
          <stop offset="70%" stopColor="#FCE09B" />
          <stop offset="100%" stopColor="#FFFDF2" />
        </linearGradient>
      </defs>
      {/* Central Petal */}
      <path
        d="M27 3 C24 13 22 25 27 33 C32 25 30 13 27 3 Z"
        fill="url(#lotusGoldGrad)"
        stroke="#FFFDF2"
        strokeWidth="0.75"
      />
      {/* Inner Petals */}
      <path
        d="M27 33 C20 27 15 16 20 10 C24 16 25 25 27 33 Z"
        fill="url(#lotusGoldGrad)"
        opacity="0.9"
      />
      <path
        d="M27 33 C34 27 39 16 34 10 C30 16 29 25 27 33 Z"
        fill="url(#lotusGoldGrad)"
        opacity="0.9"
      />
      {/* Outer Petals */}
      <path
        d="M27 33 C16 30 8 22 13 17 C20 21 23 28 27 33 Z"
        fill="url(#lotusGoldGrad)"
        opacity="0.75"
      />
      <path
        d="M27 33 C38 30 46 22 41 17 C34 21 31 28 27 33 Z"
        fill="url(#lotusGoldGrad)"
        opacity="0.75"
      />
      {/* Base Calyx */}
      <path
        d="M21 34 C24 36 30 36 33 34 C30 35 24 35 21 34 Z"
        fill="#FFE599"
      />
      <circle cx="27" cy="35" r="1.5" fill="#FFFDF2" />
    </svg>
  </div>
);

