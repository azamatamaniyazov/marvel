import { useState, useEffect, useRef } from "react";
import MarvelServices from "../../../services/MarvelServices";
import Spinner from "../../spinner/Spinner";
import Error from "../../onError/Error";

function CharItems(props) {
  const [charItems, setCharItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newCharLoading, setNewCharLoading] = useState(false);
  const [charEnded, setCharEnded] = useState(false);

  const marvelServices = new MarvelServices();

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
  }, [props.offset]);

  const onRequest = (offset) => {
    setNewCharLoading(true);
    marvelServices.getAllCharacters(offset).then(onCharLoaded).catch(onError);
  };

  const onCharLoaded = (newCharItems) => {
    let ended = false;
    if (newCharItems.length < 9) {
      ended = true;
    }
    setCharItems((charItems) => [...charItems, ...newCharItems]);
    setLoading(false);
    setNewCharLoading(false);
    setCharEnded(ended);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
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

  loading || error ? (style = { display: "flex" }) : (style = {});
  return (
    <ul style={style} className="char__grid">
      {!(loading || error) ? items : loading ? <Spinner /> : <Error />}
    </ul>
  );
}

export default CharItems;
