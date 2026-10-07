import type { ImageMetadata } from "astro";
import type { Translations } from "../i18n/utils";
import slabsImg from "../assets/projects/slabs.png";

export type ProjectId = keyof Translations["projects"]["items"];
export type Platform = keyof Translations["projects"]["platforms"];

export interface Project {
  id: ProjectId;
  platforms: Platform[];
  // Platforms announced but not released yet (shown as "coming soon").
  upcomingPlatforms?: Platform[];
  url?: string;
  playStoreUrl?: string;
  // A finished mockup image (16:9), shown as is.
  image?: ImageMetadata;
  // A raw app screenshot from src/assets/projects/, shown inside a phone frame.
  screenshot?: ImageMetadata;
  tags?: string[];
  featured?: boolean;
  // No longer available in the stores; shown with a "Legacy" badge and note.
  legacy?: boolean;
}

export const projects: Project[] = [
  {
    id: "slabs",
    screenshot: slabsImg,
    platforms: ["android"],
    upcomingPlatforms: ["ios"],
    url: "https://slabs.gracevedo.dev/",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=dev.gracevedo.slabs",
    tags: ["Flutter", "BLoC"],
    featured: true,
  },
  { id: "smiletoo", platforms: ["web"], url: "https://www.smiletoo.mx/" },
  {
    id: "raiz-intelligence-lab",
    platforms: ["web"],
    url: "https://www.raizintelligencelab.com/",
  },
  {
    id: "rehabsportmed",
    platforms: ["web"],
    url: "https://rehabsportmed.com.mx/",
  },
  { id: "ip-subnetting", platforms: ["android"], tags: ["Java"], legacy: true },
  { id: "yoga-homeline", platforms: ["ios"], tags: ["Swift"], legacy: true },
];
