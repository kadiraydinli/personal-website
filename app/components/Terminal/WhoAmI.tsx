import Image from "next/image";

import { THEMES } from "@/app/constants/themes";
import userData from "@/app/data/user.json";
import { useTheme } from "@/app/context/ThemeContext";
import CommandLine from "./CommandLine";

export default function WhoAmI() {
  const { theme } = useTheme();
  return (
    <div className="space-y-2">
      <CommandLine command="whoami" />
      <div className="pl-6 space-y-1">
        <div className="flex items-center gap-4">
          <Image
            src={userData.avatar}
            alt="Profile Picture"
            width={80}
            height={80}
            className="rounded-lg"
            unoptimized
          />
          <div>
            <h1 className="text-xl font-semibold" style={{ color: THEMES[theme].secondary }}>
              {userData.name}
            </h1>
            <p className="text-gray-400">{userData.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}