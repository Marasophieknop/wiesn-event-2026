"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ClothHero from "./ClothHero";
import RegistrationForm from "./RegistrationForm";
import { translations, type Lang } from "../translations";

// Foto-Grid: 6 Spalten. Oben 3 Bilder (je 2 Spalten), unten 2 Bilder (je 3
// Spalten, das Querformat dadurch breiter). Feste Zeilenhöhe + object-cover →
// jede Zelle ist randlos gefüllt, alle Bilder ähnlich groß.
// Mobile: 2 Spalten, das Querformat-Bild über die volle Breite.
const GALLERY = [
  { src: "/IMG_9640.jpeg", span: "col-span-1 sm:col-span-2" },
  { src: "/IMG_9665.jpeg", span: "col-span-1 sm:col-span-2" },
  { src: "/IMG_9738.jpg", span: "col-span-1 sm:col-span-2" },
  { src: "/IMG_9701.jpeg", span: "col-span-1 sm:col-span-3" },
  { src: "/IMG_9699.jpeg", span: "col-span-2 sm:col-span-3" },
];

export default function Landing({ lang }: { lang: Lang }) {
  const t = translations[lang];

  // <html lang> an die Route anpassen (a11y/SEO)
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center">
            <Image
              src="/Logo__1_.png"
              alt="Building Radar"
              width={738}
              height={108}
              priority
              className="h-7 w-auto sm:h-8"
            />
          </a>
          <LanguageToggle lang={lang} label={t.toggleLabel} />
        </div>
      </header>

      <main id="top">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative flex min-h-[90vh] items-center overflow-hidden border-b border-border bg-white">
          <ClothHero />
          {/* Legibility-Wash. Desktop: weißer Gradient links für den Text. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden sm:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.55) 52%, rgba(255,255,255,0) 78%), linear-gradient(180deg, rgba(255,255,255,0) 68%, #ffffff 100%)",
            }}
          />
          {/* Mobile: ganzflächiger Wash. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 sm:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.66) 0%, rgba(255,255,255,0.84) 55%, #ffffff 100%)",
            }}
          />
          <div className="relative mx-auto w-full max-w-5xl px-5 py-20 sm:py-28">
            <p
              className="label text-gray-mid"
              style={{ fontSize: "clamp(0.8rem, 1.4vw, 1.05rem)" }}
            >
              {t.hero.label}
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-6xl font-bold leading-[1.02] tracking-tight text-night sm:text-8xl">
              {t.hero.headline}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-night/70 sm:text-2xl">
              {t.hero.subtext}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              {t.hero.badges.map((b) => (
                <MetaChip key={b}>{b}</MetaChip>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#anmeldung"
                className="inline-flex items-center gap-2 rounded-full bg-red px-8 py-4 font-display text-lg font-medium text-white shadow-sm transition hover:bg-red-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              >
                {t.hero.cta}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Registration ──────────────────────────────────────── */}
        <section
          id="anmeldung"
          className="scroll-mt-20 border-b border-border bg-gray-light"
        >
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-5 py-20 sm:py-24 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
            <div>
              <p className="label text-indigo">{t.registration.label}</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-night sm:text-4xl">
                {t.registration.headline}
              </h2>
              <p className="mt-5 max-w-md text-night/70">
                {t.registration.desc}
              </p>
              <dl className="mt-10 space-y-4">
                {t.registration.summary.map((row) => (
                  <SummaryRow key={row.k} k={row.k} v={row.v} />
                ))}
              </dl>
            </div>
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <RegistrationForm t={t.form} />
            </div>
          </div>
        </section>

        {/* ── Pillars ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-5 py-20 sm:py-24">
          <p className="label text-indigo">{t.pillars.label}</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-night sm:text-4xl">
            {t.pillars.headline}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {t.pillars.items.map((p) => (
              <div key={p.no} className="bg-white p-7">
                <div className="font-mono text-sm font-medium text-indigo">
                  {p.no}
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-night">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-night/70">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Agenda timeline ───────────────────────────────────── */}
        <section className="border-y border-border bg-gray-light">
          <div className="mx-auto max-w-5xl px-5 py-20 sm:py-24">
            <p className="label text-indigo">{t.agenda.label}</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-night sm:text-4xl">
              {t.agenda.headline}
            </h2>

            <ol className="mt-12 border-l border-border">
              {t.agenda.items.map((item) => (
                <li
                  key={item.time}
                  className="relative grid grid-cols-[auto] gap-1 pb-10 pl-7 last:pb-0 sm:grid-cols-[6.5rem_1fr] sm:gap-6 sm:pl-9"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[6.5px] top-1.5 h-3 w-3 rotate-45 bg-indigo"
                  />
                  <time className="font-mono text-sm font-medium tabular-nums text-indigo">
                    {item.time}
                  </time>
                  <div>
                    <h3 className="font-display text-lg font-bold text-night">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-[0.95rem] leading-relaxed text-night/70">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Gallery ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-5 py-20 sm:py-24">
          <p className="label text-indigo">{t.gallery.label}</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-night sm:text-4xl">
            {t.gallery.headline}
          </h2>
          <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-2 sm:auto-rows-[300px] sm:grid-cols-6">
            {GALLERY.map((img) => (
              <div
                key={img.src}
                className={`relative overflow-hidden rounded-2xl border border-border ${img.span}`}
              >
                <Image
                  src={img.src}
                  alt={t.gallery.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center">
          <Image
            src="/Logo__1_.png"
            alt="Building Radar"
            width={738}
            height={108}
            className="h-7 w-auto"
          />
          <p className="text-sm text-gray-mid">{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}

/** DE/EN-Toggle als echte Links: Deutsch unter „/", Englisch unter „/en". */
function LanguageToggle({ lang, label }: { lang: Lang; label: string }) {
  const cls = (active: boolean) =>
    `transition ${active ? "font-medium text-night" : "text-gray-mid hover:text-night"}`;
  return (
    <div
      className="flex items-center gap-2 font-mono text-sm"
      role="group"
      aria-label={label}
    >
      <Link
        href="/"
        aria-current={lang === "de" ? "true" : undefined}
        className={cls(lang === "de")}
      >
        DE
      </Link>
      <span className="text-border" aria-hidden="true">
        |
      </span>
      <Link
        href="/en"
        aria-current={lang === "en" ? "true" : undefined}
        className={cls(lang === "en")}
      >
        EN
      </Link>
    </div>
  );
}

function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white/80 px-5 py-2.5 font-mono text-base font-medium text-night backdrop-blur sm:text-lg">
      <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-indigo" />
      {children}
    </span>
  );
}

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-border pb-4">
      <dt className="label w-20 shrink-0 text-gray-mid">{k}</dt>
      <dd className="font-medium text-night">{v}</dd>
    </div>
  );
}
