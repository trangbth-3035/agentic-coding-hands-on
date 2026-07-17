import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DEMO_COOKIE } from "@/lib/saa/demo";
import { getDict } from "@/lib/i18n/server";
import SiteHeader, { type HeaderUser } from "@/app/_components/site-header";
import SiteFooter from "@/app/_components/site-footer";
import { KUDOS_POSTS, RANK_BADGE } from "@/lib/saa/kudos";
import { StatsCard } from "@/app/kudos/_components/stats-card";
import { ProfileKudos } from "./_components/profile-kudos";

// Demo profile facts not carried by the (demo) auth session.
const PROFILE_DEPARTMENT = "CEVC3";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Same gate as the homepage / kudos page: proxy protects the route, the demo
  // cookie is the temporary stand-in for real auth (see app/auth/actions.ts).
  const cookieStore = await cookies();
  const hasDemoSession = cookieStore.get(DEMO_COOKIE)?.value === "1";
  if (!user && !hasDemoSession) redirect("/login");

  const { locale, dict } = await getDict();
  const k = dict.kudosBoard;
  const p = dict.profile;
  const cardLabels = { copyLink: k.copyLink, viewDetails: k.viewDetails };

  const meta = user?.user_metadata ?? {};
  const headerUser: HeaderUser = {
    email: user?.email ?? "sunner@sun-asterisk.com",
    name:
      meta.full_name ?? meta.name ?? user?.email?.split("@")[0] ?? "Bùi Thị Huyền Trang",
    avatarUrl: meta.avatar_url ?? meta.picture ?? null,
  };
  const avatar = headerUser.avatarUrl ?? "/saa/kudos-avatar-2.png";
  const badge = RANK_BADGE.legend;

  return (
    <>
      <SiteHeader user={headerUser} dict={dict} locale={locale} />

      <main>
        {/* Hero — keyvisual band + avatar / name / icon collection / stats */}
        <section className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[360px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/saa/kudos-kv-bg.png"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-saa-bg/50 to-saa-bg" />
          </div>

          <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-6 pb-14 pt-16">
            {/* Avatar + name + department/badge */}
            <div className="flex flex-col items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatar}
                alt={headerUser.name}
                className="h-28 w-28 rounded-full border-4 border-saa-gold-light object-cover sm:h-32 sm:w-32"
              />
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-3xl font-bold text-saa-gold-light sm:text-[32px]">
                  {headerUser.name}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white">{PROFILE_DEPARTMENT}</span>
                  <span className="h-1 w-1 rounded-full bg-white/40" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={badge.src} alt={badge.label} className="h-[19px] w-auto" />
                </div>
              </div>
            </div>

            {/* My icon collection — six (locked) slots */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-12 w-12 rounded-full border border-saa-gold-muted/50 bg-[#00070C] sm:h-14 sm:w-14"
                  />
                ))}
              </div>
              <p className="text-base font-bold text-white">{p.collectionTitle}</p>
            </div>

            {/* Overview stats (shared with the Kudos sidebar) */}
            <StatsCard dict={k} className="w-full max-w-[680px]" />
          </div>
        </section>

        {/* My KUDOS — sent / received with a filter dropdown */}
        <section className="mx-auto max-w-[1200px] px-6 pb-20 pt-4">
          <ProfileKudos
            caption={k.awardsCaption}
            title={k.kudosUnit}
            sent={KUDOS_POSTS}
            received={KUDOS_POSTS}
            cardLabels={cardLabels}
            t={{ sent: p.sent, received: p.received, spam: p.spam }}
          />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
