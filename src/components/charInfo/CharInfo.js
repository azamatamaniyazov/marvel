import { Component } from "react";
import PropTypes from "prop-types";

import MarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import Error from "../onError/Error";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelServices = new MarvelServices();

  componentDidUpdate(prevProps) {
    if (this.props.selectedId !== prevProps.selectedId) {
      this.updateCharInfo();
    }
  }

  updateCharInfo = () => {
    const charId = this.props.selectedId;
    if (!charId) {
      return;
    }
    this.onCharLoading();
    this.marvelServices
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  render() {
    const { char, loading, error } = this.state;
    const skeleton = char || loading || error ? null : <Skeleton />;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    const errorMessage = error ? <Error /> : null;
    return (
      <div className="char__info">
        {skeleton}
        {spinner}
        {content}
        {errorMessage}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, desc, thumbnail, homepage, wiki, comics } = char;
  let style = {};
  thumbnail.indexOf("not") > -1
    ? (style = { objectFit: "contain" })
    : (style = {});

  let shortComics = comics.slice();
  if (comics.length > 10) {
    shortComics = comics.slice(0, 10);
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={style} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{desc}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comics with this character"}
        {shortComics.map((item, i) => {
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  selectedId: PropTypes.number,
};
export default CharInfo;
