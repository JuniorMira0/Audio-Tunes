import PropTypes from 'prop-types';
import React from 'react';

export default class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    const { isFavorite } = this.props;
    this.state = {
      checked: isFavorite,
    };
  }

  addFavoriteSong = async (song) => {
    const { onAddFavorite, onRemoveFavorite } = this.props;
    await this.setState((prevState) => ({
      checked: !prevState.checked,
    }), async () => {
      const { checked } = this.state;
      if (checked) {
        await onAddFavorite(song);
        console.log('add');
      } else {
        await onRemoveFavorite(song);
        console.log('remove');
      }
    });
  }

  render() {
    const { previewUrl, trackName, trackId, song } = this.props;
    const { checked } = this.state;

    return (
      <div className="MusicCard">
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>

        </audio>
        <label htmlFor="favorite">
          Favotita
          <input
            type="checkbox"
            name="favorite"
            id="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => this.addFavoriteSong(song) }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.shape(Object).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
};
