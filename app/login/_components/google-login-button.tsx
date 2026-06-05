"use client";

import Image from "next/image";
import { useState } from "react";
import { montserrat } from "../fonts";
import { createClient } from "@/lib/supabase/client";

// mms_B.3_Login — Button-IC About. Visual is unchanged from the Figma design;
// this client island wires the click to Supabase Google OAuth.
export function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    // On success the browser is redirected to Google; only re-enable on error.
    if (error) {
      console.error("Google sign-in failed:", error.message);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={loading}
      className="flex h-15 cursor-pointer items-center gap-2 rounded-lg bg-[#FFEA9E] px-6 py-4 transition-[background-color,transform] duration-200 ease-out hover:bg-[#FFE07A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none"
    >
      <span
        className={montserrat.className}
        style={{ fontSize: "22px", lineHeight: "28px", color: "#00101A" }}
      >
        LOGIN With Google
      </span>
      {/* mm:I662:14426;186:1766 */}
      <Image src="/login/Google.svg" alt="" width={24} height={24} />
    </button>
  );
}
