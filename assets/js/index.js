const carrossel = document.getElementById("videoGallery");
const indicadorContainer = document.getElementById("indicadores");
const indicadores = Array.from(indicadorContainer.querySelectorAll(".dot"));
const setaEsquerda = indicadorContainer.querySelector(".seta-esquerda");
const setaDireita = indicadorContainer.querySelector(".seta-direita");

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
  indicadores.forEach((dot, i) => {
    dot.textContent = "⭕️";
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

setaDireita.addEventListener("click", () => {
  pararAutoScrollPermanentemente();
  indexAtual = (indexAtual + 1) % totalItems;
  carrossel.scrollLeft = indexAtual * itemWidth;
  atualizarIndicadores();
});

setaEsquerda.addEventListener("click", () => {
  pararAutoScrollPermanentemente();
  indexAtual = (indexAtual - 1 + totalItems) % totalItems;
  carrossel.scrollLeft = indexAtual * itemWidth;
  atualizarIndicadores();
});

carrossel.addEventListener("touchstart", pararAutoScrollPermanentemente);
carrossel.addEventListener("mousedown", pararAutoScrollPermanentemente);

// Inicializa
iniciarAutoScroll();
atualizarIndicadores();
