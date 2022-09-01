import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import CardAlbum from '../components/CardAlbum';

export default class Search extends Component {
  state = {
    isButtonDisabled: true,
    searchResults: [],
    searchInput: '',
    searchLoading: false,
    searchedValue: '',
  };

  componentDidUpdate() {
    const { searchInput, isButtonDisabled } = this.state;
    const isValid = searchInput.length >= 2;
    if (isButtonDisabled === isValid) {
      this.setState({ isButtonDisabled: !isValid });
    }
  }

  setSearch = (e) => {
    const { value } = e.target;
    this.setState({ searchInput: value });
  };

  requestAlbum = () => {
    this.setState({ searchResults: [], searchLoading: true }, async () => {
      const { searchInput } = this.state;
      const results = await searchAlbumsAPI(searchInput);
      this.setState({
        searchedValue: searchInput,
        searchInput: '',
        searchResults: results,
      }, this.setState({
        searchLoading: false,
      }));
    });
  };

  render() {
    const { isButtonDisabled,
      searchedValue,
      searchLoading,
      searchResults,
      searchInput } = this.state;

    const albumsEls = searchResults.map((album) => {
      const { collectionId } = album;
      return (
        <CardAlbum key={ collectionId } album={ album } />
      );
    });
    const notFound = (<h2>Nenhum álbum foi encontrado</h2>);

    const content = searchResults.length > 0 ? (
      <div className="content">
        <h3>
          { `Resultado de álbuns de: ${searchedValue}` }
        </h3>
        <div className="albums">
          { albumsEls }
        </div>
      </div>) : null;

    if (searchLoading) return <Loading />;

    return (
      <div data-testid="page-search">
        <form action="">
          <label htmlFor="search">
            <input
              type="text"
              name="search"
              data-testid="search-artist-input"
              placeholder="Name of Artist"
              onChange={ this.setSearch }
              value={ searchInput }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.requestAlbum }
          >
            Pesquisar
          </button>
        </form>
        {searchResults.length < 1 && searchedValue !== '' ? notFound : content }
      </div>
    );
  }
}
