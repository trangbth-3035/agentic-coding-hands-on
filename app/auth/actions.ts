"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DEMO_COOKIE } from "@/lib/saa/demo";

/**
 * TEMPORARY demo flow: Google OAuth can't be configured in this environment,
 * so "logging in" sets a lightweight demo-session cookie and sends the user to
 * the Prelaunch countdown page (which then leads to the Homepage). Swap this for
 * real `signInWithOAuth` once Google credentials are available.
 */
export async function startDemo() {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  redirect("/prelaunch");
}

/** Sign the current user out (real session + demo cookie) and return to login. */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_COOKIE);
  redirect("/login");
}
