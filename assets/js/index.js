const carrossel = document.querySelector('#videoGallery');
let scrollAmount = 0;
const scrollStep = 310;
const delay = 4000;

function autoScroll() {
  if (!carrossel) return;
  scrollAmount += scrollStep;

  if (scrollAmount >= carrossel.scrollWidth - carrossel.clientWidth) {
    scrollAmount = 0;
  }

  carrossel.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

setInterval(autoScroll, delay);

// Rolagem infinita ao arrastar manualmente
carrossel.addEventListener('scroll', () => {
  const maxScrollLeft = carrossel.scrollWidth - carrossel.clientWidth;

  if (carrossel.scrollLeft <= 0) {
    carrossel.scrollLeft = maxScrollLeft - 1;
  } else if (carrossel.scrollLeft >= maxScrollLeft) {
    carrossel.scrollLeft = 1;
  }
});
