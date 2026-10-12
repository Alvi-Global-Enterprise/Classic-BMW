import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Classic Mercs | Classic Mercedes Classifieds",
  description: "Classic Mercs is a UK marketplace for buying and selling classic Mercedes cars.",
  openGraph: {
    title: "Classic Mercs | Classic Mercedes Classifieds",
    description: "Classic Mercs is a UK marketplace for buying and selling classic Mercedes cars.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
