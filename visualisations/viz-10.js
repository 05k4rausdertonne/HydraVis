// Visualization 10: Oscillator with rotate, pixelate, mult, modulateRotate + audio FFT
(function() {
  window.vizFunctions['10'] = function() {
    hydra.osc(6, 0, 0.8)
      .color(1.14, 0.6,.80)
      .rotate(0.92, 0.3)
      .pixelate(20, 10)
      .mult(hydra.osc(40, 0.03).thresh(0.4).rotate(0, -0.02))
      .modulateRotate(hydra.osc(20, 0).thresh(0.3, 0.6), () => 0.1 + hydra.time * 0.002)
      .out(hydra.o0)
  };
})();
