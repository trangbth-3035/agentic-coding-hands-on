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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-gradient-to-b from-saa-bg/95 to-saa-bg/40 backdrop-blur-md">
      {accountOpen && (
        <button
          aria-hidden
          tabIndex={-1}
          onClick={() => setAccountOpen(false)}
          className="fixed inset-0 -z-10 cursor-default"
        />
      )}

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-8">
          <Link href={NAV_HREFS.about} className="shrink-0" aria-label="Sun* Annual Awards">
            <Image
              src="/saa/logo-header.png"
              alt="Sun* Annual Awards"
              width={64}
              height={60}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={item.selected ? "page" : undefined}
                className={
                  item.selected
                    ? "relative text-sm font-semibold text-saa-gold after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-saa-gold"
                    : "text-sm font-medium text-white/80 transition hover:text-white"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label={dict.header.notifications}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
          >
            <Image src="/saa/icon-bell.svg" alt="" width={20} height={20} className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-saa-red ring-2 ring-saa-bg" />
          </button>

          <LanguageSwitcher locale={locale} />

          <div className="relative">
            <button
              type="button"
              onClick={() => setAccountOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={accountOpen}
              aria-label={dict.header.account}
              className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
            >
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <Image src="/saa/icon-user.svg" alt="" width={20} height={20} className="h-5 w-5" />
              )}
            </button>
            {accountOpen && (
              <SaaDropdownPanel className="absolute right-0 z-50 mt-2 min-w-52">
                <SaaDropdownItem
                  href="/profile"
                  onClick={() => setAccountOpen(false)}
                  icon={
                    <Image src="/saa/icon-user.svg" alt="" width={24} height={24} className="h-6 w-6" />
                  }
                >
                  {dict.header.profile}
                </SaaDropdownItem>
                <SaaDropdownItem
                  href="/dashboard"
                  onClick={() => setAccountOpen(false)}
                  icon={
                    <Image src="/saa/icon-grid.svg" alt="" width={24} height={24} className="h-6 w-6" />
                  }
                >
                  {dict.header.dashboard}
                </SaaDropdownItem>
                <form action={signOut} className="contents">
                  <SaaDropdownItem
                    type="submit"
                    icon={
                      <Image
                        src="/saa/icon-chevron-right.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    }
                  >
                    {dict.header.signOut}
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
