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
        <div className="flex items-center gap-2.5">
          <Spec bp={bp} label="" className="h-[22px] w-[22px]">
            <div className={`h-full w-full rounded-[6px] ${bp ? "" : "bg-[#111]"}`} />
          </Spec>
          <span className={`text-[15px] font-medium tracking-[-0.01em] ${ink}`}>Aether</span>
        </div>
        <div className={`flex items-center gap-7 text-[13.5px] ${muted}`}>
          <span>Product</span>
          <span>Pricing</span>
          <span>Journal</span>
          <Spec bp={bp} label="btn · 30×92" className="h-[30px]">
            <span
              className={`flex h-full items-center rounded-full px-3.5 text-[13px] font-medium ${
                bp ? "text-[#c6c6c6]" : "bg-[#111] text-white"
              }`}
            >
              Get access
            </span>
          </Spec>
        </div>
      </Spec>

      {/* hero */}
      <div className="mt-14 grid flex-1 grid-cols-[1.1fr_1fr] items-center gap-12">
        <div className="flex flex-col">
          <Spec bp={bp} label="eyebrow · mono 11 · +0.08em" className="w-fit">
            <div className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] ${faint}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${bp ? "bg-[#dcdcdc]" : "bg-[#22c55e]"}`} />
              Now in public beta
            </div>
          </Spec>

          <Spec bp={bp} label="h1 · Instrument Serif 54/1.02 · -0.02em" className="mt-5 w-fit">
            <h1 className={`font-serif text-[54px] leading-[1.02] tracking-[-0.02em] ${ink}`}>
              Notes that think
              <br />
              <span className="italic">alongside</span> you.
            </h1>
          </Spec>

          <Spec bp={bp} label="p · Geist 16/1.55 · max 40ch" className="mt-6 w-fit">
            <p className={`max-w-[40ch] text-[16px] leading-[1.55] ${muted}`}>
              Capture in plain text, connect without folders, and let quiet
              suggestions surface what you already know.
            </p>
          </Spec>

          <div className="mt-8 flex items-center gap-5">
            <Spec bp={bp} label="btn · 42×148 · r-full" className="h-[42px]">
              <span
                className={`flex h-full items-center rounded-full px-5 text-[14px] font-medium ${
                  bp ? "text-[#c6c6c6]" : "bg-[#111] text-white"
                }`}
              >
                Start writing
              </span>
            </Spec>
            <Spec bp={bp} label="link · 14" className="w-fit">
              <span className={`text-[14px] ${muted}`}>See how it works →</span>
            </Spec>
          </div>
        </div>

        {/* product frame */}
        <Spec bp={bp} label="img · 4:3 · r-16 · shadow-lg" className="aspect-[4/3] w-full">
          <div
            className={`h-full w-full overflow-hidden rounded-2xl ${
              bp ? "" : "border border-black/[0.06] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)]"
            }`}
            style={
              bp
                ? undefined
                : { background: "linear-gradient(135deg, #f6f6f4 0%, #ececea 100%)" }
            }
          >
            <div className="flex h-full flex-col p-5">
              <Spec bp={bp} label="toolbar · 28" className="flex h-7 items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className={`h-2.5 w-2.5 rounded-full ${bp ? "" : "bg-black/10"}`} />
                ))}
              </Spec>
              <Spec bp={bp} label="lines · 12 · gap 10" className="mt-5 flex flex-col gap-2.5">
                {[88, 72, 80, 52].map((w, i) => (
                  <span
                    key={i}
                    className={`block h-3 rounded-sm ${bp ? "" : "bg-black/[0.08]"}`}
                    style={{ width: `${w}%` }}
                  />
                ))}
              </Spec>
              <Spec bp={bp} label="card · r-10" className="mt-auto h-[38%]">
                <div className={`h-full w-full rounded-[10px] ${bp ? "" : "bg-white/80 shadow-sm"}`} />
              </Spec>
            </div>
          </div>
        </Spec>
      </div>

      {/* footer strip */}
      <Spec bp={bp} label="logos · 12 · gap 32" className="mt-10 flex w-fit items-center gap-8">
        <span className={`font-mono text-[11px] uppercase tracking-[0.08em] ${faint}`}>
          Trusted by teams at
        </span>
        {["Linear", "Vercel", "Arc", "Raycast"].map((n) => (
          <span key={n} className={`text-[13px] font-medium tracking-[-0.01em] ${faint}`}>
            {n}
          </span>
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
