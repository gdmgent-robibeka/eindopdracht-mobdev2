import { createHeaders } from '../utils/api';

const fetchSongs = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/songs`, {
    headers: createHeaders(headers),
  });
};

const createSong = (data) => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/songs`, {
    method: 'POST',
    headers: createHeaders(headers),
    body: JSON.stringify(data),
  });
};

export { fetchSongs, createSong };
