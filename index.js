
let hydra;


// hydra.osc(0.5,1.25).mult(hydra.shape(1,0.09).rotate(1.5))
//     .diff(hydra.gradient())
//     .add(hydra.shape(2,2).blend(hydra.gradient(1)))
//     .modulate(hydra.noise()
//               .modulate(hydra.noise().scrollY(1,0.0625)))
//     .blend(hydra.o0)
//     .color(1,-0.5,-0.75)
//     .out()

let visualisations = [
  function() { 
    function r(min=0,max=1) { return Math.random()*(max-min)+min; }
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
  },

  function() {
    
    hydra.osc(0.506, 1.25)
      .mult(hydra.shape(0.869, 0.129)
        .rotate(0.191))
      .diff(hydra.gradient())
      .add(hydra.shape(1.307, 2)
        .blend(hydra.gradient(1.016)))
      .modulate(hydra.noise()
        .modulate(hydra.noise()
          .scrollY(0.919, 0.089)))
      .blend(hydra.o0)
      .color(0.241, -0.477, -1.077)
      .out();
  },

  function() {

    hydra.voronoi(5,-0.1,5)
      .add(hydra.osc(1,0,1)).kaleid(21)
      .scale(1,1,2).colorama().out(hydra.o1)
    hydra.src(hydra.o1).mult(hydra.src(hydra.s0).modulateRotate(hydra.o1,100), -0.5)
      .out(hydra.o0)
  },

  function() {
    hydra.osc(30,0.01,1)
      .mult(hydra.osc(20,-0.1,1).modulate(hydra.noise(3,1)).rotate(0.7))
      .posterize([3,10,2].fast(0.5).smooth(1))
      .modulateRotate(hydra.o0,()=>hydra.time*0.003)
      .out()
  },

  function() {
    hydra.shape(3).add(hydra.osc(1,0.5,1), 1)
      .add(hydra.o1, () => (Math.sin(hydra.time/4) * 0.7 + 0.1))
      //.repeat(5)
        .scale(()=>Math.sin(hydra.time / 16)).rotate(0, -0.1)
      .out(hydra.o1)

    hydra.src(hydra.o1)
      .rotate(0,0.1)
      .out()

  },

  function() {

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
  },

  function() {
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
    
  },

  function() {

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
  },

  function () {

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
  },

  function () {

    hydra.noise(3,0.3,3).thresh(0.3,0.03).diff(hydra.o3,0.3).out(hydra.o1)
    hydra.gradient([0.3,0.3,3]).diff(hydra.o0).blend(hydra.o1).out(hydra.o3)
    hydra.voronoi(33,3,30).rotate(3,0.3,0).modulateScale(hydra.o2,0.3).color(-3,3,0).brightness(3).out(hydra.o0)
    hydra.shape(30,0.3,1).invert(({time})=>Math.sin(time)*3).out(hydra.o2)

    hydra.render(hydra.o3)

  },

  function () {

    hydra.osc(6, 0, 0.8)
      .color(1.14, 0.6,.80)
      .rotate(0.92, 0.3)
      .pixelate(20, 10)
      .mult(hydra.osc(40, 0.03).thresh(0.4).rotate(0, -0.02))
      .modulateRotate(hydra.osc(20, 0).thresh(0.3, 0.6), () => 0.1 + hydra.time * 0.002)
      .out(hydra.o0)
  },

  function () {

    hydra.osc(15, 0.01, 0.1).mult(hydra.osc(1, -0.1).modulate(hydra.osc(2).rotate(4,1), 20))
    .color(0,2.4,5)
    .saturate(0.4)
    .luma(1,0.1, (6, ()=> 1 + a.fft[3]))
    .scale(0.7, ()=> 0.7 + a.fft[3])
    .diff(hydra.o0)// hydra.o0
    .out(hydra.o0)// o1
  },

  function () {

    hydra.osc(60,-0.015,0.3).diff(hydra.osc(60,0.08).rotate(Math.PI/2))
    .modulateScale(hydra.noise(3.5,0.25).modulateScale(hydra.osc(15).rotate(()=>Math.sin(time/2))),0.6)
    .color(1,0.5,0.4).contrast(1.4)
    .add(hydra.src(hydra.o0).modulate(hydra.o0,.04),.6)
    .invert().brightness(0.1).contrast(1.2)
    .modulateScale(hydra.osc(2),-0.2)
    .out()
  },

  function () {

    hydra.noise(18)
    .colorama(1)
    .posterize(2)
    .kaleid(50)
    .mask(
      hydra.shape(25, 0.25).modulateScale(
        hydra.noise(400.5, 0.5)
      )
    )
    .mask(hydra.shape(400, 1, 2.125))
    .modulateScale(hydra.osc(6, 0.125, 0.05).kaleid(50))
    .mult(hydra.osc(20, 0.05, 2.4).kaleid(50), 0.25)
    .scale(1.75, 0.65, 0.5)
    .modulate(hydra.noise(0.5))
    .saturate(6)
    .posterize(4, 0.2)
    .scale(1.5)
    .out();
  },

  function () {

    hydra.noise(6, 0.05)
    .mult(hydra.osc(9, 0, () => Math.sin(hydra.time / 1.5) + 2))
    .mult(
        hydra.noise(9, 0.03).brightness(1.2).contrast(2)
        .mult(hydra.osc(9, 0, () => Math.sin(hydra.time / 3) + 13))
    )
    .diff(
        hydra.noise(15, 0.04).brightness(0.2).contrast(1.3)
        .mult(hydra.osc(9, 0, () => Math.sin(hydra.time / 5) + 13))
        .rotate(() => hydra.time / 33)
    )
    .scale(() => Math.sin(hydra.time / 6.2) * 0.12 + 0.15)
    .modulateScale(
        hydra.osc(3, 0, 0).mult(hydra.osc(3, 0, 0).rotate(Math.PI / 2))
        .rotate(() => hydra.time / 25).scale(0.39).scale(1, 0.6, 1).invert(),
        () => Math.sin(hydra.time / 5.3) * 1.5 + 3
    )
    .rotate(() => hydra.time / 22)
    .mult(hydra.shape(100, 0.9, 0.01).scale(1, 0.6, 1))
    .out();
  }
]

