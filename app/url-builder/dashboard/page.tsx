import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/url-builder/SignOutButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | DataWiz URL Builder",
};

export default async function UrlBuilderDashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/url-builder");
  }

  const fullName = user.user_metadata?.full_name as string | undefined;
  const email = user.email ?? "";

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-secondaryBg/60 bg-secondaryAccent/20 p-8 text-center shadow-2xl">
        <h1 className="text-3xl font-bold text-white">
          {fullName ? `Welcome, ${fullName}!` : "Welcome!"}
        </h1>
        <p className="mt-3 text-gray-300">
          You are signed in as <span className="font-bold">{email}</span>.
        </p>
        <p className="mt-3 text-gray-400">
          The URL Builder is coming in the next phase. This page confirms your
          sign-in works.
        </p>
        <div className="mt-7">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
