import React, { Component } from 'react';
import { AuthHOC } from 'components/AuthorizeProvider';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
	  email: '',
	  password: '',
	  errors: '',
  };

  handleChangeForm = (e) => {
      this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = () => {
      const { email, password } = this.state;
      const { authorizeUser } = this.props;

      if (authorizeUser(email, password)) {
	      this.setState( ({ errors }) => ({ errors: ''}));
	      this.props.history.push('/main');
      } else {
	      this.setState( ({ errors }) => ({ errors: 'Проверьте введённые данные'}));
      }
  };

  render() {
    const { isAuthorized } = this.props;
    const { email, password } = this.props;
    const { errors } = this.state;

    const authForm = (
      <div className="form-group">
        <input type="text" placeholder="Логин"
               name='email'
               value={ email }
               onChange={ this.handleChangeForm }
        />
        <input type="text" placeholder="Пароль"
               name='password'
               value={ password }
               onChange={ this.handleChangeForm }
        />
        <button className="button-auth"
                onClick={ this.handleClick }
        > Авторизироваться
        </button>
	      {errors !== '' ? <p className="error">{ errors }</p> : null}
      </div>
    )
    return isAuthorized ? <Redirect to="/" /> : authForm;
  }
}

export default AuthHOC(Login);
