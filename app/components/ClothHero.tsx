"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Die 3D-Szene wird nur clientseitig und nur bei Bedarf geladen (kein SSR,
// kein Three.js-Bundle auf Mobile/Reduced-Motion).
const ClothScene = dynamic(() => import("./ClothScene"), { ssr: false });

function canRender3D() {
  if (typeof window === "undefined") return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = window.matchMedia("(max-width: 767px)").matches;
  // Touch-Geräte (Smartphones/Tablets) immer den Fallback geben — fängt auch
  // iPhones im „Desktop-Website"-Modus ab, deren Breite > 767px meldet.
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (reduce || small || coarse) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Bayerisches Rautenmuster als Fallback (Mobile / Touch / kein WebGL).
 * Inline-SVG mit <pattern> (userSpaceOnUse) statt CSS-background-image: rendert
 * auf allen Engines – inkl. iOS Safari – identisch und behält das hochkant
 * gezogene Seitenverhältnis (Kachel 30×48) ohne Verzerrung.
 */
function RauteFallback() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-90"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="br-raute"
          width="30"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <rect width="30" height="48" fill="#ffffff" />
          <polygon points="15,0 30,24 15,48 0,24" fill="#009FE3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#br-raute)" />
    </svg>
  );
}

export default function ClothHero() {
  // SSR + erster Client-Render zeigen den Fallback; danach ggf. Upgrade auf 3D.
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    setUse3D(canRender3D());
  }, []);

  return (
    <div className="absolute inset-0 opacity-[0.85]" aria-hidden="true">
      {use3D ? <ClothScene /> : <RauteFallback />}
    </div>
  );
}
