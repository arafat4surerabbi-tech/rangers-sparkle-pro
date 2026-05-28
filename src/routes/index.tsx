import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logoUrl from "@/assets/logo.png";
import {
  Shield,
  Menu,
  X,
  ChevronDown,
  HardHat,
  Hotel,
  Briefcase,
  Sparkles,
  GraduationCap,
  Landmark,
  Stethoscope,
  Dumbbell,
  Wrench,
  Leaf,
  Clock,
  BadgeCheck,
  Users,
  Zap,
  Star,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import heroImg from "../assets/hero.jpg";
import teamImg from "../assets/team.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rangers Cleaning & Contracting | Professional Commercial Cleaning" },
      {
        name: "description",
        content:
          "Rangers Cleaning & Contracting delivers professional commercial cleaning for offices, schools, medical facilities, and government buildings. Licensed, insured, available 24/7.",
      },
    ],
  }),
  component: Index,
});

const SERVICES = [
  {
    icon: HardHat,
    name: "Construction Cleaning",
    desc: "Post-construction debris removal and full deep cleans that hand sites back move-in ready.",
  },
  {
    icon: Hotel,
    name: "Hospitality Cleaning",
    desc: "Hotels, resorts, and event spaces kept guest-ready around the clock.",
  },
  {
    icon: Briefcase,
    name: "Office Cleaning",
    desc: "Daily, weekly, or monthly office maintenance tailored to your team's schedule.",
  },
  {
    icon: Sparkles,
    name: "Janitorial Services",
    desc: "Ongoing facility upkeep, restroom care, and stocked supplies you never have to think about.",
  },
  {
    icon: GraduationCap,
    name: "Schools",
    desc: "Safe, child-friendly cleaning protocols for classrooms, cafeterias, and shared spaces.",
  },
  {
    icon: Landmark,
    name: "Government Buildings",
    desc: "Compliant, security-aware cleaning for public, municipal, and federal facilities.",
  },
  {
    icon: Stethoscope,
    name: "Medical Facilities",
    desc: "Hospital-grade sanitization and infection control performed by trained specialists.",
  },
  {
    icon: Dumbbell,
    name: "Gyms & Fitness Centers",
    desc: "High-touch surface disinfection and floor care that members can see and smell.",
  },
  {
    icon: Wrench,
    name: "Other Services",
    desc: "Custom cleaning and contracting solutions built around your facility's unique needs.",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services", dropdown: true },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact Us", href: "#contact" },
];

function useFadeUp() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCounter(target: number, start: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
}

