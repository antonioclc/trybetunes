import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    const { searchButtonDisabled, onInputChange, searchInput } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              id="search"
              name="searchInput"
              value={ searchInput }
              onChange={ onInputChange }
              type="text"
              data-testid="search-artist-input"
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ searchButtonDisabled }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  searchButtonDisabled: PropTypes.bool.isRequired,
  searchInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Search;
