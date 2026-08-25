// Visualization 0: Random shapes + feedback loop
(function() {
  function r(min=0,max=1) { return Math.random()*(max-min)+min; }
  window.vizFunctions['00'] = function() { 
    hydra.solid(1,1,1)
    .diff(hydra.shape([4,4,4,24].smooth().fast(.5),r(0.6,0.93),.09).repeat(20,10))
    .modulateScale(hydra.osc(8).rotate(r(-.5,.5)),.52)
    .add(
      hydra.src(hydra.o0).scale(0.965).rotate(.012*(Math.round(r(-2,1))))
          .color(r(),r(),r())
        .modulateRotate(hydra.o0,r(0,0.5))
          .brightness(.15)
          ,.7)
    .out()
  };
})();
