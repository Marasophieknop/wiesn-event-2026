import type { Metadata } from "next";
import Landing from "../components/Landing";

export const metadata: Metadata = {
  title: "Wiesn Event 2026 · Building Radar",
  description:
    "A day at Building Radar: the latest AI developments for the construction industry, insights from our practice – and then off to Oktoberfest together. September 22, 2026, Munich.",
  openGraph: {
    title: "Wiesn Event 2026 · Building Radar",
    description:
      "First the insights, then the Wiesn. AI for construction in the morning, Oktoberfest in the afternoon. Sept 22, 2026 in Munich.",
    locale: "en_US",
    type: "website",
  },
};

// Englische Version unter „/en".
export default function Page() {
  return <Landing lang="en" />;
}
