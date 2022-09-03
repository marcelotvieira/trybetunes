import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class ProfileEdit extends Component {
  state = {
    user: {
      name: '',
      email: '',
      image: '',
      description: '',
    },
    isValid: false,
    isLoading: false,
    isSaved: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    this.setState({ user: { ...await getUser() } });
    this.setState({ isLoading: false });
  }

  componentDidUpdate() {
    const { user, user: { email }, isValid } = this.state;
    let isValidValues = !Object.values(user).some((value) => value === '');
    const mailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!mailReg.test(email)) {
      isValidValues = false;
    }
    if (isValid !== isValidValues) this.setState({ isValid: isValidValues });
  }

  setInputChange = (e) => {
    const { name, value } = e.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user });
  };

  saveEdition = () => {
    console.log('rodou');
    this.setState({ isLoading: true });
    const { user } = this.state;
    updateUser(user);
    this.setState({ isSaved: true, isLoading: false });
  };

  render() {
    const { user, isLoading, isValid, isSaved } = this.state;
    if (isLoading) return <Loading />;
    if (isSaved) return <Redirect to="/profile" />;
    return (
      <div data-testid="page-profile-edit">
        <form action="" className="profile-edit-form">
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              data-testid="edit-input-name"
              onChange={ this.setInputChange }
              defaultValue={ user.name }
              name="name"
            />
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              type="text"
              data-testid="edit-input-email"
              onChange={ this.setInputChange }
              defaultValue={ user.email }
              name="email"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <textarea
              data-testid="edit-input-description"
              onChange={ this.setInputChange }
              defaultValue={ user.description }
              name="description"
            />
          </label>
          <label htmlFor="image">
            Foto:
            <input
              type="text"
              data-testid="edit-input-image"
              onChange={ this.setInputChange }
              defaultValue={ user.image }
              name="image"
            />
          </label>
          <button
            type="button"
            disabled={ !isValid }
            data-testid="edit-button-save"
            onClick={ this.saveEdition }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}
