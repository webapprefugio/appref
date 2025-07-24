const gallery = document.getElementById('videoGallery');
const indicadores = document.getElementById('indicadores');

// Função para atualizar a centralização visual
function atualizarCentralizacao() {
  const items = Array.from(gallery.querySelectorAll('.video-item'));
  const centroGaleria = gallery.scrollLeft + gallery.offsetWidth / 2;

  items.forEach((item) => item.classList.remove('central'));

  let central = items.reduce((prev, curr) => {
    const prevCenter = prev.offsetLeft + prev.offsetWidth / 2;
    const currCenter = curr.offsetLeft + curr.offsetWidth / 2;
    return Math.abs(currCenter - centroGaleria) < Math.abs(prevCenter - centroGaleria) ? curr : prev;
  });

  central.classList.add('central');
  atualizarIndicadores(items.indexOf(central));
}

// Rolagem automática
let scrollando = true;
function rolarAutomaticamente() {
  if (!scrollando) return;
  gallery.scrollBy({ left: 1, behavior: 'smooth' });
  requestAnimationFrame(rolarAutomaticamente);
}
rolarAutomaticamente();

// Rolagem infinita
gallery.addEventListener('scroll', () => {
  const cards = gallery.querySelectorAll('.video-item');
  const gap = 16;
  const scrollLeft = gallery.scrollLeft;
  const scrollWidth = gallery.scrollWidth;
  const clientWidth = gallery.clientWidth;

  if (scrollLeft <= 0) {
    const last = cards[cards.length - 1];
    gallery.insertBefore(last, cards[0]);
    gallery.scrollLeft += last.offsetWidth + gap;
  }

  if (scrollLeft + clientWidth >= scrollWidth - 1) {
    const first = cards[0];
    gallery.appendChild(first);
    gallery.scrollLeft -= first.offsetWidth + gap;
  }

  atualizarCentralizacao();
});

// Indicadores
function atualizarIndicadores(indiceCentral) {
  const total = gallery.querySelectorAll('.video-item').length;
  indicadores.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const ponto = document.createElement('span');
    ponto.textContent = '•';
    if (i === indiceCentral) ponto.classList.add('ativo');
    indicadores.appendChild(ponto);
  }
}

window.addEventListener('load', () => {
  atualizarCentralizacao();
  scrollando = true;
});
window.addEventListener('resize', atualizarCentralizacao);
