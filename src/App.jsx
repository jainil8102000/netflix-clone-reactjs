import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { Header } from "./shared/components/header/Header";
import { FeaturedMovie } from "./shared/components/featured-movie/FeaturedMovie";
import { ListFilms } from "./shared/components/list-films/ListFilms";
import API from "./shared/services/api/api";
import { Rodape } from "./shared/components/rodape/Rodape";
import { Loading } from "./shared/components/loading/Loading";

const App = () => {
  // estados para controlar a listagem de filmes e o filtro
  const [listMusic, setListMusic] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  // função para buscar os filmes
  const loadAllFilms = async () => {
    // busca os filmes na API
    const list = await API.getHomeList();
    setListMusic(list);

    // busca o filme em destaque na API que sejam "originais"
    const originals = list.filter((item) => item.slug === "originals");
    const randomFilm = Math.floor(
      Math.random() * --originals[0].itens.results.length
    );
    const chosen = originals[0].itens.results[randomFilm];
    const chosenInfo = await API.getMoveInfo(chosen.id, "tv");
    setFeaturedData(chosenInfo);
  };

  // função que controla o scroll do header
  const scrollListener = () => {
    if (window.scrollY > 10) {
      setBlackHeader(true);
    } else {
      setBlackHeader(false);
    }
  };

  // função para buscar os filmes ao iniciar a aplicação
  useEffect(() => {
    loadAllFilms();
  }, []);

  // função para controlar o scroll do header
  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="listas">
        {listMusic.map((item) => (
          <Fragment key={item.title}>
            <ListFilms title={item.title} itens={item.itens} />
          </Fragment>
        ))}
      </section>

      <Rodape />

      {/* se não tiver dados na lista exibe o loading */}
      {listMusic.length <= 0 && <Loading />}
    </div>
  );
};

export { App };
