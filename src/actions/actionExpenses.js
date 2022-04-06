import getCoinsFromApi from '../services/coinApi';

const getExchanges = (userData, exchangeRates) => ({
  type: 'ADD_EXPENSES',
  exchangeRates,
  userData,
});

export const exchangesApi = (userData) => async (dispatch) => {
  const exchanges = await getCoinsFromApi();
  dispatch(getExchanges(exchanges, userData));
};

export default getExchanges;
