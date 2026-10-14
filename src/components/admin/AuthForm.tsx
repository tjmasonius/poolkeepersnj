"use client";


import { useState, type FormEvent } from "react";
import { Loader2, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";


export function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setNotice("");


    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");


    const supabase = createClient();


    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setNotice(
          "Account created. If email confirmation is required, check your inbox — otherwise you're signed in."
        );
      }
    }


    setLoading(false);
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-pool-950 px-6">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-soft">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <div className="mb-6 flex items-center justify-center gap-2 text-pool-900/60">
          <Lock className="h-4 w-4" />
          <p className="text-sm font-medium">Staff sign in</p>
        </div>


        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="input-field"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-pool-900/70">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              className="input-field"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          </div>


          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          {notice && (
            <p className="text-sm font-medium text-emerald-600">{notice}</p>
          )}


          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>


        <button
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError("");
            setNotice("");
          }}
          className="mt-5 w-full text-center text-xs font-medium text-pool-500 hover:underline"
        >
          {mode === "signin"
            ? "First time here? Create an account"
            : "Already have an account? Sign in"}
        </button>


        <p className="mt-6 text-center text-[11px] leading-relaxed text-pool-900/40">
          Access to leads and tickets is restricted to allow-listed staff
          emails, enforced at the database level — creating an account alone
          does not grant access.
        </p>
      </div>
    </div>
  );
}
