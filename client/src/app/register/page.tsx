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

  if (status === "loading") return <p>Loading session...</p>;
  if (!session) return <p>Please sign in</p>;

  return <p>Registering with backend...</p>;
}
