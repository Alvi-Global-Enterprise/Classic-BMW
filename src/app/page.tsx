import { HomeMarketplace } from "@/components/HomeMarketplace";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SupplierGallery } from "@/components/SupplierGallery";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-[100] -translate-y-[150%] rounded-xl border border-line bg-white px-[14px] py-[10px] text-ink focus:translate-y-0"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <SupplierGallery />
      <HomeMarketplace />
      <SiteFooter />
    </>
  );
}
