import type { ImageMetadata } from "astro";

export const site = {
  name: "Rodrigo Acevedo",
  monogram: "RA",
  email: "hi@gracevedo.dev",
  photographyUrl: "https://portfolio.gracevedo.dev/",
  // Optional: the "Download CV" button only renders when this is set (e.g. "/cv-rodrigo-acevedo.pdf").
  cvUrl: undefined as string | undefined,
  // Add the portrait in src/assets/, import it and set it here.
  portrait: undefined as ImageMetadata | undefined,
};

export type SocialId = "linkedin" | "github";

// Each link only renders when its URL is set.
export const socials: { id: SocialId; label: string; url?: string }[] = [
  { id: "linkedin", label: "LinkedIn", url: undefined },
  { id: "github", label: "GitHub", url: undefined },
];
