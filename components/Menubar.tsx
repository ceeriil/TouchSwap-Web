import React from "react";
import { MenuBtn } from "./MenuBtn";
import Link from "next/link";
import { StatsIcon } from "./assets/StatsIcon";
import { SpeakerIcon } from "./assets/SpeakerIcon";
import { CoinIcon } from "./assets/CoinIcon";
import { BoostIcon } from "./assets/BoostIcon";
import { TaskIcon } from "./assets/TaskIcon";
import { usePathname } from "next/navigation";

type MenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: MenuLink[] = [
  {
    label: "Stats",
    href: "/stats",
    icon: <StatsIcon active={false} />,
  },
  {
    label: "Refs",
    href: "/refs",
    icon: <SpeakerIcon active={false} />,
  },
  {
    label: "Home",
    href: "/",
    icon: <CoinIcon />,
  },
  {
    label: "Boost",
    href: "/boost",
    icon: <BoostIcon active={false} />,
  },
  {
    label: "Quests",
    href: "/quests",
    icon: <TaskIcon active={false} />,
  },
];

export const Menubar = () => {
  const pathname = usePathname();

  return (
    <div className="gold-gradient p-[1px] my-6 rounded-3xl mt-16 absolute bottom-6">
      <div className="bg-[#030810] py-3 px-3 md:px-6 rounded-3xl flex gap-x-2 md:gap-x-3">
        {menuLinks.map(({ label, href, icon }) => {
          const isActive = pathname === href;
          return (
            <div key={href}>
              <Link href={href}>
                <MenuBtn label={label} icon={icon} isActive={isActive} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
