import { THEMES } from "@/app/constants/themes";
import { useTheme } from "@/app/context/ThemeContext";

export default function CommandLine({ command }: { command: string }) {
  const { theme } = useTheme();
  return (
    <div className="flex items-center gap-2" style={{ color: THEMES[theme].primary }}>
      $ {command}
    </div>
  )
}