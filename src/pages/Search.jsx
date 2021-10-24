import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.searchSubmit = this.searchSubmit.bind(this);

    this.state = {
      loading: false,
      renderCollections: false,
      collections: [],
      artist: '',
    };
  }

  async searchSubmit(event) {
    event.preventDefault();
    const { searchInput, clearSearchInput } = this.props;
    this.setState({
      loading: true,
      artist: searchInput,
    });
    const artistCollections = await searchAlbumsAPI(searchInput);
    this.setState({
      loading: false,
      renderCollections: true,
      collections: artistCollections,
    }, () => clearSearchInput());
  }

  verifySearch() {
    const { artist, collections } = this.state;
    if (collections.length !== 0) {
      return (
        <section>
          <p>{`Resultado de álbuns de: ${artist}`}</p>
          {
            collections.map((collection) => (
              <div key={ collection.collectionName }>
                <Link
                  data-testid={ `link-to-album-${collection.collectionId}` }
                  to={ `/album/${collection.collectionId}` }
                >
                  {' '}
                  {collection.collectionName}
                  {' '}

                </Link>
              </div>
            ))
          }
        </section>
      );
    } return (
      <p>Nenhum álbum foi encontrado</p>
    );
  }

  renderSearch() {
    const { searchButtonDisabled, onInputChange, searchInput } = this.props;
    const { renderCollections } = this.state;
    return (
      <section>
        <form
          onSubmit={ this.searchSubmit }
        >
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
              type="submit"
              data-testid="search-artist-button"
              disabled={ searchButtonDisabled }
            >
              Pesquisar
            </button>
          </label>
        </form>
        {
          renderCollections ? this.verifySearch() : null
        }
      </section>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? <p>Carregando...</p>
            : this.renderSearch()
        }
      </div>
    );
  }
}

Search.propTypes = {
  searchButtonDisabled: PropTypes.bool.isRequired,
  searchInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  clearSearchInput: PropTypes.func.isRequired,
};

export default Search;
