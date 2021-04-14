const getValidationErrors = (err) => {
  return err.inner.reduce(
    (obj, e) => ({
      ...obj,
      [e.path]: e.message,
    }),
    {}
  );
};

export { getValidationErrors };
