"use client";

import React, { useState, useRef, useEffect } from "react";
import { COMMANDS, SUBCOMMANDS } from "@/app/constants/commands";
import { THEMES, ThemeType } from "@/app/constants/themes";
import { useTheme } from "@/app/context/ThemeContext";
import userData from "@/app/data/user.json";
import { FUNNY_EXIT_MESSAGES, FUNNY_SUDO_MESSAGES } from "@/app/constants/messages";

import CommandInput from "./CommandInput";
import CommandOutput from "./CommandOutput";
import SocialLinks from "./SocialLinks";
import TerminalHeader from "./TerminalHeader";

export default function Terminal() {
  const { theme, setTheme } = useTheme();
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<Array<{ type: "text" | "jsx"; content: string | React.ReactNode }>>([]);
  const [showHint, setShowHint] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setShowHint(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [mounted]);

  const getSuggestion = (input: string): string => {
    if (!mounted || !input) return "";
    const [mainCmd, subCmd] = input.toLowerCase().split(" ");

    if (subCmd !== undefined) {
      const availableSubcommands = SUBCOMMANDS[mainCmd as keyof typeof SUBCOMMANDS];
      if (availableSubcommands) {
        const matchingSubcommand = availableSubcommands.find((cmd: string) => cmd.startsWith(subCmd));
        return matchingSubcommand ? `${mainCmd} ${matchingSubcommand}` : input;
      }
      return input;
    }

    const commandNames = Object.keys(COMMANDS);
    const matchingCommand = commandNames.find(cmd => cmd.startsWith(input.toLowerCase()));
    return matchingCommand || "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (command.trim()) {
        setCommandHistory(prev => [...prev, command]);
        setHistoryIndex(-1);
        handleCommand(command);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) {
        setCommand(suggestion);
        setSuggestion("");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommand(value);
    setSuggestion(getSuggestion(value));
  };

  const handleCommand = (cmd: string) => {
    if (!mounted) return;

    const args = cmd.split(" ");
    const mainCommand = args[0].toLowerCase();

    let output: { type: "text" | "jsx"; content: string | React.ReactNode } = {
      type: "text",
      content: ""
    };

    switch (mainCommand) {
      case "exit":
        const randomMessage = FUNNY_EXIT_MESSAGES[Math.floor(Math.random() * FUNNY_EXIT_MESSAGES.length)];
        output.content = randomMessage;
        break;
      case "sudo":
        output.content = FUNNY_SUDO_MESSAGES[Math.floor(Math.random() * FUNNY_SUDO_MESSAGES.length)];
        break;
      case "help":
        output = {
          type: "jsx",
          content: (
            <div className="space-y-1">
              {Object.entries(COMMANDS).map(([cmd, desc], i) => (
                <div key={i}>
                  <div
                    style={{
                      '--hover-color': THEMES[theme].primary
                    } as React.CSSProperties}
                    className="cursor-pointer hover:text-[var(--hover-color)] transition-colors"
                    onClick={() => {
                      if (cmd === "theme") {
                        setCommand(cmd + " ");
                      } else {
                        setCommand(cmd);
                        handleCommand(cmd);
                      }
                    }}
                  >
                    {`${cmd.padEnd(10)} - ${desc}`}
                  </div>
                  {cmd === "theme" && (
                    <div className="pl-4 mt-1 flex flex-wrap gap-2">
                      {Object.keys(THEMES).map((themeName, j) => (
                        <span
                          key={j}
                          style={{
                            '--hover-color': THEMES[theme].primary
                          } as React.CSSProperties}
                          className="cursor-pointer text-gray-400 hover:text-[var(--hover-color)] transition-colors"
                          onClick={() => {
                            const themeCmd = `theme ${themeName}`;
                            setCommand(themeCmd);
                            handleCommand(themeCmd);
                          }}
                        >
                          {themeName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        };
        break;
      case "clear":
        setHistory([]);
        setCommand("");
        return;
      case "theme":
        const newTheme = args[1]?.toLowerCase() as ThemeType;
        if (THEMES[newTheme]) {
          setTheme(newTheme);
          output.content = `Theme changed to: ${newTheme}`;
        } else {
          output.content = `Invalid theme. Available themes: ${Object.keys(THEMES).join(", ")}`;
        }
        break;
      case "about":
        output.content = userData.about;
        break;
      case "social":
        output = {
          type: "jsx",
          content: <SocialLinks />
        };
        break;
      case "whoami":
        output.content = `${userData.name} - ${userData.role}`;
        break;
      default:
        output.content = `Command not found: ${mainCommand}. Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, { type: "text", content: `$ ${cmd}` }, { ...output, content: <div className="pl-6">{output.content}</div> }]);
    setCommand("");

    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth"
        });
      }, 100);
    }
  };

  return (
    <main
      className="h-dvh md:min-h-screen flex items-center justify-center transition-colors duration-300 overflow-hidden"
      style={{ backgroundColor: THEMES[theme].bg }}
      onClick={() => document.querySelector("input")?.focus()}
    >
      <div className="w-full h-dvh md:h-[620px] md:max-w-3xl bg-black/30 rounded-none md:rounded-lg backdrop-blur-md border-0 md:border md:border-white/10 flex flex-col overflow-hidden">
        <TerminalHeader />

        {/* Terminal Content */}
        {mounted && (
          <div
            ref={containerRef}
            className="p-4 pb-[110px] md:p-6 font-mono space-y-4 sm:space-y-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600"
          >
            <CommandOutput history={history} />
            <CommandInput
              command={command}
              suggestion={suggestion}
              showHint={showHint}
              onCommandChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
      </div>
    </main>
  );
} 