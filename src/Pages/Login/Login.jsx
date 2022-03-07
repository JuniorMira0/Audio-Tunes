import React from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/Loading/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      isLengthEnough: true,
      loading: false,
      redirect: false,
    };
  }

  onChange = ({ target }) => {
    const { value } = target;
    this.setState({
      loginName: value,
      isLengthEnough: this.validate(value),
    });
  };

  validate = (value) => {
    if (value.length > 2) {
      return false;
    }
    return true;
  };

  submitOnClick = async (event) => {
    event.preventDefault();
    const { loginName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: loginName });
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    const { isLengthEnough, loading, redirect } = this.state;
    if (loading === false && redirect === false) {
      return (
        <div className="container" data-testid="page-login">
          <form onSubmit={this.submitOnClick}>
            <p>Welcome to Trybe Tunes</p>
            <br />
            <input
              name="name"
              onChange={this.onChange}
              type="text"
              placeholder="Name"
              data-testid="login-name-input"
            />
            <br />
            <br />
            <br />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={isLengthEnough}
            >
              Entrar
            </button>
          </form>

          <div className="drops">
            <div className="drop drop-1" />
            <div className="drop drop-2" />
            <div className="drop drop-3" />
            <div className="drop drop-4" />
            <div className="drop drop-5" />
          </div>
        </div>
      );
    }
    if (loading === true) {
      return <Loading />;
    }
    if (loading === false && redirect === true) {
      return <Redirect to="/search" />;
    }
  }
}
export default Login;
