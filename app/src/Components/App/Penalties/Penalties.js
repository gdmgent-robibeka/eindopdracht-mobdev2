import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import PenaltyDetail from './Detail/PenaltyDetail';
import PenaltiesOverview from './Overview/PenaltiesOverview';
import AdminRoute from '../../Shared/Admin/AdminRoute';
import CreatePenalty from './Create/CreatePenalty';
import useTitle from '../../../core/hooks/useTitle';

const Penalties = () => {
  useTitle('Ad Pistums');

  return (
    <Switch>
      <AdminRoute path={Routes.Penalties.Create}>
        <CreatePenalty />
      </AdminRoute>
      <Route path={Routes.Penalties.Detail}>
        <PenaltyDetail />
      </Route>
      <Route path={Routes.Penalties.Index}>
        <PenaltiesOverview />
      </Route>
      <Redirect to={Routes.Penalties.Index} />
    </Switch>
  );
};

export default Penalties;
