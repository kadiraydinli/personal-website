export const THEMES = {
  indigo: {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    bg: "#0f172a"
  },
  emerald: {
    primary: "#10b981",
    secondary: "#059669",
    bg: "#022c22"
  },
  rose: {
    primary: "#f43f5e",
    secondary: "#e11d48",
    bg: "#1c1917"
  },
  amber: {
    primary: "#f59e0b",
    secondary: "#d97706",
    bg: "#1c1917"
  },
  cyan: {
    primary: "#06b6d4",
    secondary: "#0891b2",
    bg: "#164e63"
  },
  violet: {
    primary: "#8b5cf6",
    secondary: "#7c3aed",
    bg: "#2e1065"
  },
  terminal: {
    primary: "#50fa7b",
    secondary: "#8be9fd",
    bg: "#282a36"
  }
} as const;

export type ThemeType = keyof typeof THEMES;