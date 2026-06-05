import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// OAuth callback: exchange the `code` from the provider for a session, then
// redirect to the post-login destination (default /dashboard).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // No code or exchange failed → back to login with an error flag.
  return NextResponse.redirect(`${origin}/login?error=auth`);
}
