import { createContext, useCallback, useContext } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import useFetch from '../../../../core/hooks/useFetch';
import { fetchVenueById } from '../../../../core/modules/venues/api';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { Routes } from '../../../../core/routing';
import EditVenue from './Edit/EditVenue';
import VenueDetail from './Detail/VenueDetail';
import AdminRoute from '../../../Shared/Admin/AdminRoute';

const VenueContext = createContext();

const VenueDetailContainer = () => {
  const { id } = useParams();

  const apiCall = useCallback(() => {
    return fetchVenueById(id);
  }, [id]);

  const { data: venue, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <VenueContext.Provider value={{ venue }}>
      <Switch>
        <AdminRoute path={Routes.Venues.Edit}>
          <EditVenue onUpdate={(data) => setData(data)} />
        </AdminRoute>
        <Route path={Routes.Venues.Detail}>
          <VenueDetail />
        </Route>
        <Redirect to={Routes.Venues.Index} />
      </Switch>
    </VenueContext.Provider>
  );
};

const useVenue = () => {
  return useContext(VenueContext);
};

export { useVenue };

export default VenueDetailContainer;
