// Visualization 1: Oscillator with shape modulation and feedback
(function() {
  window.vizFunctions['01'] = function() {
    hydra.osc(0.506, 1.25)
      .mult(hydra.shape(0.869, 0.129)
        .rotate(0.191))
      .diff(hydra.gradient())
      .add(hydra.shape(1.307, 2)
        .blend(hydra.gradient(1.016)))
      .modulate(hydra.noise()
        .modulate(hydra.noise()
          .scrollY(0.919, 0.089)))
      .blend(hydra.o0)
      .color(0.241, -0.477, -1.077)
      .out();
  };
})();
