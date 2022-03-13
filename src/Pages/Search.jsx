import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Cabeçalho/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading/Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      isDisabled: true,
      loading: false,
      albums: [],
      artist: '',
    };
  }

  onChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchInput: value,
      isDisabled: this.validate(value),
    });
  };

  validate = (value) => {
    if (value.length > 1) {
      return false;
    }
    return true;
  };

  searchAlbums = async (event) => {
    const { searchInput } = this.state;
    event.preventDefault();
    this.setState({ loading: true });
    const result = await searchAlbumsAPI(searchInput);
    this.setState({
      albums: result,
      loading: false,
      searchInput: '',
      artist: searchInput,
    });
  };

  render() {
    const { searchInput, isDisabled, loading, albums, artist } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {loading
          ? <Loading />
          : (
            <>
              <div>
                <form>
                  <input
                    type="text"
                    placeholder="Nome do album"
                    data-testid="search-artist-input"
                    name="search-input"
                    value={ searchInput }
                    onChange={ this.onChange }
                  />
                  <button
                    data-testid="search-artist-button"
                    type="submit"
                    disabled={ isDisabled }
                    onClick={ this.searchAlbums }
                  >
                    Search
                  </button>
                </form>
                <h2>{`Resultado de álbuns de: ${artist}`}</h2>
              </div>

              {albums.length <= 0
                ? (<p>Nenhum álbum foi encontrado</p>)
                : (
                  <section>
                    {albums.map(({
                      collectionId,
                      collectionName,
                      artistName,
                      artworkUrl100,
                    }, index) => (
                      <div key={ index.artistName } className="album">
                        <Link
                          to={ `/album/${collectionId}` }
                          data-testid={ `link-to-album-${collectionId}` }
                        >
                          <img src={ artworkUrl100 } alt="album artist" />
                          <h3>{collectionName}</h3>
                          <p>{artistName}</p>
                        </Link>
                      </div>
                    ))}
                  </section>
                )}
            </>
          )}
      </div>
    );
  }
}

export default Search;
