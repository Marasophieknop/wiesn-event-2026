"use client";

import { useState } from "react";
import { type Dict } from "../translations";

/* ──────────────────────────────────────────────────────────────────────────
   ANMELDEFORMULAR — Custom-Formular → HubSpot Forms API

   Felder exakt passend zum HubSpot-Formular: firstname, lastname, email,
   zusage_absage (Radio), Einwilligung. Die Anzeige-Labels kommen aus den
   Übersetzungen (Prop `t`); die HubSpot-Feldnamen UND die Radio-Optionswerte
   bleiben sprachunabhängig Deutsch, da die HubSpot-Form-Definition sie so
   erwartet.
   ────────────────────────────────────────────────────────────────────────── */

const PORTAL_ID = "5564215";
const FORM_GUID = "1cb4594f-7126-47c1-8749-86ad847decfd";
const ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`;

const CONSENT_SUBSCRIPTION_ID = 6096241;
const CONSENT_TEXT_API =
  "Ich bin damit einverstanden, dass Building Radar mich zum Wiesn-Event kontaktiert.";

// sprachunabhängige HubSpot-Optionswerte
const ATTEND_YES_VALUE = "Ja, ich nehme gerne teil.";
const ATTEND_NO_VALUE = "Nein, ich kann leider nicht an dem Termin teilnehmen.";

type Status = "idle" | "submitting" | "success" | "error";

export default function RegistrationForm({ t }: { t: Dict["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [valid, setValid] = useState(false);

  const attendOptions = [
    { value: ATTEND_YES_VALUE, label: t.attendYes },
    { value: ATTEND_NO_VALUE, label: t.attendNo },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const val = (name: string) => String(data.get(name) ?? "").trim();

    const fields = [
      { name: "firstname", value: val("firstname") },
      { name: "lastname", value: val("lastname") },
      { name: "email", value: val("email") },
      { name: "zusage_absage", value: val("zusage_absage") },
    ];

    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          legalConsentOptions: {
            consent: {
              consentToProcess: true,
              text: "Ich stimme der Verarbeitung meiner Daten durch Building Radar zu.",
              communications: [
                {
                  value: true,
                  subscriptionTypeId: CONSENT_SUBSCRIPTION_ID,
                  text: CONSENT_TEXT_API,
                },
              ],
            },
          },
          context: {
            pageUri: window.location.href,
            pageName: "Wiesn-Event 2026 · Building Radar",
          },
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        console.error("HubSpot-Submission fehlgeschlagen:", res.status, body);
        throw new Error(`HTTP ${res.status}`);
      }
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-gray-light p-8">
        <div className="label text-indigo">{t.successLabel}</div>
        <h3 className="font-display text-2xl font-bold text-night">
          {t.successHeadline}
        </h3>
        <p className="text-night/70">{t.successBody}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setValid(false);
          }}
          className="label text-indigo underline-offset-4 hover:underline"
        >
          {t.successAgain}
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      onInput={(e) => setValid(e.currentTarget.checkValidity())}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
    >
      <Field name="firstname" label={t.firstname} required />
      <Field name="lastname" label={t.lastname} required />
      <Field
        name="email"
        label={t.email}
        type="email"
        required
        className="sm:col-span-2"
      />

      <fieldset className="flex flex-col gap-2.5 sm:col-span-2">
        <legend className="label mb-1 text-gray-mid">{t.attendQuestion}</legend>
        {attendOptions.map((opt) => (
          <label
            key={opt.value}
            className="flex items-start gap-3 text-sm text-night"
          >
            <input
              type="radio"
              name="zusage_absage"
              value={opt.value}
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--indigo)]"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </fieldset>

      <label className="flex items-start gap-3 text-sm text-night/70 sm:col-span-2">
        <input
          type="checkbox"
          required
          name="consent"
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--indigo)]"
        />
        <span>
          {t.consentBefore}{" "}
          <a
            href="https://buildingradar.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo underline-offset-4 hover:underline"
          >
            {t.consentLink}
          </a>
          .
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-red sm:col-span-2" role="alert">
          {t.error}
        </p>
      )}

      <button
        type="submit"
        disabled={!valid || submitting}
        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red px-7 py-3.5 font-display text-base font-medium text-white transition hover:bg-red-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2"
      >
        {submitting ? (
          t.submitting
        ) : (
          <>
            {t.submit}
            <span aria-hidden="true">→</span>
          </>
        )}
      </button>

      <p className="text-xs text-gray-mid sm:col-span-2">{t.note}</p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  className = "",
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={name} className="label text-gray-mid">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-xl border border-border bg-white px-4 py-3 text-night outline-none transition placeholder:text-gray-mid focus:border-indigo focus:ring-2 focus:ring-indigo/20"
      />
    </div>
  );
}
