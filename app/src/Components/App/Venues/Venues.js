import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import AdminRoute from '../../Shared/Admin/AdminRoute';
import CreateVenue from './Create/CreateVenue';
import VenueDetailContainer from './Detail/VenueDetailContainer';
import VenuesOverview from './Overview/VenuesOverview';

const Venues = () => {
  return (
    <Switch>
      <AdminRoute path={Routes.Venues.Create}>
        <CreateVenue />
      </AdminRoute>
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
