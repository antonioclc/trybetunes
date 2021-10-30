import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.restoreFavoritesList = this.restoreFavoritesList.bind(this);

    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    this.restoreFavoritesList();
  }

  componentDidUpdate() {
    this.restoreFavoritesList();
  }

  async restoreFavoritesList() {
    const favoritesList = await getFavoriteSongs();
    this.setState({
      favorites: [...favoritesList],
    });
  }

  render() {
    const { favorites } = this.state;
    const { loading, loadingOn, loadingOff } = this.props;
    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites:
        {
          loading ? <p>Carregando...</p> : favorites.map((track) => (
            <MusicCard
              key={ track.trackId }
              track={ track }
              favorites={ favorites }
              loadingOn={ loadingOn }
              loadingOff={ loadingOff }

            />
          ))
        }
      </div>
    );
  }
}

Favorites.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadingOff: PropTypes.func.isRequired,
  loadingOn: PropTypes.func.isRequired,
};

export default Favorites;
