document.addEventListener("DOMContentLoaded", () => {
  const galeria = document.getElementById("videoGallery");
  const anterior = document.getElementById("anterior");
  const proximo = document.getElementById("proximo");
  const indicadores = document.getElementById("indicadores").children;
  const videoThumbs = document.querySelectorAll(".video-thumb");

  let scrollIndex = 0;
  const videoWidth = 310; // Aproximado (300px + gap)
  const totalVideos = galeria.children.length;

  // Indicador inicial
  function atualizarIndicadores() {
    [...indicadores].forEach((dot, i) => {
      dot.classList.toggle("ativo", i === scrollIndex % indicadores.length);
    });
  }

  atualizarIndicadores();

  function rolar(direcao) {
    if (direcao === 1 && scrollIndex < totalVideos - 1) {
      scrollIndex++;
    } else if (direcao === -1 && scrollIndex > 0) {
      scrollIndex--;
    } else if (direcao === 1) {
      scrollIndex = 0;
    } else if (direcao === -1) {
      scrollIndex = totalVideos - 1;
    }
    galeria.scrollTo({ left: scrollIndex * videoWidth, behavior: "smooth" });
    atualizarIndicadores();
  }

  proximo.addEventListener("click", () => rolar(1));
  anterior.addEventListener("click", () => rolar(-1));

  // AutoScroll
  setInterval(() => rolar(1), 7000);

  // Lazy embed
  videoThumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      const id = thumb.getAttribute("data-video-id");
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
      iframe.loading = "lazy";
      iframe.allowFullscreen = true;
      thumb.replaceWith(iframe);
    });
  });
});
