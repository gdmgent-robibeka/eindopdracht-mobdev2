import { createHeaders } from '../utils/api';

const createPenalty = (data) => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/penalties`, {
    method: 'POST',
    headers: createHeaders(headers),
    body: JSON.stringify(data),
  });
};

const fetchPenalties = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/penalties`, {
    headers: createHeaders(headers),
  });
};

const fetchPenaltyById = (id) => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/penalties/${id}`, {
    headers: createHeaders(headers),
  });
};

const updatePenalty = (data) => (headers) => {
  const { _id } = data;
  return fetch(`${process.env.REACT_APP_BASE_API}/penalties/${_id}`, {
    method: 'PATCH',
    headers: createHeaders(headers),
    body: JSON.stringify(data),
  });
};

export { createPenalty, fetchPenalties, fetchPenaltyById, updatePenalty };
