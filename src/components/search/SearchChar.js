import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
  ErrorMessage,
} from "formik";
import * as yup from "yup";

import "./SearchChar.scss";
import useMarvelServices from "../../services/MarvelServices";

function SearchChar() {
  const [char, setChar] = useState(null);
  const { loading, error, clearError, getCharacterWithName } =
    useMarvelServices();

  const onRequest = (charName) => {
    clearError();
    getCharacterWithName(charName).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const results = !char ? null : char.length > 0 ? (
    <div className="char__search-wrapper">
      <div className="char__search-success">
        There is! Visit {char[0].name} page?
      </div>
      <Link
        to={`/characters/${char[0].key}`}
        className="button button__secondary"
      >
        <div className="inner">To page</div>
      </Link>
    </div>
  ) : (
    <div className="char__search-error">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{
          search: "",
        }}
        validationSchema={yup.object({
          search: yup.string().min(2).required("Required!"),
        })}
        onSubmit={({ search }) => {
          onRequest(search);
        }}
      >
        <Form>
          <label className="char__search-lable" htmlFor="search">
            Or find a character by name:
          </label>
          <div className="char__search-wrapper">
            <Field type="search" name="search" placeholder="Enter name" />
            <button
              disabled={loading}
              className="button button__main"
              type="submit"
            >
              <div className="inner">Find</div>
            </button>
          </div>
          <FormikErrorMessage
            className="char__search-error"
            name="search"
            component={"div"}
          />
        </Form>
      </Formik>
      {errorMessage}
      {results}
    </div>
  );
}

export default SearchChar;
