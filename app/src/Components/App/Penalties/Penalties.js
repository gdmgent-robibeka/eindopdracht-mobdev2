import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import PenaltyDetail from './Detail/PenaltyDetail';
import PenaltiesOverview from './Overview/PenaltiesOverview';

const Penalties = () => {
  return (
    <Switch>
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
