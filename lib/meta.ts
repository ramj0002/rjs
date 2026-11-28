import type { Metadata } from "next";
import { site } from "@/content/site";

// Gives each page its own link-preview title and description (the image comes from opengraph-image.png).
export function og(m: { title: string; description?: string }): Metadata {
  const description = m.description ?? `${site.tagline} ${site.bio}`;
  return { ...m, description, openGraph: { title: m.title, description, type: "website", siteName: site.title } };
}
