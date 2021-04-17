import { createHeaders } from '../utils/api';

const fetchCantussesByVenue = (venueId) => (headers) => {
  return fetch(
    `${process.env.REACT_APP_BASE_API}/venues/${venueId}/cantusses`,
    {
      headers: createHeaders(headers),
    }
  );
};

const createCantusByVenue = (venueId, data) => (headers) => {
  return fetch(
    `${process.env.REACT_APP_BASE_API}/venues/${venueId}/cantusses`,
    {
      method: 'POST',
      headers: createHeaders(headers),
      body: JSON.stringify(data),
    }
  );
};

const editCantusByVenue = (venueId, data) => (headers) => {
  const { _id } = data;
  return fetch(
    `${process.env.REACT_APP_BASE_API}/venues/${venueId}/cantusses/${_id}`,
    {
      method: 'PATCH',
      headers: createHeaders(headers),
      body: JSON.stringify(data),
    }
  );
};

export { fetchCantussesByVenue, createCantusByVenue, editCantusByVenue };
