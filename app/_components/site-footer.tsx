import Image from "next/image";
import { NAV_HREFS } from "@/lib/saa/content";
import { getDict } from "@/lib/i18n/server";

export default async function SiteFooter() {
  const { dict } = await getDict();

  const nav = [
    { label: dict.nav.about, href: NAV_HREFS.about, active: false },
    { label: dict.nav.awards, href: NAV_HREFS.awards, active: true },
    { label: dict.nav.kudos, href: NAV_HREFS.kudos, active: false },
    { label: dict.nav.standards, href: NAV_HREFS.standards, active: false },
  ];

  return (
    <footer className="border-t border-white/10 bg-saa-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:justify-between lg:px-10">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
          <a href={NAV_HREFS.about} aria-label="Sun* Annual Awards">
            <Image
              src="/saa/logo-footer.png"
              alt="Sun* Annual Awards"
              width={64}
              height={60}
              className="h-9 w-auto"
            />
          </a>
          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={
                  item.active
                    ? "text-sm font-semibold text-saa-gold"
                    : "text-sm text-white/70 transition hover:text-white"
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="text-xs text-white/40">{dict.footer.copyright}</p>
      </div>
    </footer>
  );
}
