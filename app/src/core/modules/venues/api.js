import { createHeaders } from '../utils/api';

const fetchVenues = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/venues`, {
    headers: createHeaders(headers),
  });
};

const createVenue = (data) => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/venues`, {
    method: 'POST',
    headers: createHeaders(headers),
    body: JSON.stringify(data),
  });
};

export { fetchVenues, createVenue };
