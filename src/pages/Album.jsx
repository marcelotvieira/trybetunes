import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    albumId: '',
    tracks: [],
    artistName: '',
    collectionName: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    await this.setState({ albumId: id });
    this.fetchTracks();
  }

  fetchTracks = async () => {
    const { albumId } = this.state;
    const response = await getMusics(albumId);
    const [artist] = response;
    const { artistName, collectionName } = artist;
    this.setState({ tracks: response, artistName, collectionName });
  };

  render() {
    const { tracks, artistName, collectionName } = this.state;
    const trackEls = tracks.map((track, index) => {
      if (index === 0) return null;
      return (
        <div key={ index }>
          <MusicCard
            track={ track }
          />
        </div>
      );
    });

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
