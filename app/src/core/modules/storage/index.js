const KEY_USER = 'KEY_USER';

const storeUser = (user) => {
  localStorage.setItem(KEY_USER, JSON.stringify(user));
};

const getUser = () => {
  const user = localStorage.getItem(KEY_USER);

  if (user) {
    return JSON.parse(user);
  }

  return null;
};

export { storeUser, getUser };
