"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Bayerische Rautenflagge als voller Hero-Hintergrund: eine Plane, die den
 * Viewport bewusst überfüllt, sodass das Muster von Kante zu Kante reicht
 * (volle Breite und Höhe). Kräftiges Vertex-Displacement (tiefe, wandernde
 * Wellen) gibt den Stoff-Look und Tiefe über Licht/Schatten. Auf dem Mesh liegt
 * ein Shader-Pattern aus vielen kleinen, hochkant gezogenen Rauten im typischen
 * Bayerisch-Hellblau (#009FE3) und Weiß. Lesbarkeit des Textes regelt ein
 * weißer Gradient links (in page.tsx).
 */

const FLAG_W = 13.0;
const FLAG_H = 9.0;
const RAUTE_X = 55.0; // viele Rauten in der Breite
const RAUTE_Y = 24.0; // weniger in der Höhe → hochkant gezogen

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uSize;
  varying vec2 vUv;
  varying vec3 vNormal;

  const float TAU = 6.2831853;

  void main() {
    vUv = uv;
    float u = uv.x; // 0 = Mast (links), 1 = freies Ende (rechts)
    float v = uv.y;

    // Wellen über die ganze Fläche, nach rechts etwas kräftiger (lebendig,
    // aber nirgends ganz flach → Muster bleibt überall bewegt).
    float ramp = 0.5 + 0.5 * u;

    // sanft nach rechts wandernde Wellen — etwas zügiger als zuletzt, aber
    // weiterhin ruhig (zwischen dem langsamen und dem früheren Tempo)
    float a1 = u * TAU * 2.2 + v * TAU * 0.30 - uTime * 0.62;
    float a2 = u * TAU * 1.3 - v * TAU * 0.45 - uTime * 0.44;
    float a3 = u * TAU * 3.4 - uTime * 0.85;

    float wave = sin(a1) * 0.62 + sin(a2) * 0.34 + sin(a3) * 0.16;
    float amp = 0.28; // kleinere Amplitude → subtiles, ruhiges Wehen
    float h = wave * amp * ramp;

    float dwu = cos(a1) * 0.62 * TAU * 2.2
              + cos(a2) * 0.34 * TAU * 1.3
              + cos(a3) * 0.16 * TAU * 3.4;
    float dwv = cos(a1) * 0.62 * TAU * 0.30
              - cos(a2) * 0.34 * TAU * 0.45;
    float hu = dwu * amp * ramp;
    float hv = dwv * amp * ramp;

    vNormal = normalize(vec3(-hu * uSize.y, -hv * uSize.x, uSize.x * uSize.y));

    vec3 pos = position;
    pos.z += h;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform vec2 uScale;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    // Bayerisches Rautenmuster: Schachbrett in um 45° gedrehten Koordinaten.
    // uScale steuert Anzahl/Streckung (X gross, Y klein → hochkant Rauten).
    vec2 p = vUv * uScale;
    vec2 q = vec2(p.x + p.y, p.x - p.y);
    float checker = mod(floor(q.x) + floor(q.y), 2.0);

    vec3 blue = vec3(0.0, 0.624, 0.890); // #009FE3 Bayerisch-Hellblau
    vec3 white = vec3(1.0);
    vec3 col = mix(white, blue, checker);

    // Schimmer aus der Flächennormalen → Licht/Schatten auf den Stofffalten
    vec3 n = normalize(vNormal);
    vec3 lightDir = normalize(vec3(0.25, 0.45, 0.86));
    float diff = clamp(dot(n, lightDir), 0.0, 1.0);
    float shade = 0.68 + 0.40 * diff;
    col = clamp(col * shade, 0.0, 1.0);

    // nur minimale Sicherheits-Ausblendung ganz am Rand — die Plane überfüllt
    // den Viewport, das Muster reicht von Kante zu Kante.
    float edge = smoothstep(0.0, 0.015, vUv.x) * smoothstep(1.0, 0.985, vUv.x)
               * smoothstep(0.0, 0.015, vUv.y) * smoothstep(1.0, 0.985, vUv.y);

    gl_FragColor = vec4(col, edge);
  }
`;

function Flag() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: new THREE.Vector2(FLAG_W, FLAG_H) },
      uScale: { value: new THREE.Vector2(RAUTE_X, RAUTE_Y) },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  // Zentriert und (fast) frontal, nur leicht gekippt für etwas Leben. Die Plane
  // ist viel grösser als der sichtbare Bereich → volle Abdeckung edge-to-edge.
  return (
    <mesh position={[0, 0, 0]} rotation={[-0.05, 0.12, 0.02]}>
      <planeGeometry args={[FLAG_W, FLAG_H, 200, 150]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function ClothScene() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 3], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop="always"
    >
      <Flag />
    </Canvas>
  );
}
