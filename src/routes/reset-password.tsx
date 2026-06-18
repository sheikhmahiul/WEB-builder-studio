import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({ meta: [{ title: "Reset Password · WEBbuilder Studio" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      setErr("Invalid or expired reset link.");
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setMsg(null);
    if (password !== confirm) {
      setErr("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMsg("Password updated successfully. Redirecting…");
      setTimeout(() => navigate({ to: "/auth" }), 1500);
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
        <h1 className="mt-4 font-display text-3xl">New password</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enter a new password for your account.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">New password</label>
            <input
              type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md bg-transparent border border-[color:var(--color-border)] px-3 py-2 outline-none focus:border-[color:var(--color-gold)]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Confirm password</label>
            <input
              type="password" required minLength={6} value={confirm} onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full rounded-md bg-transparent border border-[color:var(--color-border)] px-3 py-2 outline-none focus:border-[color:var(--color-gold)]"
            />
          </div>
          {err && <p className="text-sm text-red-400">{err}</p>}
          {msg && <p className="text-sm text-emerald-400">{msg}</p>}
          <button type="submit" disabled={busy} className="btn-gold w-full disabled:opacity-50">
            {busy ? "Please wait…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
