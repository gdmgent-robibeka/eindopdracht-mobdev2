const getValidationErrors = (err) => {
  return err.inner.reduce(
    (obj, e) => ({
      ...obj,
      [e.path]: e.message,
    }),
    {}
  );
};

module.exports = {
  getValidationErrors,
};
