import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logoUrl from "@/assets/logo.png";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Book a Cleaning — Rangers Cleaning & Contracting" },
      { name: "description", content: "Book your professional cleaning service with Rangers. Tell us about your space and we'll handle the rest." },
      { property: "og:title", content: "Book a Cleaning — Rangers Cleaning & Contracting" },
      { property: "og:description", content: "Book your professional cleaning service with Rangers." },
    ],
  }),
  component: Onboarding,
});

const SERVICE_TYPES = ["Home Cleaning", "Office Cleaning", "Deep Cleaning", "Construction Cleaning", "Medical Facility", "Other"];

function Onboarding() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: SERVICE_TYPES[0],
    date: "",
    address: "",
    notes: "",
  });

  const onChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#EDEEF0] py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-[#0A1628] px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoUrl} alt="Rangers" className="h-9 w-auto" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-7 sm:p-10">
          {submitted ? (
            <div className="text-center py-10">
              <CheckCircle2 className="mx-auto h-14 w-14 text-[#2CADE2]" />
              <h1 className="mt-4 font-display text-3xl font-semibold text-[color:var(--primary)]">Booking Received</h1>
              <p className="mt-3 text-[color:var(--muted-foreground)]">
                Thanks {form.name || "there"} — we'll reach out within 24 hours to confirm your appointment.
              </p>
              <Link to="/" className="mt-6 inline-flex rounded-full bg-[#2CADE2] px-6 py-3 text-sm font-semibold text-white hover:brightness-110">
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EDEEF0] px-3 py-1 text-xs font-medium text-[color:var(--primary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2CADE2]" /> Get Started
              </div>
              <h1 className="mt-4 font-display text-3xl font-semibold text-[color:var(--primary)] sm:text-4xl">
                Book Your Cleaning Service
              </h1>
              <p className="mt-3 text-[color:var(--muted-foreground)]">
                Tell us a bit about your space and preferred timing. We'll confirm within 24 hours.
              </p>

              <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" required>
                  <input required value={form.name} onChange={onChange("name")} className="input" placeholder="Jane Doe" />
                </Field>
                <Field label="Email" required>
                  <input required type="email" value={form.email} onChange={onChange("email")} className="input" placeholder="jane@example.com" />
                </Field>
                <Field label="Phone" required>
                  <input required value={form.phone} onChange={onChange("phone")} className="input" placeholder="(555) 123-4567" />
                </Field>
                <Field label="Service Type" required>
                  <select value={form.service} onChange={onChange("service")} className="input">
                    {SERVICE_TYPES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Preferred Date" required>
                  <input required type="date" value={form.date} onChange={onChange("date")} className="input" />
                </Field>
                <Field label="Address" required>
                  <input required value={form.address} onChange={onChange("address")} className="input" placeholder="Street, City" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Additional Notes">
                    <textarea value={form.notes} onChange={onChange("notes")} className="input min-h-[110px]" placeholder="Square footage, special requests, access info..." />
                  </Field>
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button type="submit" className="rounded-full bg-[#2CADE2] px-7 py-3 text-sm font-semibold text-white shadow-md hover:brightness-110">
                    Submit Booking
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          background: #F6F7F8;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #0A1628;
          outline: none;
          border: 1px solid transparent;
          transition: border-color 0.15s;
        }
        .input:focus { border-color: #2CADE2; }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-[color:var(--primary)]">
        {label} {required && <span className="text-[#2CADE2]">*</span>}
      </span>
      {children}
    </label>
  );
}
