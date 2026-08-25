// Visualization 11: Oscillator with audio FFT responsiveness + feedback
(function() {
  window.vizFunctions['11'] = function() {
    hydra.osc(15, 0.01, 0.1).mult(hydra.osc(1, -0.1).modulate(hydra.osc(2).rotate(4,1), 20))
    .color(0,2.4,5)
    .saturate(0.4)
    .luma(1,0.1, (6, ()=> 1 + a.fft[3]))
    .scale(0.7, ()=> 0.7 + a.fft[3])
    .diff(hydra.o0)// hydra.o0
    .out(hydra.o0)// o1
  };
})();
