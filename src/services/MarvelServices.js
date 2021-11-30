class MarvelServices {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=9c5f032d69e4871d49d3fcf2e6db9500";
  _baseOffset = 240;

  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Error");
    }

    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformChar);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformChar(res.data.results[0]);
  };

  _transformChar = (char) => {
    return {
      key: char.id,
      name: char.name,
      desc: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}

export default MarvelServices;
