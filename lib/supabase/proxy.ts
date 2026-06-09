import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { DEMO_COOKIE } from "@/lib/saa/demo";

/** Paths reachable without an authenticated session. */
const PUBLIC_PREFIXES = ["/login", "/auth"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

/**
 * Refreshes the Supabase auth session on every matched request and enforces the
 * auth gate: unauthenticated users are redirected to /login, and authenticated
 * users hitting /login are sent home.
 *
 * Adapted from the @supabase/ssr middleware snippet for Next.js 16's `proxy.ts`.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: do not run code between createServerClient and getUser().
  // getUser() revalidates the token; skipping it risks logging users out at random.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // TEMPORARY: the demo cookie stands in for a real session while Google OAuth
  // is unavailable. See app/auth/actions.ts (startDemo).
  const hasDemoSession = request.cookies.get(DEMO_COOKIE)?.value === "1";
  const isAuthed = Boolean(user) || hasDemoSession;

  const { pathname } = request.nextUrl;
  const publicPath = isPublicPath(pathname);

  if (!isAuthed && !publicPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthed && pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: return supabaseResponse as-is so refreshed auth cookies survive.
  return supabaseResponse;
}
