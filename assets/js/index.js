// index.js - Carrossel de vídeos com rolagem automática, infinita e toque no celular

const galeria = document.querySelector('.carrossel-videos');
const indicadores = document.querySelector('.indicadores');
const videos = Array.from(galeria.children);

let intervaloAutoScroll;
let larguraItem = 0;
const gap = 16;

// Cria os indicadores (...)
function criarIndicadores() {
  indicadores.innerHTML = '';
  videos.forEach((_, i) => {
    const ponto = document.createElement('span');
    ponto.textContent = '•';
    if (i === 0) ponto.classList.add('ativo');
    indicadores.appendChild(ponto);
  });
}

// Atualiza item central e indicador
function atualizarItemCentral() {
  const centro = galeria.scrollLeft + galeria.offsetWidth / 2;
  let central = videos[0];
  let distanciaMin = Infinity;

  videos.forEach(item => {
    const centroItem = item.offsetLeft + item.offsetWidth / 2;
    const distancia = Math.abs(centroItem - centro);
    if (distancia < distanciaMin) {
      distanciaMin = distancia;
      central = item;
    }
    item.classList.remove('central');
  });

  central.classList.add('central');
  const index = videos.indexOf(central);
  atualizarIndicadores(index);
}

function atualizarIndicadores(indexAtivo) {
  const pontos = indicadores.querySelectorAll('span');
  pontos.forEach((p, i) => {
    p.classList.toggle('ativo', i === indexAtivo);
  });
}

// Loop infinito
function verificarLoopInfinito() {
  const scrollLeft = galeria.scrollLeft;
  const scrollWidth = galeria.scrollWidth;
  const clientWidth = galeria.clientWidth;

  if (scrollLeft <= 0) {
    const ultimo = galeria.lastElementChild;
    galeria.insertBefore(ultimo, galeria.firstElementChild);
    galeria.scrollLeft += ultimo.offsetWidth + gap;
  }

  if (scrollLeft + clientWidth >= scrollWidth - 1) {
    const primeiro = galeria.firstElementChild;
    galeria.appendChild(primeiro);
    galeria.scrollLeft -= primeiro.offsetWidth + gap;
  }
}

// Rolagem automática
function iniciarAutoScroll() {
  pararAutoScroll();
  intervaloAutoScroll = setInterval(() => {
    galeria.scrollLeft += larguraItem + gap;
  }, 4000);
}

function pararAutoScroll() {
  clearInterval(intervaloAutoScroll);
}

// Toque para rolagem manual no celular
let tocando = false;
let inicioX = 0;
let scrollInicio = 0;

galeria.addEventListener('touchstart', (e) => {
  pararAutoScroll();
  tocando = true;
  inicioX = e.touches[0].clientX;
  scrollInicio = galeria.scrollLeft;
}, { passive: true });

galeria.addEventListener('touchmove', (e) => {
  if (!tocando) return;
  const deslocamento = e.touches[0].clientX - inicioX;
  galeria.scrollLeft = scrollInicio - deslocamento;
}, { passive: true });

galeria.addEventListener('touchend', () => {
  tocando = false;
  iniciarAutoScroll();
});

galeria.addEventListener('scroll', () => {
  verificarLoopInfinito();
  atualizarItemCentral();
});

galeria.addEventListener('mouseenter', pararAutoScroll);
galeria.addEventListener('mouseleave', iniciarAutoScroll);

// Inicialização
window.addEventListener('load', () => {
  larguraItem = galeria.querySelector('.video-item').offsetWidth;
  criarIndicadores();
  atualizarItemCentral();
  iniciarAutoScroll();
});

window.addEventListener('resize', () => {
  larguraItem = galeria.querySelector('.video-item').offsetWidth;
  atualizarItemCentral();
});
