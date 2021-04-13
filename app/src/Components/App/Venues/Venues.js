import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import CreateVenue from './Create/CreateVenue';
import VenueDetailContainer from './Detail/VenueDetailContainer';
import VenuesOverview from './Overview/VenuesOverview';

const Venues = () => {
  return (
    <Switch>
      <Route path={Routes.Venues.Create}>
        <CreateVenue />
      </Route>
      <Route path={Routes.Venues.Detail}>
        <VenueDetailContainer />
      </Route>
      <Route path={Routes.Venues.Index}>
        <VenuesOverview />
      </Route>
      <Redirect to={Routes.Venues.Index} />
    </Switch>
  );
};

export default Venues;
