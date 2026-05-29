import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoUrl from "@/assets/logo.png";
import {
  Menu,
  X,
  CheckCircle2,
  Star,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import heroImg from "../assets/hero.jpg";
import about1 from "@/assets/about-1.png";
import about2 from "@/assets/about-2.png";
import about3 from "@/assets/about-3.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rangers Cleaning & Contracting | Professional Commercial Cleaning" },
      {
        name: "description",
        content:
          "Rangers Cleaning and Contracting offers convenient janitorial services for homes, offices, schools, medical and government facilities. Licensed and insured.",
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Cleaning Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact Us", href: "#contact" },
];

const SERVICES = [
  {
    img: about1,
    name: "Home Cleaning",
    desc: "Keep your living space fresh and organized with regular or one-time cleaning tailored to your schedule.",
  },
  {
    img: about2,
    name: "Office Cleaning",
    desc: "Maintain a clean, productive workspace that boosts focus and leaves a lasting impression on clients.",
  },
  {
    img: about3,
    name: "Deep Cleaning",
    desc: "Top-to-bottom disinfection and detail work that brings every surface back to like-new condition.",
  },
];

const STEPS = [
  { n: "01", t: "Book Your Service", d: "Easily select your preferred date, time, and cleaning plan through our user-friendly online platform." },
  { n: "02", t: "Confirmation & Preparation", d: "We confirm your booking and prepare all the tools and supplies needed." },
  { n: "03", t: "We Do the Cleaning", d: "Our expert team arrives on time, making your space shine and creating a warm atmosphere." },
  { n: "04", t: "Relax & Enjoy", d: "Sit back, unwind, and experience the comfort of a freshly cleaned home." },
];

