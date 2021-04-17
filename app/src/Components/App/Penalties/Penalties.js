import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import PenaltiesOverview from './Overview/PenaltiesOverview';
import AdminRoute from '../../Shared/Admin/AdminRoute';
import CreatePenalty from './Create/CreatePenalty';
import useTitle from '../../../core/hooks/useTitle';

const Penalties = () => {
  useTitle('Penalties');

  return (
    <Switch>
      <AdminRoute path={Routes.Penalties.Create}>
        <CreatePenalty />
      </AdminRoute>
      <Route path={Routes.Penalties.Index}>
        <PenaltiesOverview />
      </Route>
      <Redirect to={Routes.Penalties.Index} />
    </Switch>
  );
};

export default Penalties;
