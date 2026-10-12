import Link from "next/link";
import { BrandMark } from "./BrandMark";

const NAV = [
  { href: "/classifieds/", label: "Classifieds" },
  { href: "/sell/", label: "Advertise" },
  { href: "/contact/", label: "Contact" },
  { href: "/account/", label: "My account" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#262626] bg-black text-white [&_:focus-visible]:outline-white">
      <div className="container-site grid min-h-[92px] grid-cols-1 items-center gap-x-[18px] gap-y-3 py-[14px] min-[1081px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[1081px]:py-0">
        <Link
          href="/"
          aria-label="Classic Mercs home"
          className="inline-flex items-center gap-[10px] justify-self-center text-white min-[621px]:gap-4 min-[1081px]:justify-self-start"
        >
          <BrandMark className="h-[48px] w-[48px] shrink-0 min-[621px]:h-14 min-[621px]:w-16" />
          <span className="min-w-0">
            <strong className="block font-display text-[clamp(1.05rem,4.4vw,1.5rem)] leading-none font-normal whitespace-nowrap min-[621px]:text-[1.875rem]">
              Classic Mercs
            </strong>
            <small className="mt-[5px] hidden text-[0.72rem] text-footer-text min-[621px]:block">
              Independent Mercedes classifieds
            </small>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center justify-center gap-2 justify-self-center min-[621px]:gap-4 min-[1081px]:gap-3"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-10 items-center border-b-2 border-transparent px-1 text-[0.875rem] text-white transition-colors hover:border-white focus-visible:border-white min-[621px]:min-h-11 min-[621px]:px-3 min-[621px]:text-base"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
