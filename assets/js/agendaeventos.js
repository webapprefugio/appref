/* 
  BOLETIM DE NOTÍCIAS MANUAL COM IMAGEM OPCIONAL
  Se a propriedade 'img' for definida na notícia, ela será usada.
  Senão, será buscada automaticamente usando Open Graph.
*/

async function gerarMiniatura(link) {
  try {
    const proxy = 'https://api.allorigins.win/get?url=';
    const response = await fetch(proxy + encodeURIComponent(link));
    const data = await response.json();

    const html = data.contents;
    const regex = /<meta property="og:image" content="(.*?)"/;
    const match = html.match(regex);

    return match ? match[1] : 'https://via.placeholder.com/250x140';
  } catch (error) {
    console.error('Erro ao buscar imagem:', error);
    return 'https://via.placeholder.com/250x140';
  }
}

const eventoss = [
  {
    titulo: 'Nossa Senhora do Monte Santo Onofre: ',
    descricao: 'Somente o culto privado é permitido.',
    link: 'https://www.vaticannews.va/pt/vaticano/news/2025-07/nossa-senhora-monte-santo-onofre-molise-dicasterio-doutrina-fe.html',
    img: 'https://www.vaticannews.va/content/dam/vaticannews/multimedia/2019/01/21/2019.01.21%20Vaticano,%20Palazzo%20Sant%20Uffizio,%20Congregazione%20per%20la%20Dottrina%20della%20Fede%20(4).JPG/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg'
  },
  {
    titulo: 'Papa aos influenciadores: ',
    descricao: 'sejam agentes capazes de quebrar a lógica da polarização.',
    link: 'https://www.vaticannews.va/pt/papa/news/2025-07/papa-leao-xiv-saudacao-jubileu-missionarios-digitais-influencers.html',
    img: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2025/07/29/2025-07-29-influencer-e-missionari-digitali/1753785087776.JPG/_jcr_content/renditions/cq5dam.thumbnail.cropped.500.281.jpeg', // exemplo de imagem forçada
  },
    {
    titulo: 'Papa aos influenciadores: ',
    descricao: 'sejam agentes capazes de quebrar a lógica da polarização.',
    link: 'https://www.vaticannews.va/pt/papa/news/2025-07/papa-leao-xiv-saudacao-jubileu-missionarios-digitais-influencers.html',
    img: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2025/07/29/2025-07-29-influencer-e-missionari-digitali/1753785087776.JPG/_jcr_content/renditions/cq5dam.thumbnail.cropped.500.281.jpeg', // exemplo de imagem forçada
  },
    {
    titulo: 'Papa aos influenciadores: ',
    descricao: 'sejam agentes capazes de quebrar a lógica da polarização.',
    link: 'https://www.vaticannews.va/pt/papa/news/2025-07/papa-leao-xiv-saudacao-jubileu-missionarios-digitais-influencers.html',
    img: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2025/07/29/2025-07-29-influencer-e-missionari-digitali/1753785087776.JPG/_jcr_content/renditions/cq5dam.thumbnail.cropped.500.281.jpeg', // exemplo de imagem forçada
  }
];

(async () => {
  for (const eventos of eventoss) {
    const imgUrl = eventos.img || await gerarMiniatura(eventos.link);

    const container = document.querySelector('.galeria-eventos');
    const article = document.createElement('article');
    article.className = 'eventos';
    article.innerHTML = `
      <a href="${eventos.link}" target="_blank">
        <img src="${imgUrl}" alt="Miniatura da notícia">
        <h3>${eventos.titulo}</h3>
        <p>${eventos.descricao}</p>
      </a>
    `;
    container.appendChild(article);
  }
})();
