import React from 'react';
import { getUser } from '../../services/userAPI';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    this.userProfile();
  }

  userProfile = async () => {
    const user = await getUser();
    this.setState({
      userName: user.name,
    });
  };

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          <span className="userName" data-testid="header-user-name">
            {userName}
          </span>
        </div>
      </header>
    );
  }
}