function Index() {
  useFadeUp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsIn, setStatsIn] = useState(false);
  useEffect(() => {
    if (!statsRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStatsIn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(statsRef.current);
    return () => io.disconnect();
  }, []);

  const clients = useCounter(500, statsIn);
  const years = useCounter(10, statsIn);
  const satisfaction = useCounter(98, statsIn);

  const scrollTo = (href: string) => {
    setOpen(false);
    setServicesOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="home" className="min-h-screen bg-white text-[color:var(--foreground)]">
      {/* NAV */}
      <header className="absolute inset-x-0 top-0 z-50 bg-white shadow-[0_1px_0_rgba(10,22,40,0.08)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#home");
            }}
            className="flex items-center"
          >
            <img src={logoUrl} alt="Rangers Cleaning and Contracting" className="h-20 w-auto sm:h-24 lg:h-28" />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) =>
              l.dropdown ? (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-[color:var(--primary)] transition hover:text-[color:var(--primary)]/70"
                  >
                    {l.label} <ChevronDown className="h-4 w-4" />
                  </button>
                  {servicesOpen && (
                    <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
                      <div className="overflow-hidden rounded-md border border-[color:var(--border)] bg-white shadow-xl">
                        {SERVICES.map((s) => (
                          <button
                            key={s.name}
                            onClick={() => scrollTo("#services")}
                            className="flex w-full items-center gap-3 border-b border-[color:var(--border)] px-4 py-3 text-left text-sm font-medium text-[color:var(--primary)] last:border-b-0 hover:bg-[color:var(--secondary)] hover:text-[color:var(--primary)]"
                          >
                            <s.icon className="h-4 w-4 text-[color:var(--accent)]" />
                            {s.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="text-sm font-semibold uppercase tracking-wide text-[color:var(--primary)] transition hover:text-[color:var(--primary)]/70"
                >
                  {l.label}
                </button>
              ),
            )}
            <button
              onClick={() => scrollTo("#contact")}
              className="rounded-md bg-[color:var(--accent)] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-[color:var(--primary)] shadow-sm transition hover:brightness-95"
            >
              Get a Free Quote
            </button>
          </nav>

          <button
            className="rounded-md p-2 text-[color:var(--primary)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-[color:var(--border)] bg-white lg:hidden">
            <div className="space-y-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="block w-full rounded-md px-3 py-2.5 text-left text-base font-semibold uppercase tracking-wide text-[color:var(--primary)] hover:bg-[color:var(--secondary)]"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="mt-2 w-full rounded-md bg-[color:var(--accent)] px-5 py-3 text-base font-bold uppercase tracking-wide text-[color:var(--primary)]"
              >
                Get a Free Quote
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Rangers commercial cleaning crew at work"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0A1628]/70 via-[#0A1628]/20 to-transparent" />

        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:pt-40">
          <div className="max-w-3xl">
            <span className="fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
              Serving Indianapolis And The Surrounding Areas
            </span>
            <h1 className="fade-up mt-6 font-display text-5xl font-bold uppercase leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Residential &amp; Commercial
              <br />
              <span className="text-[#24A2D9]">Janitorial Services</span>
            </h1>
            <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("#services")}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#24A2D9] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:brightness-95"
              >
                See Our Services <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--brand-yellow)] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[color:var(--primary)] shadow-lg transition hover:brightness-95"
              >
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="fade-up mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3"
          >
            {[
              { v: `${clients}+`, l: "Clients Served" },
              { v: `${years}+`, l: "Years Experience" },
              { v: `${satisfaction}%`, l: "Satisfaction Rate" },
            ].map((s) => (
              <div key={s.l} className="bg-[#0A1628]/70 px-6 py-7 text-center backdrop-blur">
                <div className="font-display text-4xl font-bold text-[color:var(--accent)] sm:text-5xl">
                  {s.v}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative bg-white py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="fade-up">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--accent)]">
                Who We Are
              </span>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-tight text-[color:var(--primary)] sm:text-5xl">
                Built on trust.
                <br />
                Measured in spotless results.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[color:var(--muted-foreground)] sm:text-lg">
                Rangers Cleaning &amp; Contracting is a fully licensed and insured commercial
                cleaning company serving offices, schools, medical facilities, and government
                buildings. For over a decade we've delivered consistent, hospital-grade results
                with vetted, uniformed crews and protocols built around your facility — not a
                generic checklist.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[color:var(--muted-foreground)] sm:text-lg">
                When you partner with Rangers, you get a dedicated account lead, transparent
                reporting, and a team that treats your space like it's our own.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: BadgeCheck, t: "Licensed & Insured", d: "Bonded, background-checked, and fully covered on every job." },
                  { icon: Leaf, t: "Eco-Friendly Products", d: "Green-Seal certified solutions safe for staff, students, and patients." },
                  { icon: Clock, t: "24/7 Availability", d: "Day porter, overnight, weekends — we work around your operations." },
                ].map((h) => (
                  <div key={h.t} className="flex gap-4">
                    <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-md bg-[color:var(--accent)] text-[color:var(--primary)]">
                      <h.icon className="h-5 w-5" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-display text-lg font-bold uppercase tracking-wide text-[color:var(--primary)]">
                        {h.t}
                      </div>
                      <div className="text-sm text-[color:var(--muted-foreground)]">{h.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up relative">
              <div className="absolute -inset-4 -z-10 rounded-2xl bg-[color:var(--accent)]/30" />
              <img
                src={teamImg}
                alt="Rangers Cleaning team"
                width={1024}
                height={1024}
                loading="lazy"
                className="relative h-full w-full rounded-xl object-cover shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-[color:var(--primary)] px-6 py-5 text-white shadow-2xl sm:block">
                <div className="font-display text-3xl font-bold text-[color:var(--accent)]">10+</div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  Years Serving<br />Commercial Clients
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative bg-[color:var(--secondary)] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="fade-up mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--accent)]">
              What We Do
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase text-[color:var(--primary)] sm:text-5xl">
              Our Services
            </h2>
            <p className="mt-4 text-[color:var(--muted-foreground)]">
              Specialized cleaning programs built for the standards each industry demands.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className="fade-up group relative flex flex-col rounded-xl border border-[color:var(--border)] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 rounded-b-xl bg-[color:var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[color:var(--primary)] text-[color:var(--accent)]">
                  <s.icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-wide text-[color:var(--primary)]">
                  {s.name}
                </h3>
                <p className="mt-2 flex-1 text-sm text-[color:var(--muted-foreground)]">{s.desc}</p>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[color:var(--primary)] transition hover:text-[color:var(--primary)]/70"
                >
                  Learn More <ArrowRight className="h-4 w-4 text-[color:var(--accent)]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative overflow-hidden bg-[color:var(--primary)] py-24 text-white sm:py-32">
        <div className="absolute inset-0 bg-grid-dark opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="fade-up mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--accent)]">
              The Rangers Difference
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase sm:text-5xl">
              Why Choose Us
            </h2>
            <p className="mt-4 text-white/70">
              Four standards we hold ourselves to on every job — no exceptions.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Zap, t: "Fast & Reliable", d: "On-site when scheduled. Every time." },
              { icon: Users, t: "Trained Professionals", d: "Vetted, uniformed, and background-checked." },
              { icon: Leaf, t: "Eco-Friendly", d: "Safer products for people and planet." },
              { icon: Shield, t: "Fully Insured", d: "Bonded and covered for total peace of mind." },
            ].map((f) => (
              <div key={f.t} className="fade-up text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md border border-white/15 bg-white/5">
                  <f.icon className="h-7 w-7 text-[color:var(--accent)]" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-wide">
                  {f.t}
                </h3>
                <p className="mt-2 text-sm text-white/70">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="fade-up mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--accent)]">
              Testimonials
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase text-[color:var(--primary)] sm:text-5xl">
              What Our Clients Say
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                q: "Rangers transformed our facility overnight. Their medical-grade protocols and consistency have made them an extension of our operations team.",
                n: "Dr. Maya Bennett",
                r: "Facilities Director, Riverside Medical Center",
              },
              {
                q: "After three vendors in two years, we finally found a partner that shows up, communicates, and leaves our schools spotless. Parents and staff notice the difference.",
                n: "Robert Tanaka",
                r: "Operations Manager, Westbrook School District",
              },
              {
                q: "Post-construction cleanup on a 60,000 sq ft buildout — finished a day early and exceeded our walkthrough. Rangers is now our exclusive cleaning contractor.",
                n: "Lena Alvarez",
                r: "Project Lead, Halton Commercial Builders",
              },
            ].map((t) => (
              <figure
                key={t.n}
                className="fade-up flex flex-col rounded-xl border border-[color:var(--border)] bg-white p-7 shadow-md"
              >
                <div className="flex gap-1 text-[color:var(--accent)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-[color:var(--foreground)]">
                  "{t.q}"
                </blockquote>
                <figcaption className="mt-6 border-t border-[color:var(--border)] pt-4">
                  <div className="font-display text-base font-bold uppercase tracking-wide text-[color:var(--primary)]">
                    {t.n}
                  </div>
                  <div className="text-sm text-[color:var(--muted-foreground)]">{t.r}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative bg-[color:var(--secondary)] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="fade-up">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--accent)]">
                Get In Touch
              </span>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase text-[color:var(--primary)] sm:text-5xl">
                Request Your Free Quote
              </h2>
              <p className="mt-4 max-w-md text-[color:var(--muted-foreground)]">
                Tell us about your facility and the standard you need to hold. Our team will follow
                up with a tailored cleaning plan and transparent pricing.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  { icon: Phone, l: "Toll-Free", v: "(800) 697-6455", sub: "Available 8am – 6pm", href: "tel:18006976455" },
                  { icon: Phone, l: "Local Number", v: "317-531-2606", href: "tel:3175312606" },
                  { icon: Mail, l: "Email", v: "info@rangerscleaningandcontracting.com", href: "mailto:info@rangerscleaningandcontracting.com" },
                  { icon: MapPin, l: "Serving", v: "Indianapolis, Indiana & Surrounding Areas" },
                ].map((c) => (
                  <div key={c.l} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-[color:var(--primary)] text-[color:var(--accent)]">
                      <c.icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                        {c.l}
                      </div>
                      {c.href ? (
                        <a href={c.href} className="mt-0.5 block font-display text-lg font-semibold text-[color:var(--primary)] hover:text-[#24A2D9] break-all">
                          {c.v}
                        </a>
                      ) : (
                        <div className="mt-0.5 font-display text-lg font-semibold text-[color:var(--primary)]">
                          {c.v}
                        </div>
                      )}
                      {c.sub && (
                        <div className="mt-0.5 text-sm text-[color:var(--muted-foreground)]">{c.sub}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form
              className="fade-up rounded-2xl border border-[color:var(--border)] bg-white p-7 shadow-xl sm:p-9"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks! We'll be in touch within 24 hours.");
                (e.target as HTMLFormElement).reset();
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" required maxLength={100} />
                <Field label="Email" name="email" type="email" required maxLength={255} />
                <Field label="Phone" name="phone" type="tel" maxLength={30} />
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--primary)]">
                    Service Needed
                  </label>
                  <select
                    name="service"
                    required
                    className="h-11 w-full rounded-md border border-[color:var(--border)] bg-white px-3 text-sm text-[color:var(--foreground)] focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/30"
                  >
                    <option value="">Select a service…</option>
                    {SERVICES.map((s) => (
                      <option key={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--primary)]">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  maxLength={1000}
                  placeholder="Tell us about your facility, square footage, and schedule…"
                  className="w-full resize-none rounded-md border border-[color:var(--border)] bg-white px-3 py-2.5 text-sm text-[color:var(--foreground)] focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/30"
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-[color:var(--accent)] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-[color:var(--primary)] shadow-md transition hover:brightness-95"
              >
                Submit Request
              </button>
              <p className="mt-3 text-center text-xs text-[color:var(--muted-foreground)]">
                We typically respond within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-[color:var(--foreground)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-3 lg:px-8">
          <div>
            <div className="flex items-center">
              <img src={logoUrl} alt="Rangers Cleaning & Contracting" className="h-20 w-auto sm:h-24" />
            </div>
            <p className="mt-4 max-w-sm text-sm text-[color:var(--foreground)]/70">
              Professional cleaning. Uncompromising standards. Serving commercial, medical,
              educational, and government facilities since 2015.
            </p>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--primary)]">
              Quick Links
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-[color:var(--foreground)]/80 hover:text-[color:var(--accent)]"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--primary)]">
              Follow Us
            </div>
            <div className="mt-4 flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--border)] bg-[color:var(--muted)] transition hover:bg-[color:var(--accent)] hover:text-[color:var(--primary)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[color:var(--border)]">
          <div className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-[color:var(--foreground)]/60 lg:px-8">
            © 2025 Rangers Cleaning &amp; Contracting. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--primary)]">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        className="h-11 w-full rounded-md border border-[color:var(--border)] bg-white px-3 text-sm text-[color:var(--foreground)] focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/30"
      />
    </div>
  );
}
