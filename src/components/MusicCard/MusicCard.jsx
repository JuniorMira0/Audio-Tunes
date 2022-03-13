import PropTypes from 'prop-types';
import React from 'react';

export default class MusicCard extends React.Component {
  render() {
    const { previewUrl, trackName } = this.props;
    return (
      <div className="MusicCard">
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};
