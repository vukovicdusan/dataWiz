import type { Metadata } from "next";
import GoogleSignInButton from "@/components/url-builder/GoogleSignInButton";

export const metadata: Metadata = {
  title: "URL Builder | DataWiz",
  description: "Sign in to the DataWiz UTM URL Builder.",
};

export default function UrlBuilderLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const hasAuthError = searchParams.error === "auth";

  return (
    <div className="min-h-[75vh]">
      <div className="flex min-h-[75vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-secondaryBg/60 bg-secondaryAccent/20 p-8 text-center shadow-2xl backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white">URL Builder</h1>
          <p className="mt-3 text-gray-300">
            Build consistent, trackable campaign URLs with your team. Sign in
            with your Google account to get started.
          </p>
          {hasAuthError && (
            <p className="mt-5 rounded-md border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">
              Something went wrong while signing you in. Please try again.
            </p>
          )}
          <div className="mt-7">
            <GoogleSignInButton />
          </div>
        </div>
      </div>
    </div>
  );
}
