"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = typeof window !== "undefined" && !!localStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {isAuthenticated && children}
    </div>
  );
}