import React from 'react';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';
import './Header.css';

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
            <span className="userName" data-testid="header-user-name">
              {userName}
            </span>
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
