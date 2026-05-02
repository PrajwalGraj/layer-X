import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  History,
  MessageSquare,
  Mic,
  Shield,
  Sparkles,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "layer-x - Crypto, but as simple as texting" },
      {
        name: "description",
        content:
          "Send, swap, and manage Solana crypto using plain English. Built for clarity and confidence.",
      },
      { property: "og:title", content: "layer-x - Crypto, as simple as texting" },
      {
        property: "og:description",
        content:
          "Type what you want, see what will happen, approve. A command-driven crypto interface for Solana.",
      },
    ],
  }),
  component: LandingPage,
});

const howItWorks = [
  {
    step: "01",
    title: "Type command",
    description: "send 1 SOL to @prajwal",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "Review preview",
    description: "Recipient, fee, and post-balance are clearly shown.",
    icon: Shield,
  },
  {
    step: "03",
    title: "Confirm in wallet",
    description: "Phantom opens, you sign, and Layer-X confirms completion.",
    icon: Wallet,
  },
];

const capabilityCards = [
  {
    title: "Chat commands",
    description: "Plain-English actions without crypto jargon.",
    icon: MessageSquare,
  },
  {
    title: "Username mapping",
    description: "Send to @handles instead of long addresses.",
    icon: Users,
  },
  {
    title: "Transaction preview",
    description: "See exactly what will happen before signing.",
    icon: Shield,
  },
  {
    title: "Voice command layer",
    description: "Dictate commands and review before execution.",
    icon: Mic,
  },
  {
    title: "Wallet history",
    description: "Track recent command-driven transactions.",
    icon: History,
  },
  {
    title: "Smart contacts",
    description: "Save trusted recipients for faster transfers.",
    icon: Zap,
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen scroll-smooth overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-56 right-[-10rem] h-[32rem] w-[32rem] rounded-full bg-primary/7 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/4 blur-[100px]" />
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 sm:py-8">
        <Link to="/" className="group flex items-center gap-3">
          <img src="/logo.png" alt="Layer-X" className="h-9 w-9 rounded-lg object-contain" />
          <span className="font-display text-lg font-bold tracking-[0.2em] uppercase">Layer-<span className="text-primary">X</span></span>
        </Link>

        <nav className="flex items-center gap-5 text-sm sm:gap-8">
          <a
            className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            href="#features"
          >
            Features
          </a>
          <a
            className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            href="#how-it-works"
          >
            How it works
          </a>
          <Link
            className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20 hover:glow-primary-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            to="/app"
          >
            Launch App
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10 sm:pb-24 sm:pt-14 lg:pt-18">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-16">
          <div className="animate-enter space-y-8 [animation-delay:40ms]">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              AI + blockchain wallet interface
            </div>

            <div className="space-y-5">
              <h1 className="text-balance text-4xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.2rem]">
                Crypto, but as simple as texting.
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
                Layer-X turns wallet actions into clear conversation. Type your intent, review a safe preview, and approve with confidence.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                className="group inline-flex min-h-11 items-center gap-3 rounded-xl bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-all hover:scale-[1.015] hover:bg-primary-glow hover:glow-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                to="/app"
              >
                Launch App
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                className="inline-flex min-h-11 items-center gap-3 rounded-xl border border-border bg-transparent px-6 py-3 text-base font-medium text-foreground transition-all hover:border-primary/30 hover:bg-surface focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                type="button"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Conversational wallet actions
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Human-readable previews
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Built on Solana
              </div>
            </div>
          </div>

          <div className="animate-enter [animation-delay:120ms]">
            <PremiumCommandPreview />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            A focused three-step flow from command to signed transaction.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3 sm:gap-6">
          {howItWorks.map((item, index) => (
            <article
              key={item.step}
              className="group relative animate-enter rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-surface-elevated hover:glow-primary-sm"
              style={{ animationDelay: `${180 + index * 70}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary">
                  <item.icon className="h-4 w-4" />
                  <span className="font-mono text-xs tracking-wide">STEP {item.step}</span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground">
              Why Layer-X
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for confident crypto actions</h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Layer-X combines conversational commands, contact intelligence, and transaction safety into one clean interface.
            </p>

            <div className="space-y-3 rounded-xl border border-border bg-surface p-4">
              <FlowRow label="User" value="send 1 SOL to @prajwal" />
              <FlowRow label="Layer-X" value="Preview ready -> Wallet confirmation" highlight />
              <FlowRow label="Result" value="Sent successfully" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilityCards.map((item, index) => (
              <article
                key={item.title}
                className="group relative animate-enter rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:bg-surface-elevated hover:glow-primary-sm"
                style={{ animationDelay: `${260 + index * 45}ms` }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/14 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-18 pt-8 sm:pb-22">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-elevated p-8 text-center sm:p-10">
          <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Launch conversational crypto today</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Move from plain-English command to verified wallet confirmation in a cleaner, safer flow.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                className="group inline-flex min-h-11 items-center gap-3 rounded-xl bg-primary px-7 py-3 text-base font-medium text-primary-foreground transition-all hover:scale-[1.015] hover:bg-primary-glow hover:glow-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                to="/app"
              >
                Launch App
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-6 py-3 text-base font-medium transition-colors hover:border-primary/30 hover:bg-surface focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                type="button"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-12 pt-2">
        <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-border bg-surface/60 px-5 py-5 sm:flex-row sm:px-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Layer-X" className="h-6 w-6 rounded object-contain" />
            <span className="font-display text-sm font-bold tracking-[0.15em] uppercase">Layer-<span className="text-primary">X</span></span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground sm:gap-4">
            <span>Built on Solana</span>
            <span aria-hidden="true">/</span>
            <a className="transition-colors hover:text-foreground" href="#">
              GitHub
            </a>
          </div>

          <Link
            className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20 hover:glow-primary-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            to="/app"
          >
            Launch App
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          (c) {new Date().getFullYear()} Layer-X. Crypto made conversational.
        </p>
      </footer>
    </div>
  );
}

function PremiumCommandPreview() {
  return (
    <div className="relative animate-float-slow">
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/24 via-primary/10 to-transparent blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-surface/95 shadow-[0_22px_52px_-28px_rgba(0,0,0,0.9)] glow-breathe">
        <div className="flex items-center justify-between border-b border-border bg-surface-elevated px-4 py-3 sm:px-5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/35" />
            <span className="h-2 w-2 rounded-full bg-primary/85" />
          </div>
          <p className="font-mono text-[11px] tracking-wide text-muted-foreground">layer-x / command preview</p>
        </div>

        <div className="space-y-5 p-5 font-mono text-sm sm:p-6">
          <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
              Solana mainnet connected
            </div>
            <span>session #A9F2</span>
          </div>

          <div className="rounded-xl border border-border bg-background/75 p-3">
            <p className="text-xs text-muted-foreground">Command</p>
            <div className="mt-2 flex items-center gap-2 text-foreground">
              <span className="text-primary">&gt;</span>
              <span>send 1 SOL to @prajwal</span>
              <span className="inline-block h-4 w-2 animate-caret-blink rounded-[2px] bg-primary/80" />
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Transaction preview</p>
              <span className="rounded-md border border-primary/25 px-2 py-1 text-[10px] uppercase tracking-wide text-primary">
                Ready to sign
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <PreviewRow label="From" value="Primary Wallet" />
              <PreviewRow label="To" value="@prajwal" />
              <PreviewRow label="Amount" value="1.00 SOL" />
              <PreviewRow label="Network fee" value="0.000005 SOL" />
              <PreviewRow label="Post-balance" value="3.42 SOL" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface-elevated/80 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Wallet status</span>
              <span className="text-primary">Phantom confirmation opened</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 rounded-md border border-border/70 bg-background/45 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="truncate text-right text-foreground">{value}</span>
    </div>
  );
}

function FlowRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border/80 bg-background/45 px-3 py-2.5 text-sm">
      <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className={highlight ? "text-primary" : "text-foreground"}>{value}</span>
    </div>
  );
}
