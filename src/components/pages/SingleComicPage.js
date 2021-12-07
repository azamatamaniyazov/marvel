import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelServices from "../../services/MarvelServices";

import Spinner from "../spinner/Spinner";
import Error from "../onError/Error";

import "./singleComicPage.scss";

const SingleComicPage = () => {
  const [comic, setComic] = useState(null);
  const { comicId } = useParams();
  const { loading, error, clearError, getComics } = useMarvelServices();

  useEffect(() => {
    onRequest(comicId);
  }, [comicId]);

  const onRequest = (id) => {
    clearError();
    getComics(id).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const spinner = loading && !error ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;
  const errorMessage = error ? <Error /> : null;
  return (
    <div className="single-comic">
      {spinner}
      {errorMessage}
      {content}
    </div>
  );
};

const View = ({ comic }) => {
  const { title, description, pageCount, language, thumbnail, price } = comic;
  return (
    <>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}$</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </>
  );
};

export default SingleComicPage;
