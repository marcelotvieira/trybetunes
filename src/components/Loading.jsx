import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <span className="loading-frame">.</span>
        Carregando...
      </div>
    );
  }
}
