"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { registerUser } from "@/lib/actions/registerUser";
import { useRouter } from "next/navigation";

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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Checking session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Please sign in to continue.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Registering you with the backend...</p>
      </div>
    </div>
  );
}
