import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.getMusicFromApi = this.getMusicFromApi.bind(this);
    this.verifyFavorites = this.verifyFavorites.bind(this);

    this.state = {
      loading: false,
      artist: '',
      collection: '',
      tracks: [],
      favorites: [],
    };
  }

  componentDidMount() {
    this.getMusicFromApi();
    this.verifyFavorites();
  }

  async getMusicFromApi() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const favoritesList = await getFavoriteSongs();
    const playlist = await getMusics(id);
    const { artistName, collectionName } = playlist[0];
    this.setState({
      loading: false,
      artist: artistName,
      collection: collectionName,
      tracks: [...playlist],
      favorites: [...favoritesList],
    });
  }

  verifyFavorites() {

  }

  render() {
    const { loading, artist, collection, tracks, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading ? <p>Carregando...</p>
            : (
              <div>
                <h2 data-testid="artist-name">{artist}</h2>
                <h3 data-testid="album-name">{collection}</h3>
                <ul>
                  {
                    tracks.map((track) => {
                      if (track.trackId !== undefined) {
                        return (
                          <MusicCard
                            track={ track }
                            favorites={ favorites }
                          />
                        );
                      } return null;
                    })
                  }
                </ul>
              </div>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
  params: PropTypes.objectOf.isRequired,
  match: PropTypes.objectOf.isRequired,
};

export default Album;
