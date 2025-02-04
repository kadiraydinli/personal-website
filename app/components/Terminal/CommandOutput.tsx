import React from "react";

import { useTheme } from "@/app/context/ThemeContext";
import { THEMES } from "@/app/constants/themes";

import SocialLinks from "./SocialLinks";
import WhoAmI from "./WhoAmI";
import About from "./About";
import CommandLine from "./CommandLine";

interface HistoryItem {
  type: "text" | "jsx";
  content: string | React.ReactNode;
}

interface CommandOutputProps {
  history: HistoryItem[];
}

export default function CommandOutput({ history }: CommandOutputProps) {
  const { theme } = useTheme();
  return (
    <>
      {/* Default Content */}
      <div className="space-y-6">
        <WhoAmI />
        <About />

        <div className="space-y-2">
          <CommandLine command="social" />
          <div className="pl-6">
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Command History */}
      {history.map((line, i) => (
        <div
          key={i}
          className={line.type === "text" ? "whitespace-pre-wrap" : ""}
          style={{ color: line.content?.toString().startsWith("$") ? THEMES[theme].primary : "rgb(209 213 219)" }}
        >
          {line.content}
        </div>
      ))}
    </>
  );
} 