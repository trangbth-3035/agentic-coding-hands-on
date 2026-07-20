"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

const LANGS: { code: string; locale: Locale; flag: string }[] = [
  { code: "VN", locale: "vi", flag: "/saa/flag-vn.svg" },
  { code: "EN", locale: "en", flag: "/saa/flag-en.svg" },
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
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 rounded p-3 transition-colors hover:bg-white/10 sm:p-4"
      >
        <Image
          src={current.flag}
          alt=""
          width={24}
          height={18}
          className="h-[18px] w-6 rounded-[3px] object-cover"
        />
        <span className="text-base font-bold tracking-[0.15px] text-white">{current.code}</span>
        <Image
          src="/saa/chevron-down.svg"
          alt=""
          width={16}
          height={16}
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-28 rounded-lg border border-saa-gold-muted bg-[#00070C] p-1.5 shadow-2xl"
        >
          {LANGS.map((l) => {
            const selected = l.locale === locale;
            return (
              <button
                key={l.code}
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => selectLocale(l.locale)}
                className={`flex w-full items-center gap-2.5 rounded px-3 py-3 text-left text-base font-bold text-white transition ${
                  selected ? "bg-saa-gold-light/15" : "hover:bg-white/5"
                }`}
              >
                <Image
                  src={l.flag}
                  alt=""
                  width={24}
                  height={18}
                  className="h-[18px] w-6 rounded-[3px] object-cover"
                />
                {l.code}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