function set_random_next() {

  let random_number = Math.floor(Math.random() * visualisations.length);
  
  console.log(random_number)
  
  updateUrlWithIndex(random_number);
}

function displayVisualization(index) {
  
  console.log("Displaying visualization index: " + index);

  // Run the current visualization
  try {
    visualisations[index]();
    console.log("Visualization " + index + " displayed successfully.");
  } catch (error) {
    console.error("Error displaying visualization " + index + ": " + error);
  }
}

function updateUrlWithIndex(nextVisIndex) {
  // Construct the new URL with the nextVisIndex as a query parameter
  const newUrl = `${window.location.pathname}?visIndex=${nextVisIndex}`;
  // Update the URL without reloading the page
  window.history.pushState({path: newUrl}, '', newUrl);
}

function getVisIndexFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('visIndex'); // Retrieves the 'visIndex' parameter from the URL
}

function reload_page() {
  location.reload();
}

function display_next() {
  display_index(lastVis);
  // Move to next visualization, wrap around if at end of array
  lastVis = (lastVis + 1) % visualisations.length;
}

document.addEventListener('DOMContentLoaded', function() {
  const visIndex = getVisIndexFromUrl();

  // var hydra_canvas = document.getElementById('hydra-canvas');

  // create a new hydra-synth instance
  hydra = new Hydra({makeGlobal: false, detectAudio: false }).synth;

  // Select all canvas elements using querySelectorAll
  var canvases = document.querySelectorAll('canvas');

  // Loop through each canvas and add the class "bg-black"
  
  canvases[0].style.backgroundColor = 'black';

  if (visIndex !== null) {
    displayVisualization(parseInt(visIndex, 10)); // Ensure it's treated as a number
  }
  else {
    displayVisualization(0);
  }
  set_random_next();
});

document.addEventListener('click', reload_page); // Adding event listener for click/tap

console.log("number of vizualisations: " + visualisations.length);
// setInterval(reload_page, 600000);
