import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.loginBtnEnable = this.loginBtnEnable.bind(this);
    this.searchBtnEnable = this.searchBtnEnable.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.loadingOn = this.loadingOn.bind(this);
    this.loadingOff = this.loadingOff.bind(this);

    this.state = {
      loginName: '',
      loginButtonDisabled: true,
      searchInput: '',
      searchButtonDisabled: true,
      loading: false,
    };
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.verifyBtn());
  }

  verifyBtn() {
    this.loginBtnEnable();
    this.searchBtnEnable();
  }

  loginBtnEnable() {
    const { loginName } = this.state;
    const minimumLoginSize = 3;
    if (loginName.length >= minimumLoginSize) {
      this.setState({
        loginButtonDisabled: false,
      });
    } else {
      this.setState({
        loginButtonDisabled: true,
      });
    }
  }

  searchBtnEnable() {
    const { searchInput } = this.state;
    const minimumLoginSize = 2;
    if (searchInput.length >= minimumLoginSize) {
      this.setState({
        searchButtonDisabled: false,
      });
    } else {
      this.setState({
        searchButtonDisabled: true,
      });
    }
  }

  clearSearchInput() {
    this.setState({
      searchInput: '',
    });
  }

  loadingOn() {
    this.setState({ loading: true });
  }

  loadingOff() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              { ...this.state }
              onInputChange={ this.onInputChange }
            />) }
          />
          <Route
            exact
            path="/search"
            render={ (props) => (<Search
              { ...props }
              { ...this.state }
              onInputChange={ this.onInputChange }
              searchBtnEnable={ this.searchBtnEnable }
              clearSearchInput={ this.clearSearchInput }
            />) }
          />
          <Route
            path="/album/:id"
            render={ (props) => (<Album
              { ...props }
              { ...this.state }
              loadingOn={ this.loadingOn }
              loadingOff={ this.loadingOff }
            />) }
          />
          <Route
            path="/favorites"
            render={ (props) => (<Favorites
              { ...props }
              { ...this.state }
              loadingOn={ this.loadingOn }
              loadingOff={ this.loadingOff }
            />) }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
