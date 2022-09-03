import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import logo from '../images/logo.png';

export default class Login extends Component {
  state = {
    name: '',
    isButtonDisabled: true,
  };

  componentDidUpdate() {
  }

  nameValidate = (e) => {
    const { value } = e.target;
    const minLength = 3;
    this.setState({ name: value }, () => {
      const { name } = this.state;
      const isValid = name.length >= minLength;
      this.setState({
        isButtonDisabled: !isValid,
      });
    });
  };

  loginSubmit = () => {
    const { loginIn, setLoading } = this.props;
    setLoading(true);
    loginIn(true);
    const { name } = this.state;
    createUser({ name }).then(() => setLoading(false));
  };

  render() {
    const { name, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-login" className="page-login">
        <img className="logo" src={ logo } alt="" />
        <form className="login-form" action="">
          <input
            placeholder="Name..."
            type="text"
            data-testid="login-name-input"
            onChange={ this.nameValidate }
            value={ name }
          />
          <button
            disabled={ isButtonDisabled }
            type="button"
            data-testid="login-submit-button"
            to="/search"
            onClick={ this.loginSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginIn: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
