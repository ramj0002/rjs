import type { Metadata } from "next";
import "@fontsource/anton";
import "@fontsource/baskervville/400.css";
import "@fontsource/baskervville/400-italic.css";
import "@fontsource/caveat-brush";
import "@fontsource/noto-serif-gurmukhi/500.css";
import "./globals.css";
import Nav from "@/components/Nav";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ramjeetsingh.com"),
  title: site.title,
  description: `${site.title}: ${site.tagline} ${site.bio}`,
  openGraph: { type: "website", siteName: site.title, title: site.title, description: `${site.tagline} ${site.bio}` },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
