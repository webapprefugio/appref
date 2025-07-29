async function carregarVersiculos() {
  try {
    const res = await fetch('versiculos.html');
    const html = await res.text();

    const container = document.createElement('div');
    container.innerHTML = html;

    const versiculos = Array.from(container.querySelectorAll('p'));
    const destino = document.getElementById('rolarversiculos');

    let atual = 0;

    function mostrarVersiculo() {
      destino.innerHTML = '';
      const v = versiculos[atual].cloneNode(true);
      v.classList.add('verso-animado');
      destino.appendChild(v);

      atual = (atual + 1) % versiculos.length;
    }

    mostrarVersiculo(); // primeiro versículo
    setInterval(mostrarVersiculo, 7000); // troca a cada 7 segundos
  } catch (error) {
    console.error('Erro ao carregar versículos:', error);
  }
}
window.onload = carregarVersiculos;