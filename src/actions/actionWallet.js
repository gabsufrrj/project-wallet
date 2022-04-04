import getCoinsFromApi from '../services/coinApi';

const finalCurrencies = (currencies) => ({
  type: 'GET_CURRENCIES',
  payload: currencies,
});

const coinsApi = () => async (dispatch) => {
  const currencies = await getCoinsFromApi();
  dispatch(finalCurrencies(currencies));
};

export default coinsApi;
