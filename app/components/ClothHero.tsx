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
  if (reduce || small) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function ClothHero() {
  // SSR + erster Client-Render zeigen den Fallback; danach ggf. Upgrade auf 3D.
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    setUse3D(canRender3D());
  }, []);

  return (
    <div className="absolute inset-0 opacity-[0.85]" aria-hidden="true">
      {use3D ? (
        <ClothScene />
      ) : (
        <div className="raute-fallback absolute inset-0" />
      )}
    </div>
  );
}
