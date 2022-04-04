import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import coinsApi from '../actions/actionWallet';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatchCoins } = this.props;
    dispatchCoins();
  }

  render() {
    const { userEmail, currencies } = this.props;
    return (
      <>
        <header>
          <h1 data-testid="email-field">
            { userEmail }
          </h1>
          <p data-testid="total-field">
            0
          </p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
        <form>
          <p data-testid="value-input">
            Value
          </p>
          <p data-testid="description-input">
            Description
          </p>
          <label htmlFor="Moeda">
            Moeda
            <select id="Moeda" data-testid="currency-input">
              {currencies && currencies
                .map((element, index) => <option key={ index }>{element}</option>)}
            </select>
          </label>
          <select data-testid="method-input">
            <option value="cash">Dinheiro</option>
            <option value="debit">Cartão de débito</option>
            <option value="credit">Cartão de crédito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button type="submit"> Adicionar despesa </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCoins: () => dispatch(coinsApi()),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  dispatchCoins: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
