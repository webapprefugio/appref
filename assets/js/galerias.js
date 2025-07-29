// Função para buscar imagem via Open Graph, caso não tenha 'img' definida
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

// Função genérica para montar os cards
async function montarGaleria(galeriaClass, itemClass, lista) {
  const container = document.querySelector(`.${galeriaClass}`);
  if (!container) return;

  for (const item of lista) {
    const imgUrl = item.img || await gerarMiniatura(item.link);

    const article = document.createElement('article');
    article.className = itemClass;
    article.innerHTML = `
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">
        <img src="${imgUrl}" alt="Miniatura">
        <h3>${item.titulo}</h3>
        <p>${item.descricao}</p>
      </a>
    `;
    container.appendChild(article);
  }
}

// 🔔 Notícias
const noticias = [
  {
    titulo: 'Nossa Senhora do Monte Santo Onofre',
    descricao: 'Somente o culto privado é permitido.',
    link: 'https://www.vaticannews.va/pt/vaticano/news/2025-07/nossa-senhora-monte-santo-onofre-molise-dicasterio-doutrina-fe.html',
    img: 'https://www.vaticannews.va/content/dam/vaticannews/multimedia/2019/01/21/2019.01.21%20Vaticano,%20Palazzo%20Sant%20Uffizio,%20Congregazione%20per%20la%20Dottrina%20della%20Fede%20(4).JPG/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg'
  },
  {
    titulo: 'Papa aos influenciadores',
    descricao: 'Sejam agentes capazes de quebrar a lógica da polarização.',
    link: 'https://www.vaticannews.va/pt/papa/news/2025-07/papa-leao-xiv-saudacao-jubileu-missionarios-digitais-influencers.html',
    img: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2025/07/29/2025-07-29-influencer-e-missionari-digitali/1753785087776.JPG/_jcr_content/renditions/cq5dam.thumbnail.cropped.500.281.jpeg'
  }
];


// 📆 Eventos
const eventos = [
  {
    titulo: 'Nossa Senhora do Monte Santo Onofre',
    descricao: 'Somente o culto privado é permitido.',
    link: 'https://www.vaticannews.va/pt/vaticano/news/2025-07/nossa-senhora-monte-santo-onofre-molise-dicasterio-doutrina-fe.html',
    img: 'https://www.vaticannews.va/content/dam/vaticannews/multimedia/2019/01/21/2019.01.21%20Vaticano,%20Palazzo%20Sant%20Uffizio,%20Congregazione%20per%20la%20Dottrina%20della%20Fede%20(4).JPG/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg'
  },
  {
    titulo: 'Papa aos influenciadores',
    descricao: 'Sejam agentes capazes de quebrar a lógica da polarização.',
    link: 'https://www.vaticannews.va/pt/papa/news/2025-07/papa-leao-xiv-saudacao-jubileu-missionarios-digitais-influencers.html',
    img: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2025/07/29/2025-07-29-influencer-e-missionari-digitali/1753785087776.JPG/_jcr_content/renditions/cq5dam.thumbnail.cropped.500.281.jpeg'
  }
];


// 🏡 Refúgios
const refugios = [
  {
    titulo: 'Super Corte Grupo Y\'shua',
    descricao: 'Grupo Y´shua - Lucas Gelásio, Xavier Ayral e Luz de Maria -REFÚGIOS.',
    link: 'https://www.youtube.com/watch?v=1dlvVPuDcrI',
    img: 'https://img.youtube.com/vi/1dlvVPuDcrI/hqdefault.jpg'
  },
  {
    titulo: 'Live com Pe. Michel Rodrigue',
    descricao: 'Padre MICHEL RODRIGUE! El AVISO, Los REFUGIOS, Los EVENTOS FUTUROS, XAVIER AYRAL.',
    link: 'https://www.youtube.com/watch?v=BwYeIqEz7bI',
    img: 'https://img.youtube.com/vi/BwYeIqEz7bI/hqdefault.jpg'
  },
  {
    titulo: 'Refúgio espiritual',
    descricao: 'RETIRO - MONTANDO UM REFÚGIO ESPIRITUAL- REMASTERIZADO!',
    link: 'https://www.youtube.com/watch?v=N-2K2jSyNS8',
    img: 'https://img.youtube.com/vi/N-2K2jSyNS8/hqdefault.jpg'
  },
  {
    titulo: 'Sua casa como refúgio',
    descricao: 'Fr Michel Rodrigue: Preparing Your Home As A Refuge 101 and Q&A.',
    link: 'https://www.youtube.com/watch?v=-zc7vdmxKss',
    img: 'https://img.youtube.com/vi/-zc7vdmxKss/hqdefault.jpg'
  },
  {
    titulo: 'Oração de consagração da casa',
    descricao: '¿Cómo consagrar su hogar y tierra como refugio? "Oración poderosa del Padre Michel Rodrigue."',
    link: 'https://www.youtube.com/watch?v=us1qNeQplBA',
    img: 'https://img.youtube.com/vi/us1qNeQplBA/hqdefault.jpg'
  }
];


