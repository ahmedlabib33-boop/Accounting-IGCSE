import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Runs before every page and API request: refreshes the Supabase session cookie and keeps
// signed-out visitors on the login page. Without Supabase settings the app stays open, as before.

const PUBLIC_PATHS = ["/login", "/auth", "/api/auth", "/api/content", "/accounting-revision.html", "/revision", "/manifest.webmanifest", "/sw.js"];

const isPublic = (pathname) => PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

export async function proxy(request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() { return request.cookies.getAll(); },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        // "Remember me" off: refreshed session cookies carry no expiry, so they end with the browser.
        const remember = request.cookies.get("acct-remember")?.value !== "0";
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, (remember || options?.maxAge === 0) ? options : { ...options, maxAge: undefined, expires: undefined }));
        Object.entries(headers || {}).forEach(([name, value]) => response.headers.set(name, value));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const signedIn = Boolean(data?.claims);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    if (!signedIn && !isPublic(pathname)) return NextResponse.json({ error: "Please sign in to use this feature." }, { status: 401 });
    return response;
  }
  if (!signedIn && !isPublic(pathname)) {
    const login = new URL("/login", request.url);
    if (pathname !== "/") login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }
  // The login page itself checks with the Auth server and sends signed-in people home, so a stale
  // cookie for a deleted account cannot bounce between / and /login.
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon\\.svg|apple-icon\\.png|icon-192\\.png|icon-512\\.png|icon-maskable-512\\.png|sw\\.js|revision/).*)"],
};
