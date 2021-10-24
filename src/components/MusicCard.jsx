import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { track: { trackName, previewUrl } } = this.props;
    return (
      <div>
        <li>
          <p>{ trackName }</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
          </audio>
        </li>
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
