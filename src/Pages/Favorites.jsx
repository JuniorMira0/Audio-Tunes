import React from 'react';
import Header from '../components/Cabeçalho/Header';
import Loading from '../components/Loading/Loading';
import MusicCard from '../components/MusicCard/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songList: null,
      artistName: '',
      album: '',
    };
  }

  componentDidMount() {
    this.hlandleSongs();
    this.favSongs();
    addSong();
  }

  hlandleSongs = async () => {
    const result = await getFavoriteSongs();
    if (!result.length) return;
    this.setState({
      album: 'Favorita',
      songList: result,
    });
  };

  favSongs = async () => {
    const fav = await getFavoriteSongs();
    console.log(fav);
    this.setState({
      songList: fav,
    });
  };

  onAddFavorite = async () => {

  }

  onRemoveFavorite = async (song) => {
    this.setState(() => ({
      songList: null,
    }), async () => {
      await removeSong(song);
      await this.favSongs();
      await this.hlandleSongs();
      const result = await getFavoriteSongs();
      this.setState({
        songList: result,
      });
    });
  }

  renderMusic = () => {
    const { songList, artistName, album } = this.state;
    return (
      <div>
        <div>
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{album}</p>
        </div>
        <div>
          {songList.map(({ trackName, previewUrl, trackId }, index) => (
            <MusicCard
              key={ index }
              trackName={ trackName }
              previewUrl={ previewUrl }
              trackId={ trackId }
              favoritas={ songList }
              song={ songList[index] }
              isFavorite={ songList.some((id) => id.trackId === trackId) }
              onAddFavorite={ () => this.onAddFavorite(songList[index]) }
              onRemoveFavorite={ () => this.onRemoveFavorite(songList[index]) }
            />
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { songList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { songList === null ? <Loading /> : this.renderMusic() }
      </div>
    );
  }
}

export default Favorites;
