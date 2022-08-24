import "./FeaturedMovie.css";
import { BsFillPlayFill } from "react-icons/bs";

const FeaturedMovie = ({ item }) => {
  // pegado a data de lançamento do filme
  const firstDate = new Date(item.first_air_date);
  const genres = [];
  // pegando os gêneros do filme
  for (let i in item.genres) {
    genres.push(item.genres[i].name);
  }

  // cortando a descrição do filme caso seja muito longa
  const description =
    item.overview.length > 200
      ? item.overview.substring(0, 200) + "..."
      : item.overview;

  return (
    <section
      className="featured"
      style={{
        background: `url('https://image.tmdb.org/t/p/original${item.backdrop_path}')`,
      }}
    >
      <div className="featured-vertical">
        <div className="featured-horizontal">
          <h1 className="featured-name">{item.original_name}</h1>

          <div className="featured-info">
            <p className="featured-points">{item.vote_average} pontos</p>
            <p className="featured-year">{firstDate.getFullYear()}</p>
            <p className="featured-seasons">
              {item.number_of_seasons} temporada
              {item.number_of_seasons !== 1 && "s"}
            </p>
          </div>

          <p className="featured-overview">{description}</p>

          <div className="featured-buttons">
            <a href={`/watch/${item.id}`} className="featured-watch-button">
              <BsFillPlayFill /> assistir
            </a>
            <a href={`/list/add/${item.id}`} className="featured-add-button">
              + Minha Lista
            </a>
          </div>

          <div className="featured-genres">
            <p>
              Gêneros: <span>{genres.join(", ")}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { FeaturedMovie };
