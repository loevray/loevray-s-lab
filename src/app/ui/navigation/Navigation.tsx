"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Accordion from "../common/accordion/Accordion";
import { SyntheticEvent, useState } from "react";
import ROUTES from "./constants/route";

export type RoutesType =
  | "/"
  | "spin-wheel"
  | "youtube-comment-raffle"
  | "lab-1"
  | "ghost-leg";

export interface I_RoutesStyle {
  name: string;
  backgroundColor: string;
  hoverColor: string;
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
  let pathColor = {
    bg: "md:bg-slate-100",
    hoverBg: "md:hover:bg-gray-200",
  };

  pathColor = isCorrectRoute(currentPath, ROUTES.STYLE)
    ? {
        bg: ROUTES.STYLE[currentPath].backgroundColor,
        hoverBg: ROUTES.STYLE[currentPath].hoverColor,
      }
    : pathColor;

  return (
    <nav
      className={`fixed md:rounded-r-[2rem] md:sticky bottom-0 md:top-0 h-5 md:h-screen w-screen md:w-20 bg-white ${pathColor.bg} flex flex-col justify-between
      `}
    >
      <section className="flex h-full md:h-1/2 flex-col gap-0.5">
        <div className="flex md:flex-col h-full justify-around md:justify-evenly items-center">
          {mappedRoutesStyleArray.map(([link, { icon: Icon, name }]) => (
            <Link
              className={`md:rounded-2xl md:flex md:w-full md:pl-1 items-center gap-1 ${pathColor.hoverBg} md:py-1`}
              href={link}
              key={link}
            >
              <Icon className={`size-2.5 md:size-3`} />
              <span className="hidden md:block">{name}</span>
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
