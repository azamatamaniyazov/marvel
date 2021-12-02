import "./charList.scss";
import { useState } from "react";
import PropTypes from "prop-types";

import CharItems from "./charListItem/CharItems";

function CharList(props) {
  const [offset, setOffset] = useState(250);
  const [loading, setLoading] = useState(false);

  const getStateCharItems = (state) => {
    setLoading(state);
  };

  const onChangeOffset = () => {
    setOffset((offset) => offset + 9);
  };

  return (
    <div className="char__list">
      <CharItems
        offset={offset}
        getStateCharItems={getStateCharItems}
        onSelectedChar={props.onSelectedChar}
      />
      <button
        className="button button__main button__long"
        style={{ display: loading ? "none" : "block" }}
        onClick={onChangeOffset}
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
