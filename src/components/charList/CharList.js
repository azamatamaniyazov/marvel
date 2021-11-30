import "./charList.scss";
import { Component } from "react";
import PropTypes from "prop-types";

import CharItems from "./charListItem/CharItems";

class CharList extends Component {
  state = {
    offset: 240,
  };

  getStateCharItems = (state) => {
    // const { newCharsLoading } = state;
    this.setState({
      newCharsLoading: state,
    });
  };

  onChangeOffset = () => {
    this.setState((state) => ({
      offset: state.offset + 9,
    }));
  };

  render() {
    const { newCharsLoading, offset } = this.state;
    return (
      <div className="char__list">
        <CharItems
          offset={offset}
          getStateCharItems={this.getStateCharItems}
          onSelectedChar={this.props.onSelectedChar}
        />
        <button
          className="button button__main button__long"
          style={{ display: newCharsLoading ? "none" : "block" }}
          onClick={this.onChangeOffset}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onSelectedChar: PropTypes.func.isRequired,
};
export default CharList;
