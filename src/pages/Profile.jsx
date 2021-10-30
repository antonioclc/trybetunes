import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      image: '',
      description: '',
    };

    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    this.getUserData();
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

  render() {
    const { loading, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <p>Carregando...</p> : (
            <div>
              <img src={ image } alt="" data-testid="profile-image" />
              <p>{name}</p>
              <p>{email}</p>
              <p>{description}</p>
              <Link
                to="/profile/edit"
              >
                {' '}
                Editar perfil
                {' '}

              </Link>
            </div>
          )
        }
      </div>
    );
  }
}

export default Profile;
