const videoGallery = document.getElementById('videoGallery');
const indicadoresContainer = document.getElementById('indicadores');
const btnAnterior = document.getElementById('anterior');
const btnProximo = document.getElementById('proximo');

let videoItems = Array.from(videoGallery.children);
const totalVideos = videoItems.length;
let currentIndex = 0;
let autoScrollInterval;
let inactivityTimeout;

function atualizarIndicadores() {
  const spans = indicadoresContainer.querySelectorAll('span');
  spans.forEach((span, index) => {
    span.classList.toggle('ativo', index === currentIndex);
  });
}

function rolarPara(index) {
  const largura = videoItems[0].offsetWidth;
  videoGallery.scrollTo({
    left: largura * (index + 1), // +1 por causa do primeiro clone
    behavior: 'smooth'
  });
  currentIndex = index;
  atualizarIndicadores();
  reiniciarInatividade();
}

function rolarProximo() {
  if (currentIndex < totalVideos - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  rolarPara(currentIndex);
}

function rolarAnterior() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalVideos - 1;
  }
  rolarPara(currentIndex);
}

function reiniciarInatividade() {
  clearInterval(autoScrollInterval);
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    autoScrollInterval = setInterval(rolarProximo, 7000);
  }, 10000);
}

function prepararClonagem() {
  const primeiro = videoItems[0].cloneNode(true);
  const ultimo = videoItems[videoItems.length - 1].cloneNode(true);
  videoGallery.insertBefore(ultimo, videoItems[0]);
  videoGallery.appendChild(primeiro);
}

function inicializarCarrossel() {
  prepararClonagem();
  videoItems = Array.from(videoGallery.children);
  const largura = videoItems[1].offsetWidth;
  videoGallery.scrollLeft = largura; // começa no primeiro real

  // Criar os indicadores dinamicamente
  indicadoresContainer.innerHTML = '';
  for (let i = 0; i < totalVideos; i++) {
    const span = document.createElement('span');
    indicadoresContainer.appendChild(span);
  }

  atualizarIndicadores();

  autoScrollInterval = setInterval(rolarProximo, 7000);

  videoGallery.addEventListener('scroll', () => {
    const largura = videoItems[1].offsetWidth;
    const scroll = videoGallery.scrollLeft;

    if (scroll <= 0) {
      videoGallery.scrollLeft = largura * totalVideos;
    } else if (scroll >= largura * (totalVideos + 1)) {
      videoGallery.scrollLeft = largura;
    }
  });

  btnProximo.addEventListener('click', () => {
    rolarProximo();
  });

  btnAnterior.addEventListener('click', () => {
    rolarAnterior();
  });
}

window.addEventListener('load', inicializarCarrossel);
