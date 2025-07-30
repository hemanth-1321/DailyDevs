"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { registerUser } from "@/lib/actions/registerUser";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as needed

export default function RegisterPage() {
  const { data: session, status } = useSession();
  const [registered, setRegistered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user && !registered) {
      registerUser({
        name: session.user.name!,
        login: session.user.login!,
        email: session.user.email!,
        avatarUrl: session.user.avatarUrl!,
      })
        .then(() => {
          setRegistered(true);
          router.push("/dashboard");
        })
        .catch((err) => {
          console.error("Registration failed:", err);
        });
    }
  }, [session, registered]);

  if (status === "loading") {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <p className="text-xl font-semibold text-muted-foreground border border-border rounded-xl px-6 py-4 shadow-md bg-card">
          Logging in....
        </p>
      </div>
    );
  }
  if (!session)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <p className="text-xl font-semibold text-muted-foreground border border-border rounded-xl px-6 py-4 shadow-md bg-card">
          🚪 Please sign in to access your dashboard
        </p>
      </div>
    );

  return (
    <main className="max-w-6xl mx-auto w-full px-4 py-10 space-y-10 mt-20">
      <div className="relative z-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-4 shadow-md">
        <div className="p-4 sm:p-6 bg-gray-200 dark:bg-[#a2bffe] rounded-2xl">
          <Skeleton className="h-6 w-64 mb-4" />

          <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-3 space-y-4 border border-gray-800 rounded-2xl shadow-sm p-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-60" />
              <Skeleton className="h-32 w-full rounded-xl" />

              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-full md:w-1/2" />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              <Skeleton className="h-10 w-full hidden md:block" />
              <div className="p-4 rounded-2xl shadow-md dark:bg-[#1f2937] space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
              <div className="p-4 rounded-2xl shadow-md dark:bg-[#1f2937] space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          </section>

          {/* Contribution Chart */}
          <section className="mt-10 border border-[#334155] rounded-2xl shadow-md p-6 sm:p-8 dark:bg-[#1e293b]">
            <Skeleton className="h-6 w-60 mx-auto mb-6" />
            <Skeleton className="h-40 w-full sm:max-w-2xl mx-auto rounded-lg" />
          </section>
        </div>
      </div>
    </main>
  );
}
