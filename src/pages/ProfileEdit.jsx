import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      image: '',
      description: '',
      editProfileButtonDisabled: true,
      redirect: false,
    };

    this.getUserData = this.getUserData.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.editProfileButtonState = this.editProfileButtonState.bind(this);
    this.editProfileSubmit = this.editProfileSubmit.bind(this);
    this.renderOrRedirect = this.renderOrRedirect.bind(this);
  }

  async componentDidMount() {
    await this.getUserData();
    this.editProfileButtonState();
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.editProfileButtonState());
  }

  async getUserData() {
    this.setState({ loading: true });
    const userData = await getUser();
    this.setState({
      loading: false,
      name: userData.name,
      email: userData.email,
      image: userData.image,
      description: userData.description,
    });
  }

  editProfileButtonState() {
    const { name, email, image, description } = this.state;
    if (name.length > 0 && email.length > 0
      && image.length > 0 && description.length > 0) {
      this.setState({ editProfileButtonDisabled: false });
    }
  }

  async editProfileSubmit(event) {
    event.preventDefault();
    const { name, email, image, description } = this.state;
    this.setState({ loading: true });
    await updateUser(
      {
        name,
        email,
        image,
        description,
      },
    );
    this.setState({ loading: false, redirect: true });
  }

  renderOrRedirect() {
    const { name, email, image, description,
      editProfileButtonDisabled, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        <form
          onSubmit={ this.editProfileSubmit }
        >
          <label htmlFor="profileName">
            Nome:
            <input
              id="profileName"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
              type="text"
              data-testid="edit-input-name"
            />
          </label>
          <label htmlFor="profileEmail">
            Email:
            <input
              id="profileEmail"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
              type="email"
              data-testid="edit-input-email"
            />
          </label>
          <label htmlFor="profileImage">
            Imagem URL:
            <input
              id="profileImage"
              name="image"
              value={ image }
              onChange={ this.onInputChange }
              type="text"
              data-testid="edit-input-image"
            />
          </label>
          <label htmlFor="profileDescripition">
            Descrição:
            <input
              id="profileDescripition"
              name="description"
              value={ description }
              onChange={ this.onInputChange }
              type="text"
              data-testid="edit-input-description"
            />
          </label>
          <button
            type="submit"
            data-testid="edit-button-save"
            disabled={ editProfileButtonDisabled }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loading ? <p>Carregando...</p> : this.renderOrRedirect()
        }
      </div>
    );
  }
}

export default ProfileEdit;
