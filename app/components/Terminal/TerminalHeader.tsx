import userData from "@/app/data/user.json";

export default function TerminalHeader() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-black/50 border-b border-white/10 sticky top-0 z-10 backdrop-blur-md">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <div className="flex-1 text-center text-sm text-gray-400 font-mono">{userData.nickname}@personal-website ~ </div>
    </div>
  );
} 