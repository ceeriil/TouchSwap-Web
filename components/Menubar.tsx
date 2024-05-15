import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuBtn } from "./MenuBtn";
import { BoostIcon } from "./assets/BoostIcon";
import { CoinIcon } from "./assets/CoinIcon";
import { SpeakerIcon } from "./assets/SpeakerIcon";
import { StatsIcon } from "./assets/StatsIcon";
import { TaskIcon } from "./assets/TaskIcon";

type MenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
};

export const menuLinks: MenuLink[] = [
  {
    label: "Stats",
    href: "/stats",
    icon: <StatsIcon active={false} />,
    activeIcon: <StatsIcon active />,
  },
  {
    label: "Refs",
    href: "/refs",
    icon: <SpeakerIcon active={false} />,
    activeIcon: <SpeakerIcon active />,
  },
  {
    label: "Home",
    href: "/",
    icon: <CoinIcon active={false} />,
    activeIcon: <CoinIcon active />,
  },
  {
    label: "Boost",
    href: "/boost",
    icon: <BoostIcon active={false} />,
    activeIcon: <BoostIcon active />,
  },
  {
    label: "Quests",
    href: "/quests",
    icon: <TaskIcon active={false} />,
    activeIcon: <TaskIcon active />,
  },
];

export const Menubar = () => {
  const pathname = usePathname();

  return (
    <div
      className="gold-gradient p-[1px] my-3 rounded-3xl mt-16 fixed bottom-4 left-[50%] translate-x-[-50%] "
      style={{
        width: "calc(100% - 2rem)",
      }}
    >
      <div className="bg-[#0D2A28] py-1 px-3 md:px-6 rounded-3xl flex gap-x-[1px] md:gap-x-1 w-full items-center justify-center">
        {menuLinks.map(({ label, href, icon, activeIcon }) => {
          const isActive = pathname === href;
          return (
            <div key={href}>
              <Link href={href}>
                <MenuBtn label={label} icon={icon} activeIcon={activeIcon} isActive={isActive} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
