"use client";

import { Suspense, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { AuthForm } from "./AuthForm";
import { Dashboard } from "./Dashboard";

export function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pool-950">
        <Loader2 className="h-6 w-6 animate-spin text-white" />
      </div>
    );
  }

  if (!session) return <AuthForm />;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-pool-50/40">
          <Loader2 className="h-6 w-6 animate-spin text-pool-400" />
        </div>
      }
    >
      <Dashboard />
    </Suspense>
  );
}
