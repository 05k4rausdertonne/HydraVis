// Visualization 6: Oscillator with pixelate + kaleid + scroll + repeatX/Y + modulate
(function() {
  window.vizFunctions['06'] = function() {
    hydra.osc(10, 0.9, 300)
    .color(0.9, 0.7, 0.8)
    .diff(
      hydra.osc(45, 0.3, 100)
      .color(0.9, 0.9, 0.9)
      .rotate(0.18)
      .pixelate(12)
      .kaleid()
    )
    .scrollX(10)
    .colorama()
    .luma()
    .repeatX(4)
    .repeatY(4)
    .modulate(
      hydra.osc(1, -0.9, 300)
    )
    .scale(2)
    .out()
    
  };
})();
