# Tile Reveal

A hero section that's secretly a grid of tiles. Move your cursor and the tiles under it flip over in a wave to show what's underneath, then settle back. Click empty space to flip the whole thing and hold it.

The demo puts a landing page on the front and its **blueprint** on the back: the same layout as dashed outlines on grid paper, with type specs and dimensions in monospace.

**Live:** https://starknightt.github.io/tile-reveal/

React + Tailwind. No canvas, no animation library.

## Usage

Copy `src/components/tile-reveal.tsx` into your project and add the flip rule from `src/app/globals.css` (the `.tr-tile` block).

```tsx
import { TileReveal } from "@/components/tile-reveal";

<TileReveal
  front={<Hero variant="design" />}
  back={<Hero variant="blueprint" />}
  overlay={<Hero variant="design" />}   // optional: real links/buttons on top
  rows={8}
  cols={12}
  radius={150}
  className="h-[600px] w-[880px]"
/>
```

`front` and `back` should be full-size layouts (`h-full w-full`). If they share the same structure, the swap looks like the page itself turning over.

| Prop | Default | What it does |
| --- | --- | --- |
| `front` / `back` | — | Content at rest / content revealed on flip |
| `overlay` | — | Invisible interactive copy rendered on top; only its `<a>`/`<button>` elements are hit-testable. Also the only copy exposed to assistive tech. |
| `rows`, `cols` | `8`, `12` | Grid density |
| `radius` | `150` | Cursor influence radius (px) |
| `hold` | `700` | How long a tile stays flipped after the cursor moves on (ms) |
| `duration` | `620` | Flip duration (ms) |
| `stagger` | `140` | Max transition delay across the radius (ms): the wave |
| `clickToLock` | `true` | Click empty space to cascade the whole grid and hold it |

## How it works

- Every tile is a full-size copy of the content clipped to its cell with `clip-path`, so content stays pixel-aligned across tile edges.
- Inside each clipped cell, a `preserve-3d` element holds two faces with `backface-visibility: hidden`; rotating it 180° swaps them. Clip and rotation live on separate elements because `clip-path` on the rotating one would flatten it and break backface culling.
- One `pointermove` handler computes distance to each cell center; tiles inside `radius` flip with a `transition-delay` proportional to distance. Flip direction follows cursor travel via a CSS variable.
- No React state on the hot path: the handler writes `data-flipped` and `--tr-dir` straight to the DOM and CSS transitions do the rest. A single `requestAnimationFrame` loop unflips tiles when their hold expires.
- The tiled copies are `inert` and `aria-hidden`; `prefers-reduced-motion` zeroes the transitions.

## Run locally

```bash
pnpm install
pnpm dev
```

## License

MIT
