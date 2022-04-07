import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table>
        <thead>
          <tr>
            <th> Descrição </th>
            <th> Tag </th>
            <th> Método de pagamento </th>
            <th> Valor </th>
            <th> Moeda </th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th> Moeda de conversão </th>
            <th> Editar/Excluir </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element, index) => (
            <tr key={ index }>
              <td>
                {element.description}
              </td>
              <td>
                {element.tag}
              </td>
              <td>
                {element.method}
              </td>
              <td>
                {Number(element.value).toFixed(2)}
              </td>
              <td>
                {(element.exchangeRates[element.currency].name).split('/')[0]}
              </td>
              <td>
                {Number(element.exchangeRates[element.currency].ask).toFixed(2)}
              </td>
              <td>
                {(Number(element.value) * Number(element
                  .exchangeRates[element.currency].ask)).toFixed(2)}
              </td>
              <td>
                Real
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Table);
