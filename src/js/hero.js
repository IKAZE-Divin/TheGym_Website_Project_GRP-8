gsap.registerPlugin(ScrollTrigger);

const vector1 = document.querySelector("#vector-1");
const vector2 = document.querySelector("#vector-2");
const vector3 = document.querySelector("#vector-3");
const vector4 = document.querySelector("#vector-4");
const vector5 = document.querySelector("#vector-5");
const vector6 = document.querySelector("#vector-6");

const shapes = [vector1, vector2, vector3, vector4, vector5, vector6];

function setStartPositions() {
  shapes.forEach((el) => gsap.set(el, { y: 0 }));
}

setStartPositions();


const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#hero-wrapper",
    pin: "#hero-section",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    markers: true,
    onRefreshInit: setStartPositions,
  },
  defaults: { ease: "power2.out" },
});

const DURATION = {
  v3: 1.0, 
  v1: 1.2, 
  v6: 1.4, 
  v5: 1.6, 
  v4: 2.2, 
  v2: 2.3,
};

tl.to(vector3, { y: -254, duration: DURATION.v3 }, 0);
tl.to(vector1, { y: -277, duration: DURATION.v1 }, 0);
tl.to(vector6, { y: -323, duration: DURATION.v6 }, 0);
tl.to(vector5, { y: -401, duration: DURATION.v5 }, 0);
tl.to(vector4, { y: -763, duration: DURATION.v4 }, 0);
tl.to(vector2, { y: -453, duration: DURATION.v2, ease: "none" }, 0);

tl.to(vector3, { y: "-=60", duration: 0.6 }, DURATION.v5);


const TOTAL_DURATION = tl.duration();

tl.to(heroText, {
  y: -220,          
  opacity: "none",     
  ease: "none",
  duration: TOTAL_DURATION,
}, 0);