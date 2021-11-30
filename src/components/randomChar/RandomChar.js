import { Component } from "react";
import MarvelServices from "../../services/MarvelServices";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spinner/Spinner";
import Error from "../onError/Error";

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  marvelServices = new MarvelServices();

  componentDidMount() {
    this.updateChar();
  }

  onCharLoaded = (char) => {
    this.setState({ char: char, loading: false });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011300) + 1011300);
    this.marvelServices
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    const errorMessage = error ? <Error /> : null;
    return (
      <div className="randomchar">
        {spinner}
        {content}
        {errorMessage}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main" onClick={this.updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = (props) => {
  const { name, desc, thumbnail, homepage, wiki } = props.char;
  let style = {};
  thumbnail.indexOf("not") > -1
    ? (style = { objectFit: "contain" })
    : (style = {});

  return (
    <div className="randomchar__block">
      <img
        style={style}
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{desc}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};
export default RandomChar;
