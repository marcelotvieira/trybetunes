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
      <header className="header-component" data-testid="header-component">
        {user.name !== '' ? <p data-testid="header-user-name">{ user.name }</p>
          : <Loading />}
        <ul className="menu">
          <li>
            <Link className="menu-link" to="/search" data-testid="link-to-search">
              Search
            </Link>
          </li>
          <li>
            <Link className="menu-link" to="/favorites" data-testid="link-to-favorites">
              Favorites
            </Link>
          </li>
          <li>
            <Link className="menu-link" to="/profile" data-testid="link-to-profile">
              Profile
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}
