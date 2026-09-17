import Image from "next/image";
import type { ReactNode } from "react";
import { TileReveal } from "@/components/tile-reveal";

type Variant = "design" | "blueprint";

const BLUE = "#2f6bff";

/**
 * A layout box. In "design" it renders its children as-is; in "blueprint" it
 * draws a dashed outline with a mono spec label, so the back side of every
 * tile is the wireframe of exactly what's on the front.
 */
function Spec({
  bp,
  label,
  className = "",
  children,
}: {
  bp: boolean;
  label: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={bp ? { outline: `1px dashed ${BLUE}`, outlineOffset: -1 } : undefined}
    >
      {bp && label && (
        <span
          className="pointer-events-none absolute -top-[15px] -left-px z-10 whitespace-nowrap bg-[#fbfbfb] px-px font-mono text-[9px] leading-[14px] tracking-[-0.01em]"
          style={{ color: BLUE }}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

const NAV = [
  { label: "Projects", href: "https://www.prasen.dev/projects" },
  { label: "Blog", href: "https://www.prasen.dev/blog" },
  { label: "Videos", href: "https://www.prasen.dev/videos" },
];

const PRODUCTS = [
  {
    name: "Outbuilt",
    note: "Pay-to-rank board",
    stat: "23 paid placements",
    href: "https://outbuilt.lol",
  },
  {
    name: "PayBrackets",
    note: "Paycheck calculator",
    stat: "50 states + D.C.",
    href: "https://paybrackets.com",
  },
  {
    name: "Dateup",
    note: "Dating profile AI",
    stat: "137K impressions",
    href: "https://dateup.in",
  },
  {
    name: "Wallpaperz",
    note: "AI wallpapers",
    stat: "700 views / day",
    href: "https://www.wallpaperz.in/",
  },
];

const OPEN_SOURCE = [
  { name: "Jungle Trail", stars: 292, href: "https://github.com/StarKnightt/jungle-trail" },
  { name: "Night Street", stars: 121, href: "https://github.com/StarKnightt/night-street" },
  { name: "3D Carousel", stars: 43, href: "https://github.com/StarKnightt/3D-Carousel" },
  { name: "Backrooms", stars: 24, href: "https://github.com/StarKnightt/Backroom-Escape" },
];

const ext = { target: "_blank", rel: "noreferrer" } as const;

function Landing({ variant }: { variant: Variant }) {
  const bp = variant === "blueprint";

  const ink = bp ? "text-[#c6c6c6]" : "text-[#111]";
  const muted = bp ? "text-[#d2d2d2]" : "text-[#6b6b6b]";
  const faint = bp ? "text-[#dcdcdc]" : "text-[#9a9a9a]";

  return (
    <div
      className={`flex h-full w-full flex-col px-10 py-8 ${bp ? "bg-[#fbfbfb]" : "bg-white"}`}
      style={
        bp
          ? {
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              backgroundPosition: "-1px -1px",
            }
          : undefined
      }
    >
      {/* nav */}
      <Spec bp={bp} label="nav · h 40 · space-between" className="flex h-10 items-center justify-between">
        <a href="https://www.prasen.dev" {...ext} className="flex items-center gap-2.5">
          <Spec bp={bp} label="" className="h-7 w-7">
            {bp ? (
              <div className="h-full w-full rounded-full" />
            ) : (
              <Image
                src="/avatar.webp"
                alt=""
                width={28}
                height={28}
                className="h-full w-full rounded-full bg-[#eeeeec] object-cover"
                priority
              />
            )}
          </Spec>
          <span className={`text-[15px] font-medium tracking-[-0.01em] ${ink}`}>Prasenjit Nayak</span>
        </a>
        <div className={`flex items-center gap-7 text-[13.5px] ${muted}`}>
          {NAV.map((n) => (
            <a key={n.label} href={n.href} {...ext}>
              {n.label}
            </a>
          ))}
          <Spec bp={bp} label="btn · 30×118" className="h-[30px]">
            <a
              href="mailto:hi@prasen.dev"
              className={`flex h-full items-center rounded-full px-3.5 font-mono text-[12.5px] ${
                bp ? "text-[#c6c6c6]" : "bg-[#111] text-white"
              }`}
            >
              hi@prasen.dev
            </a>
          </Spec>
        </div>
      </Spec>

      {/* hero */}
      <div className="mt-14 grid flex-1 grid-cols-[1.1fr_1fr] items-center gap-12">
        <div className="flex flex-col">
          <Spec bp={bp} label="eyebrow · mono 11 · +0.08em" className="w-fit">
            <div className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] ${faint}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${bp ? "bg-[#dcdcdc]" : "bg-[#22c55e]"}`} />
              Freelancing · open to DevRel
            </div>
          </Spec>

          <Spec bp={bp} label="h1 · Instrument Serif 54/1.02 · -0.02em" className="mt-5 w-fit">
            <h1 className={`font-serif text-[54px] leading-[1.02] tracking-[-0.02em] ${ink}`}>
              I build things
              <br />
              that feel <span className="italic">finished</span>.
            </h1>
          </Spec>

          <Spec bp={bp} label="p · Geist 16/1.55 · max 40ch" className="mt-6 w-fit">
            <p className={`max-w-[40ch] text-[16px] leading-[1.55] ${muted}`}>
              Full stack developer. Three.js worlds with zero downloaded art,
              small products people actually pay for, and I share all of it
              with 22K+ people on X.
            </p>
          </Spec>

          <div className="mt-8 flex items-center gap-5">
            <Spec bp={bp} label="btn · 42×112 · r-full" className="h-[42px]">
              <a
                href="mailto:hi@prasen.dev"
                className={`flex h-full items-center rounded-full px-5 text-[14px] font-medium ${
                  bp ? "text-[#c6c6c6]" : "bg-[#111] text-white"
                }`}
              >
                Say hi →
              </a>
            </Spec>
            <Spec bp={bp} label="link · 14" className="w-fit">
              <a href="https://x.com/prasenx" {...ext} className={`text-[14px] ${muted}`}>
                Follow on X
              </a>
            </Spec>
          </div>
        </div>

        {/* products */}
        <Spec bp={bp} label="card · r-16 · shadow-lg" className="w-full">
          <div
            className={`overflow-hidden rounded-2xl ${
              bp ? "" : "border border-black/[0.06] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)]"
            }`}
            style={
              bp
                ? undefined
                : { background: "linear-gradient(135deg, #f8f8f6 0%, #eeeeeb 100%)" }
            }
          >
            <div className="flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between px-1">
                <Spec bp={bp} label="label · mono 10" className="w-fit">
                  <span className={`font-mono text-[10px] uppercase tracking-[0.08em] ${faint}`}>
                    Products · live
                  </span>
                </Spec>
                <span className={`flex items-center gap-1.5 font-mono text-[10px] ${faint}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${bp ? "bg-[#dcdcdc]" : "bg-[#22c55e]"}`} />
                  4 / 4 up
                </span>
              </div>
              <Spec bp={bp} label="" className="grid grid-cols-2 gap-2.5">
                {PRODUCTS.map((p) => (
                  <Spec key={p.name} bp={bp} label="tile · 96 · r-10" className="h-[96px]">
                    <a
                      href={p.href}
                      {...ext}
                      className={`flex h-full flex-col justify-between rounded-[10px] px-3.5 py-3 ${
                        bp ? "" : "bg-white/85 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[14px] font-medium tracking-[-0.01em] ${ink}`}>{p.name}</span>
                        <span className={`text-[12px] ${faint}`}>↗</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className={`truncate text-[12px] leading-none ${muted}`}>{p.note}</span>
                        <span className={`truncate font-mono text-[10.5px] leading-none ${faint}`}>{p.stat}</span>
                      </div>
                    </a>
                  </Spec>
                ))}
              </Spec>
            </div>
          </div>
        </Spec>
      </div>

      {/* open source strip */}
      <Spec bp={bp} label="oss · 13 · gap 28" className="mt-10 flex w-fit items-center gap-7">
        <span className={`font-mono text-[11px] uppercase tracking-[0.08em] ${faint}`}>
          Open source
        </span>
        {OPEN_SOURCE.map((r) => (
          <a
            key={r.name}
            href={r.href}
            {...ext}
            className={`flex items-baseline gap-1.5 text-[13px] font-medium tracking-[-0.01em] ${faint}`}
          >
            {r.name}
            <span className="font-mono text-[11px] font-normal">{r.stars}★</span>
          </a>
        ))}
      </Spec>
    </div>
  );
}

export default function Page() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-5 bg-[#f4f4f2] p-6">
      <TileReveal
        front={<Landing variant="design" />}
        back={<Landing variant="blueprint" />}
        overlay={<Landing variant="design" />}
        rows={8}
        cols={12}
        radius={150}
        className="h-[600px] w-[880px] rounded-[20px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_30px_80px_-30px_rgba(0,0,0,0.18)]"
      />
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-black/35">
        hover to see the blueprint · click to hold
      </p>
    </main>
  );
}
