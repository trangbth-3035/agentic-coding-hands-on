import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "./_components/sign-out-button";

// Placeholder authenticated landing page. The proxy already guards this route;
// the explicit check is defense-in-depth and gives us the user object to render.
export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const name = user.user_metadata?.full_name ?? user.user_metadata?.name;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#00101A] px-6 text-center text-white">
      <h1 className="text-3xl font-bold tracking-tight">
        Welcome{name ? `, ${name}` : ""} 👋
      </h1>
      <p className="text-zinc-400">
        Signed in as <span className="text-white">{user.email}</span>
      </p>
      <SignOutButton />
    </main>
  );
}
