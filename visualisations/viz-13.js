// Visualization 13: Complex noise + posterize + kaleid + mask + modulateScale stack
(function() {
  window.vizFunctions['13'] = function() {
    hydra.noise(18)
    .colorama(1)
    .posterize(2)
    .kaleid(50)
    .mask(
      hydra.shape(25, 0.25).modulateScale(
        hydra.noise(400.5, 0.5)
      )
    )
    .mask(hydra.shape(400, 1, 2.125))
    .modulateScale(hydra.osc(6, 0.125, 0.05).kaleid(50))
    .mult(hydra.osc(20, 0.05, 2.4).kaleid(50), 0.25)
    .scale(1.75, 0.65, 0.5)
    .modulate(hydra.noise(0.5))
    .saturate(6)
    .posterize(4, 0.2)
    .scale(1.5)
    .out();
  };
})();
