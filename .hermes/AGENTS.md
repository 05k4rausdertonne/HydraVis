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
├── index.js                     # Application loader + runtime glue code
└── visualisations/              # Self-registering visualization modules
    ├── viz-00.js                # Visualization 0 (random shapes + feedback)
    ├── viz-01.js                # ... up to viz-14.js (15 total)
    └── ...
```

## How it works

### Initialization flow

1. `index.html` loads `hydra-synth.js` then `index.js`.
2. On load, `index.js` dynamically loads all `visualisations/viz-*.js` files by iterating over a naming convention (`viz-00.js` through `viz-99.js`). Each file that exists is loaded via a `<script>` tag; missing files (404) are silently skipped — this is the discovery mechanism.
3. Each viz file self-registers itself to the global registry: `window.vizFunctions['<key>'] = function() { ... }`.
4. After all scripts load, a new `Hydra({makeGlobal: false, detectAudio: false}).synth` instance is created (stored in local `hydra` variable).
5. The URL parameter `?vis=<key>` (e.g. `?vis=07`) determines which visualization to show first. If absent or invalid, the first loaded viz is shown by default.
6. **Click/tap anywhere** reloads the page (`location.reload()`), which picks up a random next key from the registry and shows that visualisation.

### Key patterns in `index.js`

| Symbol | Purpose |
|---|---|
| `window.vizFunctions` (global) | Registry mapping viz keys (e.g. `'00'`, `'07'`) to their function implementations |
| `loadVizFiles()` | Iterates `viz-00.js`..`viz-99.js`, loads each via dynamic `<script>` tag, silently skips 404s |
| `getVizKeys()` | Returns `Object.keys(window.vizFunctions)` — the discovered set of loaded vizzes |
| `displayVisualization(nameOrIndex)` | Looks up a viz by key string or numeric index in the registry and calls it |
| `set_random_next()` | Picks a random viz key from the registry and writes it to the URL via `history.pushState` |
| `updateUrlWithIndex(nextVisName)` | Updates the URL bar with `?vis=<key>` (no page reload) |
| `getVisFromUrl()` | Reads `?vis=` query param; returns the key string or `null` |
| `reload_page()` | Calls `location.reload()` to restart with the new viz selected |

### Architecture change: from monolith to modules

**Before**: All visualisations lived as functions in an array inside a single `index.js` file (~260 lines). The URL param was numeric (`?visIndex=N`).

**After (current)**: Each visualization is an independent file under `visualisations/`, using the Module pattern (IIFE) to self-register. This gives:
- **Scalability**: Add a viz by dropping one file into `visualisations/` — no changes to core logic needed.
- **Isolation**: Bugs in one viz can't corrupt others; each runs in its own scope.
- **Dynamic discovery**: The loader iterates over a naming convention and discovers which files exist at runtime (404s are silently skipped).

## Key files

### `index.js` — Application glue code (~130 lines)

- Does NOT contain any visualization logic itself.
- Handles dynamic loading, registry management, URL param parsing, and click-to-reload wiring.
- The local `hydra` variable is set after viz files load so each viz can reference it.

### `visualisations/viz-NN.js` — Individual visualisation modules

Each file follows this pattern:

```javascript
(function() {
  function r(min=0,max=1) { return Math.random()*(max-min)+min; }
  window.vizFunctions['<key>'] = function() { 
    hydra.<chain-of-calls>().out();
  };
})();
```

- **IIFE wrapper**: Provides local scope (no global pollution).
- **Self-registration**: Assigns the viz function to `window.vizFunctions['<key>']` where `<key>` is a short string identifier.
- **Access to `hydra`**: The hydra-synth instance is available as a global at runtime (injected by `index.js`).
- Each viz should call `.out()` or `hydra.render()` on an output buffer.

### `hydra-synth.js` — Hydra library bundle

- Minified/bundled IIFE of the hydra-synth npm package (~1MB, 4300+ lines).
- Provides methods like `osc()`, `shape()`, `noise()`, `voronoi()`, `gradient()`, `.out()`, `.modulate()`, `.kaleid()`, etc.

### `hydra-source/hydra-main/` — Reference docs (read-only)

- The upstream hydra source tree, useful for API reference and examples.
- **Key files**: `README.md`, `/docs/funcs.md`, `/examples/README.md`.
- Do not modify directly; HydraVis bundles a static copy in `hydra-synth.js`.

## Hydra.js visualisation patterns

Each viz module:
1. Uses chained hydra methods to create and combine sources/effects
2. Outputs to output buffers (`o0`, `o1`, `o2`, `o3`) via `.out()` or `hydra.render()`
3. Has access to global `hydra` instance (set in `index.js` after viz files load)

Common hydra objects: `osc`, `shape`, `noise`, `voronoi`, `gradient`, `solid`, `src`, `o0`-`o3` (outputs), `s0` (source buffer).

## Tech notes

- **Zero dependencies at runtime** — everything is bundled into `hydra-synth.js`.
- Runs entirely client-side in the browser; no server needed.
- Requires a WebGL-capable browser (Chrome/Chromium recommended per upstream hydra docs).
- No build step — just serve these files from any static HTTP server.

## Development conventions

- **Adding visualisations**: Create a new file `visualisations/viz-NN.js` following the IIFE self-registration pattern. The key string must be unique across all viz files (e.g., `'07'`, `'aqua'`). No changes to `index.js` are needed.
- **Updating hydra-synth**: Replace `hydra-synth.js` with a newer build. Update from `hydra-source/hydra-main/` if needed, or rebuild via npm.
- Keep `style.css` minimal — the visualisations are full-screen WebGL canvases.
