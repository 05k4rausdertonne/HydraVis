// Visualization 4: Shape with time-based scale + src feedback loop
(function() {
  window.vizFunctions['04'] = function() {
    hydra.shape(3).add(hydra.osc(1,0.5,1), 1)
      .add(hydra.o1, () => (Math.sin(hydra.time/4) * 0.7 + 0.1))
      //.repeat(5)
        .scale(()=>Math.sin(hydra.time / 16)).rotate(0, -0.1)
      .out(hydra.o1)

    hydra.src(hydra.o1)
      .rotate(0,0.1)
      .out()

  };
})();
