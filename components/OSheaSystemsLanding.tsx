import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import PrivacyPolicyContent from "./PrivacyPolicyContent";
import TermsOfServiceContent from "./TermsOfServiceContent";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  Menu,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  ThumbsUp,
  Zap,
  MessageSquare,
  Mail,
  Layers,
  ShieldCheck,
  BarChart3,
  Sparkles,
  Workflow,
  Bot,
  Users,
  CreditCard,
  Star,
  Search,
  Gauge,
  Route,
  Receipt,
  ClipboardCheck,
  Wand2,
  Facebook,
  Building2,
  Info,
  Instagram,
  Linkedin,
  LucideIcon,
  Activity,
  PhoneMissed,
  DollarSign,
  Minus,
  Plus,
} from "lucide-react";

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const roundToHalf = (n: number) => Math.round(n * 2) / 2;

function useOnEscape(handler: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler]);
}

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useInViewOnce(options = { rootMargin: "-10% 0px -10% 0px", threshold: 0.15 }): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        obs.disconnect();
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [seen, options]);

  return [ref, seen];
}

function cx(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const NAV = [
  { label: "Time", href: "#time" },
  { label: "Growth", href: "#growth" },
  { label: "Revenue", href: "#revenue" },
  { label: "Pricing", href: "#pricing" },
  { label: "Calculator", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
];

const CTA_MICROCOPY = "If it's not a good fit, we'll tell you. No pressure.";

interface TierInfo {
  name: string;
  badge: string;
  monthly: number;
  setup: number;
}

const PRICING: Record<string, TierInfo> = {
  bronze: { name: "Bronze", badge: "The Essentials", monthly: 597, setup: 1500 },
  silver: { name: "Silver", badge: "Most Popular", monthly: 1193, setup: 3000 },
  gold: { name: "Gold", badge: "Best Value", monthly: 1551, setup: 5000 },
};

const USAGE: Record<string, { voiceMinutes: number; sms: number; emails: number; seats: string }> = {
  bronze: { voiceMinutes: 300, sms: 200, emails: 30000, seats: "1–5" },
  silver: { voiceMinutes: 1000, sms: 500, emails: 60000, seats: "1–10" },
  gold: { voiceMinutes: 2000, sms: 1000, emails: 100000, seats: "Unlimited" },
};

const OVERAGES = {
  voicePerMinute: 0.35,
  smsPerMessage: 0.8,
  emailPerThousand: 1,
  capPercent: 25,
  alertA: 70,
  alertB: 100,
};

function formatCurrencyAUD(n: number) {
  const v = Number.isFinite(n) ? n : 0;
  return v.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}

function formatNumber(n: number) {
  const v = Number.isFinite(n) ? n : 0;
  return v.toLocaleString("en-AU");
}

function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

function Modal({ open, onClose, title, children }: ModalProps) {
  useOnEscape(() => {
    if (open) onClose();
  });

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          />
          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]"
            initial={{ y: 12, scale: 0.985, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, scale: 0.99, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-4">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-900">{title}</div>
                <div className="text-xs text-slate-600">Booking container</div>
              </div>
              <button
                onClick={onClose}
                className="group inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                aria-label="Close"
              >
                <X className="h-5 w-5 transition-transform duration-200 group-hover:rotate-6" />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function BackgroundAtmosphere() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const ySlower = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const xSlow = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 30]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -inset-[30%] opacity-80"
        style={{
          background:
            "radial-gradient(50% 50% at 20% 20%, rgba(16,185,129,0.18) 0%, rgba(255,255,255,0) 55%), radial-gradient(40% 40% at 80% 10%, rgba(59,130,246,0.14) 0%, rgba(255,255,255,0) 55%), radial-gradient(45% 45% at 70% 75%, rgba(15,23,42,0.06) 0%, rgba(255,255,255,0) 65%)",
        }}
        animate={
          reduce
            ? {}
            : {
              rotate: [0, 2, 0, -2, 0],
              scale: [1, 1.03, 1],
            }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0 opacity-[0.20]"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,23,42,0.08) 0%, rgba(59,130,246,0.05) 22%, rgba(16,185,129,0.06) 48%, rgba(15,23,42,0.08) 76%, rgba(15,23,42,0.06) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(55% 55% at 50% 15%, black 0%, rgba(0,0,0,0.35) 55%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(55% 55% at 50% 15%, black 0%, rgba(0,0,0,0.35) 55%, transparent 75%)",
        }}
        animate={useReducedMotion() ? {} : { backgroundPosition: ["0px 0px", "56px 56px"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-slate-900/[0.03] blur-2xl"
        style={{ y: ySlower, x: xSlow }}
      />
      <motion.div
        className="absolute -top-10 right-[-80px] h-80 w-80 rounded-full bg-blue-500/[0.06] blur-3xl"
        style={{ y: ySlow }}
      />
      <motion.div
        className="absolute -bottom-28 left-[18%] h-96 w-96 rounded-full bg-emerald-500/[0.06] blur-3xl"
        style={{ y: ySlower }}
      />

      <div className="absolute inset-0 opacity-[0.22]">
        {Array.from({ length: 18 }).map((_, i) => {
          const size = 2 + (i % 3);
          const top = (i * 97) % 100;
          const left = (i * 61) % 100;
          const delay = (i % 7) * 0.9;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-slate-900/30"
              style={{ width: size, height: size, top: `${top}%`, left: `${left}%` }}
              animate={reduce ? {} : { y: [0, -18, 0], x: [0, 10, 0], opacity: [0.1, 0.22, 0.1] }}
              transition={{ duration: 12 + (i % 5) * 2, repeat: Infinity, ease: "easeInOut", delay }}
            />
          );
        })}
      </div>
    </div>
  );
}

interface SectionProps {
  id: string;
  children?: React.ReactNode;
  className?: string;
}

function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={cx("relative scroll-mt-24", className)}>
      {children}
    </section>
  );
}

interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}

function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  const [ref, seen] = useInViewOnce();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={seen || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  href?: string;
  variant?: "primary" | "secondary" | "link";
  className?: string;
  iconRight?: React.ReactNode;
}

function Button({ children, onClick, href, variant = "primary", className, iconRight, ...rest }: ButtonProps) {
  const base =
    "relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/60";
  const primary =
    "bg-emerald-600 text-white shadow-[0_14px_40px_-18px_rgba(16,185,129,0.55)] hover:bg-emerald-700";
  const secondary =
    "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.20)]";
  const linky =
    "bg-transparent text-slate-900 hover:text-slate-950 px-0 py-0 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500 focus:ring-0";

  const beam =
    variant === "primary"
      ? "before:absolute before:inset-0 before:rounded-xl before:bg-[linear-gradient(90deg,rgba(59,130,246,0.0),rgba(59,130,246,0.30),rgba(16,185,129,0.25),rgba(59,130,246,0.0))] before:opacity-0 before:blur-lg before:transition before:duration-500 hover:before:opacity-100"
      : "";

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => (onClick ? (e.preventDefault(), onClick()) : null)}
        className={cx(
          base,
          variant === "primary" ? primary : variant === "secondary" ? secondary : linky,
          beam,
          className
        )}
      >
        <span className="relative z-[1]">{children}</span>
        {iconRight ? <span className="relative z-[1]">{iconRight}</span> : null}
      </a>
    )
  }

  return (
    <button
      {...rest}
      onClick={onClick}
      className={cx(
        base,
        variant === "primary" ? primary : variant === "secondary" ? secondary : linky,
        beam,
        className
      )}
    >
      <span className="relative z-[1]">{children}</span>
      {iconRight ? <span className="relative z-[1]">{iconRight}</span> : null}
    </button>
  );
}

