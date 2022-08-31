import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    isButtonDisabled: true,
    search: '',
  };

  componentDidUpdate() {
    const { search, isButtonDisabled } = this.state;
    const isValid = search.length >= 2;
    if (isButtonDisabled === isValid) {
      this.setState({ isButtonDisabled: !isValid });
    }
  }

  setSearch = (e) => {
    const { value } = e.target;
    this.setState({ search: value });
  };

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            data-testid="search-artist-input"
            placeholder="Name of Artist"
            onChange={ this.setSearch }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isButtonDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
