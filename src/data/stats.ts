import type { Translations } from "../i18n/utils";

export type StatId = keyof Translations["stats"]["items"];

export const stats: { id: StatId; value: string }[] = [
  { id: "years", value: "12+" },
  { id: "platforms", value: "3" },
  { id: "projects", value: "6" },
];
