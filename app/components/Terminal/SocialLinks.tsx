import { FaGithub, FaLinkedin, FaEnvelope, FaDiscord, FaStackOverflow, FaMedium, FaNpm } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"
import { SiExpo } from "react-icons/si";
import userData from "@/app/data/user.json";
import { useTheme } from "@/app/context/ThemeContext";
import { THEMES } from "@/app/constants/themes";

export const socialLinks = [
  { icon: <FaGithub size={16} />, name: "github", value: "GitHub" },
  { icon: <FaLinkedin size={16} />, name: "linkedin", value: "LinkedIn" },
  { icon: <FaXTwitter size={16} />, name: "x", value: "X" },
  { icon: <FaDiscord size={16} />, name: "discord", value: "Discord" },
  { icon: <FaStackOverflow size={16} />, name: "stackoverflow", value: "Stack Overflow" },
  { icon: <FaMedium size={16} />, name: "medium", value: "Medium" },
  { icon: <FaNpm size={16} />, name: "npm", value: "NPM" },
  { icon: <SiExpo size={16} />, name: "expo", value: "Expo Snack" },
  { icon: <FaEnvelope size={16} />, name: "email", value: "Email" }
];

export default function SocialLinks() {
  const { theme } = useTheme();

  const links = Object.entries(userData.social).map(([key, value]) => {
    const icon = socialLinks.find(link => link.name === key);

    if (!icon) return null;

    return {
      icon: icon.icon,
      name: icon.name === 'email' ?
        value.replace('mailto:', '') :
        value.substring(value.lastIndexOf("/"), value.length),
      url: value,
    };
  });

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {links.map((link, i) => (
        <a
          key={i}
          href={link?.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            '--hover-color': THEMES[theme].primary
          } as React.CSSProperties}
          className="flex items-center gap-2 text-sm sm:text-base text-gray-400 hover:text-[var(--hover-color)] transition-colors p-1 rounded-md hover:bg-white/5 min-w-[200px]"
        >
          <span className="flex-shrink-0">{link?.icon}</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{link?.name}</span>
        </a>
      ))}
    </div>
  );
} 