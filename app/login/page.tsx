import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { startDemo } from "@/app/auth/actions";
import { getDict } from "@/lib/i18n/server";
import LanguageSwitcher from "@/app/_components/language-switcher";

/** Render the tagline with only the "SAA 2025" fragment bold (per design). */
function TaglineLine({ text }: { text: string }) {
  const MARK = "SAA 2025";
  const at = text.indexOf(MARK);
  if (at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <strong className="font-bold">{MARK}</strong>
      {text.slice(at + MARK.length)}
    </>
  );
}

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
      {/* Key-visual art as a plain CSS background (not next/image): the
          grain-heavy asset must skip the optimizer re-encode, which smooths
          the noise and reads as blur. Cover, pinned to the right edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/saa/login-keyvisual-art.png)",
          backgroundSize: "cover",
          backgroundPosition: "100% 50%",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Overlay 1 — horizontal fade darkening the LEFT for text readability */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0,16,26,0) 100%)",
        }}
      />
      {/* Overlay 2 — 400px bottom strip fading into the page background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[400px]"
        style={{
          background: "linear-gradient(0deg, #00101A 0%, rgba(0,19,32,0) 70%)",
        }}
      />

      {/* Fixed header — logo (left) + language switcher (right), transparent
          so the art reads through (per design). */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between px-6 sm:px-12 lg:px-36">
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

      {/* Main content — vertically centred between header and footer */}
      <main className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-16 pt-24 sm:px-12 lg:px-36">
        {error && (
          <p className="mb-6 max-w-md rounded-lg border border-saa-red/60 bg-saa-red/15 px-4 py-3 text-sm text-[#fca5a5]">
            {t.error}
          </p>
        )}

        <section className="flex flex-col gap-14 pl-4">
          <Image
            src="/saa/root-further-logo.png"
            alt="Root Further"
            width={451}
            height={200}
            priority
            className="h-auto w-[280px] sm:w-[360px] lg:w-[451px]"
          />

          <div className="flex flex-col gap-6 pl-1">
            <p className="max-w-[480px] text-lg font-normal leading-9 tracking-[0.5px] text-white sm:text-xl sm:leading-10">
              <TaglineLine text={t.tagline1} />
              <br />
              {t.tagline2}
            </p>

            {/* Temporary demo entry: Google OAuth isn't configured yet, so this
                starts a demo session and routes to the Prelaunch countdown. */}
            <form action={startDemo}>
              <button
                type="submit"
                aria-label="Login with Google"
                className="flex h-15 items-center justify-center gap-3 rounded-lg bg-saa-gold-light px-7 text-saa-bg transition hover:bg-[#fff5c2] hover:shadow-[0_4px_16px_rgba(255,234,158,0.35)]"
              >
                <span className="whitespace-nowrap text-xl font-semibold leading-7">
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

      {/* Footer — centered bold copyright over the art, no divider (design) */}
      <footer className="relative z-10 flex w-full items-center justify-center px-6 py-8 sm:px-24">
        <p className="text-base font-bold text-white">{dict.footer.copyright}</p>
      </footer>
    </div>
  );
}
