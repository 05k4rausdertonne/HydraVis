// Visualization 12: Oscillator with modulateScale + feedback loop
(function() {
  window.vizFunctions['12'] = function() {
    hydra.osc(60,-0.015,0.3).diff(hydra.osc(60,0.08).rotate(Math.PI/2))
    .modulateScale(hydra.noise(3.5,0.25).modulateScale(hydra.osc(15).rotate(()=>Math.sin(time/2))),0.6)
    .color(1,0.5,0.4).contrast(1.4)
    .add(hydra.src(hydra.o0).modulate(hydra.o0,.04),.6)
    .invert().brightness(0.1).contrast(1.2)
    .modulateScale(hydra.osc(2),-0.2)
    .out()
  };
})();
