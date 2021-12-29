import "./charList.scss";
import { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import useMarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import Error from "../onError/Error";

const setContent = (process, Component, newCharLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newCharLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <Error />;
  }
};

function CharList(props) {
  const [offset, setOffset] = useState(250);
  const [charItems, setCharItems] = useState([]);
  const [newCharLoading, setNewCharLoading] = useState(false);

  const { getAllCharacters, process, setProcess } = useMarvelServices();

  const itemsRefs = useRef([]);

  const onFocusItem = (id) => {
    itemsRefs.current.forEach((item) => {
      item.classList.remove("char__item_selected");
    });
    itemsRefs.current[id].classList.add("char__item_selected");
    itemsRefs.current[id].focus();
  };

  useEffect(() => {
    onRequest();
    onNewCharLoading(true);
  }, []);

  const onRequest = () => {
    onNewCharLoading(false);
    getAllCharacters(offset)
      .then(onItemsLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onItemsLoaded = (char) => {
    setCharItems((charItems) => [...charItems, ...char]);
    setOffset((offset) => offset + 9);
    setNewCharLoading(false);
  };

  const onNewCharLoading = (initial) => {
    initial ? setNewCharLoading(false) : setNewCharLoading(true);
  };

  const renderItems = (charItems) => {
    const items = charItems.map((item, i) => {
      let imgStyle = {};
      item.thumbnail.indexOf("not") > -1
        ? (imgStyle = { objectFit: "revert" })
        : (imgStyle = {});
      return (
        <li
          tabIndex={i}
          ref={(el) => (itemsRefs.current[i] = el)}
          key={item.key}
          className="char__item"
          onClick={() => {
            props.onSelectedChar(item.key);
            onFocusItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onSelectedChar(item.key);
              onFocusItem(i);
            }
          }}
        >
          <img style={imgStyle} src={item.thumbnail} alt="abyss" />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  };

  const elements = useMemo(() => {
    return setContent(process, () => renderItems(charItems), newCharLoading);
  }, [process]);

  return (
    <div className="char__list">
      {elements}
      <button
        className="button button__main button__long"
        style={{ display: newCharLoading ? "none" : "block" }}
        onClick={onRequest}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

CharList.propTypes = {
  onSelectedChar: PropTypes.func.isRequired,
};
export default CharList;
