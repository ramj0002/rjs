import type { Metadata } from "next";
import "@fontsource/anton";
import "@fontsource/baskervville/400.css";
import "@fontsource/baskervville/400-italic.css";
import "@fontsource/caveat-brush";
import "@fontsource/noto-serif-gurmukhi/500.css";
import "./globals.css";
import Nav from "@/components/Nav";
import { ShaderBackground } from "@/components/ui/j-shader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.title,
  description: `${site.title}: ${site.tagline} ${site.bio}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ShaderBackground className="site-shader" />
        <Nav />
        {children}
      </body>
    </html>
  );
}
