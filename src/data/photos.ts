import type { ImageMetadata } from "astro";
import type { Translations } from "../i18n/utils";
import puffin from "../assets/photos/puffin.webp";
import tokyo from "../assets/photos/tokyo-tower.webp";
import northern from "../assets/photos/northern-lights.webp";
import ny from "../assets/photos/ny.webp";

export type PhotoId = keyof Translations["photography"]["photos"];

// Add photos in src/assets/photos/, import them here and add their alt text
// to `photography.photos.<id>` in both locale files.
export const photos: { id: PhotoId; image?: ImageMetadata }[] = [
  { id: "puffin", image: puffin },
  { id: "tokyo-tower", image: tokyo },
  { id: "northern-lights", image: northern },
  { id: "ny", image: ny },
];
