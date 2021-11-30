import React, { Component } from "react";
import MarvelServices from "../../../services/MarvelServices";
import Spinner from "../../spinner/Spinner";
import Error from "../../onError/Error";

class CharItems extends Component {
  state = {
    charItems: [],
    loading: true,
    error: false,
    newCharsLoading: false,
    charEnded: false,
  };

  marvelServices = new MarvelServices();

  itemsRefs = [];

  setRef = (ref) => {
    this.itemsRefs.push(ref);
  };

  onFocusItem = (id) => {
    this.itemsRefs.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    this.itemsRefs[id].classList.add("char__item_selected");
    this.itemsRefs[id].focus();
  };

  componentDidMount() {
    this.onRequest();
  }

  componentDidUpdate(prevProps) {
    if (this.props === prevProps) {
      this.props.getStateCharItems(this.state.newCharsLoading);
    }
    if (this.props.offset !== prevProps.offset) {
      this.onRequest(this.props.offset);
    }
  }

  onRequest = (offset) => {
    this.setState({
      newCharsLoading: true,
    });
    this.marvelServices
      .getAllCharacters(offset)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (newCharItems) => {
    let ended = false;
    if (newCharItems.length < 9) {
      ended = true;
    }
    this.setState(({ charItems }) => ({
      charItems: [...charItems, ...newCharItems],
      loading: false,
      newCharsLoading: false,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { charItems, loading, error } = this.state;
    let style = {};
    const items = charItems.map((item, i) => {
      item.thumbnail.indexOf("not") > -1
        ? (style = { objectFit: "unset" })
        : (style = {});
      return (
        <li
          tabIndex={i}
          ref={this.setRef}
          key={item.key}
          className="char__item"
          onClick={() => {
            this.props.onSelectedChar(item.key);
            this.onFocusItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              this.props.onSelectedChar(item.key);
              this.onFocusItem(i);
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
}

export default CharItems;
