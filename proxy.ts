import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Next.js 16 renamed Middleware → Proxy (same functionality). Runs Supabase
// session refresh + route protection on every matched request.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Run on everything except Next internals and static asset files.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
