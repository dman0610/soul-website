import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maui Air Tours — Helicopter Tours Over Maui | Soul AI Demo",
  description:
    "See Maui from 3,000 feet. Private helicopter tours over Haleakalā, the Road to Hana, and the Nā Pali coastline. FAA certified. Doors on or off. Powered by Soul AI.",
};

export default function HelicopterDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
