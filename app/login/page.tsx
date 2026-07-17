import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { startDemo } from "@/app/auth/actions";
import { getDict } from "@/lib/i18n/server";
import LanguageSwitcher from "@/app/_components/language-switcher";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect(next ?? "/");

  const { locale, dict } = await getDict();
  const t = dict.login;

  return (
    <div className="relative flex min-h-screen flex-col bg-saa-bg">
      {/* Decorative key-visual artwork (full-frame, right-anchored) */}
      <Image
        src="/saa/keyvisual-bg.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="pointer-events-none z-0 object-cover object-right"
      />
      {/* Gradient overlay 1 — darkens the LEFT for text readability */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0,16,26,0) 100%)",
        }}
      />
      {/* Gradient overlay 2 — darkens the BOTTOM */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0) 51.74%)",
        }}
      />

      {/* Fixed header — logo (left) + language switcher (right) */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between bg-[#0b0f12]/80 px-6 sm:px-12 lg:px-36">
        <Image
          src="/saa/logo-header.png"
          alt="Sun* Annual Awards 2025"
          width={52}
          height={48}
          priority
          className="h-12 w-auto"
        />
        <LanguageSwitcher locale={locale} />
      </header>

      {/* Main content — pushes footer to the bottom, clears the fixed header */}
      <main className="relative z-10 flex flex-1 flex-col px-6 pb-24 pt-44 sm:px-12 lg:px-36">
        {error && (
          <p className="mb-6 max-w-md rounded-lg border border-saa-red/60 bg-saa-red/15 px-4 py-3 text-sm text-[#fca5a5]">
            {t.error}
          </p>
        )}

        <section className="flex flex-col gap-24 pl-4 sm:gap-30">
          <Image
            src="/saa/root-further-logo.png"
            alt="Root Further"
            width={451}
            height={200}
            priority
            className="h-auto w-[280px] sm:w-[360px] lg:w-[451px]"
          />

          <div className="flex flex-col gap-6 pl-4">
            <p className="max-w-[480px] text-xl font-bold leading-10 tracking-[0.5px] text-white">
              {t.tagline1}
              <br />
              {t.tagline2}
            </p>

            {/* Temporary demo entry: Google OAuth isn't configured yet, so this
                starts a demo session and routes to the Prelaunch countdown. */}
            <form action={startDemo}>
              <button
                type="submit"
                aria-label="Login with Google"
                className="flex h-15 w-[305px] items-center justify-between gap-2 rounded-lg bg-saa-gold-light px-6 text-saa-bg transition hover:bg-[#fff5c2] hover:shadow-[0_4px_16px_rgba(255,234,158,0.35)]"
              >
                <span className="text-[22px] font-bold leading-7 whitespace-nowrap">
                  {t.google}
                </span>
                <Image
                  src="/saa/login-btn-icon.svg"
                  alt=""
                  aria-hidden
                  width={24}
                  height={24}
                  className="h-6 w-6 shrink-0"
                />
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer — top divider, centered copyright */}
      <footer className="relative z-10 flex w-full items-center justify-center border-t border-saa-divider px-6 py-10 sm:px-24">
        <p className="text-sm text-white/60">{dict.footer.copyright}</p>
      </footer>
    </div>
  );
}
