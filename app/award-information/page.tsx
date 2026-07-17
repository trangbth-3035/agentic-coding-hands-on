import { Fragment } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DEMO_COOKIE } from "@/lib/saa/demo";
import { getDict } from "@/lib/i18n/server";
import SiteHeader, { type HeaderUser } from "@/app/_components/site-header";
import SiteFooter from "@/app/_components/site-footer";
import { AWARDS } from "@/lib/saa/awards";
import { KeyvisualHero } from "./_components/keyvisual-hero";
import { AwardNav } from "./_components/award-nav";
import { AwardCard } from "./_components/award-card";
import { KudosBlock } from "./_components/kudos-block";

export default async function AwardInformationPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Same gate as the homepage: the proxy already protects this route, the demo
  // cookie is the temporary stand-in for real auth (see app/auth/actions.ts).
  const cookieStore = await cookies();
  const hasDemoSession = cookieStore.get(DEMO_COOKIE)?.value === "1";
  if (!user && !hasDemoSession) redirect("/login");

  const { locale, dict } = await getDict();
  const t = dict.awardInfo;

  const meta = user?.user_metadata ?? {};
  const headerUser: HeaderUser = {
    email: user?.email ?? "sunner@sun-asterisk.com",
    name: meta.full_name ?? meta.name ?? user?.email?.split("@")[0] ?? "Sunner",
    avatarUrl: meta.avatar_url ?? meta.picture ?? null,
  };

  const navItems = AWARDS.map((a) => ({ slug: a.slug, label: a.navLabel }));

  return (
    <>
      <SiteHeader user={headerUser} dict={dict} locale={locale} />

      <main>
        {/* Title block (design item A) overlaid on the keyvisual band */}
        <KeyvisualHero>
          <div className="flex flex-col items-center gap-4">
            <p className="text-2xl font-bold text-white">{t.subtitle}</p>
            <div className="h-px w-full bg-saa-divider" />
            <h1 className="text-center text-4xl font-bold leading-tight tracking-tight text-saa-gold md:text-[57px] md:leading-[64px]">
              {t.heading}
            </h1>
          </div>
        </KeyvisualHero>

        {/* Award system: nav rail (C) + award list (D) */}
        <section className="mx-auto w-full max-w-[1152px] px-4 py-12 sm:px-9 sm:py-16 lg:px-0 lg:py-24">
          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
            <aside className="lg:w-[178px] lg:shrink-0">
              <AwardNav items={navItems} ariaLabel={t.navAriaLabel} />
            </aside>

            <div className="min-w-0 flex-1">
              {AWARDS.map((award, i) => (
                <Fragment key={award.slug}>
                  {i > 0 && <div className="my-20 h-px w-full bg-saa-divider" />}
                  <AwardCard award={award} copy={t.awards[award.slug]} labels={t} priority={i === 0} />
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Sun* Kudos promo (D1) */}
        <section className="mx-auto w-full max-w-[1152px] px-4 pb-24 sm:px-9 lg:px-0">
          <KudosBlock />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