// 🎥 Grupo Y'shua (GALERIA)
const yshua = [
  {
    titulo: 'Super Corte Grupo Y\'shua',
    descricao: 'Grupo Y´shua - Lucas Gelásio, Xavier Ayral e Luz de Maria -REFÚGIOS.',
    link: 'https://www.youtube.com/watch?v=1dlvVPuDcrI',
    img: 'https://img.youtube.com/vi/1dlvVPuDcrI/hqdefault.jpg'
  },
  {
    titulo: 'Refúgio espiritual – Retiro',
    descricao: 'RETIRO - MONTANDO UM REFÚGIO ESPIRITUAL - REMASTERIZADO!',
    link: 'https://www.youtube.com/watch?v=N-2K2jSyNS8',
    img: 'https://img.youtube.com/vi/N-2K2jSyNS8/hqdefault.jpg'
  },
];


// 🎥 Semillas
const semillas = [
  {
    titulo: 'Consagração da casa como refúgio',
    descricao: '¿Cómo consagrar su hogar y tierra como refugio? Oración poderosa do Padre Michel Rodrigue.',
    link: 'https://www.youtube.com/watch?v=us1qNeQplBA',
    img: 'https://img.youtube.com/vi/us1qNeQplBA/hqdefault.jpg'
  },
    {
    titulo: 'Live com Pe. Michel Rodrigue',
    descricao: 'Padre MICHEL RODRIGUE! El AVISO, Los REFUGIOS, Los EVENTOS FUTUROS, XAVIER AYRAL.',
    link: 'https://www.youtube.com/watch?v=BwYeIqEz7bI',
    img: 'https://img.youtube.com/vi/BwYeIqEz7bI/hqdefault.jpg'
  },
];



// 🎥 Ayral
const Ayral = [
  {
    titulo: 'Sua casa como refúgio',
    descricao: 'Fr Michel Rodrigue: Preparing Your Home As A Refuge 101 and Q&A.',
    link: 'https://www.youtube.com/watch?v=-zc7vdmxKss',
    img: 'https://img.youtube.com/vi/-zc7vdmxKss/hqdefault.jpg'
  },
    {
    titulo: 'Sua casa como refúgio',
    descricao: 'Fr Michel Rodrigue: Preparing Your Home As A Refuge 101 and Q&A.',
    link: 'https://www.youtube.com/watch?v=-zc7vdmxKss',
    img: 'https://img.youtube.com/vi/-zc7vdmxKss/hqdefault.jpg'
  },
];



// 🎥 Galerias específicas
montarGaleria('galeria-yshua', 'item-yshua', yshua);
montarGaleria('galeria-semillas', 'item-semillas', semillas);
montarGaleria('galeria-ayral', 'item-ayral', Ayral);

// 🏠 Destaques sobre os Refúgios (página inicial)
montarGaleria('galeria-refugios', 'item-refugio', refugios);

// 🌤️ Boletim Informativo (notícias)
montarGaleria('galeria-noticias', 'item-noticia', noticias);

// 📆 Agenda de Eventos
montarGaleria('galeria-eventos', 'item-evento', eventos);
