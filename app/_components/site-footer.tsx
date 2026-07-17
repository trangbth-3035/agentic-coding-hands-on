import Image from "next/image";
import Link from "next/link";
import { NAV_HREFS } from "@/lib/saa/content";
import { getDict } from "@/lib/i18n/server";
import { FooterNav } from "./footer-nav";

export default async function SiteFooter() {
  const { dict } = await getDict();

  const nav = [
    { label: dict.nav.about, href: NAV_HREFS.about },
    { label: dict.nav.awards, href: NAV_HREFS.awards },
    { label: dict.nav.kudos, href: NAV_HREFS.kudos },
    // No dedicated standards route yet → link to the awards page, no highlight.
    { label: dict.nav.standards, href: NAV_HREFS.standards, noActive: true },
  ];

  return (
    <footer className="border-t border-white/10 bg-saa-bg">
      <div className="mx-auto flex max-w-[1152px] flex-col items-center gap-6 px-4 py-8 sm:px-8 lg:flex-row lg:justify-between xl:px-0">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
          <Link href={NAV_HREFS.about} aria-label="Sun* Annual Awards">
            <Image
              src="/saa/logo-footer.png"
              alt="Sun* Annual Awards"
              width={64}
              height={60}
              className="h-9 w-auto"
            />
          </Link>
          <FooterNav items={nav} />
        </div>

        <p className="text-xs text-white/40">{dict.footer.copyright}</p>
      </div>
    </footer>
  );
}
