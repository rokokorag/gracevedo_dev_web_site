import type { ImageMetadata } from "astro";
import { siBehance, siGithub, siInstagram, siX } from "simple-icons";
import portrait from "../assets/portrait/rodrigo.webp";

export const site = {
  name: "Rodrigo Acevedo",
  monogram: "RA",
  email: "hi@gracevedo.dev",
  photographyUrl: "https://portfolio.gracevedo.dev/",
  // Optional: the "Download CV" button only renders when this is set (e.g. "/cv-rodrigo-acevedo.pdf").
  cvUrl: undefined as string | undefined,
  // Add the portrait in src/assets/, import it and set it here.
  portrait: portrait,
};

export type SocialId = "github" | "linkedin" | "x" | "instagram" | "behance";

// LinkedIn was removed from Simple Icons at LinkedIn's request; path taken
// from simple-icons@10.4.0 (CC0).
const linkedinPath =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

// Each link only renders when its URL is set. `icon` is a 24x24 SVG path.
export const socials: {
  id: SocialId;
  label: string;
  url?: string;
  icon: string;
}[] = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/rokokorag",
    icon: siGithub.path,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/rodrigo-acevedo-90aa76130/",
    icon: linkedinPath,
  },
  { id: "x", label: "X", url: "https://x.com/rokokorag", icon: siX.path },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/gracevedot",
    icon: siInstagram.path,
  },
  {
    id: "behance",
    label: "Behance",
    url: "https://www.behance.net/rokokorag",
    icon: siBehance.path,
  },
];

export const activeSocials = socials.filter(
  (s): s is typeof s & { url: string } => Boolean(s.url),
);
