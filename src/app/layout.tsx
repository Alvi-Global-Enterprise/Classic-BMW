import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Classic BMW | BMW Classifieds UK",
  description: "Browse and discover BMW cars sourced directly from Gumtree UK and leading classifieds.",
  openGraph: {
    title: "Classic BMW | BMW Classifieds UK",
    description: "Browse and discover BMW cars sourced directly from Gumtree UK and leading classifieds.",
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
