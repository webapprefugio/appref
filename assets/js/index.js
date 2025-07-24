const carrossel = document.getElementById("videoGallery");
const indicadores = document.getElementById("indicadores").children;
const videoItems = Array.from(document.querySelectorAll(".video-item"));
const itemWidth = videoItems[0].offsetWidth + 16;
const totalItems = videoItems.length;

let indexAtual = 0;
let scrollInterval;
let autoScrollAtivo = true;

function autoScroll() {
  if (!autoScrollAtivo) return;
  indexAtual = (indexAtual + 1) % totalItems;
  carrossel.scrollLeft = indexAtual * itemWidth;
  atualizarIndicadores();
}

function atualizarIndicadores() {
  Array.from(indicadores).forEach((dot, i) => {
    dot.classList.toggle("ativo", i === indexAtual);
  });
}

function iniciarAutoScroll() {
  scrollInterval = setInterval(autoScroll, 7000);
}

function pararAutoScrollPermanentemente() {
  clearInterval(scrollInterval);
  autoScrollAtivo = false;
}

// Botões de navegação
document.getElementById("anterior").addEventListener("click", () => {
  pararAutoScrollPermanentemente();
  indexAtual = (indexAtual - 1 + totalItems) % totalItems;
  carrossel.scrollLeft = indexAtual * itemWidth;
  atualizarIndicadores();
});

document.getElementById("proximo").addEventListener("click", () => {
  pararAutoScrollPermanentemente();
  indexAtual = (indexAtual + 1) % totalItems;
  carrossel.scrollLeft = indexAtual * itemWidth;
  atualizarIndicadores();
});

// Interações que cancelam autoplay
carrossel.addEventListener("touchstart", pararAutoScrollPermanentemente);
carrossel.addEventListener("mousedown", pararAutoScrollPermanentemente);

// Atualiza indicador ao rolar manualmente
carrossel.addEventListener("scroll", () => {
  if (!autoScrollAtivo) return;
  const novoIndex = Math.round(carrossel.scrollLeft / itemWidth);
  if (novoIndex !== indexAtual) {
    indexAtual = novoIndex % totalItems;
    atualizarIndicadores();
  }
});

// Inicializa
iniciarAutoScroll();
atualizarIndicadores();
