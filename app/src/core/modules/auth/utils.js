import { ROLES } from './constants';

const isAdmin = (user) => {
  return user.role === ROLES.admin;
};

export { isAdmin };
