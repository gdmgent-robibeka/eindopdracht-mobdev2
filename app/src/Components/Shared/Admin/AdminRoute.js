import { isAdmin } from '../../../core/modules/auth/utils';
import { useAuth } from '../../Auth/AuthProvider';
import { Route } from 'react-router-dom';

const AdminRoute = ({ path, children }) => {
  const { user } = useAuth();

  const allowed = isAdmin(user);

  if (!allowed) {
    return null;
  }

  return <Route path={path}>{children}</Route>;
};

export default AdminRoute;
