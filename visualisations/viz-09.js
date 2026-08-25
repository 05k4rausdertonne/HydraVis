// Visualization 9: Multi-output feedback loop with noise, gradient, voronoi, shape
(function() {
  window.vizFunctions['09'] = function() {
    hydra.noise(3,0.3,3).thresh(0.3,0.03).diff(hydra.o3,0.3).out(hydra.o1)
    hydra.gradient([0.3,0.3,3]).diff(hydra.o0).blend(hydra.o1).out(hydra.o3)
    hydra.voronoi(33,3,30).rotate(3,0.3,0).modulateScale(hydra.o2,0.3).color(-3,3,0).brightness(3).out(hydra.o0)
    hydra.shape(30,0.3,1).invert(({time})=>Math.sin(time)*3).out(hydra.o2)

    hydra.render(hydra.o3)

  };
})();
