import React from "react";
import { THEMES } from "@/app/constants/themes";
import { useTheme } from "@/app/context/ThemeContext";

interface CommandInputProps {
  command: string;
  suggestion: string;
  showHint: boolean;
  onCommandChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function CommandInput({
  command,
  suggestion,
  showHint,
  onCommandChange,
  onKeyDown
}: CommandInputProps) {
  const { theme } = useTheme();
  return (
    <>
      {/* Command Input with Suggestion */}
      <div className="flex items-center gap-2 relative">
        <span className="text-gray-400">$</span>
        <div className="flex-1 relative">
          {suggestion && command && (
            <div className="absolute inset-0 text-gray-600 pointer-events-none">
              {suggestion}
            </div>
          )}
          <div className="relative">
            <input
              type="text"
              value={command}
              onChange={onCommandChange}
              onKeyDown={onKeyDown}
              className="w-full bg-transparent outline-none border-none text-gray-300 font-mono caret-transparent"
              spellCheck={false}
              autoComplete="off"
              aria-label="terminal input"
            />
            <div className="absolute top-0 left-0 text-transparent">
              {command}
              <span
                className="inline-block h-5 w-2.5 -translate-x-[2px] animate-[blink_1s_infinite] bg-current"
                style={{ color: THEMES[theme].primary }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hint Message */}
      <div className="h-5">
        {showHint && (
          <div className="text-gray-400 animate-[fadeOut_3s_ease-in-out_forwards] text-sm">
            Hint: Type &apos;help&apos; to see available commands
          </div>
        )}
      </div>
    </>
  );
} 