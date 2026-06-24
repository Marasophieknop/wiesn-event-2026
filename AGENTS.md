<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Wiesn Event 2026 — Building Radar

Single-Page Landing Page für das Building Radar Wiesn-Event am 22.09.2026 in
München. KI-Insights & bayerisches Frühstück am Vormittag, Oktoberfest am
Nachmittag. Enthält ein Anmeldeformular (wird später durch ein HubSpot-Formular
ersetzt — Feldnamen folgen den HubSpot-Standardeigenschaften).

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4 (Tokens via `@theme` in `app/globals.css`)
- Three.js + @react-three/fiber + @react-three/drei — 3D-Cloth-Animation im Hero
- Fonts via `next/font/google`: Bricolage Grotesque (Display), Inter (Body),
  JetBrains Mono (Labels/Daten)

## Brand Colors (Building Radar)

Als CSS-Custom-Properties in `app/globals.css` definiert und als Tailwind-Farben
(`text-night`, `bg-red`, …) verfügbar.

| Token        | Hex       | Einsatz                                            |
| ------------ | --------- | -------------------------------------------------- |
| `night`      | `#171C32` | Headlines, Body-Text, dunkle Hintergründe (Footer) |
| `red`        | `#F6173B` | CTAs, das Wort „Wiesn." — sparsam!                 |
| `red-deep`   | `#D10E2F` | CTA-Hover                                          |
| `indigo`     | `#2B2893` | Section-Labels, Links, Timeline-Marker             |
| `white`      | `#FFFFFF` | Standard-Hintergrund                               |
| `gray-light` | `#F5F5F7` | Section-Hintergründe (Anmeldung, Timeline)         |
| `gray-mid`   | `#8A8B9C` | Sekundärtext, Captions, Labels in Cards            |
| `border`     | `#E5E5EA` | Borders, Dividers                                  |
| `gold`       | `#C68A1E` | nur als festlicher Bruch (Wiesn-Marker Timeline)   |

## Design-Regeln

- **Brilliant Red** ausschließlich für CTAs und das Wort „Wiesn." — pro Section
  höchstens ein Rot-Highlight.
- **Night Blue** für alle Headlines; Fließtext in `night/70` für Lesbarkeit.
- **Indigo** für Section-Labels und Links — nicht mit Rot auf kleinem Text mischen.
- Hintergründe nur Weiß, `gray-light` oder Night Blue (Footer).
- Clean, professionell, nicht verspielt — B2B-Event.

## Hero-Animation

- `app/components/ClothHero.tsx` — Wrapper: lädt die 3D-Szene clientseitig per
  `next/dynamic` (`ssr:false`). Fallback auf das CSS-Rautenmuster
  (`.raute-fallback`) bei kleinem Viewport (<768px), `prefers-reduced-motion`
  oder fehlendem WebGL.
- `app/components/ClothScene.tsx` — `@react-three/fiber`-Canvas mit Plane und
  Custom-`ShaderMaterial`: Vertex-Displacement (überlagerte Sinus-Wellen =
  Wind), Fragment-Shader zeichnet das bayerische Rautenmuster (Night Blue/Weiß),
  Beleuchtung aus `dFdx/dFdy`-Normalen für Tiefe, weiche Kantenausblendung.

## Komponentenstruktur

- `app/page.tsx` — Sektionen: Hero → Anmeldung → „Darum geht's" → Timeline → Footer
- `app/components/RegistrationForm.tsx` — Anmeldeformular (HubSpot-Swap oben im
  File dokumentiert; aktuell `console.log` + Erfolgs-State, kein Backend)

## Konventionen

- Keine externen UI-Libraries (kein shadcn etc.) — alles custom mit Tailwind.
- Mobile-first, responsive. `prefers-reduced-motion` respektieren.
