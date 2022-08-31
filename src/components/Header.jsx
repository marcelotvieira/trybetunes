import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    user: {
      name: '',
    },
  };

  componentDidMount() {
    getUser().then((user) => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        {user.name !== '' ? <p data-testid="header-user-name">{ user.name }</p>
          : <Loading />}
        <Link to="/search" data-testid="link-to-search">
          Search
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favorites
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Profile
        </Link>
      </header>
    );
  }
}
