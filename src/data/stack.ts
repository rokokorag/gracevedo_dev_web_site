import type { Translations } from "../i18n/utils";

export type StackCategoryId = keyof Translations["stack"]["categories"];

export const stack: { id: StackCategoryId; items: string[] }[] = [
  {
    id: "languages",
    items: [
      "JavaScript",
      "Python",
      "Dart",
      "Swift",
      "Java",
      "C/C++",
      "PHP",
      ".NET",
    ],
  },
  { id: "mobile", items: ["Flutter", "Fastlane"] },
  { id: "web", items: ["ReactJS", "NextJS", "RemixJS", "AstroJS", "ViteJS"] },
  {
    id: "backend",
    items: [
      "ExpressJS",
      "GraphQL",
      "Firebase",
      "SQL Server",
      "MongoDB",
      "MySQL",
    ],
  },
  {
    id: "devops",
    items: [
      "Docker",
      "Jenkins",
      "LaunchDarkly",
      "Cloudflare",
      "Vercel",
      "Amazon EC2",
    ],
  },
  {
    id: "ai",
    items: [
      "Claude Code",
      "Antigravity",
      "OpenCode",
      "Codex",
      "MCP (Model Context Protocol)",
      "Agent Skills",
      "Agent Harness",
      "Frontier Models (OpenAI, Anthropic, Google)",
      "Open Weights (DeepSeek, Gemma, Qwen)",
    ],
  },
];
