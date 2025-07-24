const carrossel = document.getElementById("videoGallery");
const indicadores = document.getElementById("indicadores").children;
let videoItems = Array.from(document.querySelectorAll(".video-item"));

// Clona os vídeos no final e no início
videoItems.forEach((item) => {
  const cloneFim = item.cloneNode(true);
  const cloneInicio = item.cloneNode(true);
  carrossel.appendChild(cloneFim);
  carrossel.insertBefore(cloneInicio, carrossel.firstChild);
});

videoItems = Array.from(document.querySelectorAll(".video-item"));

// Define o tamanho de um item (incluindo margem se houver)
const itemWidth = videoItems[0].offsetWidth + 16;

// Inicializa na posição correta (primeiro original)
carrossel.scrollLeft = itemWidth * indicadores.length;

function autoScroll() {
  carrossel.scrollLeft += itemWidth;

  // Se passar do final dos originais, volta para o início
  if (carrossel.scrollLeft >= itemWidth * (indicadores.length * 2)) {
    carrossel.scrollLeft = itemWidth * indicadores.length;
  }

  atualizarIndicadores();
}

// Atualiza os indicadores com base na posição
function atualizarIndicadores() {
  const indexAtual = Math.floor(carrossel.scrollLeft / itemWidth) % indicadores.length;
  Array.from(indicadores).forEach((dot, i) => {
    dot.style.background = i === indexAtual ? "#880e4f" : "#ccc";
  });
}

// Autoplay a cada 7 segundos
let scrollInterval = setInterval(autoScroll, 7000);

// Reforça rolagem infinita manual (para trás e frente)
carrossel.addEventListener("scroll", () => {
  if (carrossel.scrollLeft >= itemWidth * (indicadores.length * 2)) {
    carrossel.scrollLeft = itemWidth * indicadores.length;
  } else if (carrossel.scrollLeft <= itemWidth * (indicadores.length - 1)) {
    carrossel.scrollLeft = itemWidth * (indicadores.length + 1);
  }

  atualizarIndicadores();
});