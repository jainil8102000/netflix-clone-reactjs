import "./ListFilms.css";
import { useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const ListFilms = ({ title, itens }) => {
  const [scrollX, setScrollX] = useState(0);
  // controla o slider de filmes
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  // controla o slider de filmes
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    const listW = itens.results.length * 150;

    if (window.innerWidth - listW > x) {
      // se a lista não couber na tela, o scroll vai para o final
      // o - 60 é para deixar um espaço para o botão de voltar e avançar
      x = window.innerWidth - listW - 60;
    }

    setScrollX(x);
  };

  return (
    <section className="list">
      <h2>{title}</h2>

      <button className="move-left" onClick={handleLeftArrow}>
        <MdNavigateBefore style={{ fontSize: 50 }} />
      </button>

      <button className="move-right" onClick={handleRightArrow}>
        <MdNavigateNext style={{ fontSize: 50 }} />
      </button>

      <div className="list-area">
        <div
          className="list-itens"
          style={{
            marginLeft: scrollX,
            width: itens.results.length * 150,
          }}
        >
          {itens.results.length > 0 &&
            itens.results.map((item, index) => (
              <div className="list-item" key={item.original_title ?? index}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.original_title ?? index}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export { ListFilms };
