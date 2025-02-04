import userData from "@/app/data/user.json";

import CommandLine from "./CommandLine";

export default function About() {
  return (
    <div className="space-y-2">
      <CommandLine command="about" />
      <div className="pl-6 leading-relaxed text-gray-300">
        {userData.about}
      </div>
    </div>
  )
}