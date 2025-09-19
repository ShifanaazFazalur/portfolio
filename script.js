/* Smooth ping-pong scroller with live dots (Skills & Classes) */
(function () {
  const IDS = ["skills", "classes"];   // ← make sure classes is here

  IDS.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const slider = section.querySelector(".slider");
    const dotsWrap = section.querySelector(".slider-dots");
    if (!slider || !dotsWrap) return;

    // optional per-row speed override: data-speed="60" (px/sec)
    let speed = Number(slider.dataset.speed || 60);
    let dir = 1, raf = null, lastTs = 0, max = 0, pages = 1;

    const pageSize = () => slider.clientWidth;

    function compute() {
      max = Math.max(0, slider.scrollWidth - slider.clientWidth);
      pages = Math.max(1, Math.round(slider.scrollWidth / pageSize()));
      buildDots(); updateDots();
    }
    function buildDots() {
      dotsWrap.innerHTML = "";
      if (pages <= 1) return;
      for (let i = 0; i < pages; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.addEventListener("click", () =>
          slider.scrollTo({ left: i * pageSize(), behavior: "smooth" })
        );
        dotsWrap.appendChild(dot);
      }
    }
    function updateDots() {
      const dots = dotsWrap.querySelectorAll(".dot");
      if (!dots.length) return;
      const idx = Math.round(slider.scrollLeft / pageSize());
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
    }
    function step(ts) {
      if (!lastTs) lastTs = ts;
      const dt = (ts - lastTs) / 1000; lastTs = ts;
      slider.scrollLeft += dir * speed * dt;
      if (slider.scrollLeft <= 0) { slider.scrollLeft = 0; dir = 1; }
      else if (slider.scrollLeft >= max) { slider.scrollLeft = max; dir = -1; }
      updateDots();
      raf = requestAnimationFrame(step);
    }
    function start(){ if (!raf) { lastTs = 0; raf = requestAnimationFrame(step); } }
    function stop(){ if (raf) { cancelAnimationFrame(raf); raf = null; } }

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("touchstart", stop, { passive:true });
    slider.addEventListener("touchend", start);
    slider.addEventListener("scroll", updateDots, { passive:true });

    const io = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), {threshold:.15});
    io.observe(slider);

    const ro = new ResizeObserver(compute);
    ro.observe(slider);
    window.addEventListener("load", compute);
    setTimeout(compute, 500); setTimeout(compute, 2000);
    compute();
  });
})();


function buildDots() {
  dotsWrap.innerHTML = "";
  const pages = pageCount();

  // ALWAYS show dots for Classes/Skills (min 2)
  const dotCount = Math.max(2, pages);

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", () =>
      slider.scrollTo({ left: i * pageSize(), behavior: "smooth" })
    );
    dotsWrap.appendChild(dot);
  }
}
