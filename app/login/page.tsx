import Image from "next/image";
import { LoginHeader } from "./_components/login-header";
import { LoginHero } from "./_components/login-hero";
import { LoginFooter } from "./_components/login-footer";

// Login screen (Figma 662:14387 / MoMorph "Login").
// Dark base (#00101A) with a full-bleed key-visual (artwork + baked gradients),
// header on top, content vertically centered on the left, footer pinned to the bottom.
export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#00101A]">
      {/* mms_C_Keyvisual + gradient overlays (Rectangle 57 / Cover) baked in */}
      <Image
        src="/login/keyvisual.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover object-center"
      />

      {/* Legibility scrim — the design's left/bottom gradients are baked into the
          keyvisual at 1440px but get cropped on narrower viewports, so re-apply
          them below lg to keep the content readable. Desktop stays untouched. */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#00101A] via-[#00101A]/50 to-transparent lg:hidden" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#00101A] to-transparent lg:hidden" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <LoginHeader />
        <main className="flex flex-1 items-center px-6 sm:px-12 lg:px-36">
          <LoginHero />
        </main>
        <LoginFooter />
      </div>
    </div>
  );
}
