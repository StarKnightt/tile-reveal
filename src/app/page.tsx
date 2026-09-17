import { TileReveal } from "@/components/tile-reveal";

type Variant = "light" | "dark";

function Hero({ variant }: { variant: Variant }) {
  const dark = variant === "dark";
  return (
    <div
      className={`flex h-full w-full flex-col justify-center px-10 sm:px-16 ${
        dark ? "bg-[#0a0a0a] text-white" : "bg-white text-[#111]"
      }`}
    >
      <p className="font-serif italic text-[clamp(2.75rem,6vw,4.5rem)] leading-none tracking-[-0.01em]">
        {dark ? "Also," : "Hey,"}
      </p>

      <p className="mt-8 max-w-[26ch] text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.25] tracking-[-0.015em]">
        {dark ? (
          <>
            I <span className="font-serif italic">ship</span> them. Next.js,
            Tailwind, and an{" "}
            <span className={dark ? "text-[#a3a3a3]" : "text-[#737373]"}>
              unreasonable
            </span>{" "}
            amount of care.
          </>
        ) : (
          <>
            I design <span className="font-serif italic">calm</span> interfaces
            for people who notice the{" "}
            <span className="text-[#737373]">details</span>.
          </>
        )}
      </p>

      <p
        className={`mt-5 font-serif italic text-[15px] ${
          dark ? "text-white/45" : "text-black/40"
        }`}
      >
        {dark ? "click again to go back" : "move your cursor · click to keep it"}
      </p>

      <div className="mt-8 flex items-center gap-3 text-[14px]">
        <span
          className={`rounded-full border px-4 py-2 font-serif italic ${
            dark ? "border-white/20 text-white" : "border-black/15 text-black"
          }`}
        >
          Book a call
        </span>
        <span
          className={`rounded-full px-4 py-2 font-serif italic ${
            dark ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          See work →
        </span>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="flex flex-1 items-center justify-center bg-white p-6">
      <TileReveal
        front={<Hero variant="light" />}
        back={<Hero variant="dark" />}
        rows={8}
        cols={12}
        radius={150}
        className="h-[min(80vh,600px)] w-[min(92vw,880px)] rounded-2xl"
      />
    </main>
  );
}
