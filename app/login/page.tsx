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
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-saa-bg">
      <Image
        src="/saa/keyvisual-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-right"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-saa-bg via-saa-bg/85 to-saa-bg/30" />
      <div className="absolute inset-0 -z-10 bg-saa-bg/30" />

      <header className="flex items-center justify-between px-4 py-5 sm:px-8 lg:px-12">
        <Image
          src="/saa/logo-header.png"
          alt="Sun* Annual Awards 2025"
          width={64}
          height={60}
          priority
          className="h-11 w-auto"
        />
        <LanguageSwitcher locale={locale} />
      </header>

      <div className="flex flex-1 items-center px-4 sm:px-8 lg:px-16">
        <div className="max-w-2xl">
          <Image
            src="/saa/root-further-logo.png"
            alt="Root Further"
            width={620}
            height={360}
            priority
            className="h-auto w-[280px] sm:w-[420px] lg:w-[520px]"
          />

          {error && (
            <p className="mt-6 inline-block rounded-lg border border-saa-red/40 bg-saa-red/10 px-4 py-2 text-sm text-saa-red">
              {t.error}
            </p>
          )}

          <p className="mt-10 text-lg leading-relaxed text-white sm:text-xl">
            {t.tagline1}
            <br />
            {t.tagline2}
          </p>

          {/* Temporary demo entry: Google OAuth isn't configured yet, so this starts
              a demo session and routes to the Prelaunch countdown page. */}
          <form action={startDemo} className="mt-8">
            <button
              type="submit"
              className="inline-flex items-center gap-3 rounded-full bg-saa-gold px-7 py-3.5 text-base font-bold text-[#1a1300] shadow-lg shadow-black/20 transition hover:bg-saa-gold-light"
            >
              {t.google}
              <Image src="/saa/login-btn-icon.svg" alt="" width={24} height={24} className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>

      <footer className="px-4 pb-6 text-center sm:px-8">
        <p className="text-xs text-white/50">{dict.footer.copyright}</p>
      </footer>
    </main>
  );
}