const REVIEWS = [
  { q: "Nobody has ever cleaned my place with such attention to detail. The team was friendly, on time, and left my home sparkling!", n: "Falah Maulana" },
  { q: "It's the first time my apartment has felt this fresh. Rangers really exceeded my expectations.", n: "Hanifa Maulana" },
  { q: "They made my move-out cleaning effortless. Everything looked brand new again — totally worth it.", n: "Hanifa Maulana" },
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

function Index() {
  useFadeUp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const bookNow = () => navigate({ to: "/onboarding" });
  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="home" className="min-h-screen bg-[#EDEEF0] text-[color:var(--foreground)]">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {/* HEADER */}
        <header className="rounded-2xl bg-[#0A1628] px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
              className="flex items-center gap-2"
            >
              <img src={logoUrl} alt="Rangers Cleaning" className="h-10 w-auto" />
            </a>

            <nav className="hidden items-center gap-8 lg:flex">
              {NAV.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="text-sm font-medium text-white/80 transition hover:text-white"
                >
                  {l.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTo("#contact")}
                className="hidden rounded-full bg-[#2CADE2] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 sm:inline-flex"
              >
                Contact Us
              </button>
              <button
                className="rounded-md p-2 text-white lg:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {open && (
            <div className="mt-3 space-y-1 border-t border-white/10 pt-3 lg:hidden">
              {NAV.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-white/85 hover:bg-white/10"
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* HERO */}
        <section className="relative mt-4 overflow-hidden rounded-3xl">
          <img src={heroImg} alt="Rangers cleaning crew" className="h-[480px] w-full object-cover sm:h-[560px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end p-6 sm:p-10 lg:p-14">
            <div className="w-full">
              <div className="max-w-xl text-white">
                <h1 className="fade-up font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  Custom commercial<br />cleaning services
                </h1>
                <p className="fade-up mt-4 text-base text-white/85 sm:text-lg">
                  Enjoy a spotless space with our trusted cleaning professionals.<br />
                  Eco-friendly, flexible, and always on time.
                </p>
                <div className="fade-up mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={bookNow}
                    className="rounded-full bg-[#2CADE2] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => scrollTo("#services")}
                    className="rounded-full px-4 py-3 text-sm font-semibold text-white underline-offset-4 hover:underline"
                  >
                    See Our Services
                  </button>
                </div>
              </div>

              <div className="fade-up mt-8 flex items-center gap-3 text-white">
                <div className="flex -space-x-2">
                  {[about1, about2, about3].map((src, i) => (
                    <img key={i} src={src} alt="" className="h-9 w-9 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-[#2CADE2] text-[#2CADE2]" />
                  <span className="font-semibold">4.5</span>
                  <span className="text-white/70">(4,254+ reviews)</span>
                </div>
                <div className="ml-2 hidden text-xs text-white/80 sm:block">
                  Over 500 people have trusted us and left<br />positive reviews. Join them!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="fade-up rounded-3xl bg-white p-7 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EDEEF0] px-3 py-1 text-xs font-medium text-[color:var(--primary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2CADE2]" /> About Us
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold text-[color:var(--primary)] sm:text-4xl">
              Bringing Freshness, Comfort,<br />and Care to Every Home
            </h2>
            <p className="mt-4 text-[color:var(--muted-foreground)]">
              At Rangers Cleaning and Contracting, we go beyond surface cleaning — we bring life back to your space.
              Our dedicated team combines expert care, eco-friendly solutions, and attention to detail to ensure every
              home feels fresh.
            </p>
            <ul className="mt-6 space-y-3 text-[color:var(--primary)]">
              {[
                "Professional & Trusted Team",
                "Eco-Friendly Cleaning Products",
                "Fully Licensed and Insured",
                "Satisfaction Guaranteed",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm font-medium sm:text-base">
                  <CheckCircle2 className="h-5 w-5 flex-none text-[#2CADE2]" />
                  {t}
                </li>
              ))}
            </ul>
            <button
              onClick={() => scrollTo("#services")}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2CADE2] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
            >
              Learn More
            </button>
          </div>
          <div className="fade-up overflow-hidden rounded-3xl">
            <img src={about2} alt="Rangers team in action" className="h-full min-h-[360px] w-full object-cover" />
          </div>
        </section>

        {/* STATS */}
        <section className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { v: "500+", l: "Happy Clients", d: "Trusted by hundreds of homeowners and offices, Rangers delivers spotless results that bring real satisfaction every time." },
            { v: "1,200+", l: "Completed Cleanings", d: "From cozy apartments to large offices, we've successfully completed over a thousand cleaning sessions with consistent quality." },
            { v: "100%", l: "Service Commitment", d: "We take pride in our reliability, attention to detail, and 100% commitment to creating healthier, fresher spaces." },
          ].map((s) => (
            <div key={s.l} className="fade-up rounded-3xl bg-white p-7 sm:p-8">
              <div className="font-display text-4xl font-semibold text-[color:var(--primary)] sm:text-5xl">{s.v}</div>
              <div className="mt-3 font-display text-lg font-semibold text-[color:var(--primary)]">{s.l}</div>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]">{s.d}</p>
            </div>
          ))}
        </section>

        {/* SERVICES */}
        <section id="services" className="mt-4 rounded-3xl bg-white p-7 sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EDEEF0] px-3 py-1 text-xs font-medium text-[color:var(--primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2CADE2]" /> Service
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-3xl font-semibold text-[color:var(--primary)] sm:text-4xl">
              Complete Home and Office Cleaning You Can Trust
            </h2>
          </div>
          <p className="mt-3 max-w-3xl text-[color:var(--muted-foreground)]">
            At Rangers, we provide a full range of cleaning solutions for every space — whether it's your cozy home
            or a busy office. Our goal is to deliver spotless results with care, reliability, and consistency.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.name} className="fade-up group relative overflow-hidden rounded-2xl">
                <img src={s.img} alt={s.name} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-display text-xl font-semibold">{s.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/85">{s.desc}</p>
                  <button
                    onClick={bookNow}
                    className="mt-4 rounded-full bg-[#2CADE2] px-4 py-2 text-xs font-semibold text-white shadow transition hover:brightness-110"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="pricing" className="mt-4 rounded-3xl bg-[#2CADE2] p-7 text-white sm:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-white" /> How It Works
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Simple Steps to a Cleaner Home
          </h2>
          <p className="mt-3 max-w-xl text-white/85">
            Our cleaning process is simple, quick, and reliable — from booking to enjoying your spotless home.
          </p>

          <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {STEPS.map((s) => (
              <div key={s.n} className="fade-up flex gap-5 border-t border-white/25 pt-5">
                <div className="font-display text-2xl font-semibold text-white/90">{s.n}</div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{s.t}</h3>
                  <p className="mt-1 text-sm text-white/85">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="mt-4 rounded-3xl bg-white p-7 sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EDEEF0] px-3 py-1 text-xs font-medium text-[color:var(--primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2CADE2]" /> Testimonial
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold text-[color:var(--primary)] sm:text-4xl">
            Over 500 Positive Reviews
          </h2>
          <p className="mt-3 max-w-2xl text-[color:var(--muted-foreground)]">
            Real stories from happy homeowners who trust Rangers to keep their spaces fresh, spotless, and worry-free.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[about1, about2, about3].map((src, i) => (
                <img key={i} src={src} alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <div className="flex items-center gap-1 text-sm text-[color:var(--primary)]">
              <Star className="h-4 w-4 fill-[#2CADE2] text-[#2CADE2]" />
              <span className="font-semibold">4.5</span>
              <span className="text-[color:var(--muted-foreground)]">(4,234+ reviews)</span>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <figure key={i} className="fade-up rounded-2xl bg-[#F6F7F8] p-6">
                <blockquote className="text-sm leading-relaxed text-[color:var(--primary)]">
                  "{r.q}"
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-[color:var(--border)] pt-4">
                  <div className="flex items-center gap-2">
                    <img src={about1} alt="" className="h-8 w-8 rounded-full object-cover" />
                    <span className="text-sm font-semibold text-[color:var(--primary)]">{r.n}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[color:var(--muted-foreground)]">
                    <Star className="h-3.5 w-3.5 fill-[#F5B935] text-[#F5B935]" /> 5.0
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="relative mt-4 overflow-hidden rounded-3xl">
          <img src={heroImg} alt="" className="h-[380px] w-full object-cover sm:h-[440px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end p-6 sm:p-10 lg:p-14">
            <div className="max-w-xl text-white">
              <h2 className="fade-up font-display text-3xl font-semibold leading-tight sm:text-5xl">
                Let's Bring Freshness<br />Back to Your Home
              </h2>
              <p className="fade-up mt-3 text-white/85">
                Book your trusted cleaning service today and enjoy the comfort of a spotless,
                stress-free space — because every home deserves to feel fresh.
              </p>
              <button onClick={bookNow} className="fade-up mt-5 rounded-full bg-[#2CADE2] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110">
                Book a Cleaning Now
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative mt-4 overflow-hidden rounded-3xl bg-[#0A1628] p-7 text-white sm:p-10">
          <div className="grid gap-10 lg:grid-cols-4">
            <div>
              <img src={logoUrl} alt="Rangers Cleaning & Contracting" className="h-12 w-auto" />
              <p className="mt-3 max-w-xs text-sm text-white/70">
                Crafting meaningful cleaning that blends reliability, care, and lasting freshness.
              </p>
              <div className="mt-4 flex gap-3">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <a key={i} href="#" aria-label="social" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white hover:text-[#0A1628]">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { h: "Navigation", items: ["Home", "Features", "Service", "How it works", "Pricing", "FAQ"] },
              { h: "What we do", items: ["Home Cleaning", "Office Cleaning", "Deep Cleaning", "Move-Out", "Hospitality", "Medical"] },
              { h: "Support", items: ["FAQ", "Contact", "Hire Us", "Licensing & Usage", "Feedback", "Resources"] },
            ].map((col) => (
              <div key={col.h}>
                <div className="font-display text-sm font-semibold uppercase tracking-wider text-white/90">{col.h}</div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {col.items.map((it) => (
                    <li key={it}><a href="#" className="transition hover:text-white">{it}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pointer-events-none mt-12 select-none text-center font-display text-[18vw] font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] sm:text-[14vw]">
            RANGERS
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-white/60 sm:flex-row">
            <div>© 2025 Rangers Cleaning &amp; Contracting. All rights reserved.</div>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Use</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
