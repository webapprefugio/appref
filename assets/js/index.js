const carrossel = document.getElementById("videoGallery");
const indicadores = document.getElementById("indicadores").children;
let videoItems = Array.from(document.querySelectorAll(".video-item"));

// Clona os vídeos para criar efeito de rolagem infinita
videoItems.forEach((item) => {
  const clone = item.cloneNode(true);
  carrossel.appendChild(clone);
});

videoItems = Array.from(document.querySelectorAll(".video-item"));

// Define o tamanho de um item (incluindo margem se houver)
const itemWidth = videoItems[0].offsetWidth + 16;

function autoScroll() {
  carrossel.scrollLeft += itemWidth;

  // Se chegar ao final da galeria, volta para o início
  if (carrossel.scrollLeft >= carrossel.scrollWidth / 2) {
    carrossel.scrollLeft = 0;
  }

  // Atualiza os indicadores
  const totalIndicadores = indicadores.length;
  const indexAtual = Math.floor(carrossel.scrollLeft / itemWidth) % totalIndicadores;
  Array.from(indicadores).forEach((dot, i) => {
    dot.style.background = i === indexAtual ? "#880e4f" : "#ccc";
  });
}

// Rola automaticamente a cada 4 segundos
let scrollInterval = setInterval(autoScroll, 4000);

// Reforça rolagem infinita também ao rolar manualmente
carrossel.addEventListener("scroll", () => {
  if (carrossel.scrollLeft >= carrossel.scrollWidth / 2) {
    carrossel.scrollLeft = 0;
  } else if (carrossel.scrollLeft <= 0) {
    carrossel.scrollLeft = carrossel.scrollWidth / 2;
  }

  // Atualiza os indicadores manualmente
  const totalIndicadores = indicadores.length;
  const indexAtual = Math.floor(carrossel.scrollLeft / itemWidth) % totalIndicadores;
  Array.from(indicadores).forEach((dot, i) => {
    dot.style.background = i === indexAtual ? "#880e4f" : "#ccc";
  });
});
