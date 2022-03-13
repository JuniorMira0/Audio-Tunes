import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Cabeçalho/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songList: [],
      artistName: '',
      album: '',
    };
  }

  componentDidMount() {
    this.hlandleSongs();
  }

  hlandleSongs = async () => {
    const { match: { params: { id } } } = this.props; // match contem info sobre como o route path correspondeu a url
    const result = await getMusics(id);
    this.setState = ({
      artistName: result[0].artistName,
      album: result[0].collectionName,
      songList: result,
    });
    console.log(result[0]);
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
          {songList.map(({ trackName, previewUrl }, index) => {
            if (index === undefined) {
              return null;
            } return (
              <MusicCard
                key={ index }
                trackName={ trackName }
                previewUrl={ previewUrl }
              />);
          })}
        </div>
      </div>
    );
  }

  render() {
    const { songList } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { songList ? this.renderMusic() : undefined }
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;
