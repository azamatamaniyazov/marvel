import { Link } from "react-router-dom";

import "../singlePage.scss";

const CharacterLayout = ({ data }) => {
  const { name, desc, thumbnail } = data;
  return (
    <>
      <img src={thumbnail} alt={name} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{desc}</p>
      </div>
      <Link to="/" className="single-comic__back">
        Back to all
      </Link>
    </>
  );
};

export default CharacterLayout;
