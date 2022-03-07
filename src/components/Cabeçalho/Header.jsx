import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: false,
      name: false,
    };
  }

  componentDidMount() {
    this.userProfile();
  }

  userProfile = async () => {
    const user = await getUser();
    this.setState({
      userName: user.name,
      loading: false,
      name: true,
    });
    return user.name;
  };

  render() {
    const { userName, loading, name } = this.state;
    if (loading === false && name === true) {
      return (
        <header data-testid="header-component">
          <div>
            <h3>Trybe Tunes</h3>
          </div>
          <span className="userName" data-testid="header-user-name">
            {userName}
          </span>
          <div className="nav-links">
            <Link className="link" to="/search" data-testid="link-to-search">
              Pesquisar
            </Link>

            <Link
              className="link"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favoritos
            </Link>

            <Link
              className="link"
              to="/profile/edit"
              data-testid="link-to-profile"
            >
              Perfil
            </Link>
          </div>
        </header>
      );
    }
    if (loading === true && name === false) {
      return <Loading />;
    }
    return <Loading />;
  }
}
