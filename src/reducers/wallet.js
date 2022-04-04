// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const mountCurrencies = (currencies) => {
  const keys = [...Object.keys(currencies)];
  const finalKeys = keys.filter((element) => element !== 'USDT');
  return finalKeys;
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_CURRENCIES':
    return {
      currencies: mountCurrencies(action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
