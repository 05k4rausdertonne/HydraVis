// Global registry: maps viz names to their functions
window.vizFunctions = {};

let hydra;

// Discover which visualisation files were loaded by checking the global registry.
// Each file in visualisations/ registers itself under a unique key.
function getVizKeys() {
  return Object.keys(window.vizFunctions);
}

async function loadVizFiles() {
  const vizDir = 'visualisations';
  
  // Build script tags for every .js file found in the directory
  // We enumerate known files and let each one self-register.
  // If you add/remove files, just drop them in (or out of) that folder.
  // To discover them dynamically we load all matching files;
  // each viz-*.js registers itself via window.vizFunctions[name] = fn.
  
  // First, try to enumerate: fetch the directory listing or fall back to loading
  // every expected file and relying on self-registration.
  // Since browsers can't list directories, we use a convention:
  //   Each viz file must call: window.vizFunctions['<key>'] = function() { ... };
  
  // We'll load them in order by guessing the pattern — but to make it truly
  // dynamic, after loading any file that exists (404s are silently skipped),
  // we check what keys appeared and iterate over those.
  
  const scriptPromises = [];
  for (let i = 0; i < 100; i++) {
    const filename = `viz-${String(i).padStart(2, '0')}.js`;
    const url = `${vizDir}/${filename}`;
    scriptPromises.push(loadVizScript(url));
  }

  await Promise.all(scriptPromises);
}

// Helper to load a viz script dynamically (avoids conflict with hydra's built-in loadScript)
function loadVizScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => resolve(); // Silently skip missing files — that's how we discover which exist
    document.head.appendChild(script);
  });
}

function set_random_next() {
  const keys = getVizKeys();
  if (keys.length === 0) return;
  let random_number = Math.floor(Math.random() * keys.length);
  
  console.log(random_number);
  
  updateUrlWithIndex(keys[random_number]);
}

function displayVisualization(nameOrIndex) {
  // Support both string key and numeric index
  const keys = getVizKeys();
  let name;
  if (typeof nameOrIndex === 'number') {
    if (nameOrIndex >= 0 && nameOrIndex < keys.length) {
      name = keys[nameOrIndex];
    } else {
      console.error(`Invalid viz index: ${nameOrIndex}`);
      return;
    }
  } else {
    name = nameOrIndex;
  }
  
  if (!window.vizFunctions[name]) {
    console.error("Unknown visualization:", name);
    return;
  }

  console.log("Displaying visualization: " + name);

  try {
    window.vizFunctions[name]();
    console.log("Visualization " + name + " displayed successfully.");
  } catch (error) {
    console.error("Error displaying visualization " + name + ": " + error);
  }
}

function updateUrlWithIndex(nextVisName) {
  const newUrl = `${window.location.pathname}?vis=${encodeURIComponent(nextVisName)}`;
  window.history.pushState({path: newUrl}, '', newUrl);
}

function getVisFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('vis');
}

function reload_page() {
  location.reload();
}

// Wait for viz files to load, then initialize
loadVizFiles().then(() => {
  const keys = getVizKeys();
  
  // create a new hydra-synth instance
  hydra = new Hydra({makeGlobal: false, detectAudio: false }).synth;

  var canvases = document.querySelectorAll('canvas');
  canvases[0].style.backgroundColor = 'black';

  const visParam = getVisFromUrl();
  
  if (visParam && window.vizFunctions[visParam]) {
    displayVisualization(visParam);
  } else if (keys.length > 0) {
    // Default to the first loaded viz
    displayVisualization(keys[0]);
  }

  set_random_next();

  console.log(`Loaded ${keys.length} visualization(s): ${keys.join(', ')}`);
});

document.addEventListener('click', reload_page);
