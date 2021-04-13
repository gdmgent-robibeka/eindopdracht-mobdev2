import { createHeaders } from '../utils/api';

const createVenue = (data) => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/venues`, {
    method: 'POST',
    headers: createHeaders(headers),
    body: JSON.stringify(data),
  });
};

const fetchVenues = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/venues`, {
    headers: createHeaders(headers),
  });
};

const fetchVenue = (id) => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/venues/${id}`, {
    headers: createHeaders(headers),
  });
};

const updateVenue = (data) => (headers) => {
  const { _id } = data;
  return fetch(`${process.env.REACT_APP_BASE_API}/venues/${_id}`, {
    method: 'PATCH',
    headers: createHeaders(headers),
    body: JSON.stringify(data),
  });
};

export { createVenue, fetchVenues, fetchVenue, updateVenue };
