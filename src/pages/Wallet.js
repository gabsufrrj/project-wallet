import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import coinsApi from '../actions/actionWallet';
import { exchangesApi } from '../actions/actionExpenses';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',

    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    const { dispatchCoins } = this.props;
    dispatchCoins();
  }

  onSubmit(event) {
    event.preventDefault();
    const { dispatchExchanges } = this.props;
    dispatchExchanges(this.state);
    this.setState({
      value: '0',
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { userEmail, currencies, description, total } = this.props;
    const { value } = this.state;
    return (
      <>
        <header>
          <h1 data-testid="email-field">
            { userEmail }
          </h1>
          <p data-testid="total-field">
            {
              !total ? 0 : total
            }
          </p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
        <form>
          <label htmlFor="value">
            <input
              onChange={ this.handleChange }
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              id="value"
            />
          </label>
          <label htmlFor="description">
            <input
              onChange={ this.handleChange }
              data-testid="description-input"
              type="text"
              name="description"
            />
          </label>
          <label htmlFor="Moeda">
            Moeda
            <select
              onChange={ this.handleChange }
              name="currency"
              id="Moeda"
              data-testid="currency-input"
            >
              {currencies && currencies
                .map((element, index) => <option key={ index }>{element}</option>)}
            </select>
          </label>
          <select onChange={ this.handleChange } name="method" data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de débito</option>
            <option>Cartão de crédito</option>
          </select>
          <select onChange={ this.handleChange } name="tag" data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button type="submit" onClick={ this.onSubmit }> Adicionar despesa </button>
        </form>
        <table>
          <header>
            <p>
              Descrição
              <p>
                { description }
              </p>
            </p>
            <p>Tag</p>
            <p>Método de pagamento</p>
            <p>Valor</p>
            <p>Moeda</p>
            <p>Câmbio utilizado</p>
            <p>Valor convertido</p>
            <p>Moeda de conversão</p>
            <p>Editar/Excluir</p>
          </header>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  description: state.wallet.expenses.description,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCoins: () => dispatch(coinsApi()),
  dispatchExchanges: (state) => dispatch(exchangesApi(state)),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  dispatchCoins: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchExchanges: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
