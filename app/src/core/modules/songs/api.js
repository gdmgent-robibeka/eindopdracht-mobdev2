import { createHeaders } from '../utils/api';

const createSong = (data) => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/songs`, {
    method: 'POST',
    headers: createHeaders(headers),
    body: JSON.stringify(data),
  });
};

const fetchSongs = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/songs`, {
    headers: createHeaders(headers),
  });
};

const fetchSongById = (id) => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/songs/${id}`, {
    headers: createHeaders(headers),
  });
};

const updateSong = (data) => (headers) => {
  const { _id } = data;
  return fetch(`${process.env.REACT_APP_BASE_API}/songs/${_id}`, {
    method: 'PATCH',
    headers: createHeaders(headers),
    body: JSON.stringify(data),
  });
};

export { fetchSongs, createSong, fetchSongById, updateSong };
