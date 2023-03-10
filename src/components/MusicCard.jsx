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
    console.log(track);
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
    const { track, updateFavorites } = this.props;
    const { checked: isFavorite } = e.target;
    this.setState({ isFavorite, isLoading: true });
    if (isFavorite) {
      await addSong(track);
      this.setState({ favoriteSongs: await getFavoriteSongs() });
    } else { await removeSong(track); }
    if (updateFavorites) updateFavorites(await getFavoriteSongs());
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, isFavorite } = this.state;
    const { track: { trackId, artworkUrl100 }, favPreview } = this.props;
    const favoriteCheckBox = isLoading ? <Loading /> : (
      <label htmlFor="Favorita" aria-labelledby="Favorita">
        Favorita
        <input
          id="Favorita"
          checked={ isFavorite }
          type="checkbox"
          name="Favorita"
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ this.setFavorite }
        />
      </label>
    );
    const { track } = this.props;
    const { trackName, previewUrl } = track;
    return (
      <div className="track-card">
        <div className="music-card-header">
          <h3>{ trackName }</h3>
          { favoriteCheckBox }
        </div>
        <div className="song">
          { favPreview
          && <img src={ artworkUrl100 } alt="" className="collection-art" /> }
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador n??o suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
  favPreview: PropTypes.bool,
  updateFavorites: PropTypes.func,
};
MusicCard.defaultProps = {
  updateFavorites: undefined,
  favPreview: false,
};
