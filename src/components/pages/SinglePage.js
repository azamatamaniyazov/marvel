import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelServices from "../../services/MarvelServices";

import Spinner from "../spinner/Spinner";
import Error from "../onError/Error";

import "./singlePage.scss";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const { loading, error, clearError, getComics, getCharacter } =
    useMarvelServices();

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line
  }, [id]);

  const onRequest = () => {
    clearError();
    switch (dataType) {
      case "comic":
        getComics(id).then(onDataLoaded);
        break;
      case "character":
        getCharacter(id).then(onDataLoaded);
        break;
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const spinner = loading && !error ? <Spinner /> : null;
  const content = !(loading || error || !data) ? (
    <Component data={data} />
  ) : null;
  const errorMessage = error ? <Error /> : null;
  return (
    <>
      <AppBanner />
      <div className="single-comic">
        {spinner}
        {errorMessage}
        {content}
      </div>
    </>
  );
};

export default SinglePage;
