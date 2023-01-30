/* eslint no-underscore-dangle: 0 */
import { uid } from 'uid/single';

const _apiBase = 'https://aviasales-test-api.kata.academy';
const _logoBase = 'http://pics.avs.io/99/36';

const fetchPlus = (url, retries) =>
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res;
      }
      if (retries > 0) {
        return fetchPlus(url, retries - 1);
      }
      throw new Error(res.status);
    })
    // eslint-disable-next-line
    .catch((error) => console.error(error.message));

const sendRequest = async (url) => {
  const res = await fetchPlus(url, 10);

  return res;
};

const getSearchId = async () => {
  const res = await sendRequest(`${_apiBase}/search`);
  const out = await res.json();
  return out.searchId;
};

const getTickets = async (searchID) => {
  const res = await sendRequest(`${_apiBase}/tickets?searchId=${searchID}`);
  const { tickets, stop } = await res.json();

  const ticketsData = tickets.map((elem) => {
    const id = uid(16);
    const carrierLogoPath = `${_logoBase}/${elem.carrier}.png`;
    return {
      ...elem,
      id,
      carrierLogoPath,
    };
  });
  return { ticketsData, stop };
};

const api = {
  getSearchId,
  getTickets,
};

export default api;
