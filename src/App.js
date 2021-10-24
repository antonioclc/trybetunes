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
    this.btnEnable = this.loginBtnEnable.bind(this);

    this.state = {
      loginName: '',
      loginButtonDisabled: true,
      searchInput: '',
      searchButtonDisabled: true,
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
            />) }
          />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
