"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Flower from "./Flower";

export default function Nav() {
  const path = usePathname();
  const onHome = path === "/" || path === "";
  const onAbout = path?.startsWith("/about");
  return (
    <nav className="nav">
      <Link href="/" className={onHome ? "active" : ""}>home</Link>
      <Link href="/" aria-label="home" className="nav-flower">
        <Flower size={26} />
      </Link>
      <Link href="/about/" className={onAbout ? "active" : ""}>about me</Link>
    </nav>
  );
}
