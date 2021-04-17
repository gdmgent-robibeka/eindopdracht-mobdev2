import { createHeaders } from '../utils/api';

const createUser = (data) => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/register`, {
    method: 'POST',
    headers: createHeaders(headers),
    body: JSON.stringify(data),
  });
};

const fetchUsers = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/users`, {
    headers: createHeaders(headers),
  });
};

const editUser = (data) => (headers) => {
  const { _id } = data;
  return fetch(`${process.env.REACT_APP_BASE_API}/users/${_id}`, {
    method: 'PATCH',
    headers: createHeaders(headers),
    body: JSON.stringify(data),
  });
};

const deleteUser = (data) => (headers) => {
  const { _id } = data;
  return fetch(`${process.env.REACT_APP_BASE_API}/users/${_id}`, {
    method: 'DELETE',
    headers: createHeaders(headers),
  });
};

export { createUser, fetchUsers, editUser, deleteUser };
