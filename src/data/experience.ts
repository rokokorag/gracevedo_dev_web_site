import type { Translations } from "../i18n/utils";

export type CompanyId = keyof Translations["experience"]["companies"];
export type RoleId = keyof Translations["experience"]["roles"];

export interface Role {
  id: RoleId;
  // Display-only year range for roles inside a company; omitted when the CV gives none.
  period?: string;
}

export interface Company {
  id: CompanyId;
  // Omit to use the translated `experience.companies.<id>.name`.
  name?: string;
  // "YYYY-MM"
  start: string;
  // Omit for an ongoing position ("Present").
  end?: string;
  roles: Role[];
}

// Most recent first.
export const experience: Company[] = [
  {
    id: "independent",
    start: "2026-06",
    roles: [{ id: "independent-engineer" }],
  },
  {
    id: "uexchange",
    name: "Uexchange",
    start: "2026-01",
    end: "2026-05",
    roles: [{ id: "uexchange-senior-mobile" }],
  },
  {
    id: "vest",
    name: "Vest",
    start: "2024-03",
    end: "2026-01",
    roles: [{ id: "vest-senior-software" }],
  },
  {
    id: "nuxiba",
    name: "Nuxiba Technologies",
    start: "2012-08",
    end: "2024-02",
    roles: [
      { id: "nuxiba-tech-lead", period: "2022 – 2024" },
      { id: "nuxiba-team-coach", period: "2020 – 2024" },
      { id: "nuxiba-developer" },
    ],
  },
];
