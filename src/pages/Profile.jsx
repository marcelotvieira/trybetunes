import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Profile extends Component {
  state = {
    user: {
      userName: '',
      userEmail: '',
      userAvatarPhoto: '',
      userDescription: '',
    },
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const userData = await getUser();
    this.setState({ user: { ...userData } });
    this.setState({ isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div className="page-profile" data-testid="page-profile">
        <div className="profile-left">
          <img src={ user.image } data-testid="profile-image" alt="" />
          <div className="profile-header">
            <h3>{ user.name }</h3>
            <Link to="/profile/edit" className="edit-button">
              Editar perfil
            </Link>
          </div>
        </div>
        <div className="profile-right">
          <label htmlFor="mail">
            Email:
            <p name="mail">
              { user.email }
            </p>
          </label>
          <label htmlFor="description">
            Descrição:
            <p name="description">
              { user.description }
            </p>
          </label>
        </div>
      </div>
    );
  }
}
