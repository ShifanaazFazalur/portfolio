// Auto-scroller for sliders
document.querySelectorAll('.rect-slider').forEach(slider => {
  const cards = slider.querySelectorAll('.rect-card');
  const dotsContainer = slider.nextElementSibling;
  const totalSlides = Math.ceil(cards.length / 3);
  let currentSlide = 0;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);

    dot.addEventListener('click', () => {
      currentSlide = i;
      slider.scrollTo({ left: slider.clientWidth * currentSlide, behavior: 'smooth' });
      updateDots();
    });
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.dot').forEach((d, idx) => {
      d.classList.toggle('active', idx === currentSlide);
    });
  }

  // Auto-scroll every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    slider.scrollTo({ left: slider.clientWidth * currentSlide, behavior: 'smooth' });
    updateDots();
  }, 5000);
});
