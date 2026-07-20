"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

const LANGS: { code: string; locale: Locale; flag: string }[] = [
  { code: "VN", locale: "vi", flag: "/saa/flag-vn-demo.svg" },
  { code: "EN", locale: "en", flag: "/saa/flag-en-demo.svg" },
];

/** Module-scope so the React Compiler doesn't flag the global mutation. */
function writeLocaleCookie(next: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
}

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.locale === locale) ?? LANGS[0];

  function selectLocale(next: Locale) {
    writeLocaleCookie(next);
    setOpen(false);
    router.refresh();
  }

  return (
    <div className="relative">
      {open && (
        <button
          aria-hidden
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 -z-10 cursor-default"
        />
      )}
      {/* Trigger — flag + code + rotating chevron (demo language-selector) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-0.5 rounded p-4 text-white transition-colors hover:bg-white/10"
      >
        <span className="flex items-center gap-1">
          <Image src={current.flag} alt="" width={24} height={24} aria-hidden />
          <span className="text-base font-bold tracking-[0.15px]">{current.code}</span>
        </span>
        <Image
          src="/saa/chevron-down-demo.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        // Panel — dark #00070C, gold-muted border, 6px padding; selected row
        // gold-tint, others hover to white/10 (demo language-selector).
        <ul
          role="listbox"
          className="absolute right-0 top-full z-20 mt-1 flex flex-col rounded-lg border border-saa-gold-muted bg-[#00070C] p-1.5"
        >
          {LANGS.map((l) => {
            const selected = l.locale === locale;
            return (
              <li key={l.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => selectLocale(l.locale)}
                  className={`flex h-14 w-[110px] cursor-pointer items-center gap-1 rounded-sm px-4 text-left text-white transition-colors ${
                    selected ? "bg-[#FFEA9E]/20" : "hover:bg-white/10"
                  }`}
                >
                  <Image src={l.flag} alt="" width={24} height={24} aria-hidden />
                  <span className="text-base font-bold tracking-[0.15px]">{l.code}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
