import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Cabeçalho/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading/Loading';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songList: [],
      artistName: '',
      album: '',
      favoritas: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.hlandleSongs();
    this.favSongs();
    addSong();
  }

  hlandleSongs = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props; // match contem info sobre como o route path correspondeu a url
    const result = await getMusics(id);
    this.setState({
      artistName: result[0].artistName,
      album: result[0].collectionName,
      songList: result,
      loading: false,
    });
  };

  favSongs = async () => {
    const fav = await getFavoriteSongs();
    console.log(fav);
    this.setState({
      favoritas: fav,
    });
  };

  onAddFavorite = async (song) => {
    await this.setState(() => ({
      loading: true,
    }), async () => {
      await addSong(song);
      await this.favSongs();
      this.setState({
        loading: false,
      });
    });
  }

  onRemoveFavorite = async (song) => {
    await this.setState(() => ({
      loading: true,
    }), async () => {
      await removeSong(song);
      await this.favSongs();
      this.setState({
        loading: false,
      });
    });
  }

  renderMusic = () => {
    const { songList, artistName, album, favoritas } = this.state;
    return (
      <div>
        <div>
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{album}</p>
        </div>
        <div>
          {songList.map(({ trackName, previewUrl, trackId }, index) => {
            if (index === 0) {
              return null;
            }
            return (
              <MusicCard
                key={ index }
                trackName={ trackName }
                previewUrl={ previewUrl }
                trackId={ trackId }
                favoritas={ favoritas }
                song={ songList[index] }
                isFavorite={ favoritas.some((id) => id.trackId === trackId) }
                onAddFavorite={ () => this.onAddFavorite(songList[index]) }
                onRemoveFavorite={ () => this.onRemoveFavorite(songList[index]) }
              />
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    const { loading, favoritas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {/* {this.renderMusic()} */}
        {favoritas !== null && !loading ? this.renderMusic() : <Loading />}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequirgited,
    }),
  }),
}.isRequired;

// teste
