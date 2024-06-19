"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Accordion from "./common/accordion/Accordion";

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
    : "bg-black";

  return (
    <nav className={`sticky top-0 h-screen w-20 ${currentBackgroundColor}`}>
      <ul>
        {mappedRoutesStyleArray.map(([link, { name }]) => (
          <li key={link}>
            <Link href={link} className="text-white">
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <Accordion defaultExpanded={true} />
    </nav>
  );
};

export default Navigation;
