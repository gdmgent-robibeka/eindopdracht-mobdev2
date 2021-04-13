import { ROLES } from './constants';

const isAdmin = (user) => {
  return user.rol === ROLES.admin;
};

export { isAdmin };
