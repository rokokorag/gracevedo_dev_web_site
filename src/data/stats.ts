import type { Translations } from "../i18n/utils";

export type StatId = keyof Translations["stats"]["items"];

export const stats: { id: StatId; value: string }[] = [
  { id: "years", value: "12+" },
  { id: "deposits", value: "+70%" },
  { id: "team", value: "5" },
];
