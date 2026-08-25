// Visualization 3: Oscillator with posterize + modulateRotate feedback
(function() {
  window.vizFunctions['03'] = function() {
    hydra.osc(30,0.01,1)
      .mult(hydra.osc(20,-0.1,1).modulate(hydra.noise(3,1)).rotate(0.7))
      .posterize([3,10,2].fast(0.5).smooth(1))
      .modulateRotate(hydra.o0,()=>hydra.time*0.003)
      .out()
  };
})();
