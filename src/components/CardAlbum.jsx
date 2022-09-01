import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class CardAlbum extends Component {
  render() {
    const { album } = this.props;
    const { collectionName, collectionId, artistName, artworkUrl100 } = album;
    return (
      <div className="album-card">
        <img src={ artworkUrl100 } alt="" />
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <h3>{ collectionName }</h3>
        </Link>
        <p>{ artistName }</p>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  album: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  }),
};

CardAlbum.defaultProps = {
  album: {
    collectionPrice: 0,
  },
};
