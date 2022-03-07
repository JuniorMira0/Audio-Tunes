import React from 'react';
import Header from '../components/Cabeçalho/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      isDisabled: true,
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

  render() {
    const { searchInput, isDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="search-input"
            value={ searchInput }
            onChange={ this.onChange }
          />

          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ isDisabled }
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
