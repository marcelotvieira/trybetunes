import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    albumId: '',
    tracks: [],
    artistName: '',
    collectionName: '',
    isLoading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    this.setState({ isLoading: true, favoriteSongs: await getFavoriteSongs()});
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ albumId: id });
    await this.fetchTracks();
    this.setState({ isLoading: false });
  }

  fetchTracks = async () => {
    const { albumId } = this.state;
    const response = await getMusics(albumId);
    if (response.length > 0) {
      const [artist] = response;
      const { artistName, collectionName } = artist;
      this.setState({
        tracks: response.filter((track, index) => index !== 0 && track),
        artistName,
        collectionName });
    }
  };

  render() {
    const { tracks, artistName, collectionName, isLoading, favoriteSongs } = this.state;
    const trackEls = tracks.map((track, index) => {
      const { trackId: id } = track;
      const isFavorite = favoriteSongs.some((trackItem) => trackItem.trackId === id);
      if (index === 0) return null;
      return (
        <div key={ index }>
          <MusicCard
            isFavorite={ isFavorite }
            track={ track }
          />
        </div>
      );
    });
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ artistName }</h2>
        <p data-testid="album-name">{ collectionName }</p>
        { trackEls }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
