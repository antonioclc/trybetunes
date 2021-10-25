import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.favoriteSong = this.favoriteSong.bind(this);

    this.state = {
      loading: false,
      isChecked: false,
    };
  }

  async favoriteSong() {
    const { isChecked } = this.state;
    this.setState({
      loading: true,
      isChecked: !isChecked,
    });
    await addSong(this.props);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { track: { trackName, previewUrl, trackId } } = this.props;
    const { loading, isChecked } = this.state;
    return (
      <div>
        {
          loading ? <p>Carregando...</p>
            : (
              <div>
                <li>
                  <p>{ trackName }</p>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                  </audio>
                  <label htmlFor="favorite">
                    Favorita
                    <input
                      id="favorite"
                      type="checkbox"
                      data-testid={ `checkbox-music-${trackId}` }
                      checked={ isChecked }
                      onClick={ this.favoriteSong }
                    />
                  </label>

                </li>
              </div>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  track: PropTypes.objectOf.isRequired,
};

export default MusicCard;
