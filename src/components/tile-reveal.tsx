"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

export interface TileRevealProps {
  /** Content shown at rest. */
  front: ReactNode;
  /** Content revealed when a tile flips. */
  back: ReactNode;
  /** Grid density. */
  rows?: number;
  cols?: number;
  /** Cursor influence radius in px. */
  radius?: number;
  /** How long a tile stays flipped after the cursor moves on (ms). */
  hold?: number;
  /** Single flip duration (ms). */
  duration?: number;
  /** Max stagger across the influence radius (ms). */
  stagger?: number;
  /** Let a click lock the whole grid to the back side (cascades from the click point). */
  clickToLock?: boolean;
  className?: string;
  style?: CSSProperties;
}

const EASE = "cubic-bezier(0.22, 0.7, 0.2, 1)";

export function TileReveal({
  front,
  back,
  rows = 8,
  cols = 12,
  radius = 150,
  hold = 700,
  duration = 620,
  stagger = 140,
  clickToLock = true,
  className = "",
  style,
}: TileRevealProps) {
  const container = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const rect = useRef({ w: 0, h: 0 });
  const until = useRef<Float64Array>(new Float64Array(0));
  const flipped = useRef<Uint8Array>(new Uint8Array(0));
  const locked = useRef(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const raf = useRef<number | null>(null);

  const count = rows * cols;

  // Static per-tile geometry (percentages, so it survives resizes for free).
  const cells = useMemo(() => {
    const out: { cx: number; cy: number; clip: string; origin: string }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const top = (r / rows) * 100;
        const left = (c / cols) * 100;
        const bottom = 100 - ((r + 1) / rows) * 100;
        const right = 100 - ((c + 1) / cols) * 100;
        const cx = ((c + 0.5) / cols) * 100;
        const cy = ((r + 0.5) / rows) * 100;
        out.push({
          cx,
          cy,
          clip: `inset(${top}% ${right}% ${bottom}% ${left}%)`,
          origin: `${cx}% ${cy}%`,
        });
      }
    }
    return out;
  }, [rows, cols]);

  useEffect(() => {
    until.current = new Float64Array(count);
    flipped.current = new Uint8Array(count);
  }, [count]);

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      rect.current = { w: r.width, h: r.height };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const setTile = useCallback(
    (i: number, on: boolean, delay: number, dir: 1 | -1) => {
      const el = tiles.current[i];
      if (!el) return;
      flipped.current[i] = on ? 1 : 0;
      el.style.transitionDelay = `${Math.round(delay)}ms`;
      el.style.setProperty("--tr-dir", String(dir));
      el.dataset.flipped = on ? "true" : "false";
    },
    [],
  );

  // Expire tiles once their hold time passes. Only runs while something is flipped.
  const tick = useRef<() => void>(() => {});
  useEffect(() => {
    tick.current = () => {
      raf.current = null;
      if (locked.current) return;
      const now = performance.now();
      let pending = false;
      for (let i = 0; i < count; i++) {
        if (!flipped.current[i]) continue;
        if (now >= until.current[i]) {
          const el = tiles.current[i];
          if (el) {
            flipped.current[i] = 0;
            el.style.transitionDelay = "0ms";
            el.dataset.flipped = "false";
          }
        } else {
          pending = true;
        }
      }
      if (pending) raf.current = requestAnimationFrame(() => tick.current());
    };
  }, [count]);

  const schedule = useCallback(() => {
    if (raf.current == null) raf.current = requestAnimationFrame(() => tick.current());
  }, []);

  useEffect(() => {
    return () => {
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (locked.current) return;
    const el = container.current;
    if (!el) return;
    const { w, h } = rect.current;
    if (!w || !h) return;

    const box = el.getBoundingClientRect();
    const px = e.clientX - box.left;
    const py = e.clientY - box.top;

    // Flip direction follows the horizontal travel of the cursor.
    const prev = lastPointer.current;
    const dir: 1 | -1 = prev && px < prev.x ? -1 : 1;
    lastPointer.current = { x: px, y: py };

    const now = performance.now();
    const r2 = radius * radius;

    for (let i = 0; i < count; i++) {
      const cell = cells[i];
      const dx = (cell.cx / 100) * w - px;
      const dy = (cell.cy / 100) * h - py;
      const d2 = dx * dx + dy * dy;
      if (d2 > r2) continue;
      const d = Math.sqrt(d2);
      const t = d / radius; // 0 at cursor → 1 at edge
      until.current[i] = now + hold + t * stagger;
      if (!flipped.current[i]) setTile(i, true, t * stagger, dir);
    }
    schedule();
  };

  const onPointerLeave = () => {
    lastPointer.current = null;
  };

  const onClick = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!clickToLock) return;
    const el = container.current;
    if (!el) return;
    const { w, h } = rect.current;
    const box = el.getBoundingClientRect();
    const px = e.clientX - box.left;
    const py = e.clientY - box.top;
    const maxD = Math.hypot(Math.max(px, w - px), Math.max(py, h - py)) || 1;

    locked.current = !locked.current;
    const on = locked.current;
    const dir: 1 | -1 = on ? 1 : -1;

    for (let i = 0; i < count; i++) {
      const cell = cells[i];
      const d = Math.hypot((cell.cx / 100) * w - px, (cell.cy / 100) * h - py);
      const delay = (d / maxD) * 520;
      until.current[i] = performance.now() + delay + duration + hold;
      setTile(i, on, delay, dir);
    }
    if (!on) schedule();
  };

  return (
    <div
      ref={container}
      className={`relative overflow-hidden select-none [touch-action:pan-y] ${className}`}
      style={style}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      role={clickToLock ? "button" : undefined}
      tabIndex={clickToLock ? 0 : undefined}
      aria-label={clickToLock ? "Flip to reveal" : undefined}
    >
      {cells.map((cell, i) => (
        // Clipping and perspective live on this wrapper; the child does the 3D
        // rotation. Putting clip-path on the rotating element would flatten it
        // and break backface-visibility.
        <div
          key={i}
          aria-hidden={i !== 0}
          className="absolute inset-0 [perspective:1600px]"
          style={{ clipPath: cell.clip }}
        >
          <div
            ref={(el) => {
              tiles.current[i] = el;
            }}
            data-flipped="false"
            className="tr-tile absolute inset-0 will-change-transform [transform-style:preserve-3d]"
            style={{
              transformOrigin: cell.origin,
              transitionProperty: "transform",
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: EASE,
            }}
          >
            <div className="pointer-events-none absolute inset-0 [backface-visibility:hidden]">
              {front}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [backface-visibility:hidden]"
              style={{ transform: "rotateY(180deg)", transformOrigin: cell.origin }}
            >
              {back}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TileReveal;
