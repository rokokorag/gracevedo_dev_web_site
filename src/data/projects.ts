import type { ImageMetadata } from "astro";
import type { Translations } from "../i18n/utils";

export type ProjectId = keyof Translations["projects"]["items"];
export type Platform = keyof Translations["projects"]["platforms"];

export interface Project {
  id: ProjectId;
  platforms: Platform[];
  // Platforms announced but not released yet (shown as "coming soon").
  upcomingPlatforms?: Platform[];
  url?: string;
  playStoreUrl?: string;
  // Add a screenshot in src/assets/projects/ and import it here.
  image?: ImageMetadata;
  tags?: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "slabs",
    platforms: ["android"],
    upcomingPlatforms: ["ios"],
    url: "https://slabs.gracevedo.dev/",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=dev.gracevedo.slabs",
    featured: true,
  },
  { id: "smiletoo", platforms: ["web"], url: "https://smiletoo.mx/" },
  {
    id: "raiz-intelligence-lab",
    platforms: ["web"],
    url: "https://raizintelligencelab.com/",
  },
  {
    id: "rehabsportmed",
    platforms: ["web"],
    url: "https://rehabsportmed.com.mx/",
  },
  { id: "ip-subnetting", platforms: ["android"] },
  { id: "yoga-homeline", platforms: ["ios"] },
];
