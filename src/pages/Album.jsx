import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

export default class Album extends Component {
  state = {
    albumId: '',
    tracks: [],
    artistName: '',
    collectionName: '',
    collectionArt: '',
    isLoading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    await this.setState({ albumId: id, isLoading: true });
    this.fetchTracks();
  }

  fetchTracks = async () => {
    const { albumId } = this.state;
    const response = await getMusics(albumId);
    const [artist] = response;
    const { artistName, collectionName, artworkUrl100 } = artist;
    this.setState({ tracks: response,
      artistName,
      collectionName,
      collectionArt: artworkUrl100,
    });
    this.setState({ isLoading: false });
  };

  render() {
    const { tracks, artistName, collectionName, collectionArt, isLoading } = this.state;
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
      <div data-testid="page-album" className="page-album">
        <Header />
        <div className="album-content">
          <div className="collection-info">
            { isLoading ? <Loading /> : <img src={ collectionArt } alt="" /> }
            <h2 data-testid="artist-name">{ artistName }</h2>
            <p data-testid="album-name">{ collectionName }</p>
          </div>
          <div className="collection-tracks">
            { trackEls }
          </div>
        </div>
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
