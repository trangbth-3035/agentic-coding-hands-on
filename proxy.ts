import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next.js 16 renamed the `middleware` convention to `proxy`. Same behavior;
// runs on the Node.js runtime by default.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Run on all paths except:
     * - _next/static, _next/image (framework internals)
     * - favicon.ico and the /saa asset folder
     * - any static image file (svg/png/jpg/…) so CSS/JS/images never get gated
     */
    "/((?!_next/static|_next/image|favicon.ico|saa/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
