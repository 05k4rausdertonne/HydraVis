// Visualization 8: Multi-layered shapes with scroll and voronoi modulation
(function() {
  window.vizFunctions['08'] = function() {
    hydra.shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7].smooth(1))
      .color(0.2,0.4,0.3)
      .scrollX(()=>Math.sin(hydra.time*0.27))
      .add(
        hydra.shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.5,0.3].smooth(1))
        .color(0.6,0.2,0.5)
        .scrollY(0.35)
        .scrollX(()=>Math.sin(hydra.time*0.33)))
      .add(
        hydra.shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.3].smooth(1))
        .color(0.2,0.4,0.6)
        .scrollY(-0.35)
        .scrollX(()=>Math.sin(hydra.time*0.41)*-1))
      .add(
        hydra.src(hydra.o0).shift(0.001,0.01,0.001)
            .scrollX([0.05,-0.05].fast(0.1).smooth(1))
            .scale([1.05,0.9].fast(0.3).smooth(1),[1.05,0.9,1].fast(0.29).smooth(1))
            ,0.85)
      .modulate(hydra.voronoi(10,2,2))
      .out()
  };
})();
