import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Trash2, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Rangers Cleaning" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Booking = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  message: string | null;
  status: string;
  created_at: string;
};

const STATUSES = ["new", "confirmed", "completed", "cancelled"];

function AdminPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data.session?.user.id ?? null);
      setLoading(false);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user.id ?? null);
      setIsAdmin(null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) {
      setIsAdmin(null);
      return;
    }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [userId]);

  if (loading) return <Centered>Loading…</Centered>;
  if (!userId) return <AuthForm />;
  if (isAdmin === null) return <Centered>Checking access…</Centered>;
  if (!isAdmin) return <NoAccess />;
  return <Dashboard />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EDEEF0] text-[#0A1628]">
      {children}
    </div>
  );
}

function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      if (error) toast.error(error.message);
      else toast.success("Account created. You can sign in now.");
    }
    setBusy(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EDEEF0] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <Link to="/" className="text-xs text-[#2CADE2] hover:underline">← Back to site</Link>
        <h1 className="mt-3 font-display text-2xl font-semibold text-[#0A1628]">
          Admin {mode === "signin" ? "sign in" : "sign up"}
        </h1>
        <p className="mt-1 text-sm text-[#6b7280]">
          Restricted area. Admin role required to view bookings.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#e5e7eb] bg-[#F6F7F8] px-4 py-3 text-sm outline-none focus:border-[#2CADE2]"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#e5e7eb] bg-[#F6F7F8] px-4 py-3 text-sm outline-none focus:border-[#2CADE2]"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-[#2CADE2] px-6 py-3 text-sm font-semibold text-white shadow transition hover:brightness-110 disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 text-xs text-[#6b7280] hover:text-[#0A1628]"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

function NoAccess() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EDEEF0] px-4">
      <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 className="font-display text-2xl font-semibold text-[#0A1628]">No admin access</h1>
        <p className="mt-2 text-sm text-[#6b7280]">
          This account is signed in but does not have the admin role. Ask an
          existing admin to grant access in the backend, or run this in the
          database (replace the email):
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-[#0A1628] p-3 text-left text-xs text-white">
{`INSERT INTO user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users
WHERE email = 'you@example.com';`}
        </pre>
        <button
          onClick={() => supabase.auth.signOut()}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2CADE2] px-5 py-2.5 text-sm font-semibold text-white"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setBookings((data ?? []) as Booking[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    setBookings((b) => b.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setBookings((b) => b.filter((x) => x.id !== id));
    toast.success("Deleted");
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const counts = STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = bookings.filter((b) => b.status === s).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#EDEEF0] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#0A1628] px-6 py-4 text-white">
          <div>
            <h1 className="font-display text-xl font-semibold">Bookings Admin</h1>
            <p className="text-xs text-white/60">Manage customer cleaning requests</p>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white/80 hover:bg-white/10">
              View site
            </Link>
            <button
              onClick={load}
              className="inline-flex items-center gap-2 rounded-full bg-[#2CADE2] px-4 py-2 text-xs font-semibold text-white"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white/80 hover:bg-white/10"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </header>

        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(filter === s ? "all" : s)}
              className={`rounded-2xl p-4 text-left transition ${
                filter === s ? "bg-[#2CADE2] text-white" : "bg-white text-[#0A1628] hover:bg-white/80"
              }`}
            >
              <div className="text-xs uppercase tracking-wider opacity-70">{s}</div>
              <div className="mt-1 font-display text-2xl font-semibold">{counts[s] ?? 0}</div>
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl bg-white">
          <div className="flex items-center justify-between border-b border-[#eef0f3] px-5 py-3">
            <div className="text-sm font-semibold text-[#0A1628]">
              {filter === "all" ? "All bookings" : `Status: ${filter}`} ({filtered.length})
            </div>
            {filter !== "all" && (
              <button onClick={() => setFilter("all")} className="text-xs text-[#2CADE2]">
                Clear filter
              </button>
            )}
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm text-[#6b7280]">Loading bookings…</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-sm text-[#6b7280]">No bookings yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F6F7F8] text-xs uppercase tracking-wider text-[#6b7280]">
                  <tr>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.id} className="border-t border-[#eef0f3] align-top">
                      <td className="px-4 py-3 font-medium text-[#0A1628]">{b.full_name}</td>
                      <td className="px-4 py-3 text-[#6b7280]">
                        <div>{b.email}</div>
                        <div className="text-xs">{b.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-[#0A1628]">{b.service}</td>
                      <td className="px-4 py-3 text-[#0A1628]">{b.preferred_date}</td>
                      <td className="px-4 py-3 max-w-xs text-[#6b7280]">{b.message || "—"}</td>
                      <td className="px-4 py-3">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className="rounded-md border border-[#e5e7eb] bg-white px-2 py-1 text-xs"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#6b7280]">
                        {new Date(b.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => remove(b.id)}
                          className="rounded-md p-2 text-[#ef4444] hover:bg-[#fef2f2]"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
