const carrossel = document.getElementById("videoGallery");
const indicadores = document.getElementById("indicadores").children;
const videoItems = document.querySelectorAll(".video-item");

// Clona os vídeos para permitir rolagem infinita
videoItems.forEach((item) => {
  carrossel.appendChild(item.cloneNode(true));
});

// Configurações de rolagem automática
let scrollSpeed = 1; // pixels por passo
let stepTime = 20; // milissegundos entre passos

function autoScroll() {
  carrossel.scrollLeft += scrollSpeed;

  // Quando chega no final, volta ao início (efeito infinito)
  if (carrossel.scrollLeft >= carrossel.scrollWidth / 2) {
    carrossel.scrollLeft = 0;
  }

  // Atualiza indicador central (baseado na posição do carrossel)
  const totalVideos = indicadores.length;
  const videoWidth = videoItems[0].offsetWidth + 16; // largura + margem
  const indexAtual = Math.floor(carrossel.scrollLeft / videoWidth) % totalVideos;

  Array.from(indicadores).forEach((dot, i) => {
    dot.style.background = i === indexAtual ? "#880e4f" : "#ccc";
  });
}

let scrollInterval = setInterval(autoScroll, stepTime);

// Restaura a rolagem infinita mesmo se o usuário rolar manualmente
carrossel.addEventListener("scroll", () => {
  if (carrossel.scrollLeft >= carrossel.scrollWidth / 2) {
    carrossel.scrollLeft = 0;
  } else if (carrossel.scrollLeft <= 0) {
    carrossel.scrollLeft = carrossel.scrollWidth / 2;
  }
});
