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

const fetchVenueById = (id) => (headers) => {
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

const deleteVenue = (data) => (headers) => {
  const { _id } = data;
  return fetch(`${process.env.REACT_APP_BASE_API}/venues/${_id}`, {
    method: 'DELETE',
    headers: createHeaders(headers),
  });
};

export { createVenue, fetchVenues, fetchVenueById, updateVenue, deleteVenue };
