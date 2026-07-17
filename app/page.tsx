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
      {/* Sections below the key-visual flow (awards, kudos) sit on the
          slightly warmer #0B0F12 like the reference; the key-visual wrapper
          keeps the page-dark #00101A behind the art. */}
      <main className="bg-[#0B0F12]">
        {/* The key-visual art flows down out of the hero and behind the ROOT
            FURTHER essay, fading into the page background. Both layers track
            the art's own height (aspect 1512/1392, the asset's native ratio)
            so the fade stays anchored to the image when the copy reflows —
            rendered once here behind both sections instead of being clipped
            inside Hero. Plain CSS background: the grain-heavy asset must skip
            the image optimizer, whose re-encode smooths the noise into blur. */}
        <div className="relative bg-saa-bg">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 aspect-[1512/1392]"
            style={{
              backgroundImage: "url(/saa/keyvisual-bg.png)",
              backgroundSize: "100% auto",
              backgroundPosition: "50% 0%",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 aspect-[1512/1392]"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,15,18,0) 40%, rgba(11,15,18,0.55) 62%, #0B0F12 82%)",
            }}
          />
          <Hero />
          <div className="relative z-[1]">
            <RootFurtherSection />
          </div>
        </div>
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
