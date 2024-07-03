"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Accordion from "../common/accordion/Accordion";
import { SyntheticEvent, useState } from "react";
import ROUTES from "./constants/route";

import {
  BeakerIcon,
  HomeIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/outline";

export type RoutesType =
  | "/"
  | "spin-wheel"
  | "youtube-comment-raffle"
  | "lab-1";

export interface I_RoutesStyle {
  name: string;
  backgroundColor: string;
  icon: React.ComponentType<React.ComponentProps<"svg">>;
}
export type MappedRoutesStyleType = {
  [key in RoutesType]: I_RoutesStyle;
};

const mappedRoutesStyleArray = Object.entries(ROUTES.STYLE);

const isCorrectRoute = (
  currentPath: string,
  routes: MappedRoutesStyleType
): currentPath is keyof MappedRoutesStyleType => currentPath in routes;

const Navigation = () => {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[1];
  const currentBackgroundColor = isCorrectRoute(currentPath, ROUTES.STYLE)
    ? ROUTES.STYLE[currentPath].backgroundColor
    : "md:bg-slate-100";

  const [expanded, setExpanded] = useState<string | false>("accordion1");

  const handleToggle =
    (panel: string) => (e: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <nav
      className={`fixed md:sticky bottom-0 md:top-0 h-5 md:h-screen w-screen md:w-20 bg-white ${currentBackgroundColor} flex flex-col justify-between
      `}
    >
      <section className="flex h-full flex-col gap-0.5">
        {/* desktop ui */}
        <Accordion
          expanded={expanded === "accordion1"}
          handleToggle={handleToggle("accordion1")}
          className="w-full hidden md:block"
        >
          <Accordion.Summary>유틸리티</Accordion.Summary>
          {mappedRoutesStyleArray.map(([link, { name }]) => (
            <Accordion.Content key={link} className="px-0">
              <Link href={link} className="hover:bg-slate-100 block p-1">
                {name}
              </Link>
            </Accordion.Content>
          ))}
        </Accordion>
        <Accordion
          expanded={expanded === "accordion2"}
          handleToggle={handleToggle("accordion2")}
          className="w-full hidden md:block"
        >
          <Accordion.Summary>메뉴2</Accordion.Summary>
          <Accordion.Content className="px-0">
            <Link href={"/lab-1"} className="hover:bg-slate-100 block p-1">
              실험실 1
            </Link>
          </Accordion.Content>
        </Accordion>

        {/* mobile ui  */}
        <div className="flex h-full justify-around items-center border-t-2 border-gray-100 md:hidden">
          {mappedRoutesStyleArray.map(([link, { icon: Icon }]) => (
            <Link href={link} key={link}>
              <Icon className={`size-2.5`} />
            </Link>
          ))}
        </div>
      </section>
      <section className="hidden md:block">
        <span className="w-full flex justify-center pb-1 text-1.4 text-black font-semibold">
          문의: rei980213@gmail.com
        </span>
      </section>
    </nav>
  );
};

export default Navigation;
