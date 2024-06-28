"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Accordion from "./common/accordion/Accordion";
import { SyntheticEvent, useState } from "react";

export type RoutesType = "/" | "spin-wheel" | "youtube-comment-raffle";

interface I_RoutesStyle {
  name: string;
  backgroundColor: string;
}
type MappedRoutesStyleType = {
  [key in RoutesType]: I_RoutesStyle;
};

const mappedRoutesStyle: MappedRoutesStyleType = {
  "/": {
    name: "메인",
    backgroundColor: "bg-gray",
  },
  "spin-wheel": {
    name: "룰렛",
    backgroundColor: "bg-cyan-300",
  },
  "youtube-comment-raffle": {
    name: "유튜브 댓글 추첨",
    backgroundColor: "bg-yellow-300",
  },
};

const mappedRoutesStyleArray = Object.entries(mappedRoutesStyle);

const isCorrectRoute = (
  currentPath: string,
  routes: MappedRoutesStyleType
): currentPath is keyof MappedRoutesStyleType => currentPath in routes;

const Navigation = () => {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[1];
  const currentBackgroundColor = isCorrectRoute(currentPath, mappedRoutesStyle)
    ? mappedRoutesStyle[currentPath].backgroundColor
    : "bg-slate-100";

  const [expanded, setExpanded] = useState<string | false>("accordion1");

  const handleToggle =
    (panel: string) => (e: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <nav
      className={`sticky top-0 h-screen w-20 ${currentBackgroundColor} flex flex-col gap-0.5 items-center`}
    >
      <Accordion
        expanded={expanded === "accordion1"}
        handleToggle={handleToggle("accordion1")}
        className="w-full"
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
        className="w-full"
      >
        <Accordion.Summary>메뉴2</Accordion.Summary>
        <Accordion.Content>실험중 1</Accordion.Content>
        <Accordion.Content>실험중 2</Accordion.Content>
        <Accordion.Content>실험중 3</Accordion.Content>
      </Accordion>
      <div className="text-1.4 text-gray-600">문의: rei980213@gmail.com</div>
    </nav>
  );
};

export default Navigation;
