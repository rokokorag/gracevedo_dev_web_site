import type { ImageMetadata } from "astro";
import puffin from "../assets/photos/puffin.webp";
import tokyo from "../assets/photos/tokyo-tower.webp";
import northern from "../assets/photos/northern-lights.webp";
import ny from "../assets/photos/ny.webp";

// Add photos in src/assets/photos/, import them and set `image`.
// `alt` overrides the generic alt text when a photo is set.
export const photos: { image?: ImageMetadata; alt?: string }[] = [
  { image: puffin, alt: "Puffin" },
  { image: tokyo, alt: "Tokyo Tower" },
  { image: northern, alt: "Northern Lights" },
  { image: ny, alt: "New York" },
];
