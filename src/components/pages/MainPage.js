import { useState } from "react";

import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import decoration from "../../resources/img/vision.png";
import SearchChar from "../search/SearchChar";

function MainPage() {
  const [selectedChar, setChar] = useState(null);

  const onSelectedChar = (id) => {
    setChar(id);
  };

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onSelectedChar={onSelectedChar} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo selectedId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <SearchChar />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
}

export default MainPage;
