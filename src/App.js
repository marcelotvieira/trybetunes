import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Header from './components/Header';
import { getFavoriteSongs } from './services/favoriteSongsAPI';

class App extends React.Component {
  state = {
    loggedIn: false,
    loading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    await this.setState({ loading: true });
    this.setState({
      favoriteSongs: await getFavoriteSongs(),
      loading: false,
    });
  }

  loginIn = (bool) => {
    this.setState({ loggedIn: bool });
  };

  setLoading = (bool) => {
    this.setState({ loading: bool });
  };

  render() {
    const { loggedIn, loading, favoriteSongs } = this.state;
    if (loading) return <Loading />;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              { loggedIn ? <Redirect to="/search" /> : <Login
                loginIn={ this.loginIn }
                setLoading={ this.setLoading }
              /> }
            </Route>
            <Route exact path="/search">
              <Header setLoading={ this.setLoading } />
              <Search favoriteSongs={ favoriteSongs } />
            </Route>
            <Route
              exact
              path="/album/:id"
              component={ Album }
            />
            <Route exact path="/favorites">
              <Header setLoading={ this.setLoading } />
              <Favorites favoriteSongs={ favoriteSongs } />
            </Route>
            <Route exact path="/profile">
              <Header setLoading={ this.setLoading } />
              <Profile />
            </Route>
            <Route exact path="/profile/edit">
              <Header setLoading={ this.setLoading } />
              <ProfileEdit />
            </Route>
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
