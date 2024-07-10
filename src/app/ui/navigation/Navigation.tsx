"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Accordion from "../common/accordion/Accordion";
import { SyntheticEvent, useState } from "react";
import ROUTES from "./constants/route";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

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
        <Link
          href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=rei980213@gmail.com"
          target="_blank"
          className={` size-4.5 rounded-3xl ${pathColor.hoverBg} flex justify-center items-center`}
        >
          <EnvelopeIcon className="size-3" />
        </Link>
      </section>
    </nav>
  );
};

export default Navigation;
