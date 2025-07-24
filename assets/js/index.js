const carrossel = document.getElementById("videoGallery");
const indicadores = document.getElementById("indicadores").children;
let videoItems = document.querySelectorAll(".video-item");

// Clona os vídeos para permitir rolagem infinita visual
videoItems.forEach((item) => {
  const clone = item.cloneNode(true);
  carrossel.appendChild(clone);
});

videoItems = document.querySelectorAll(".video-item"); // Atualiza após clonar

// Configurações
let scrollSpeed = 1; // pixels por passo
let stepTime = 15; // milissegundos entre passos

function autoScroll() {
  carrossel.scrollLeft += scrollSpeed;

  const itemWidth = videoItems[0].offsetWidth + 16;
  const totalWidth = itemWidth * videoItems.length;

  // Se passou da metade (fim dos originais), reseta
  if (carrossel.scrollLeft >= totalWidth / 2) {
    carrossel.scrollLeft = 0;
  }

  // Atualiza indicador
  const totalVideos = indicadores.length;
  const indexAtual = Math.floor(carrossel.scrollLeft / itemWidth) % totalVideos;
  Array.from(indicadores).forEach((dot, i) => {
    dot.style.background = i === indexAtual ? "#880e4f" : "#ccc";
  });
}

let scrollInterval = setInterval(autoScroll, stepTime);

// Restaura rolagem infinita mesmo com rolagem manual
carrossel.addEventListener("scroll", () => {
  const itemWidth = videoItems[0].offsetWidth + 16;
  const totalWidth = itemWidth * videoItems.length;
  if (carrossel.scrollLeft >= totalWidth / 2) {
    carrossel.scrollLeft = 0;
  } else if (carrossel.scrollLeft <= 0) {
    carrossel.scrollLeft = totalWidth / 2;
  }
});
