import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';

export default class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      loading: false,
    };
  }

  addFavoriteSong = async () => {
    const { trackName, previewUrl, trackId } = this.props;
    const song = {
      trackName,
      previewUrl,
      trackId,
    };
    console.log(song);
    this.setState((prevState) => ({
      checked: !prevState.checked,
      loading: true,
    }), async () => {
      const { checked } = this.state;
      if (checked) {
        await addSong(song);
        await getFavoriteSongs();
      } else {
        await removeSong(song);
      }
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { checked, loading } = this.state;

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
                onChange={ this.addFavoriteSong }
                checked={ checked }
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
};
