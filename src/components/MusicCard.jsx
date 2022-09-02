import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
    isFavorite: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    const { track } = this.props;
    this.setState({ isLoading: true });
    this.setState({ favoriteSongs: await getFavoriteSongs() }, () => {
      const { favoriteSongs } = this.state;
      const { trackId: id } = track;
      const isFavorite = favoriteSongs.some((trackItem) => trackItem.trackId === id);
      console.log(isFavorite);
      this.setState({ isFavorite, isLoading: false });
    });
  }

  setFavorite = async (e) => {
    const { track } = this.props;
    const { checked: isFavorite } = e.target;
    this.setState({ isFavorite, isLoading: true });
    if (isFavorite) {
      await addSong(track);
      this.setState({ favoriteSongs: await getFavoriteSongs() });
    } else { await removeSong(track); }
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, isFavorite } = this.state;
    const { track: { trackId } } = this.props;
    const favoriteCheckBox = isLoading ? <Loading /> : (
      <label htmlFor="favorite">
        Favorita
        <input
          checked={ isFavorite }
          type="checkbox"
          name="favorite"
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ this.setFavorite }
        />
      </label>
    );
    const { track } = this.props;
    const { trackName, previewUrl } = track;
    return (
      <div className="track-card">
        <div>
          <h3>{ trackName }</h3>
          { favoriteCheckBox }
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
};
