import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import VenueDetail from './Detail/VenueDetail';
import VenuesOverview from './Overview/VenuesOverview';

const Venues = () => {
  return (
    <Switch>
      <Route path={Routes.Venues.Detail}>
        <VenueDetail />
      </Route>
      <Route path={Routes.Venues.Index}>
        <VenuesOverview />
      </Route>
      <Redirect to={Routes.Venues.Index} />
    </Switch>
  );
};

export default Venues;
