import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    this.setState({ favoriteSongs: await getFavoriteSongs() });
    this.setState({ isLoading: false });
  }

  updateFavorites = (arr) => {
    console.log('rodou');
    this.setState({ favoriteSongs: arr });
  };

  render() {
    const { isLoading, favoriteSongs } = this.state;
    if (isLoading) return <Loading />;

    const favoriteSongsEls = favoriteSongs.map((song) => (
      <MusicCard
        updateFavorites={ this.updateFavorites }
        key={ song.trackId }
        track={ song }
      />));

    return (
      <div data-testid="page-favorites">
        <div className="collection-tracks">
          { favoriteSongsEls }
        </div>
      </div>
    );
  }
}
