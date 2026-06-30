import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({ meta: [{ title: "Reset Password · WEBbuilder Studio" }] }),
  component: ResetPasswordPage,
});

type Status = "checking" | "ready" | "expired" | "invalid";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("checking");
  const [statusMsg, setStatusMsg] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");

    if (!token || !email) {
      setStatus("invalid");
      setStatusMsg("This password reset link is invalid or incomplete.");
      return;
    }

    setStatus("ready");
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
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
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token") || "";
      const email = params.get("email") || "";

      await api.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation: confirm,
      });

      setMsg("Password updated successfully. Redirecting…");
      setTimeout(() => navigate({ to: "/auth" }), 1500);
    } catch (e: any) {
      const message = e?.message ?? "Something went wrong";
      setErr(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[color:var(--color-border)] bg-background/60 backdrop-blur p-8">
        <Link
          to="/"
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-[color:var(--color-gold)]"
        >
          ← Home
        </Link>
        <h1 className="mt-4 font-display text-3xl">
          {status === "expired"
            ? "Link expired"
            : status === "invalid"
            ? "Invalid link"
            : "New password"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {status === "ready"
            ? "Enter a new password for your account."
            : status === "checking"
            ? "Verifying your reset link…"
            : statusMsg}
        </p>

        {status === "ready" && (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                New password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md bg-transparent border border-[color:var(--color-border)] px-3 py-2 outline-none focus:border-[color:var(--color-gold)]"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Confirm password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-1 w-full rounded-md bg-transparent border border-[color:var(--color-border)] px-3 py-2 outline-none focus:border-[color:var(--color-gold)]"
              />
            </div>
            {err && <p className="text-sm text-red-400">{err}</p>}
            {msg && <p className="text-sm text-emerald-400">{msg}</p>}
            <button
              type="submit"
              disabled={busy}
              className="btn-gold w-full disabled:opacity-50"
            >
              {busy ? "Please wait…" : "Update password"}
            </button>
          </form>
        )}

        {(status === "expired" || status === "invalid") && (
          <div className="mt-6 space-y-3">
            <Link
              to="/auth"
              search={{ recover: 1 } as never}
              className="btn-gold w-full inline-flex items-center justify-center"
            >
              Request a new link
            </Link>
            <Link
              to="/auth"
              className="block text-center text-xs text-muted-foreground hover:text-[color:var(--color-gold)] underline"
            >
              ← Back to sign in
            </Link>
          </div>
        )}

        {status === "checking" && (
          <div className="mt-6 h-1 w-full overflow-hidden rounded bg-[color:var(--color-border)]">
            <div className="h-full w-1/3 animate-pulse bg-[color:var(--color-gold)]" />
          </div>
        )}
      </div>
    </div>
  );
}
