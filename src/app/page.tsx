import { DEFAULT_VALUES } from "@/constants/SpinWheel";
import SpinWheel from "./ui/spin-wheel/SpinWheel";
import SpinWheelTextList from "./ui/spin-wheel/SpinWheelTextList";
import Button from "./ui/common/Button";
import useSpinWheel from "./hooks/useSpinWheel";
import Link from "next/link";

const Home = () => {
  //useSpinWheel?

  return (
    <main>
      <Link href="/spin-wheel">룰렛으로 이동</Link>
    </main>
  );
};
export default Home;
