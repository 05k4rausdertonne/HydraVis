// Visualization 5: Complex shape layering with time-based rotation + modulateScale
(function() {
  window.vizFunctions['05'] = function() {
    speed=1.2
    hydra.shape(99,.15,.5).color(0,1,2)

    .diff( hydra.shape(240,.5,0).scrollX(.05).rotate( ()=>hydra.time/10 ).color(1,0,.75) )
    .diff( hydra.shape(99,.4,.002).scrollX(.10).rotate( ()=>hydra.time/20 ).color(1,0,.75) )
    .diff( hydra.shape(99,.3,.002).scrollX(.15).rotate( ()=>hydra.time/30 ).color(1,0,.75) )
    .diff( hydra.shape(99,.2,.002).scrollX(.20).rotate( ()=>hydra.time/40 ).color(1,0,.75) )
    .diff( hydra.shape(99,.1,.002).scrollX(.25).rotate( ()=>hydra.time/50 ).color(1,0,.75) )

    .modulateScale(
      hydra.shape(240,.5,0).scrollX(.05).rotate( ()=>hydra.time/10 )
      , ()=>(Math.sin(hydra.time/3)*.2)+.2 )

    .scale(1.6,.6,1)
    .out()
  };
})();
