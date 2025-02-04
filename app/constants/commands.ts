export const COMMANDS = {
  help: "Show available commands",
  clear: "Clear terminal screen",
  theme: "Change theme (indigo, emerald, rose, amber, cyan, violet, terminal)",
  about: "Show about information",
  social: "Show social media links",
  whoami: "Show profile information",
} as const;

export type CommandType = keyof typeof COMMANDS;

export const SUBCOMMANDS = {
  theme: ["indigo", "emerald", "rose", "amber", "cyan", "violet", "terminal"]
} as const;