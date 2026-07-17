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
    // Design footer uses 90px side margins (wider than the 1152 content
    // column) → ~1332px row; single row only at desktop, stacks below xl.
    <footer className="w-full border-t border-saa-divider bg-saa-bg px-4 pb-24 pt-8 sm:px-8 md:py-10 lg:px-0">
      <div className="mx-auto flex w-full max-w-[1332px] flex-col items-start gap-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8 xl:gap-20">
          <Link href={NAV_HREFS.about} aria-label="Sun* Annual Awards" className="shrink-0">
            <Image
              src="/saa/logo-footer.png"
              alt="Sun* Annual Awards"
              width={69}
              height={64}
              className="h-16 w-auto"
            />
          </Link>
          <FooterNav items={nav} />
        </div>

        <p className="whitespace-nowrap text-center text-base font-bold leading-6 text-white">
          {dict.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
