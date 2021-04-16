const venues = '/venues';
const songs = '/songs';
const penalties = '/penalties';

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
    Detail: `${songs}/:id`,
    Edit: `${songs}/:id/edit`,
    Create: `${songs}/create`,
  },
  Penalties: {
    Index: `${penalties}`,
    Detail: `${penalties}/:id`,
    Edit: `${penalties}/:id/edit`,
    Create: `${penalties}/create`,
  },
  Login: '/login',
});

const route = (path, options = {}) => {
  Object.keys(options).forEach((key) => {
    path = path.replace(`:${key}`, options[key]);
  });
  return path;
};

export { Routes, route };
