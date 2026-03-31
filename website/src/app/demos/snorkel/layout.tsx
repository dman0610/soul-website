import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maui Snorkel Co. — Book Your Snorkel Tour | Soul AI Demo",
  description:
    "Experience Maui's underwater world with Maui Snorkel Co. Morning and sunset tours departing daily from Kihei. Gear included. All skill levels welcome. Powered by Soul AI.",
};

export default function SnorkelDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
