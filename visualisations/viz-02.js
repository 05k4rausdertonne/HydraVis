// Visualization 2: Voronoi + kaleidoscope + webcam compositing
(function() {
  window.vizFunctions['02'] = function() {
    hydra.voronoi(5,-0.1,5)
      .add(hydra.osc(1,0,1)).kaleid(21)
      .scale(1,1,2).colorama().out(hydra.o1)
    hydra.src(hydra.o1).mult(hydra.src(hydra.s0).modulateRotate(hydra.o1,100), -0.5)
      .out(hydra.o0)
  };
})();
