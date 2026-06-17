import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DEMO_COOKIE } from "@/lib/saa/demo";
import { getDict } from "@/lib/i18n/server";
import SiteHeader, { type HeaderUser } from "./_components/site-header";
import Hero from "./_components/hero";
import RootFurtherSection from "./_components/root-further-section";
import AwardSystem from "./_components/award-system";
import KudosBanner from "./_components/kudos-banner";
import SiteFooter from "./_components/site-footer";
import WidgetButton from "./_components/widget-button";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Defense in depth: the proxy already gates this route. The demo cookie is a
  // temporary stand-in for real auth (see app/auth/actions.ts).
  const cookieStore = await cookies();
  const hasDemoSession = cookieStore.get(DEMO_COOKIE)?.value === "1";
  if (!user && !hasDemoSession) redirect("/login");

  const { locale, dict } = await getDict();

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
        <Hero />
        <RootFurtherSection />
        <AwardSystem />
        <KudosBanner />
      </main>
      <SiteFooter />
      <WidgetButton
        labels={dict.widget}
        rules={dict.rules}
        compose={dict.kudosBoard.writeKudos}
        senderName={headerUser.name}
      />
    </>
  );
}
