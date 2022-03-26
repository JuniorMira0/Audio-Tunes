import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Cabeçalho/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.getUserLogin();
  }

  getUserLogin = async () => {
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    });
  }

  render() {
    const {
      name,
      email,
      image,
      description,
    } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          <img data-testid="profile-image" src={ image } alt={ name } />
          <span>{ name }</span>
          <span>{ email }</span>
          <span>{ description }</span>
        </div>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
