import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
    this.btnEnable = this.btnEnable.bind(this);

    this.state = {
      loginName: '',
      loginButtonDisabled: true,
    };
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.btnEnable());
  }

  btnEnable() {
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

  render() {
    return (
      <BrowserRouter>
        <Route
          path="/"
          render={ (props) => (<Login
            { ...props }
            { ...this.state }
            btnEnable={ this.btnEnable }
            onInputChange={ this.onInputChange }
          />) }
        />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
