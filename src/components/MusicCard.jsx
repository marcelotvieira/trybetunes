import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    isFavorite: false,
    isLoading: false,
  };

  setFavoriteSong = async (e) => {
    const { track } = this.props;
    const { checked } = e.target;
    await this.setState({ isFavorite: checked, isLoading: true });
    if (checked) {
      await addSong(track);
    } else { await removeSong(track); }
    this.setState({ isLoading: false });
  };

  render() {
    const { track } = this.props;
    const { trackName, previewUrl, trackId } = track;
    const { isLoading, isFavorite } = this.state;

    const setFavoriteCheckbox = (
      <label htmlFor="favorite">
        Favorita
        <input
          checked={ isFavorite }
          type="checkbox"
          name="favorite"
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ this.setFavoriteSong }
        />
      </label>
    );

    return (
      <div className="track-card">
        <div className="track-header">
          <h3>{ trackName }</h3>
          { isLoading ? <Loading /> : setFavoriteCheckbox }
        </div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
