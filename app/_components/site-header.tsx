"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/auth/actions";
import { NAV_HREFS, isNavActive } from "@/lib/saa/content";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import LanguageSwitcher from "./language-switcher";
import { SaaDropdownPanel, SaaDropdownItem } from "./saa-dropdown";

export type HeaderUser = {
  email: string;
  name: string;
  avatarUrl: string | null;
};

export default function SiteHeader({
  user,
  dict,
  locale,
}: {
  user: HeaderUser;
  dict: Dictionary;
  locale: Locale;
}) {
  const [accountOpen, setAccountOpen] = useState(false);
  const pathname = usePathname();

  const nav = [
    { key: "about", label: dict.nav.about, href: NAV_HREFS.about },
    { key: "awards", label: dict.nav.awards, href: NAV_HREFS.awards },
    { key: "kudos", label: dict.nav.kudos, href: NAV_HREFS.kudos },
  ].map((item) => ({ ...item, selected: isNavActive(item.href, pathname) }));

  return (
    // Sticky translucent strip; on <lg the nav wraps to its own full-width
    // row under the logo/controls row (per reference).
    <header className="sticky top-0 z-50 shrink-0 bg-[#101417]/80 px-4 py-2 sm:px-8 lg:py-0">
      {accountOpen && (
        <button
          aria-hidden
          tabIndex={-1}
          onClick={() => setAccountOpen(false)}
          className="fixed inset-0 -z-10 cursor-default"
        />
      )}

      <div className="mx-auto flex w-full max-w-[1152px] flex-wrap items-center justify-between gap-x-4 lg:h-20">
        <Link href={NAV_HREFS.about} className="order-1 shrink-0" aria-label="Sun* Annual Awards">
          <Image
            src="/saa/logo-header.png"
            alt="Sun* Annual Awards"
            width={52}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <div className="order-3 w-full overflow-x-auto lg:order-2 lg:ml-16 lg:mr-auto lg:w-auto">
          <nav className="flex items-center gap-1 sm:gap-6">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={item.selected ? "page" : undefined}
                className={
                  item.selected
                    ? "flex items-center gap-1 whitespace-nowrap border-b border-saa-gold-light px-3 py-3 text-sm font-bold tracking-[0.1px] text-saa-gold-light [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] sm:p-4"
                    : "flex items-center gap-1 whitespace-nowrap rounded px-3 py-3 text-sm font-bold tracking-[0.1px] text-white transition-colors hover:bg-white/10 sm:p-4"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="order-2 flex items-center gap-2 sm:gap-4 lg:order-3">
          <button
            type="button"
            aria-label={dict.header.notifications}
            className="relative flex h-10 w-10 items-center justify-center rounded p-2 text-white transition-colors hover:bg-white/10"
          >
            <Image src="/saa/icon-bell.svg" alt="" width={24} height={24} className="h-6 w-6" />
            <span className="absolute right-[9px] top-[9px] h-2 w-2 rounded-full bg-saa-red" />
          </button>

          <LanguageSwitcher locale={locale} />

          <div className="relative">
            <button
              type="button"
              onClick={() => setAccountOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={accountOpen}
              aria-label={dict.header.account}
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded border border-saa-gold-muted bg-transparent p-2 transition-colors hover:bg-white/10"
            >
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <Image src="/saa/icon-user.svg" alt="" width={20} height={20} className="h-5 w-5" />
              )}
            </button>
            {accountOpen && (
              // Regular-user variant (Figma z4sCl3_Qtk): Profile (highlighted)
              // + Logout only — no Dashboard row — with each icon sitting
              // right after its label, not flushed to the panel edge.
              // Wide enough that the long VN labels don't fill the row — the
              // active glow stays tight around the text and the highlight box
              // keeps its clean #1A1E1B edges like the design.
              <SaaDropdownPanel className="absolute right-0 z-50 mt-2 w-56">
                <SaaDropdownItem href="/profile" active onClick={() => setAccountOpen(false)}>
                  <span className="inline-flex items-center gap-2">
                    {dict.header.profile}
                    <Image src="/saa/icon-user.svg" alt="" width={24} height={24} className="h-6 w-6" />
                  </span>
                </SaaDropdownItem>
                <form action={signOut} className="contents">
                  <SaaDropdownItem type="submit">
                    <span className="inline-flex items-center gap-2">
                      {dict.header.signOut}
                      <Image
                        src="/saa/icon-chevron-right.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    </span>
                  </SaaDropdownItem>
                </form>
              </SaaDropdownPanel>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