function NavBar({ onOpenModal }: { onOpenModal: () => void }) {
  const scrolled = useScrolled(14);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="fixed inset-x-4 top-4 z-[70]">
      <div
        className={cx(
          "mx-auto max-w-7xl transition-all duration-300"
        )}
      >
        <div
          className={cx(
            "relative flex items-center justify-between rounded-2xl border transition-all duration-300",
            scrolled
              ? "border-slate-200/70 bg-white/90 backdrop-blur-xl shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)]"
              : "border-transparent bg-transparent"
          )}
        >
          {/* ✅ text-only brand (no square icon container) */}
          <div className={cx("flex items-center gap-3 pl-4", scrolled ? "py-3" : "py-4")}>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-slate-900">O’Shea Systems</div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                built better by
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-6 pr-4 lg:flex">
            <nav className="flex items-center gap-5 text-sm text-slate-700">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative cursor-pointer font-medium transition-colors duration-200 hover:text-slate-900"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(item.href);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={() => scrollToId("#calculator")}
                className="px-4 py-2 text-sm"
              >
                Run Calculator
              </Button>
              <Button
                variant="primary"
                onClick={onOpenModal}
                className="px-4 py-2 text-sm"
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                Book a Discovery Call
              </Button>
            </div>
          </div>

          <div className={cx("flex items-center gap-2 pr-3 lg:hidden", scrolled ? "py-2" : "py-3")}>
            <Button
              variant="primary"
              onClick={onOpenModal}
              className="px-3 py-2 text-sm"
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Book
            </Button>
            <button
              className="group inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-800 shadow-[0_12px_28px_-20px_rgba(15,23,42,0.25)] transition-colors duration-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
              aria-label="Open menu"
              onClick={() => setOpen((s) => !s)}
            >
              <Menu className="h-5 w-5 transition-transform group-hover:rotate-3" />
            </button>
          </div>

          <AnimatePresence>
            {open ? (
              <motion.div
                className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_22px_70px_-35px_rgba(15,23,42,0.45)] lg:hidden"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24 }}
              >
                <div className="p-3">
                  <div className="grid grid-cols-2 gap-2">
                    {NAV.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition-colors duration-200 hover:bg-slate-50"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpen(false);
                          scrollToId(item.href);
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => (setOpen(false), scrollToId("#calculator"))}
                      className="w-full"
                    >
                      Run Calculator
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => (setOpen(false), onOpenModal())}
                      className="w-full"
                      iconRight={<ArrowRight className="h-4 w-4" />}
                    >
                      Book a Discovery Call
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function CursorSpotlight({ className, children }: { className?: string, children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
    };
    const onLeave = () => setPos((p) => ({ ...p, active: false }));
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={cx("relative", className)}>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: pos.active ? 1 : 0,
          background: `radial-gradient(280px 280px at ${pos.x}px ${pos.y}px, rgba(59,130,246,0.10), rgba(16,185,129,0.08), rgba(255,255,255,0) 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  children?: React.ReactNode;
  icon: LucideIcon;
  highlight?: boolean;
  className?: string;
}

function InfoCard({ title, children, icon: Icon, highlight = false, className }: InfoCardProps) {
  return (
    <div
      className={cx(
        "group relative cursor-pointer overflow-hidden rounded-2xl border bg-white p-5 shadow-[0_18px_55px_-40px_rgba(15,23,42,0.45)] transition-all duration-200",
        "hover:-translate-y-[2px] hover:shadow-[0_26px_80px_-50px_rgba(15,23,42,0.55)]",
        highlight ? "border-slate-900/10" : "border-slate-200/70",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white">
          <Icon className="h-5 w-5 text-slate-900 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-[1.03]" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          <div className="mt-2 text-sm leading-relaxed text-slate-700">{children}</div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -right-24 top-10 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      </div>
    </div>
  );
}

function DividerGlow() {
  const reduce = useReducedMotion();
  return (
    <div className="relative my-14 sm:my-16">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent" />
      <motion.div
        className="absolute inset-x-0 -top-1 h-[3px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent blur"
        animate={reduce ? {} : { opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function MetricPill({ icon: Icon, label, value, emphasize = false }: { icon: LucideIcon, label: string, value: string | number, emphasize?: boolean }) {
  return (
    <div
      className={cx(
        "group flex cursor-pointer items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-[0_14px_45px_-35px_rgba(15,23,42,0.40)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_22px_65px_-45px_rgba(15,23,42,0.55)]",
        emphasize ? "border-slate-900/15 ring-1 ring-blue-600/10" : "border-slate-200/70"
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white">
        <Icon className="h-5 w-5 text-slate-900 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-[1.03]" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">{label}</div>
        <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
      </div>
    </div>
  );
}

function SLAChip({ color }: { color: string }) {
  const map: Record<string, string> = {
    black: "bg-slate-900",
    red: "bg-red-500",
    orange: "bg-orange-500",
    green: "bg-emerald-500",
  };
  return <span className={cx("inline-flex h-2.5 w-2.5 rounded-full", map[color] || "bg-slate-400")} />;
}

function ValueUnlockedGraphic() {
  return (
    <div className="w-full h-full bg-slate-50/50 flex items-center justify-center p-6 select-none rounded-2xl">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] overflow-hidden border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-300/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-300/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-300/80"></div>
          </div>
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Live Metrics</div>
        </div>

        <div className="space-y-4">
          {/* Speed to lead */}
          <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/50 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Speed to Lead</div>
              <div className="text-3xl font-bold text-emerald-500">45 sec</div>
            </div>
            <div className="text-emerald-400">
              <Activity className="w-10 h-10" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Conversion */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Conversion</div>
              <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                <span className="text-2xl font-bold text-slate-700">73%</span>
                <span className="text-[10px] font-bold text-emerald-500 flex items-center">
                  ▲ 12%
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-500 w-[73%] rounded-full"></div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Reviews</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-slate-700">4.9</span>
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-slate-400 border-2 border-white"></div>
              </div>
            </div>
          </div>

          {/* New Metrics Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Admin Saved */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Admin Saved</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold text-slate-700">12h</span>
                <Clock className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-[10px] text-slate-400">This week</div>
            </div>

            {/* Response Rate */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Response Rate</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold text-slate-700">98%</span>
                <Zap className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-[10px] text-slate-400">In &lt; 5 mins</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ValueUnlockedPanel() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -18]);

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_26px_90px_-60px_rgba(15,23,42,0.60)]"
      style={{ y }}
    >
      {/* frosted overlay treatment */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.60]"
          style={{
            background:
              "radial-gradient(900px 420px at 18% 25%, rgba(59,130,246,0.14), rgba(255,255,255,0) 60%), radial-gradient(800px 360px at 85% 25%, rgba(16,185,129,0.12), rgba(255,255,255,0) 60%)",
          }}
        />
        <div className="absolute inset-0 bg-white/35 backdrop-blur-[6px]" />
        <motion.div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.12) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(60% 60% at 50% 45%, black 0%, rgba(0,0,0,0.25) 60%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(60% 60% at 50% 45%, black 0%, rgba(0,0,0,0.25) 60%, transparent 80%)",
          }}
          animate={reduce ? {} : { backgroundPosition: ["0px 0px", "56px 56px"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xl font-semibold tracking-tight text-slate-950">Value unlocked with automation</div>
            <div className="mt-2 text-sm text-slate-700">
              A quick snapshot of what improves when speed and follow-up become automatic.
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <BarChart3 className="h-5 w-5 text-slate-900" />
          </div>
        </div>

        <div className="mt-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_55px_-45px_rgba(15,23,42,0.45)]">
            <ValueUnlockedGraphic />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StepperInput({ value, onChange, min, max, step, ariaLabel }: { value: number; onChange: (v: number) => void; min: number; max: number; step: number; ariaLabel: string }) {
  const handleDec = () => onChange(roundToHalf(Math.max(min, value - step)));
  const handleInc = () => onChange(roundToHalf(Math.min(max, value + step)));

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleDec}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={value <= min}
        aria-label={`Decrease ${ariaLabel}`}
      >
        <Minus className="h-4 w-4" />
      </button>
      <div className="w-12 text-center text-sm font-semibold text-slate-900">{value}</div>
      <button
        onClick={handleInc}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={value >= max}
        aria-label={`Increase ${ariaLabel}`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function PricingCard({
  tierKey,
  billing,
  onOpenModal,
  emphasized,
  usageOpen,
  onToggleUsage,
}: {
  tierKey: string;
  billing: string;
  onOpenModal: () => void;
  emphasized: boolean;
  usageOpen: boolean;
  onToggleUsage: () => void;
}) {
  const tier = PRICING[tierKey];
  const usage = USAGE[tierKey];

  let monthlyPrice = tier.monthly;
  let billingText = "Billed monthly";

  if (billing === "Quarterly") {
    // Pay 11 get 12 => price for 12 months is 11 * monthly
    // Billed quarterly means total/4 per quarter? Or 11/4 * monthly?
    // Let's assume standard "Pay for 11 months over the year" logic.
    // Yearly Cost = 11 * monthly
    // Quarterly Payment = Yearly Cost / 4
    const yearly = tier.monthly * 11;
    const quarterly = yearly / 4;
    // Show equivalent monthly for comparison or actual?
    // Usually pricing shows monthly equivalent.
    monthlyPrice = yearly / 12;
    billingText = `Billed ${formatCurrencyAUD(quarterly)} quarterly`;
  } else if (billing === "Annual") {
    // Pay 10 get 12
    const yearly = tier.monthly * 10;
    monthlyPrice = yearly / 12;
    billingText = `Billed ${formatCurrencyAUD(yearly)} yearly`;
  }

  return (
    <div
      className={cx(
        "relative flex flex-col rounded-3xl border bg-white p-6 shadow-sm transition-all duration-200",
        emphasized
          ? "border-emerald-500 ring-4 ring-emerald-500/10 scale-[1.02] z-10"
          : "border-slate-200/70 hover:border-slate-300"
      )}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="text-sm font-semibold text-slate-500">{tier.badge}</div>
        <div className="mt-1 text-2xl font-bold text-slate-900">{tier.name}</div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-slate-900">{formatCurrencyAUD(monthlyPrice)}</span>
          <span className="text-sm font-medium text-slate-600">/mo</span>
        </div>
        <div className="mt-1 text-xs text-slate-500">{billingText}</div>
        <div className="mt-1 text-xs text-slate-400">+ ${formatNumber(tier.setup)} setup</div>
      </div>

      {/* Button */}
      <Button
        variant={emphasized ? "primary" : "secondary"}
        onClick={onOpenModal}
        className="w-full justify-center"
      >
        Get Started
      </Button>

      {/* Features / Usage Toggle */}
      <div className="mt-6 flex-1">
        <button
          onClick={onToggleUsage}
          className="flex w-full cursor-pointer items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors duration-200 hover:text-slate-800"
        >
          <span>Includes</span>
          {usageOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        <AnimatePresence>
          {(usageOpen || emphasized) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-3 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Voice Minutes</span>
                  <span className="font-semibold">{formatNumber(usage.voiceMinutes)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SMS Segments</span>
                  <span className="font-semibold">{formatNumber(usage.sms)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Emails</span>
                  <span className="font-semibold">{formatNumber(usage.emails)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Users</span>
                  <span className="font-semibold">{usage.seats}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ComparisonTable({ open }: { open: boolean }) {
  const tableData = [
    {
      feature: "Pricing (GST incl.)",
      bronze: "Setup $1,500 | $597/mo",
      silver: "Setup $3,000 | $1,193/mo",
      gold: "Setup $5,000 | $1,551/mo",
    },
    {
      feature: "Best for",
      bronze: "Never missing another job",
      silver: "Closing bottlenecks, gaining more revenue",
      gold: "High volume + scaling",
    },
    {
      feature: "AI Voice Agent",
      bronze: "Inbound only (answers + qualifies + books)",
      silver: "Inbound + outbound (warm follow-up SDR)",
      gold: "Inbound + outbound (warm follow-up SDR)",
    },
    {
      feature: "Booking & scheduling",
      bronze: "Included",
      silver: "Included",
      gold: "Advanced Routing",
    },
    {
      feature: "CRM",
      bronze: "Basic pipeline",
      silver: "Advanced automations + reporting",
      gold: "Dashboards + deeper analytics",
    },
    {
      feature: "Growth automations",
      bronze: "Speed to lead under 5 minutes.",
      silver: "Reviews (request + follow-up)",
      gold: "Automated social platforms",
    },
    {
      feature: "Admin automations",
      bronze: "Quoting",
      silver: "Payment chasing + invoicing",
      gold: "Compliance certs, ordering, and inventory",
    },
    {
      feature: "Lead automations",
      bronze: "Scoped separately",
      silver: "Warm outreach",
      gold: "Marketing campaigns",
    },
    {
      feature: "CRM seats included",
      bronze: "1–5 included",
      silver: "1–10 included",
      gold: "Unlimited included",
    },
    {
      feature: "Included monthly usage",
      bronze: "300 AI voice mins | 200 SMS | 30k emails",
      silver: "1,000 AI voice mins | 500 SMS | 60k emails",
      gold: "2,000 AI voice mins | 1,000 SMS | 100k emails",
    },
    {
      feature: "Overages (up to +25%)",
      bronze: "$0.35/min | $0.80/SMS | $1/1,000 emails",
      silver: "$0.35/min | $0.80/SMS | $1/1,000 emails",
      gold: "$0.35/min | $0.80/SMS | $1/1,000 emails",
    },
    {
      feature: "Guarantee + onboarding capacity",
      bronze: "30-day optimisation. Monthly onboarding slots: 5 clients",
      silver: "30-day optimisation. Monthly onboarding slots: 5 clients",
      gold: "30-day optimisation. Monthly onboarding slots: 5 clients",
    },
    {
      feature: "Support priority",
      bronze: "Standard queue",
      silver: "Priority queue",
      gold: "VIP priority",
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-semibold text-slate-900 w-1/4">What you get</th>
                  <th className="p-4 font-semibold text-slate-900 w-1/4">Bronze (The Essentials)</th>
                  <th className="p-4 font-semibold text-slate-900 w-1/4">Silver (Most Popular)</th>
                  <th className="p-4 font-semibold text-slate-900 w-1/4">Gold (Best Value)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-900 align-top">{row.feature}</td>
                    <td className="p-4 text-slate-700 align-top whitespace-pre-line">{row.bronze}</td>
                    <td className="p-4 text-slate-700 align-top whitespace-pre-line">{row.silver}</td>
                    <td className="p-4 text-slate-700 align-top whitespace-pre-line">{row.gold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-5 text-xs text-slate-600 space-y-2 bg-slate-50 border-t border-slate-200">
              <div className="font-semibold text-slate-900 mb-2">Clarity notes:</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>“AI voice mins” = total call minutes (billed by the millisecond), handled by the AI voice agent (inbound/outbound, depending on tier).</li>
                <li>SMS + email usage covers automated notifications & follow-ups sent via your system(s).</li>
                <li>Usage alerts at 70% and 100%.</li>
                <li>Support tickets: Black 24h; Red 24–48h; Orange 48–96h; Green 5+ business days.</li>
                <li>Billing: monthly (min 1 month); quarterly pay 11 get 12; annual pay 10 get 12.</li>
                <li>Multi-location supported; complex multi-site operations are quoted separately.</li>
                <li>Extra automations available on request (quoted separately).</li>
                <li>Looking for a website/upgrade to your current one? Enquire now.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Accordion({
  items,
  defaultOpenIndex = -1,
}: {
  items: { title: string; content: string }[];
  defaultOpenIndex?: number;
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  return (
    <div className="space-y-2">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="flex w-full cursor-pointer items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-slate-50"
            >
              <span className="text-base font-semibold text-slate-900">{item.title}</span>
              <ChevronDown
                className={cx("h-5 w-5 text-slate-500 transition-transform duration-300", isOpen && "rotate-180")}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="border-t border-slate-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-700">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/g6Gy7i5fbQ3yU98pjew0/webhook-trigger/25499a4e-6fd6-4a79-a4b2-807e048f46b3";

interface DiscoveryFormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  reason: string;
}

function DiscoveryCallForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<DiscoveryFormData>({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    reason: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof DiscoveryFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const validate = (): boolean => {
    const next: Partial<Record<keyof DiscoveryFormData, string>> = {};
    if (!form.businessName.trim()) next.businessName = "Business name is required";
    if (!form.contactName.trim()) next.contactName = "Your name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    else if (!/^[\d\s\-+()]{6,20}$/.test(form.phone)) next.phone = "Please enter a valid phone number";
    if (!form.reason.trim()) next.reason = "Please let us know why you're enquiring";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field: keyof DiscoveryFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setSubmitError("");

    try {
      const payload = new URLSearchParams({
        business_name: form.businessName.trim(),
        contact_name: form.contactName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        reason: form.reason.trim(),
        source: "osheasystems.com.au – Discovery Call Form",
        submitted_at: new Date().toISOString(),
      });

      await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setSubmitError("Something went wrong. Please try again or call us directly.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        className="flex flex-col items-center py-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
        >
          <CheckCircle className="h-8 w-8 text-emerald-600" />
        </motion.div>
        <h3 className="mt-5 text-lg font-semibold text-slate-900">Thank you!</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Your enquiry has been received. We'll review the details and get back to you within one
          business day.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
            setForm({ businessName: "", contactName: "", email: "", phone: "", reason: "" });
            onSuccess();
          }}
        >
          Close
        </Button>
      </motion.div>
    );
  }

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-500";
  const inputOk = "border-slate-200 hover:border-slate-300";
  const inputErr = "border-red-300 ring-1 ring-red-300/40";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <p className="text-sm text-slate-600 leading-relaxed">
        Fill out the form below and we'll be in touch within one business day to discuss how we can help your business.
      </p>

      {/* Business Name */}
      <div>
        <label htmlFor="disc-business" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
          Business Name
        </label>
        <input
          id="disc-business"
          type="text"
          placeholder="e.g. Smith Plumbing"
          value={form.businessName}
          onChange={handleChange("businessName")}
          className={cx(inputBase, errors.businessName ? inputErr : inputOk)}
        />
        {errors.businessName && <p className="mt-1 text-xs text-red-500">{errors.businessName}</p>}
      </div>

      {/* Contact Name */}
      <div>
        <label htmlFor="disc-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
          Your Name
        </label>
        <input
          id="disc-name"
          type="text"
          placeholder="e.g. John Smith"
          value={form.contactName}
          onChange={handleChange("contactName")}
          className={cx(inputBase, errors.contactName ? inputErr : inputOk)}
        />
        {errors.contactName && <p className="mt-1 text-xs text-red-500">{errors.contactName}</p>}
      </div>

      {/* Email & Phone row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="disc-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
            Email Address
          </label>
          <input
            id="disc-email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange("email")}
            className={cx(inputBase, errors.email ? inputErr : inputOk)}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="disc-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
            Phone Number
          </label>
          <input
            id="disc-phone"
            type="tel"
            placeholder="04XX XXX XXX"
            value={form.phone}
            onChange={handleChange("phone")}
            className={cx(inputBase, errors.phone ? inputErr : inputOk)}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      {/* Reason */}
      <div>
        <label htmlFor="disc-reason" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
          Reason for Enquiry
        </label>
        <textarea
          id="disc-reason"
          rows={4}
          placeholder="Tell us a bit about what you're looking for…"
          value={form.reason}
          onChange={handleChange("reason")}
          className={cx(inputBase, "resize-none", errors.reason ? inputErr : inputOk)}
        />
        {errors.reason && <p className="mt-1 text-xs text-red-500">{errors.reason}</p>}
      </div>

      {submitError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {submitError}
        </div>
      )}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
          {CTA_MICROCOPY}
        </p>
        <Button
          variant="primary"
          className={cx("sm:w-auto w-full", status === "submitting" && "opacity-70 pointer-events-none")}
          iconRight={
            status === "submitting" ? (
              <motion.div
                className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )
          }
        >
          {status === "submitting" ? "Sending…" : "Submit Enquiry"}
        </Button>
      </div>
    </form>
  );
}


function OSheaSystemsLanding() {
  const reduce = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const [billing, setBilling] = useState("Monthly");
  const [usageOpen, setUsageOpen] = useState({ bronze: false, silver: false, gold: false });
  const [tableOpen, setTableOpen] = useState(false);

  const [hourlyRate, setHourlyRate] = useState(85);

  const defaultTasks = useMemo(
    () => [
      { key: "calls", label: "Answering calls and capturing enquiries", hours: 1.5 },
      { key: "followup", label: "Following up quotes and past enquiries", hours: 2 },
      { key: "scheduling", label: "Booking and scheduling changes", hours: 1 },
      { key: "reminders", label: "No-show prevention reminders", hours: 1 },
      { key: "crm", label: "Updating the CRM pipeline", hours: 1.5 },
      { key: "invoices", label: "Invoicing and payment chasing", hours: 2 },
      { key: "reviews", label: "Review requests and follow-up", hours: 1 },
      { key: "admin", label: "Admin handover and job completion notes", hours: 1.5 },
    ],
    []
  );

  const [tasks, setTasks] = useState(defaultTasks);

  const totals = useMemo(() => {
    const weeklyCurrent = tasks.reduce((sum, t) => sum + (Number.isFinite(t.hours) ? t.hours : 0), 0);
    const weeklyAfter = weeklyCurrent * 0.2;
    const weeklySaved = weeklyCurrent - weeklyAfter;
    const monthlySavedHours = weeklySaved * 4.3333333333;
    const yearlySavedHours = weeklySaved * 52;
    const monthlyValue = monthlySavedHours * hourlyRate;
    const yearlyValue = yearlySavedHours * hourlyRate;

    return { weeklyCurrent, weeklyAfter, weeklySaved, monthlySavedHours, yearlySavedHours, monthlyValue, yearlyValue };
  }, [tasks, hourlyRate]);

  const onOpenModal = () => setModalOpen(true);
  const onCloseModal = () => setModalOpen(false);

  const onOpenPrivacy = useCallback(() => setPrivacyOpen(true), []);
  const onClosePrivacy = useCallback(() => setPrivacyOpen(false), []);
  const onOpenTerms = useCallback(() => setTermsOpen(true), []);
  const onCloseTerms = useCallback(() => setTermsOpen(false), []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (privacyOpen || termsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [privacyOpen, termsOpen]);

  const billingOptions = ["Monthly", "Quarterly", "Annual"];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="relative">
        <BackgroundAtmosphere />
        <NavBar onOpenModal={onOpenModal} />

        {/* HERO (centered, no diagram) */}
        <div className="relative mx-auto max-w-7xl px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
          <CursorSpotlight className="rounded-[28px]">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal delay={0.0}>
                <div className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
                  30-Day Optimisation Guarantee
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl leading-[1.03]">
                  <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-900 bg-clip-text text-transparent">
                    Your best leads don’t wait.
                  </span>{" "}
                  <span className="text-slate-950">Neither should your systems.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-700 sm:text-lg">
                  Done-for-you automations for Melbourne service businesses that answer calls, capture leads, follow up quotes, reduce no-shows, and chase payments — without hiring more admin.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                  <Button variant="primary" onClick={onOpenModal} className="sm:w-auto w-full" iconRight={<ArrowRight className="h-4 w-4" />}>
                    Book a Discovery Call
                  </Button>
                  <Button variant="secondary" onClick={() => scrollToId("#calculator")} className="sm:w-auto w-full">
                    Run Calculator
                  </Button>
                </div>
                <div className="mt-2 text-sm text-slate-700">{CTA_MICROCOPY}</div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-slate-200/70 bg-white p-4 text-left shadow-[0_18px_55px_-45px_rgba(15,23,42,0.45)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white">
                      <ShieldCheck className="h-5 w-5 text-slate-900" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900">
                        30-Day Optimisation Guarantee: If your system isn’t saving time and driving bookings within 30 days, we waive the recurring fee until it is.
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </CursorSpotlight>

          <DividerGlow />
        </div>

        {/* PROOF STRIP BAND (separate band so nothing peeks) */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
                Why you should care
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <InfoCard title="100× higher contact odds" icon={Gauge} className="p-6">
                <div className="space-y-2">
                  <div>Responding fast is the easiest conversion lever.</div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                    “The odds of contacting a lead in 5 minutes vs 30 minutes drop by ~100×.”
                    <span className="ml-1 text-slate-600">— Lead Response Management Study (MIT/InsideSales)</span>
                  </div>
                </div>
              </InfoCard>

              <InfoCard title="85% won’t call twice" icon={Phone} className="p-6">
                <div className="space-y-2">
                  <div>Missed calls quietly become missed jobs.</div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                    “Many callers won’t try again after an unanswered call.”
                    <span className="ml-1 text-slate-600">— Industry call handling research</span>
                  </div>
                </div>
              </InfoCard>

              <InfoCard title="No-shows fall with reminders" icon={MessageSquare} highlight className="p-6">
                <div className="space-y-2">
                  <div>Simple reminders protect your schedule and travel.</div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                    “Electronic notifications reduce no-shows across settings.”
                    <span className="ml-1 text-slate-600">— BMJ Open systematic review/meta-analysis</span>
                  </div>
                </div>
              </InfoCard>
            </div>
          </Reveal>

          <DividerGlow />
        </div>

        {/* STATE OF CUSTOMER + PAIN (eyebrow removed) */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
                    You’re not lazy. You’re overloaded.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                    Most service businesses don’t struggle with demand — they struggle with everything that comes after the enquiry.
                  </p>

                  <div className="mt-6 space-y-4">
                    {[
                      "Phone rings while you’re on the tools → missed jobs",
                      "Quotes go out → follow-up slips → leads go cold",
                      "You get home → admin → your night disappears",
                      "Growth plans → “when things slow down” (they don’t)",
                    ].map((t, idx) => (
                      <motion.div
                        key={idx}
                        className="relative rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_18px_55px_-45px_rgba(15,23,42,0.45)]"
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        animate={reduce ? {} : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.05 * idx, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="text-sm font-medium text-slate-900">{t}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-900/10 bg-slate-900/[0.02] p-4">
                    <div className="text-sm font-semibold text-slate-950">
                      You don’t need more leads. You need a system that converts the leads you already get.
                    </div>
                  </div>

                  <div className="mt-6 relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_26px_90px_-60px_rgba(15,23,42,0.55)]">
                    <div className="absolute inset-0">
                      <div
                        className="absolute inset-0 opacity-[0.65]"
                        style={{
                          background:
                            "radial-gradient(900px 360px at 15% 30%, rgba(16,185,129,0.16), rgba(255,255,255,0) 60%), radial-gradient(800px 320px at 85% 35%, rgba(59,130,246,0.16), rgba(255,255,255,0) 62%)",
                        }}
                      />
                      <div
                        className="absolute inset-0 opacity-[0.16]"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(15,23,42,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.12) 1px, transparent 1px)",
                          backgroundSize: "56px 56px",
                          maskImage:
                            "radial-gradient(60% 60% at 50% 40%, black 0%, rgba(0,0,0,0.28) 60%, transparent 80%)",
                          WebkitMaskImage:
                            "radial-gradient(60% 60% at 50% 40%, black 0%, rgba(0,0,0,0.28) 60%, transparent 80%)",
                        }}
                      />
                    </div>
                    <div className="relative">
                      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <MetricPill icon={Gauge} label="Speed to lead" value="Under five minutes" emphasize />
                        <MetricPill icon={ClipboardCheck} label="Follow-up" value="Consistent sequences" />
                        <MetricPill icon={Calendar} label="Scheduling" value="Calm calendar control" />
                        <MetricPill icon={Receipt} label="Payments" value="Faster money in the bank" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="sticky top-28 space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <InfoCard title="Wasted time" icon={Clock} highlight>
                      <div className="space-y-2">
                        <div><span className="font-semibold text-slate-900">Symptom:</span> The day ends and the admin starts.</div>
                        <div><span className="font-semibold text-slate-900">Cost:</span> Hours disappear into follow-up and scheduling.</div>
                        <div><span className="font-semibold text-slate-900">Outcome promise:</span> Workflows carry the load without you babysitting them.</div>
                      </div>
                    </InfoCard>

                    <InfoCard title="Stagnant growth" icon={BarChart3}>
                      <div className="space-y-2">
                        <div><span className="font-semibold text-slate-900">Symptom:</span> Enquiries come in, but momentum stalls.</div>
                        <div><span className="font-semibold text-slate-900">Cost:</span> Slow response and inconsistent follow-up kills conversion.</div>
                        <div><span className="font-semibold text-slate-900">Outcome promise:</span> Speed and consistency become automatic.</div>
                      </div>
                    </InfoCard>

                    <InfoCard title="Lost revenue" icon={CreditCard}>
                      <div className="space-y-2">
                        <div><span className="font-semibold text-slate-900">Symptom:</span> Missed calls and cold leads leak money.</div>
                        <div><span className="font-semibold text-slate-900">Cost:</span> Jobs slip to the next business that answers.</div>
                        <div><span className="font-semibold text-slate-900">Outcome promise:</span> The system keeps prospects moving forward.</div>
                      </div>
                    </InfoCard>
                  </div>

                  <div className="pt-2">
                    <Button variant="secondary" onClick={() => scrollToId("#time")} className="w-full">
                      Show me what gets automated
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <DividerGlow />
        </div>

        {/* SOLUTIONS */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* TIME */}
          <Section id="time" className="py-2">
            <CursorSpotlight className="rounded-[28px]">
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                  <Reveal>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
                      Replace the admin you hate with workflows that run themselves.
                    </h2>

                    <ul className="mt-6 space-y-3 text-base leading-relaxed text-slate-700">
                      {[
                        "Booking and scheduling linked to your calendar",
                        "CRM pipeline so jobs don’t live “in your head”",
                        "Booking reminders to stop no-shows stealing your day",
                        "Quoting automation to speed up “quote → yes”",
                      ].map((t, idx) => (
                        <li className="flex gap-3" key={idx}>
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7">
                      <Button variant="primary" onClick={onOpenModal} iconRight={<ArrowRight className="h-4 w-4" />}>
                        Book a Discovery Call
                      </Button>
                    </div>
                  </Reveal>
                </div>

                <div className="lg:col-span-7">
                  <Reveal delay={0.08}>
                    <ValueUnlockedPanel />
                  </Reveal>
                </div>
              </div>
            </CursorSpotlight>
          </Section>

          <DividerGlow />

          {/* GROWTH */}
          <Section id="growth" className="py-2">
            <CursorSpotlight className="rounded-[28px]">
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                  <Reveal>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
                      Grow without adding overhead.
                    </h2>

                    <ul className="mt-6 space-y-3 text-base leading-relaxed text-slate-700">
                      {[
                        "Speed-to-lead under five minutes so enquiries don’t go cold",
                        "Warm outreach to revive past quotes and follow up consistently",
                        "Advanced CRM automations and reporting to spot bottlenecks",
                        "This is where growth becomes predictable instead of reactive.",
                      ].map((t, idx) => (
                        <li className="flex gap-3" key={idx}>
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7">
                      <Button variant="secondary" onClick={() => scrollToId("#pricing")} iconRight={<ArrowRight className="h-4 w-4" />}>
                        See Packages
                      </Button>
                    </div>
                  </Reveal>
                </div>

                <div className="lg:col-span-7">
                  <Reveal delay={0.08}>
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_26px_90px_-60px_rgba(15,23,42,0.60)] sm:p-8">
                      <div className="absolute inset-0">
                        <div
                          className="absolute inset-0 opacity-[0.55]"
                          style={{
                            background:
                              "radial-gradient(900px 420px at 18% 25%, rgba(59,130,246,0.16), rgba(255,255,255,0) 60%), radial-gradient(800px 360px at 85% 25%, rgba(16,185,129,0.15), rgba(255,255,255,0) 60%)",
                          }}
                        />
                      </div>

                      <div className="relative">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-slate-900">Live metrics</div>
                            <div className="mt-2 text-sm text-slate-700">
                              We spot bottlenecks before they slow you down.
                            </div>
                          </div>
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                            <BarChart3 className="h-5 w-5 text-slate-900" />
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          <MetricPill icon={Gauge} label="Speed to lead" value="Under five minutes" emphasize />
                          <MetricPill icon={Search} label="Conversion" value="Higher follow-up rate" />
                          <MetricPill icon={Star} label="Reviews received" value="Automated requests" />
                          <MetricPill icon={MessageSquare} label="Quote follow-up completion" value="Consistent outreach" />
                          <MetricPill icon={Clock} label="No-show reduction" value="Reminder sequence" />
                          <MetricPill icon={BarChart3} label="Bottleneck visibility" value="Reporting signals" />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </CursorSpotlight>
          </Section>

          <DividerGlow />

          {/* REVENUE */}
          <Section id="revenue" className="py-2">
            <CursorSpotlight className="rounded-[28px]">
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                  <Reveal>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
                      Stop leaking jobs at the front door.
                    </h2>

                    <ul className="mt-6 space-y-3 text-base leading-relaxed text-slate-700">
                      {[
                        "Missed calls mean lost revenue — high-intent customers don’t wait",
                        "AI Voice Agent handles inbound calls and warm outbound follow-up",
                        "Advanced booking routing ensures the right jobs land in the right calendar",
                        "Automated payment chasing and invoicing means faster money in the bank",
                        "Review requests increase trust and lift conversion quietly in the background",
                      ].map((t, idx) => (
                        <li className="flex gap-3" key={idx}>
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7">
                      <Button variant="primary" onClick={() => scrollToId("#calculator")} iconRight={<ArrowRight className="h-4 w-4" />}>
                        Run Calculator
                      </Button>
                    </div>
                  </Reveal>
                </div>

                <div className="lg:col-span-7">
                  <Reveal delay={0.08}>
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_26px_90px_-60px_rgba(15,23,42,0.60)] sm:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-900">Quick overview of benefits</div>
                          <div className="mt-2 text-sm text-slate-700">
                            Where revenue leaks — and what gets tightened automatically.
                          </div>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                          <Route className="h-5 w-5 text-slate-900" />
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <MetricPill icon={Phone} label="Missed calls" value="Captured and routed" emphasize />
                        <MetricPill icon={Bot} label="AI Voice Agent" value="Answers and qualifies" />
                        <MetricPill icon={Calendar} label="Booking" value="Connected to calendar" />
                        <MetricPill icon={Receipt} label="Payments" value="Chasing and invoicing" />
                        <MetricPill icon={Star} label="Reviews" value="Requests and follow-up" />
                        <MetricPill icon={BarChart3} label="Conversion" value="Reduced drop-off" />
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </CursorSpotlight>
          </Section>

          <DividerGlow />
        </div>

        {/* DEMO STRIP (label removed + new copy) */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
              Listen to an example of our AI voice agent
            </h2>
            <div className="mt-2 text-sm text-slate-600">Each agent is customised to your business.</div>

            <div className="mt-8">
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_26px_90px_-60px_rgba(15,23,42,0.60)] transition hover:-translate-y-[3px] hover:shadow-[0_34px_110px_-70px_rgba(15,23,42,0.70)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">AI Voice example (3–5 min)</div>
                    <div className="mt-2 text-sm text-slate-700">
                      Example container for the AI Voice demonstration.
                    </div>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                    <Bot className="h-5 w-5 text-slate-900 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-[1.03]" />
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200">
                      <Phone className="h-4 w-4 text-emerald-700" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">AI Voice Demo</div>
                      <div className="text-xs text-slate-500">Listen to a sample inbound call</div>
                    </div>
                  </div>
                  <audio
                    controls
                    preload="metadata"
                    className="w-full rounded-lg"
                    style={{ filter: "contrast(0.9)" }}
                  >
                    <source src="/audio/ai-voice-demo.mp3" type="audio/mpeg" />
                    <source src="/audio/ai-voice-demo.ogg" type="audio/ogg" />
                    <source src="/audio/ai-voice-demo.wav" type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button variant="primary" onClick={onOpenModal} iconRight={<ArrowRight className="h-4 w-4" />}>
                Book a Discovery Call
              </Button>
            </div>
          </Reveal>

          <DividerGlow />
        </div>

        {/* CALCULATOR (label removed; results label removed; default text removed) */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Section id="calculator" className="py-2">
            <CursorSpotlight className="rounded-[28px]">
              <Reveal>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-7">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
                      How many hours would you get back each week?
                    </h2>

                    <div className="mt-6 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_26px_90px_-60px_rgba(15,23,42,0.60)] sm:p-8">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <label htmlFor="hourly-rate-input" className="text-sm font-semibold text-slate-900">Hourly rate</label>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                              $
                            </span>
                            <input
                              id="hourly-rate-input"
                              className="h-10 w-[140px] rounded-xl border border-slate-200 bg-white pl-7 pr-3 text-sm font-semibold text-slate-900 outline-none transition-colors duration-200 focus:border-slate-300 focus:ring-2 focus:ring-emerald-400/60"
                              inputMode="numeric"
                              value={String(hourlyRate)}
                              onChange={(e) => {
                                const next = Number(e.target.value.replace(/[^\d]/g, ""));
                                setHourlyRate(clamp(Number.isFinite(next) ? next : 0, 0, 9999));
                              }}
                              aria-label="Hourly rate"
                            />
                          </div>
                          <div className="text-sm text-slate-700">per hour</div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        {tasks.map((t, idx) => (
                          <div
                            key={t.key}
                            className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_14px_45px_-35px_rgba(15,23,42,0.35)] sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-slate-900">{t.label}</div>
                              <div className="mt-1 text-xs text-slate-600">Hours per week</div>
                            </div>
                            <StepperInput
                              value={t.hours}
                              onChange={(val) => {
                                setTasks((prev) => prev.map((p, i) => (i === idx ? { ...p, hours: val } : p)));
                              }}
                              min={0}
                              max={40}
                              step={0.5}
                              ariaLabel={`${t.label} hours per week`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="sticky top-28 space-y-4">
                      <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_26px_90px_-60px_rgba(15,23,42,0.60)] sm:p-8">
                        <div className="mt-1">
                          <div className="text-sm text-slate-700">Yearly value saved</div>
                          <div className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
                            {formatCurrencyAUD(totals.yearlyValue)}
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-3">
                          <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
                            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">Monthly hours saved</div>
                            <div className="mt-2 text-2xl font-semibold text-slate-950">
                              {formatNumber(Math.round(totals.monthlySavedHours))}
                            </div>
                          </div>
                          <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
                            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">Monthly value saved</div>
                            <div className="mt-2 text-2xl font-semibold text-slate-950">
                              {formatCurrencyAUD(totals.monthlyValue)}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 rounded-2xl border border-slate-900/10 bg-slate-900/[0.02] p-4">
                          <div className="text-sm font-semibold text-slate-950">
                            Imagine what you could do with {formatNumber(Math.round(totals.weeklySaved))} hours back every week.
                          </div>
                        </div>

                        <div className="mt-5">
                          <Button variant="primary" onClick={onOpenModal} className="w-full" iconRight={<ArrowRight className="h-4 w-4" />}>
                            Book a Discovery Call
                          </Button>
                        </div>

                        <div className="mt-4 text-xs text-slate-600">
                          *Calculations assume tasks drop to approximately 20% of current time per week.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </CursorSpotlight>
          </Section>

          <DividerGlow />
        </div>

        {/* PRICING (eyebrow removed; keep explanation; GST included here) */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Section id="pricing" className="py-2">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
                Pricing (GST included)
              </h2>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-700">
                  Monthly minimum one month. Quarterly: pay eleven months, get twelve. Annual: pay ten months, get twelve.
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-1 shadow-[0_16px_50px_-40px_rgba(15,23,42,0.40)]">
                    <div className="flex">
                      {billingOptions.map((opt) => {
                        const active = billing === opt;
                        return (
                          <button
                            key={opt}
                            className={cx(
                              "cursor-pointer rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200",
                              active
                                ? "bg-slate-900 text-white shadow-[0_14px_40px_-22px_rgba(15,23,42,0.50)]"
                                : "bg-transparent text-slate-700 hover:bg-slate-50"
                            )}
                            onClick={() => setBilling(opt)}
                            type="button"
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <PricingCard
                  tierKey="bronze"
                  billing={billing}
                  onOpenModal={onOpenModal}
                  emphasized={false}
                  usageOpen={usageOpen.bronze}
                  onToggleUsage={() => setUsageOpen((p) => ({ ...p, bronze: !p.bronze }))}
                />
                <PricingCard
                  tierKey="silver"
                  billing={billing}
                  onOpenModal={onOpenModal}
                  emphasized
                  usageOpen={usageOpen.silver}
                  onToggleUsage={() => setUsageOpen((p) => ({ ...p, silver: !p.silver }))}
                />
                <PricingCard
                  tierKey="gold"
                  billing={billing}
                  onOpenModal={onOpenModal}
                  emphasized={false}
                  usageOpen={usageOpen.gold}
                  onToggleUsage={() => setUsageOpen((p) => ({ ...p, gold: !p.gold }))}
                />
              </div>

              <motion.button
                className="mt-8 group inline-flex w-full cursor-pointer items-center justify-between rounded-3xl border border-slate-200/70 bg-white px-5 py-4 text-left shadow-[0_22px_70px_-50px_rgba(15,23,42,0.55)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_30px_95px_-65px_rgba(15,23,42,0.70)]"
                onClick={() => setTableOpen((s) => !s)}
                aria-expanded={tableOpen}
                type="button"
                animate={reduce ? {} : { boxShadow: ["0_22px_70px_-50px_rgba(15,23,42,0.55)", "0_22px_70px_-50px_rgba(37,99,235,0.18)", "0_22px_70px_-50px_rgba(15,23,42,0.55)"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                    <Info className="h-5 w-5 text-slate-900" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">See full comparison table</div>
                    <div className="mt-1 text-xs text-slate-600">
                      This shows exactly what is included in each package.
                    </div>
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                  <ChevronDown className={cx("h-5 w-5 text-slate-700 transition-transform", tableOpen ? "rotate-180" : "")} />
                </div>
              </motion.button>

              <ComparisonTable open={tableOpen} />
            </Reveal>
          </Section>

          <DividerGlow />
        </div>

        {/* SLA TICKET SEVERITY + ONBOARDING OVERVIEW */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
                  Roadmap
                </h2>

                <div className="mt-6 space-y-3">
                  {[
                    { title: "Onboard Day 1", desc: "We set foundations, access, and core flows so implementation starts fast." },
                    { title: "Build + Test Day 1–5+", desc: "Workflows are built, tested, and confirmed against your real process." },
                    { title: "Go Live + Optimise first 30 days from go-live", desc: "We refine for results and ensure the system keeps saving time." },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_20px_65px_-50px_rgba(15,23,42,0.55)]"
                    >
                      <div className="text-sm font-semibold text-slate-900">{s.title}</div>
                      <div className="mt-2 text-sm leading-relaxed text-slate-700">{s.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_26px_90px_-60px_rgba(15,23,42,0.60)]">
                  <div className="text-sm font-semibold text-slate-900">Optimisation doesn’t stop after 30 days...</div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-700">
                    The system is improved over time as your operations change. The guarantee remains a calm checkpoint.
                  </div>
                  <div className="mt-4 text-sm font-semibold text-slate-900">
                    30-Day Optimisation Guarantee: If your system isn’t saving time and driving bookings within 30 days, we waive the recurring fee until it is.
                  </div>
                </div>

                <div className="mt-6">
                  <Button variant="primary" onClick={onOpenModal} iconRight={<ArrowRight className="h-4 w-4" />}>
                    Book a Discovery Call
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">SLA ticket severity</h3>
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
                    <div className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_20px_65px_-50px_rgba(15,23,42,0.55)]">
                      <div className="flex items-center gap-2">
                        <SLAChip color="black" />
                        <div className="text-sm font-semibold text-slate-900">Broken</div>
                      </div>
                      <div className="mt-2 text-sm text-slate-700">Fixed within 24 hours.</div>
                    </div>

                    <div className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_20px_65px_-50px_rgba(15,23,42,0.55)]">
                      <div className="flex items-center gap-2">
                        <SLAChip color="red" />
                        <div className="text-sm font-semibold text-slate-900">Urgent</div>
                      </div>
                      <div className="mt-2 text-sm text-slate-700">Fixed within 24–48 hours.</div>
                    </div>

                    <div className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_20px_65px_-50px_rgba(15,23,42,0.55)]">
                      <div className="flex items-center gap-2">
                        <SLAChip color="orange" />
                        <div className="text-sm font-semibold text-slate-900">Attention</div>
                      </div>
                      <div className="mt-2 text-sm text-slate-700">Fixed within 48–96 hours.</div>
                    </div>

                    <div className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_20px_65px_-50px_rgba(15,23,42,0.55)]">
                      <div className="flex items-center gap-2">
                        <SLAChip color="green" />
                        <div className="text-sm font-semibold text-slate-900">Tuning</div>
                      </div>
                      <div className="mt-2 text-sm text-slate-700">Addressed within 5+ days.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_26px_90px_-60px_rgba(15,23,42,0.60)] sm:p-8">
                  <div className="absolute inset-0">
                    <div
                      className="absolute inset-0 opacity-[0.55]"
                      style={{
                        background:
                          "radial-gradient(900px 420px at 20% 30%, rgba(16,185,129,0.14), rgba(255,255,255,0) 60%), radial-gradient(800px 360px at 85% 35%, rgba(59,130,246,0.16), rgba(255,255,255,0) 62%)",
                      }}
                    />
                  </div>

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-2xl font-semibold tracking-tight text-slate-950">Onboarding overview</div>
                        <div className="mt-2 text-sm text-slate-700">
                          Clear steps, clean handover, and a system that keeps improving.
                        </div>
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                        <ShieldCheck className="h-5 w-5 text-slate-900" />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <MetricPill icon={ClipboardCheck} label="Onboarding" value="Day 1 foundation" emphasize />
                      <MetricPill icon={Wand2} label="Build and test" value="Day 1–5+ scope" />
                      <MetricPill icon={CheckCircle} label="Go live" value="First 30 days" />
                      <MetricPill icon={Users} label="Support priority" value="Tier-based queue" />
                      <MetricPill icon={Mail} label="Usage alerts" value="70% and 100%" />
                      <MetricPill icon={Layers} label="Separation" value="Clear surfaces" />
                    </div>

                    <div className="mt-6 rounded-3xl border border-slate-900/10 bg-white p-5 shadow-[0_22px_70px_-50px_rgba(15,23,42,0.55)]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-semibold text-slate-950">Limited to 5 new clients per month</div>
                          <div className="mt-2 text-sm text-slate-700">
                            To keep quality high, we cap onboarding so every build ships clean.
                          </div>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                          <Building2 className="h-5 w-5 text-slate-900" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      Support priority: Bronze standard queue, Silver priority queue, Gold VIP priority.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <DividerGlow />
        </div>

        {/* FOUNDER (heading changed; expanded copy; mini cards removed) */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_26px_90px_-60px_rgba(15,23,42,0.60)] sm:p-8 h-full">
                  <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
                    Hear from our founder
                  </h2>

                  <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
                    <p className="font-semibold text-slate-900">Paddy O’Shea</p>
                    <p>
                      I created O’Shea Systems because great service should never be held back by admin,
                      missed calls, or follow-ups that fall through the cracks.
                    </p>
                    <p>
                      Small businesses already deliver incredible service, but they are often forced to compete
                      with larger organisations that can afford staff in every role. I believe the gap should be
                      closed with systems, not headcount.
                    </p>
                    <p>
                      My goal is to help your business grow by building on what you already do best, removing
                      friction, and giving you the same operational leverage as much larger teams. We focus on
                      long-term partnerships that continue to deliver value as your business grows.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white to-emerald-50/30 p-6 shadow-[0_26px_90px_-60px_rgba(15,23,42,0.60)] sm:p-8 h-full flex flex-col justify-center">
                  <div className="absolute inset-0">
                    <div
                      className="absolute inset-0 opacity-[0.55]"
                      style={{
                        background:
                          "radial-gradient(900px 420px at 15% 35%, rgba(15,23,42,0.06), rgba(255,255,255,0) 60%), radial-gradient(700px 320px at 85% 35%, rgba(59,130,246,0.14), rgba(255,255,255,0) 62%)",
                      }}
                    />
                  </div>

                  <div className="relative w-full max-w-xs mx-auto">
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                      <img
                        src="/images/paddy-oshea.png"
                        alt="Paddy O'Shea — Founder of O'Shea Systems"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <DividerGlow />
        </div>

        {/* FAQ (eyebrow removed) */}
        <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <Section id="faq" className="py-2">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
                Questions, answered clearly.
              </h2>

              <div className="mt-8">
                <Accordion
                  defaultOpenIndex={-1}
                  items={[
                    {
                      title: "Is this new software?",
                      content:
                        "No. The goal is to build on what you already use, then connect the system so enquiries move through booking, follow-up, and completion without manual chasing.",
                    },
                    {
                      title: "Will this break?",
                      content:
                        "Workflows are built and tested before go-live. If an issue happens, support is handled through the ticket process and prioritised by severity.",
                    },
                    {
                      title: "What is a workflow?",
                      content:
                        "A workflow is an automated sequence that performs actions for you, such as capturing an enquiry, sending follow-up, booking reminders, and updating your CRM pipeline.",
                    },
                    {
                      title: "When does billing start?",
                      content:
                        "Billing begins based on the agreed rollout and go-live plan. Monthly minimum one month. Quarterly pay eleven get twelve. Annual pay ten get twelve.",
                    },
                    {
                      title: "What happens if I go over usage?",
                      content:
                        "Overages apply up to +25% of the included allowance. Usage alerts are automatically sent at 70% and 100%.",
                    },
                    {
                      title: "Am I locked in?",
                      content:
                        "Monthly minimum one month. Quarterly and annual options are available for those who want to commit for longer and receive the pay eleven get twelve or pay ten get twelve incentive.",
                    },
                    {
                      title: "Do you build websites too?",
                      content:
                        "Looking for a website or an upgrade to your current one? Enquire now.",
                    },
                    {
                      title: "Data security and AI compliance",
                      content:
                        "We follow strict data handling and security practices aligned with Australian government guidelines. Access and permissions are handled carefully during onboarding.",
                    },
                  ]}
                />
              </div>
            </Reveal>
          </Section>

          {/* FINAL CTA */}
          <Reveal>
            <div className="mt-14 relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_26px_90px_-60px_rgba(15,23,42,0.60)] sm:p-10">
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 opacity-[0.60]"
                  style={{
                    background:
                      "radial-gradient(1200px 480px at 20% 10%, rgba(16,185,129,0.16), rgba(255,255,255,0) 60%), radial-gradient(900px 420px at 85% 25%, rgba(59,130,246,0.18), rgba(255,255,255,0) 60%)",
                  }}
                />
                <motion.div
                  className="absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(15,23,42,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.12) 1px, transparent 1px)",
                    backgroundSize: "54px 54px",
                    maskImage:
                      "radial-gradient(55% 55% at 50% 40%, black 0%, rgba(0,0,0,0.35) 55%, transparent 75%)",
                    WebkitMaskImage:
                      "radial-gradient(55% 55% at 50% 40%, black 0%, rgba(0,0,0,0.35) 55%, transparent 75%)",
                  }}
                  animate={reduce ? {} : { backgroundPosition: ["0px 0px", "54px 54px"] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <div className="relative">
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl leading-[1.08]">
                  If you’re already getting enquiries, the fastest win is conversion.
                </h2>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button variant="primary" onClick={onOpenModal} iconRight={<ArrowRight className="h-4 w-4" />}>
                    Book a Discovery Call
                  </Button>
                  <Button variant="secondary" onClick={() => scrollToId("#calculator")}>
                    Run Calculator
                  </Button>
                </div>
                <div className="mt-2 text-sm text-slate-700">{CTA_MICROCOPY}</div>
              </div>
            </div>
          </Reveal>

          {/* FOOTER (cleaner layout, larger brand text, no quick links) */}
          <div className="mt-14 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_22px_70px_-50px_rgba(15,23,42,0.55)] sm:p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <div className="text-2xl font-semibold text-slate-900 tracking-tight">O’Shea Systems</div>
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 mt-1">
                  Built Better By
                </div>

                <div className="mt-6 space-y-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-emerald-600" />
                    <span>+61 450 819 981</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-emerald-600" />
                    <span>paddy@osheasystems.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Route className="h-4 w-4 text-emerald-600" />
                    <span>Brunswick, VIC, Australia</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 md:items-end">
                <div className="flex gap-4">
                  {[
                    { label: "LinkedIn", icon: Linkedin, href: "#" },
                    { label: "Instagram", icon: Instagram, href: "#" },
                    { label: "Facebook", icon: Facebook, href: "#" },
                  ].map((s, idx) => (
                    <a
                      key={idx}
                      href={s.href}
                      className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
                      onClick={(e) => e.preventDefault()}
                      aria-label={s.label}
                    >
                      <s.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                    </a>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600 md:justify-end">
                  <button className="cursor-pointer transition-colors duration-200 hover:text-slate-900 bg-transparent border-none p-0 font-medium text-sm text-slate-600" onClick={onOpenPrivacy}>Privacy Policy</button>
                  <button className="cursor-pointer transition-colors duration-200 hover:text-slate-900 bg-transparent border-none p-0 font-medium text-sm text-slate-600" onClick={onOpenTerms}>Terms of Service</button>
                  <span className="text-slate-400">ABN 90 414 617 370</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
              <div>© {new Date().getFullYear()} O’Shea Systems. All rights reserved.</div>
              <div>All prices include GST.</div>
            </div>
          </div>
        </div>

        <Modal open={modalOpen} onClose={onCloseModal} title="Book a Discovery Call">
          <DiscoveryCallForm onSuccess={onCloseModal} />
        </Modal>

        {/* Privacy Policy Overlay */}
        <AnimatePresence>
          {privacyOpen && (
            <motion.div
              className="fixed inset-0 z-[90] bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-full overflow-y-auto">
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-sm">
                  <div className="mx-auto max-w-4xl flex items-center justify-between px-4 py-3 sm:px-6">
                    <div className="leading-tight">
                      <div className="text-sm font-semibold tracking-tight text-slate-900">O'Shea Systems</div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">Privacy Policy</div>
                    </div>
                    <button
                      onClick={onClosePrivacy}
                      className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                    >
                      <X className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                      Back to Site
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 pb-20">
                  <PrivacyPolicyContent />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terms of Service Overlay */}
        <AnimatePresence>
          {termsOpen && (
            <motion.div
              className="fixed inset-0 z-[90] bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-full overflow-y-auto">
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-sm">
                  <div className="mx-auto max-w-4xl flex items-center justify-between px-4 py-3 sm:px-6">
                    <div className="leading-tight">
                      <div className="text-sm font-semibold tracking-tight text-slate-900">O'Shea Systems</div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">Terms of Service</div>
                    </div>
                    <button
                      onClick={onCloseTerms}
                      className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                    >
                      <X className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                      Back to Site
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 pb-20">
                  <TermsOfServiceContent />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default OSheaSystemsLanding;