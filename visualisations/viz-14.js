// Visualization 14: Complex noise mult stack with time-based modulation
(function() {
  window.vizFunctions['14'] = function() {
    hydra.noise(6, 0.05)
    .mult(hydra.osc(9, 0, () => Math.sin(hydra.time / 1.5) + 2))
    .mult(
        hydra.noise(9, 0.03).brightness(1.2).contrast(2)
        .mult(hydra.osc(9, 0, () => Math.sin(hydra.time / 3) + 13))
    )
    .diff(
        hydra.noise(15, 0.04).brightness(0.2).contrast(1.3)
        .mult(hydra.osc(9, 0, () => Math.sin(hydra.time / 5) + 13))
        .rotate(() => hydra.time / 33)
    )
    .scale(() => Math.sin(hydra.time / 6.2) * 0.12 + 0.15)
    .modulateScale(
        hydra.osc(3, 0, 0).mult(hydra.osc(3, 0, 0).rotate(Math.PI / 2))
        .rotate(() => hydra.time / 25).scale(0.39).scale(1, 0.6, 1).invert(),
        () => Math.sin(hydra.time / 5.3) * 1.5 + 3
    )
    .rotate(() => hydra.time / 22)
    .mult(hydra.shape(100, 0.9, 0.01).scale(1, 0.6, 1))
    .out();
  };
})();
