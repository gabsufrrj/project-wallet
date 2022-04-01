import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addEmail from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isSaveButtonDisabled: true,
    };
    this.validation = this.validation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { history, dispatchEmailValue } = this.props;
    dispatchEmailValue(this.state);
    history.push('/carteira');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => {
        this.validation();
      });
  }

  validation() {
    const validationNumber = 6;
    const { email, password } = this.state;
    if (password.length >= validationNumber && email.includes('@' && '.com')) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  render() {
    const { isSaveButtonDisabled, email, password } = this.state;
    return (
      <form>
        <label htmlFor="email-input">
          Email
          {' '}
          <input
            onChange={ this.handleChange }
            value={ email }
            data-testid="email-input"
            type="text"
            name="email"
          />
        </label>
        <label htmlFor="password-input">
          Senha
          {' '}
          <input
            onChange={ this.handleChange }
            value={ password }
            data-testid="password-input"
            type="password"
            name="password"
          />
        </label>
        <button
          disabled={ isSaveButtonDisabled }
          type="submit"
          onClick={ this.onSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmailValue: (state) => dispatch(addEmail(state)),
});

Login.propTypes = {
  dispatchEmailValue: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
