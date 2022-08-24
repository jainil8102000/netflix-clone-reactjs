// para conseguir sua chave de acesso, acesse o site abaixo e crie sua conta gratuita
// https://www.themoviedb.org/documentation/api?language=pt-BR
const API_KEY = "";
const API_BASE_URL = "https://api.themoviedb.org/3";

// função que faz a requisição para a API do TheMovieDB e retorna o resultado em formato JSON
const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE_URL}${endpoint}`);
  const json = await req.json();
  return json;
};

export default {
  // função que retorna a lista de filmes de acordo com o filtro passado
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Originais do Netflix",
        itens: await basicFetch(
          `/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "trending",
        title: "Recomendados para você",
        itens: await basicFetch(
          `/trending/all/week?language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "top-rated",
        title: "Em alta",
        itens: await basicFetch(
          `/movie/top_rated?language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "action",
        title: "Ação",
        itens: await basicFetch(
          `/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "comedy",
        title: "Comédia",
        itens: await basicFetch(
          `/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "horror",
        title: "Terror",
        itens: await basicFetch(
          `/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "romance",
        title: "Romance",
        itens: await basicFetch(
          `/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "documentary",
        title: "Documentários",
        itens: await basicFetch(
          `/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`
        ),
      },
    ];
  },

  // função que retorna os detalhes de um filme especifico
  getMoveInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      // se for tv é uma serie se for movie é um filme !
      switch (type) {
        case "movie":
          info = await basicFetch(
            `/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`
          );
          break;
        case "tv":
          info = await basicFetch(
            `/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`
          );
          break;
      }
    }

    return info;
  },
};
