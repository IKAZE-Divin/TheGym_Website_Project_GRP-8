gsap.registerPlugin(ScrollTrigger);

const vector1 = document.querySelector("#vector-1");
const vector2 = document.querySelector("#vector-2");
const vector3 = document.querySelector("#vector-3");
const vector4 = document.querySelector("#vector-4");
const vector5 = document.querySelector("#vector-5");
const vector6 = document.querySelector("#vector-6");
const heroText = document.querySelector("#hero-text");
const heroSection = document.querySelector("#hero-section");

const shapes = [vector1, vector2, vector3, vector4, vector5, vector6];

function setStartPositions() {
  shapes.forEach((el) => gsap.set(el, { y: 0 }));
}

const DURATION = {
  v3: 1.3,
  v1: 1.2,
  v6: 1.4,
  v5: 1.6,
  v4: 5.8,
  v2: 1.0,
};

ScrollTrigger.matchMedia({
  "(min-width: 1024px)": function () {
    setStartPositions();

    function setWrapperHeight() {
      const wrapper = document.querySelector("#hero-wrapper");
      const extraScrollDistance = window.innerHeight / 2.5;
      wrapper.style.height = `${heroSection.offsetHeight + extraScrollDistance}px`;
      ScrollTrigger.refresh();
    }
    setWrapperHeight();
    window.addEventListener("resize", setWrapperHeight);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-wrapper",
        pin: "#hero-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      defaults: { ease: "power2.out" },
    });

    tl.to(vector3, { y: -287, duration: DURATION.v3 }, 0);
    tl.to(vector1, { y: -277, duration: DURATION.v1 }, 0);
    tl.to(vector6, { y: -323, duration: DURATION.v6 }, 0);
    tl.to(vector6, { y: -323, duration: 3.6 }, DURATION.v6);
    tl.to(vector5, { y: -401, duration: DURATION.v5 }, 0);
    tl.to(vector4, { y: -763, duration: DURATION.v4 }, 0);
    tl.to(vector2, { y: -453, duration: DURATION.v2, ease: "none" }, 0);
    tl.to(heroText, { y: -224 * 0.7, duration: DURATION.v6, ease: "power2.out" }, 0);
    tl.to(vector3, { y: "-=150", duration: 1.6 }, DURATION.v5);
    tl.to(heroText, { y: "-=120", duration: 1.6 }, DURATION.v4);

    return () => {
      window.removeEventListener("resize", setWrapperHeight);
    };
  },

  "(max-width: 1023px)": function () {
    gsap.set(shapes, { y: 60, opacity: 0 });
    gsap.set(heroText, { y: 30, opacity: 0 });

    gsap.to([...shapes, heroText], {
      opacity: 1,
      y: 0,
      duration: 1.8,
      stagger: 0.08,
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top 30%",
      },
    });
  },
});