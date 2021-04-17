import { Redirect, Route, Switch } from 'react-router-dom';
import useTitle from '../../../core/hooks/useTitle';
import { Routes } from '../../../core/routing';
import AdminRoute from '../../Shared/Admin/AdminRoute';
import CreateUser from './Create/CreateUser';
import UserOverview from './Overview/UsersOverview';

const Users = () => {
  useTitle('Users');

  return (
    <Switch>
      <AdminRoute path={Routes.Users.Create}>
        <CreateUser />
      </AdminRoute>
      <Route path={Routes.Users.Index}>
        <UserOverview />
      </Route>
      <Redirect to={Routes.Users.Index} />
    </Switch>
  );
};

export default Users;
