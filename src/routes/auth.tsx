import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({ meta: [{ title: "Sign In · WEBbuilder Studio" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/" });
  }, [user, loading, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null); setMsg(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        setMsg("Account created. Signing you in…");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setMsg("Password reset link sent to your email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[color:var(--color-border)] bg-background/60 backdrop-blur p-8">
        <Link to="/" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-[color:var(--color-gold)]">← Home</Link>
        <h1 className="mt-4 font-display text-3xl">
          {mode === "signin" ? "Welcome back" : mode === "signup" ? "Create account" : "Reset password"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin" ? "Sign in to access your dashboard." : mode === "signup" ? "Set up your admin account." : "Enter your email and we’ll send you a reset link."}
        </p>

        <div className="mt-6 flex gap-2 text-xs uppercase tracking-[0.18em]">
          <button
            onClick={() => { setMode("signin"); setErr(null); setMsg(null); }}
            className={`flex-1 py-2 rounded-md border ${mode === "signin" ? "border-[color:var(--color-gold)] text-[color:var(--color-gold)]" : "border-[color:var(--color-border)] text-muted-foreground"}`}
          >Sign in</button>
          <button
            onClick={() => { setMode("signup"); setErr(null); setMsg(null); }}
            className={`flex-1 py-2 rounded-md border ${mode === "signup" ? "border-[color:var(--color-gold)] text-[color:var(--color-gold)]" : "border-[color:var(--color-border)] text-muted-foreground"}`}
          >Sign up</button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md bg-transparent border border-[color:var(--color-border)] px-3 py-2 outline-none focus:border-[color:var(--color-gold)]"
            />
          </div>
          {mode !== "forgot" && (
            <div>
              <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Password</label>
              <input
                type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md bg-transparent border border-[color:var(--color-border)] px-3 py-2 outline-none focus:border-[color:var(--color-gold)]"
              />
            </div>
          )}
          {err && <p className="text-sm text-red-400">{err}</p>}
          {msg && <p className="text-sm text-emerald-400">{msg}</p>}
          <button type="submit" disabled={busy} className="btn-gold w-full disabled:opacity-50">
            {busy ? "Please wait…" : mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}
          </button>
        </form>

        {mode === "signin" && (
          <button
            onClick={() => { setMode("forgot"); setErr(null); setMsg(null); }}
            className="mt-4 text-xs text-muted-foreground hover:text-[color:var(--color-gold)] underline"
          >Forgot password?</button>
        )}
        {mode === "forgot" && (
          <button
            onClick={() => { setMode("signin"); setErr(null); setMsg(null); }}
            className="mt-4 text-xs text-muted-foreground hover:text-[color:var(--color-gold)] underline"
          >← Back to sign in</button>
        )}
      </div>
    </div>
  );
}
