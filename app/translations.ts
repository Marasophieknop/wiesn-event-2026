/* Alle sichtbaren Texte der Seite in DE/EN.
   Hinweis: Die HubSpot-Feldnamen (firstname, lastname, email, zusage_absage)
   und die Radio-OPTIONSWERTE bleiben sprachunabhängig Deutsch (so erwartet es
   die HubSpot-Form-Definition) — hier werden nur die Anzeige-Labels übersetzt. */

export const translations = {
  de: {
    toggleLabel: "Sprache",
    hero: {
      label: "Wiesn-Event 2026 · München",
      headline: "Building Radar Wiesn-Event 2026",
      subtext:
        "Ein Tag bei Building Radar: die neuesten KI-Entwicklungen für die Baubranche, Einblicke aus unserer Praxis – und danach gemeinsam aufs Oktoberfest.",
      badges: [
        "Di · 22. September 2026",
        "9:00 – 17:30 Uhr",
        "Theresienhöhe 12, München",
      ],
      cta: "Platz sichern",
    },
    registration: {
      label: "Anmeldung",
      headline: "Sichern Sie sich Ihren Platz",
      desc: "Die Teilnahme ist für geladene Kund:innen kostenfrei, die Plätze sind begrenzt. Tragen Sie sich ein – wir melden uns mit allen Details.",
      summary: [
        { k: "Wann", v: "22.09.2026 · 9:00 – 17:30 Uhr" },
        { k: "Wo", v: "Theresienhöhe 12, 80339 München" },
        { k: "Inklusive", v: "Frühstück, Talks & Wiesn-Besuch" },
      ],
    },
    form: {
      firstname: "Vorname",
      lastname: "Nachname",
      email: "E-Mail",
      attendQuestion: "Können Sie am Event teilnehmen?",
      attendYes: "Ja, ich nehme gerne teil.",
      attendNo: "Nein, ich kann leider nicht an dem Termin teilnehmen.",
      consentBefore:
        "Ich bin damit einverstanden, dass Building Radar mich zum Wiesn-Event kontaktiert.",
      consentLink: "Datenschutz",
      submit: "Platz sichern",
      submitting: "Wird gesendet …",
      note: "Begrenzte Plätze. Die Teilnahme ist für geladene Kund:innen kostenfrei.",
      error:
        "Da ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.",
      successLabel: "Anmeldung eingegangen",
      successHeadline: "Pfiat di – bis zum 22. September!",
      successBody:
        "Wir haben Ihre Anmeldung erhalten und melden uns mit allen Details zum Ablauf. Bei Fragen schreiben Sie uns jederzeit.",
      successAgain: "Weitere Person anmelden",
    },
    pillars: {
      label: "Darum geht's",
      headline: "Ein Vormittag, der Ihren Vertrieb weiterbringt",
      items: [
        {
          no: "01",
          title: "KI für die Baubranche",
          body: "Die neuesten KI-Initiativen, eingeordnet für Bau und Vertrieb – konkret, nicht als Buzzword-Bingo.",
        },
        {
          no: "02",
          title: "Erfahrungen aus der Praxis",
          body: "Insights aus unserer täglichen Arbeit mit Vertriebsteams in der Bauindustrie.",
        },
        {
          no: "03",
          title: "Produkt im Wandel",
          body: "Wie Building Radar diese Entwicklungen aufgreift und sich Schritt für Schritt weiterentwickelt.",
        },
        {
          no: "04",
          title: "Persönlicher Austausch",
          body: "Connecten Sie sich mit anderen Entscheidern aus der Branche und profitieren Sie von gegenseitigen Erfahrungen.",
        },
      ],
    },
    agenda: {
      label: "Ablauf des Tages",
      headline: "Der Ablauf im Überblick",
      items: [
        {
          time: "09:00",
          title: "Bayerisches Frühstück & Ankommen",
          body: "Weißwurst, Brezn und Kaffee — ankommen und die anderen Gäste kennenlernen.",
        },
        {
          time: "09:30",
          title: "KI-Entwicklungen für die Baubranche",
          body: "Die aktuellsten Entwicklungen, die wirklich für Bau und Vertrieb relevant sind.",
        },
        {
          time: "10:30",
          title: "Einblicke aus unserer Praxis",
          body: "Was wir aus tausenden Vertriebsprozessen gelernt haben und wie sich das auf Ihre Pipeline übertragen lässt.",
        },
        {
          time: "11:00",
          title: "Building Radar & KI: die Roadmap",
          body: "Wie sich unser Produkt entlang dieser KI-Entwicklungen weiterentwickelt – und was als Nächstes kommt.",
        },
        {
          time: "11:15",
          title: "Auf geht's auf d'Wiesn",
          body: "Gemeinsamer Aufbruch zum Oktoberfest.",
        },
        {
          time: "ab 11:30",
          title: "Networking & Wiesn-Atmosphäre",
          body: "Mittagessen, Maß und Zeit für Gespräche – die einzigartige Stimmung auf der Wiesn gemeinsam genießen.",
        },
        {
          time: "17:30",
          title: "Ausklang",
          body: "Offizielles Ende. Wer mag, bleibt natürlich noch.",
        },
      ],
    },
    gallery: {
      label: "Eindrücke",
      headline: "Eindrücke aus dem letzten Jahr",
      alt: "Eindruck vom Building Radar Wiesn-Event 2025",
    },
    footer: {
      copyright: "© 2026 Building Radar GmbH · Wiesn-Event München",
    },
  },

  en: {
    toggleLabel: "Language",
    hero: {
      label: "Wiesn Event 2026 · Munich",
      headline: "Building Radar Wiesn Event 2026",
      subtext:
        "A day at Building Radar: the latest AI developments for the construction industry, insights from our own practice – and then off to Oktoberfest together.",
      badges: [
        "Tue · September 22, 2026",
        "9:00 AM – 5:30 PM",
        "Theresienhöhe 12, Munich",
      ],
      cta: "Secure your spot",
    },
    registration: {
      label: "Registration",
      headline: "Secure your spot",
      desc: "Attendance is free for invited clients and places are limited. Sign up – we'll get back to you with all the details.",
      summary: [
        { k: "When", v: "Sept 22, 2026 · 9:00 AM – 5:30 PM" },
        { k: "Where", v: "Theresienhöhe 12, 80339 Munich" },
        { k: "Included", v: "Breakfast, talks & Oktoberfest visit" },
      ],
    },
    form: {
      firstname: "First name",
      lastname: "Last name",
      email: "Email",
      attendQuestion: "Can you attend the event?",
      attendYes: "Yes, I'd love to attend.",
      attendNo: "No, unfortunately I can't make it.",
      consentBefore:
        "I agree that Building Radar may contact me about the Wiesn Event.",
      consentLink: "Privacy policy",
      submit: "Secure your spot",
      submitting: "Sending …",
      note: "Limited spots. Attendance is free for invited clients.",
      error:
        "Something went wrong. Please try again or contact us directly.",
      successLabel: "Registration received",
      successHeadline: "See you on September 22!",
      successBody:
        "We've received your registration and will get back to you with all the details. If you have any questions, just reach out.",
      successAgain: "Register another person",
    },
    pillars: {
      label: "What it's about",
      headline: "A morning that moves your sales forward",
      items: [
        {
          no: "01",
          title: "AI for construction",
          body: "The latest AI initiatives, framed for construction and sales – concrete, not buzzword bingo.",
        },
        {
          no: "02",
          title: "Insights from practice",
          body: "Insights from our daily work with sales teams across the construction industry.",
        },
        {
          no: "03",
          title: "A product in motion",
          body: "How Building Radar picks up these developments and evolves step by step.",
        },
        {
          no: "04",
          title: "Personal exchange",
          body: "Connect with other decision-makers in the industry and benefit from shared experiences.",
        },
      ],
    },
    agenda: {
      label: "Schedule",
      headline: "The day at a glance",
      items: [
        {
          time: "09:00",
          title: "Bavarian breakfast & arrival",
          body: "Weisswurst, pretzels and coffee — arrive and get to know the other guests.",
        },
        {
          time: "09:30",
          title: "AI developments for construction",
          body: "The latest developments that are genuinely relevant for construction and sales.",
        },
        {
          time: "10:30",
          title: "Insights from our practice",
          body: "What we've learned from thousands of sales processes and how it applies to your pipeline.",
        },
        {
          time: "11:00",
          title: "Building Radar & AI: the roadmap",
          body: "How our product evolves along these AI developments – and what's coming next.",
        },
        {
          time: "11:15",
          title: "Off to the Wiesn",
          body: "Heading to Oktoberfest together.",
        },
        {
          time: "from 11:30",
          title: "Networking & Oktoberfest atmosphere",
          body: "Lunch, a Mass and time to talk – enjoying the unique Oktoberfest atmosphere together.",
        },
        {
          time: "17:30",
          title: "Wind-down",
          body: "Official end. Anyone who likes is welcome to stay.",
        },
      ],
    },
    gallery: {
      label: "Impressions",
      headline: "Impressions from last year",
      alt: "Impression from the Building Radar Wiesn Event 2025",
    },
    footer: {
      copyright: "© 2026 Building Radar GmbH · Wiesn Event Munich",
    },
  },
} as const;

export type Lang = keyof typeof translations;
export type Dict = (typeof translations)[Lang];
