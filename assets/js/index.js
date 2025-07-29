document.addEventListener("DOMContentLoaded", () => {
  const galeria = document.getElementById("videoGallery");
  const anterior = document.getElementById("anterior");
  const proximo = document.getElementById("proximo");
  const indicadores = document.getElementById("indicadores").children;
  const videoThumbs = document.querySelectorAll(".video-thumb");

  let scrollIndex = 0;
  const videoWidth = 310;
  const totalVideos = galeria.children.length;

  let autoScroll = setInterval(() => rolar(1), 7000);
  let carrosselAtivo = true; // ✅ flag de controle

  function atualizarIndicadores() {
    [...indicadores].forEach((dot, i) => {
      dot.classList.toggle("ativo", i === scrollIndex % indicadores.length);
    });
  }

  atualizarIndicadores();

  function rolar(direcao) {
    if (!carrosselAtivo) return; // 🚫 bloqueia rolagem se desativado

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

  videoThumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      const id = thumb.getAttribute("data-video-id");
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
      iframe.allow = "autoplay; encrypted-media";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "none";
      iframe.style.borderRadius = "8px";

      thumb.replaceWith(iframe);

      // Parar o carrossel para sempre
      clearInterval(autoScroll);
      carrosselAtivo = false;
    });
  });
});