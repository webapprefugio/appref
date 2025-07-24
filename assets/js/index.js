const videoGallery = document.getElementById("videoGallery");
const indicadores = document.getElementById("indicadores").children;
const btnProximo = document.getElementById("proximo");
const btnAnterior = document.getElementById("anterior");

let videoIndex = 0;
let totalVideos = videoGallery.children.length;
let autoScrollInterval = null;
let autoScrollTimeout = null;

// Clonar os primeiros e últimos vídeos para efeito infinito
function clonarVideos() {
  const primeiros = [];
  const ultimos = [];

  for (let i = 0; i < 2; i++) {
    primeiros.push(videoGallery.children[i].cloneNode(true));
    ultimos.push(videoGallery.children[totalVideos - 1 - i].cloneNode(true));
  }

  ultimos.reverse().forEach(el => videoGallery.insertBefore(el, videoGallery.firstChild));
  primeiros.forEach(el => videoGallery.appendChild(el));

  videoGallery.scrollLeft = videoGallery.children[2].offsetLeft;
}

clonarVideos();

function atualizarIndicadores(index) {
  for (let i = 0; i < indicadores.length; i++) {
    indicadores[i].classList.toggle("ativo", i === index % indicadores.length);
  }
}

function irParaProximo() {
  if (videoGallery.scrollLeft >= videoGallery.scrollWidth - videoGallery.offsetWidth * 2) {
    videoGallery.scrollLeft = videoGallery.children[2].offsetLeft;
  }

  videoIndex++;
  videoGallery.scrollTo({
    left: videoGallery.children[videoIndex + 2].offsetLeft,
    behavior: "smooth"
  });

  atualizarIndicadores(videoIndex % indicadores.length);
}

function irParaAnterior() {
  if (videoGallery.scrollLeft <= videoGallery.children[1].offsetLeft) {
    videoGallery.scrollLeft = videoGallery.children[totalVideos + 1].offsetLeft;
  }

  videoIndex--;
  if (videoIndex < 0) videoIndex = totalVideos - 1;

  videoGallery.scrollTo({
    left: videoGallery.children[videoIndex + 2].offsetLeft,
    behavior: "smooth"
  });

  atualizarIndicadores(videoIndex % indicadores.length);
}

function iniciarAutoScroll() {
  pararAutoScroll();
  autoScrollInterval = setInterval(irParaProximo, 7000);
}

function pararAutoScroll() {
  clearInterval(autoScrollInterval);
  autoScrollInterval = null;
}

function reiniciarAutoScrollComAtraso() {
  clearTimeout(autoScrollTimeout);
  autoScrollTimeout = setTimeout(iniciarAutoScroll, 10000); // 10 segundos
}

btnProximo.addEventListener("click", () => {
  pararAutoScroll();
  irParaProximo();
  reiniciarAutoScrollComAtraso();
});

btnAnterior.addEventListener("click", () => {
  pararAutoScroll();
  irParaAnterior();
  reiniciarAutoScrollComAtraso();
});

videoGallery.addEventListener("scroll", () => {
  pararAutoScroll();
  reiniciarAutoScrollComAtraso();
});

videoGallery.addEventListener("touchstart", pararAutoScroll);
videoGallery.addEventListener("touchend", reiniciarAutoScrollComAtraso);

atualizarIndicadores(videoIndex);
iniciarAutoScroll();
