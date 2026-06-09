"use client";

import Image from "next/image";
import { useState } from "react";
import { signOut } from "@/app/auth/actions";
import { NAV_HREFS } from "@/lib/saa/content";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import LanguageSwitcher from "./language-switcher";

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

  const nav = [
    { label: dict.nav.about, href: NAV_HREFS.about, selected: true },
    { label: dict.nav.awards, href: NAV_HREFS.awards, selected: false },
    { label: dict.nav.kudos, href: NAV_HREFS.kudos, selected: false },
  ];

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
          <a href={NAV_HREFS.about} className="shrink-0" aria-label="Sun* Annual Awards">
            <Image
              src="/saa/logo-header.png"
              alt="Sun* Annual Awards"
              width={64}
              height={60}
              className="h-10 w-auto"
              priority
            />
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={
                  item.selected
                    ? "relative text-sm font-semibold text-saa-gold after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-saa-gold"
                    : "text-sm font-medium text-white/80 transition hover:text-white"
                }
              >
                {item.label}
              </a>
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
              <div
                role="menu"
                className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-white/10 bg-saa-panel/95 shadow-2xl backdrop-blur"
              >
                <div className="border-b border-white/10 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                  <p className="truncate text-xs text-white/50">{user.email}</p>
                </div>
                <a
                  href="#profile"
                  role="menuitem"
                  className="block px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/5"
                >
                  {dict.header.profile}
                </a>
                <form action={signOut}>
                  <button
                    type="submit"
                    role="menuitem"
                    className="block w-full px-4 py-2.5 text-left text-sm text-saa-red transition hover:bg-white/5"
                  >
                    {dict.header.signOut}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
