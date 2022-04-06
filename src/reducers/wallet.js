// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {

  currencies: [],
  expenses: [],
  total: 0,
};

const totalValueOfExpenses = (arrayOfExpenses) => {
  if (arrayOfExpenses.length === 0) {
    return 0;
  }

  const myExpenses = arrayOfExpenses.map((expense) => {
    const expenseValue = expense.value;
    const expenseCurrency = expense.currency;
    const expenseRate = expense.exchangeRates[expenseCurrency].ask;
    return Number(expenseValue) * Number(expenseRate);
  });
  return myExpenses.reduce((acc, curr) => acc + curr).toFixed(2);
};

const mountExpenses = (userData, exchangeRates, expenses) => {
  const expenseLength = expenses?.length || 0;
  const myMountedExpense = {
    id: expenseLength,
    ...userData,
    exchangeRates: { ...exchangeRates },
  };
  return myMountedExpense;
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
      ...state,
      currencies: mountCurrencies(action.payload),
    };
  case 'ADD_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses,
        mountExpenses(action.exchangeRates, action.userData, state.expenses)],
      total:
        totalValueOfExpenses([...state.expenses,
          mountExpenses(action.exchangeRates, action.userData)]),
    };
  default:
    return state;
  }
};

export default wallet;
