import { Fragment } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DEMO_COOKIE } from "@/lib/saa/demo";
import { getDict } from "@/lib/i18n/server";
import SiteHeader, { type HeaderUser } from "@/app/_components/site-header";
import SiteFooter from "@/app/_components/site-footer";
import { KUDOS_POSTS, DEPARTMENTS, HASHTAGS } from "@/lib/saa/kudos";
import { KudosHero } from "./_components/kudos-hero";
import { SectionHeading } from "./_components/section-heading";
import { HighlightSection } from "./_components/highlight-section";
import { SpotlightBoard } from "./_components/spotlight-board";
import { StatsSidebar } from "./_components/stats-sidebar";
import { KudosCard } from "./_components/kudos-card";

export default async function KudosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Same gate as the homepage / awards page: proxy protects the route, the demo
  // cookie is the temporary stand-in for real auth (see app/auth/actions.ts).
  const cookieStore = await cookies();
  const hasDemoSession = cookieStore.get(DEMO_COOKIE)?.value === "1";
  if (!user && !hasDemoSession) redirect("/login");

  const { locale, dict } = await getDict();
  const k = dict.kudosBoard;
  const cardLabels = { copyLink: k.copyLink, viewDetails: k.viewDetails };

  const meta = user?.user_metadata ?? {};
  const headerUser: HeaderUser = {
    email: user?.email ?? "sunner@sun-asterisk.com",
    name: meta.full_name ?? meta.name ?? user?.email?.split("@")[0] ?? "Sunner",
    avatarUrl: meta.avatar_url ?? meta.picture ?? null,
  };

  return (
    <>
      <SiteHeader user={headerUser} dict={dict} locale={locale} />

      <main>
        <KudosHero dict={k} />

        {/* B — Highlight Kudos */}
        <section className="mx-auto max-w-[1200px] px-6 py-12">
          <HighlightSection
            posts={KUDOS_POSTS}
            cardLabels={cardLabels}
            filterLabels={{ hashtag: k.hashtag, department: k.department }}
            hashtags={HASHTAGS}
            departments={DEPARTMENTS}
            caption={k.awardsCaption}
            title={k.highlight}
            emptyText={k.noResults}
          />
        </section>

        {/* B.7 — Spotlight board */}
        <section className="mx-auto max-w-[1200px] px-6 py-12">
          <SectionHeading caption={k.awardsCaption} title={k.spotlight} />
          <div className="mt-10">
            <SpotlightBoard dict={k} />
          </div>
        </section>

        {/* C — All kudos + right rail */}
        <section className="mx-auto max-w-[1200px] px-6 pb-20 pt-12">
          <SectionHeading caption={k.awardsCaption} title={k.all} />
          <div className="mt-10 flex flex-col gap-6 lg:flex-row">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              {KUDOS_POSTS.slice(0, 4).map((post) => (
                <Fragment key={post.id}>
                  <KudosCard post={post} labels={cardLabels} />
                </Fragment>
              ))}
            </div>
            <StatsSidebar dict={k} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
