import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const ComicLayout = lazy(() =>
  import("../pages/singleComicLayout/ComicLayout")
);
const CharacterLayout = lazy(() =>
  import("../pages/singleCharacterLayout/CharacterLayout")
);
const SinglePage = lazy(() => import("../pages/SinglePage"));

const routes = [
  { path: "/", Component: MainPage },
  { path: "/comics", Component: ComicsPage },
  { path: "/comics/:comicsId", Component: SinglePage },
];

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:id"
                element={
                  <SinglePage Component={ComicLayout} dataType="comic" />
                }
              />
              <Route
                path="/characters/:id"
                element={
                  <SinglePage
                    Component={CharacterLayout}
                    dataType="character"
                  />
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
