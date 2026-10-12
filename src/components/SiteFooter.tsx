import Link from "next/link";

const COLUMNS = [
  {
    id: "footer-marketplace",
    title: "Marketplace",
    label: "Marketplace links",
    links: [
      { href: "/browse/", label: "Browse cars" },
      { href: "/sell/", label: "Advertise a BMW" },
      { href: "/sell/#listing-options", label: "Listing prices" },
      { href: "/classifieds/", label: "Parts & services" },
      { href: "/sell/#how-selling-works", label: "How it works" },
    ],
  },
  {
    id: "footer-help",
    title: "Help & safety",
    label: "Help and safety links",
    links: [
      { href: "/safety/", label: "Safety centre" },
      { href: "/posting-policy/", label: "Posting policy" },
      { href: "/contact/", label: "Contact us" },
      { href: "mailto:hello@classicbmw.online?subject=Report%20a%20Classic%20BMW%20listing", label: "Report a listing" },
      { href: "/accessibility/", label: "Accessibility" },
    ],
  },
  {
    id: "footer-legal",
    title: "Legal",
    label: "Legal links",
    links: [
      { href: "/terms/", label: "Terms of Use" },
      { href: "/privacy/", label: "Privacy Notice" },
      { href: "/cookies/", label: "Cookie Notice" },
      { href: "/refunds/", label: "Refunds & cancellation" },
    ],
  },
];

const linkClass = "text-footer-text transition-colors hover:text-white hover:underline focus-visible:text-white focus-visible:underline";

function FooterLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={linkClass}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-footer-line bg-black text-footer-text">
      <div className="container-site grid grid-cols-1 items-start gap-8 pt-[54px] pb-[34px] text-center min-[621px]:grid-cols-2 min-[621px]:text-left min-[1081px]:grid-cols-[minmax(240px,1.2fr)_repeat(3,minmax(140px,0.8fr))]">
        <div className="grid max-w-none justify-items-center gap-3 min-[621px]:col-span-2 min-[621px]:max-w-[360px] min-[621px]:justify-items-start min-[1081px]:col-span-1">
          <strong className="font-display text-[2rem] leading-tight font-normal text-white">Classic BMW</strong>
          <p className="m-0 leading-[1.65]">Independent BMW classifieds for buyers, sellers, and specialist traders.</p>
        </div>

        {COLUMNS.map((col) => (
          <section key={col.id} aria-labelledby={col.id}>
            <h2 id={col.id} className="m-0 mb-[14px] font-sans text-base font-bold tracking-[0.1em] text-white uppercase">
              {col.title}
            </h2>
            <nav aria-label={col.label} className="grid justify-items-center gap-[10px] min-[621px]:justify-items-start">
              {col.links.map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </nav>
          </section>
        ))}
      </div>

      <div className="container-site flex flex-wrap items-start justify-center gap-x-7 gap-y-4 border-t border-footer-line pt-6 pb-8 text-center text-[0.9rem] min-[621px]:justify-between min-[621px]:text-left">
        <p className="m-0 max-w-[800px] leading-[1.55]">
          © 2026 Classic BMW. Operated in the United Kingdom. Classic BMW is independent and is not affiliated with, authorised by,
          or endorsed by BMW AG. Vehicle transactions are between buyers and sellers.
        </p>
        <div className="flex flex-wrap justify-center gap-x-[18px] gap-y-[10px]">
          <FooterLink href="mailto:hello@classicmercs.online" label="hello@classicmercs.online" />
          <FooterLink href="/terms/" label="Terms" />
          <FooterLink href="/privacy/" label="Privacy" />
          <FooterLink href="/cookies/" label="Cookies" />
        </div>
      </div>

      <div className="container-site border-t border-footer-line pt-[18px] pb-[26px] text-center">
        <a href="https://thedma.co.uk/" className={`inline-block ${linkClass}`}>
          Powered By The DMA
        </a>
      </div>
    </footer>
  );
}
