function initStickyVectors(containerId = 'hero-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const wrappers = Array.from(container.querySelectorAll('[data-sticky-vector]'));
  if (!wrappers.length) return;

  // Cache each image + its natural (un-transformed) top offset in px.
  const items = wrappers.map((wrapper) => {
    const img = wrapper.querySelector('img');
    return {
      img,
      naturalTop: parseFloat(getComputedStyle(img).top) || 0,
    };
  });

  let ticking = false;

  function update() {
    const containerRect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;

    items.forEach(({ img, naturalTop }) => {
      const elementHeight = img.offsetHeight;

      // Where the image WOULD be in the viewport with no transform applied.
      const naturalViewportTop = containerRect.top + naturalTop;

      // Where the container's bottom edge is, minus the element's own height —
      // this is the point past which we must release the "stick".
      const releasePoint = containerRect.top + containerHeight - elementHeight;

      let translateY = 0;

      if (naturalViewportTop <= 0 && releasePoint > 0) {
        // Not yet reached bottom-of-container limit: pin to top:0.
        translateY = -naturalViewportTop;
      } else if (releasePoint <= 0) {
        // Container's bottom has caught up: release, pin to container bottom instead.
        translateY = -naturalViewportTop + releasePoint;
      }
      // else: naturalViewportTop > 0 → hasn't reached top yet, no transform needed.

      img.style.transform = translateY ? `translateY(${translateY}px)` : '';
    });

    ticking = false;
  }

  function onScrollOrResize() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);

  // Run once up front (e.g. on refresh mid-page) and once images are loaded,
  // since offsetHeight is 0 until the image has actual dimensions.
  update();
  wrappers.forEach((wrapper) => {
    const img = wrapper.querySelector('img');
    if (!img.complete) img.addEventListener('load', update, { once: true });
  });
}

window.initStickyVectors = initStickyVectors;