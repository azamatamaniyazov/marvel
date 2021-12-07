import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelServices from "../../services/MarvelServices";
import Error from "../onError/Error";
import Spinner from "../spinner/Spinner";

import "./comicsList.scss";

const ComicsList = () => {
  const [comicsItems, setComicsItems] = useState([]);
  const [newComicsLoading, setNewComicsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const { loading, error, getAllComics } = useMarvelServices();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
    getAllComics(offset).then(onComicsLoaded);
  };

  const onComicsLoaded = (newComicsItems) => {
    setComicsItems((comicsItems) => [...comicsItems, ...newComicsItems]);
    setOffset((offset) => offset + 8);
    setNewComicsLoading(false);
  };

  const items = comicsItems.map((item, i) => {
    return (
      <li key={item.id} className="comics__item">
        <Link to={`/comics/${item.id}`}>
          <img
            src={item.thumbnail}
            alt="ultimate war"
            className="comics__item-img"
          />
          <div className="comics__item-name">{item.title}</div>
          <div className="comics__item-price">{item.price}$</div>
        </Link>
      </li>
    );
  });

  let style = {};
  (loading && !newComicsLoading) || error
    ? (style = { display: "flex" })
    : (style = {});

  const spinner = loading && !newComicsLoading ? <Spinner /> : null;
  const errorMessage = error ? <Error /> : null;
  return (
    <div className="comics__list">
      <ul style={style} className="comics__grid">
        {spinner}
        {errorMessage}
        {!(spinner || errorMessage) ? items : null}
      </ul>
      <button
        style={{ display: loading ? "none" : "block" }}
        onClick={() => {
          onRequest(offset);
        }}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
