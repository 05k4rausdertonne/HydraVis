# HydraVis — Project Context for AI Agents

## What this project is

HydraVis is a **party visualizer** built on top of [hydra-synth](https://github.com/hydra-synth/hydra) (a WebGL-based livecoding visualisation library). It cycles through a set of pre-written Hydra.js visualisations, advancing with each click/tap on the screen.

## Directory structure

```
HydraVis/
├── README.md                    # Project readme
├── index.html                   # Minimal HTML shell (loads both scripts)
├── style.css                    # Bare CSS reset only
├── hydra-synth.js               # Bundled hydra-synth library (~4300 lines, browser IIFE)
├── index.js                     # Application code: viz array + click handler
└── hydra-source/                # Unpacked hydra source tree (read-only reference)
    └── hydra-main/              # Original hydra repo checkout
        ├── README.md            # Full hydra docs, API reference, examples
        ├── package.json         # Vite + npm build setup (not used by HydraVis directly)
        └── ...                  # Source code and dependencies of upstream hydra
```

## How it works

1. `index.html` loads `hydra-synth.js` then `index.js`.
2. On `DOMContentLoaded`, a new `Hydra({makeGlobal: false}).synth` instance is created (`hydra` variable).
3. The visualization at the given index (from `?visIndex=N` URL param, default 0) is run via `visualisations[index]()`.
4. A random next index is computed and written to the URL via `history.pushState`.
5. **Click/tap anywhere** reloads the page (`location.reload()`), which picks up the new `?visIndex=` and shows the next visualisation.

## Key files

### `index.js` — Application logic

- **`visualisations` array** (line 14–260): An array of 13 functions, each a self-contained Hydra.js pattern that writes to output buffers (`o0`, `o1`, etc.). This is the primary extensibility point.
- **`displayVisualization(index)`** (line 271): Calls the viz function at `index`.
- **`set_random_next()`** (line 262): Computes a random next index and updates URL state.
- **`display_next()`** (line 300): Advances to the next viz in sequence (not currently wired up; `set_random_next` is used instead).
- **Global `hydra` variable**: The hydra-synth instance, shared across all viz functions.

### `hydra-synth.js` — Hydra library bundle

- Minified/bundled IIFE of the hydra-synth npm package (~1MB, 4300+ lines).
- Provides the global `Hydra` constructor and methods like `osc()`, `shape()`, `noise()`, `voronoi()`, `gradient()`, `.out()`, `.modulate()`, `.kaleid()`, etc.

### `hydra-source/hydra-main/` — Reference docs

- The upstream hydra source tree, useful for API reference and examples.
- **Key files**: `README.md` (usage guide), `/docs/funcs.md` (complete function list), `/examples/README.md`.
- This directory is **read-only** — do not modify it directly. HydraVis bundles a static copy in `hydra-synth.js`.

## Hydra.js visualisation patterns

Each function in the `visualisations` array:
1. Uses chained hydra methods to create and combine sources/effects
2. Outputs to output buffers (`o0`, `o1`, `o2`, `o3`) via `.out()` or `.out(hydra.oN)`
3. May call `hydra.render(hydra.oN)` to display a specific buffer
4. Has access to global `time` and audio FFT array `a.fft[]`

Common hydra objects: `osc`, `shape`, `noise`, `voronoi`, `gradient`, `solid`, `src`, `o0`-`o3` (outputs), `s0` (source buffer).

## Tech notes

- **Zero dependencies at runtime** — everything is bundled into `hydra-synth.js`.
- Runs entirely client-side in the browser; no server needed.
- Requires a WebGL-capable browser (Chrome/Chromium recommended per upstream hydra docs).
- The app has no build step — just serve these files from any static HTTP server.

## Development conventions

- **Adding visualisations**: Append functions to the `visualisations` array in `index.js`. Each function should be self-contained and call `.out()` or `hydra.render()`.
- **Updating hydra-synth**: Replace `hydra-synth.js` with a newer build. Update from `hydra-source/hydra-main/` if needed, or rebuild via npm.
- Keep `style.css` minimal — the visualisations are full-screen WebGL canvases.
