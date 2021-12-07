import { useState, useEffect, useRef } from "react";
import useMarvelServices from "../../../services/MarvelServices";
import Spinner from "../../spinner/Spinner";
import Error from "../../onError/Error";

function CharItems(props) {
  const [charItems, setCharItems] = useState([]);
  const [newCharLoading, setNewCharLoading] = useState(false);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelServices();

  const itemsRefs = useRef([]);

  const onFocusItem = (id) => {
    itemsRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemsRefs.current[id].classList.add("char__item_selected");
    itemsRefs.current[id].focus();
  };

  useEffect(() => {
    props.getStateCharItems(newCharLoading);
  }, [newCharLoading]);

  useEffect(() => {
    onRequest(props.offset);
    onNewCharLoading(false);
  }, [props.offset]);

  useEffect(() => {
    onNewCharLoading(true);
  }, []);

  const onRequest = (offset) => {
    getAllCharacters(offset).then(onCharLoaded);
  };

  const onNewCharLoading = (initial) => {
    initial ? setNewCharLoading(false) : setNewCharLoading(true);
  };

  const onCharLoaded = (newCharItems) => {
    let ended = false;
    if (newCharItems.length < 9) {
      ended = true;
    }
    setCharItems((charItems) => [...charItems, ...newCharItems]);
    setNewCharLoading(false);
    setCharEnded(ended);
  };

  let style = {};
  const items = charItems.map((item, i) => {
    item.thumbnail.indexOf("not") > -1
      ? (style = { objectFit: "unset" })
      : (style = {});
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
        <img style={style} src={item.thumbnail} alt="abyss" />
        <div className="char__name">{item.name}</div>
      </li>
    );
  });

  //------------dlya centrirovaniya spinnera i oshibki----------------
  (loading && !newCharLoading) || error
    ? (style = { display: "flex" })
    : (style = {});

  const spinner = loading && !newCharLoading ? <Spinner /> : null;
  const errorMessage = error ? <Error /> : null;
  return (
    <ul style={style} className="char__grid">
      {spinner}
      {errorMessage}
      {!(spinner || errorMessage) ? items : null}
    </ul>
  );
}

export default CharItems;
