const venues = '/venues';
const songs = '/songs';
const penalties = '/penalties';
const users = '/users';

const Routes = Object.freeze({
  Venues: {
    Index: `${venues}`,
    Detail: `${venues}/:id`,
    Edit: `${venues}/:id/edit`,
    DetailAddCantus: `${venues}/:id/add`,
    Create: `${venues}/create`,
  },
  Songs: {
    Index: `${songs}`,
    Create: `${songs}/create`,
  },
  Penalties: {
    Index: `${penalties}`,
    Create: `${penalties}/create`,
  },
  Login: '/login',
  Users: {
    Index: `${users}`,
    Create: `${users}/create`,
  },
});

const route = (path, options = {}) => {
  Object.keys(options).forEach((key) => {
    path = path.replace(`:${key}`, options[key]);
  });
  return path;
};

export { Routes, route };
