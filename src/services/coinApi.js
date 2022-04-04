const url = 'https://economia.awesomeapi.com.br/json/all';

const getCoinsFromApi = async () => {
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

export default getCoinsFromApi;
