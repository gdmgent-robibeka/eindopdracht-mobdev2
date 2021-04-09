const Routes = Object.freeze({
  Venues: {
    Index: '/venues',
  },
  Songs: {
    Index: '/songs',
  },
  Penalties: {
    Index: '/penalties',
    Detail: '/penalties/:id',
  },
});

const route = (path, options = {}) => {
  Object.keys(options).forEach((key) => {
    path = path.replace(`:${key}`, options[key]);
  });
  return path;
};

export { Routes, route };
