const gallery = document.getElementById('videoGallery');
const indicadores = document.getElementById('indicadores');
let videoItems = Array.from(gallery.children);

// Clonar os vídeos para rolagem infinita
videoItems.forEach(item => {
  const cloneBefore = item.cloneNode(true);
  const cloneAfter = item.cloneNode(true);
  gallery.insertBefore(cloneBefore, gallery.firstChild);
  gallery.appendChild(cloneAfter);
});

function atualizarCentral() {
  const items = document.querySelectorAll('.video-item');
  let centro = gallery.scrollLeft + gallery.offsetWidth / 2;
  let indexAtivo = 0;

  items.forEach((item, i) => {
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    item.classList.remove('central');
    if (Math.abs(itemCenter - centro) < item.offsetWidth / 2) {
      item.classList.add('central');
      indexAtivo = i % (videoItems.length);
    }
  });

  const total = videoItems.length;
  indicadores.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const ponto = document.createElement('span');
    ponto.innerHTML = i === indexAtivo ? '●' : '○';
    ponto.classList.toggle('ativo', i === indexAtivo);
    indicadores.appendChild(ponto);
  }
}

gallery.addEventListener('scroll', atualizarCentral);

// Autoplay com rolagem infinita
let scrollSpeed = 1;
function rolarAutomaticamente() {
  gallery.scrollLeft += scrollSpeed;

  // Reposiciona para início se chegar ao fim
  if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth) {
    gallery.scrollLeft = gallery.scrollWidth / 3;
  }

  // Reposiciona para fim se voltar demais
  if (gallery.scrollLeft <= 0) {
    gallery.scrollLeft = gallery.scrollWidth / 3;
  }

  atualizarCentral();
}

let autoplay = setInterval(rolarAutomaticamente, 40); // velocidade ajustável
