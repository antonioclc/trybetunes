import React from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.loginSubmit = this.loginSubmit.bind(this);
    this.redirectSearch = this.redirectSearch.bind(this);
    this.renderForm = this.renderForm.bind(this);

    this.state = {
      loading: false,
      redirectSearch: false,
    };
  }

  redirectSearch() {
    const { loading } = this.state;
    return (
      <Router>
        {loading ? null : <Redirect to="/search" />}
      </Router>
    );
  }

  async loginSubmit(event) {
    event.preventDefault();
    const { loginName } = this.props;
    this.setState({ loading: true });
    await createUser({ name: loginName });
    this.setState({
      loading: false,
      redirectSearch: true,
    });
  }

  renderForm() {
    const { loginButtonDisabled, onInputChange, loginName } = this.props;
    const { loading } = this.state;
    if (loading) {
      return <p>Carregando...</p>;
    }
    return (
      <form
        onSubmit={ this.loginSubmit }
      >
        <label htmlFor="name">
          Login
          <input
            id="name"
            name="loginName"
            value={ loginName }
            onChange={ onInputChange }
            type="text"
            data-testid="login-name-input"
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ loginButtonDisabled }
          >
            Entrar
          </button>
        </label>
      </form>
    );
  }

  render() {
    const { redirectSearch } = this.state;

    return (
      <div data-testid="page-login">
        {
          redirectSearch ? <Redirect to="/search" /> : this.renderForm()
        }
      </div>
    );
  }
}

Login.propTypes = {
  loginButtonDisabled: PropTypes.bool.isRequired,
  loginName: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Login;
