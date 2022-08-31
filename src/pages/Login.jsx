import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    const logo = 'https://cdn-icons-png.flaticon.com/512/167/167643.png?w=360'
    return (
      <div data-testid="page-login">
        <img className={ logo } src="" alt="" />
      </div>
    );
  }
}
