"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Flower from "./Flower";

export default function Nav() {
  const path = usePathname();
  const onHome = path === "/" || path === "";
  const onAbout = path?.startsWith("/about");
  // On the home page, home and the flower glide back to the top instead of reloading.
  const toTop = (e: React.MouseEvent) => {
    if (!onHome) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <nav className="nav">
      <Link href="/" className={onHome ? "active" : ""} onClick={toTop}>home</Link>
      <Link href="/" aria-label="home" className="nav-flower" onClick={toTop}>
        <Flower size={26} />
      </Link>
      <Link href="/about/" className={onAbout ? "active" : ""}>about me</Link>
    </nav>
  );
}
