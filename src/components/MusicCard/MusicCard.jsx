import PropTypes from 'prop-types';
import React from 'react';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';

export default class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      loading: false,
    };
  }

  addFavoriteSong = async (song) => {
    this.setState((prevState) => ({
      checked: !prevState.checked,
      loading: true,
    }), async () => {
      const { checked } = this.state;
      if (checked) {
        await addSong(song);
      } else {
        await removeSong(song);
      }
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { previewUrl, trackName, trackId, song, isFavorite } = this.props;
    const { loading, checked } = this.state;

    return (
      loading ? <Loading />
        : (
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
                checked={ isFavorite || checked }
              />
            </label>
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.shape(Object).isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
