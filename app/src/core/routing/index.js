const venues = '/venues';
const songs = '/songs';
const penalties = '/penalties';

const Routes = Object.freeze({
  Venues: {
    Index: `${venues}`,
    Detail: `${venues}/:id`,
    DetailAddCantus: `${venues}/:id/add`,
  },
  Songs: {
    Index: `${songs}`,
  },
  Penalties: {
    Index: `${penalties}`,
    Detail: `${penalties}/:id`,
  },
});

const route = (path, options = {}) => {
  Object.keys(options).forEach((key) => {
    path = path.replace(`:${key}`, options[key]);
  });
  return path;
};

export { Routes, route };
