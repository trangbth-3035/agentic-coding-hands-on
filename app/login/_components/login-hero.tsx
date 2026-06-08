import Image from "next/image";
import { montserrat } from "../fonts";
import { GoogleLoginButton } from "./google-login-button";

// mms_B_Bìa (Figma 662:14393): key-visual logo + heading + Google login button,
// stacked with a 80px gap; heading/button group indented 16px (Frame 550 padding-left).
export function LoginHero() {
  return (
    <div className="flex flex-col gap-10 sm:gap-16 lg:gap-20">
      {/* mms_B.1_Key Visual — "ROOT FURTHER" logo (451x200) */}
      {/* mm:2939:9548 */}
      <Image
        src="/login/Root_Further_Logo.png"
        alt="ROOT FURTHER"
        width={451}
        height={200}
        priority
        className="h-auto w-[260px] sm:w-[360px] lg:w-[451px]"
      />

      {/* Frame 550 — heading + login button */}
      <div className="flex flex-col gap-6 pl-4">
        {/* mms_B.2_content */}
        <p
          className={`${montserrat.className} max-w-full text-white sm:max-w-[480px]`}
          style={{
            fontSize: "20px",
            lineHeight: "40px",
            letterSpacing: "0.5px",
          }}
        >
          Bắt đầu hành trình của bạn cùng SAA 2025.
          <br />
          Đăng nhập để khám phá!
        </p>

        {/* mms_B.3_Login — Button-IC About (Google OAuth via Supabase) */}
        <GoogleLoginButton />
      </div>
    </div>
  );
}
