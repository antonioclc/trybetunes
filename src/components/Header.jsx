import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.userName = this.userName.bind(this);

    this.state = {
      loading: false,
      username: '',
    };
  }

  componentDidMount() {
    this.userName();
  }

  async userName() {
    const { username } = this.state;
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      username: user.name,
      loading: false,
    });
    return username;
  }

  render() {
    const { loading, username } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        {
          loading ? <p>Carregando...</p>
            : <h2 data-testid="header-user-name">{ username }</h2>
        }
      </header>
    );
  }
}

export default Header;
