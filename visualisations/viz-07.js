// Visualization 7: Nested layers with solid().layer() and modulateScale
(function() {
  window.vizFunctions['07'] = function() {
    pat = ()=>
    hydra.solid()
      .layer(hydra.solid().diff(
        hydra.osc((hydra.time/16) * 1, (hydra.time/1000) * 0.2  )
          .mult(hydra.osc((hydra.time/8) * 1, (hydra.time/1006) * 0.2  ).rotate(1.57))
          .modulate((hydra.shape(106,1,0.05)))
          .mult(hydra.shape(106,1,0.05))
        ))
        .modulateScale(hydra.osc(2,0.125),0.125)
      //
      hydra.solid()
      .layer(hydra.solid(1,1,1)
        .mult(pat()
        .diff(hydra.src(hydra.o0).scale(0.2).mult(hydra.solid(),[0.7,0.6,0.4,0.6]).kaleid(1.01).saturate(0.3))
      )
      .layer(hydra.solid(1,1,1)
          .mask(
            hydra.noise(2,0.05)
            .invert().colorama(2).posterize(8,4).luma(0.25).thresh(0.5)
            .modulateRotate(hydra.osc(1,0.5))
          )
          .mult(hydra.gradient(0.5).kaleid(1).colorama(2).saturate(1.1).contrast(1.6).mult(hydra.solid(),0.45))
        ))
        .out()
      //
      hydra.speed= 0.5
  };
})();
