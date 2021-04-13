import { createContext, useCallback, useContext } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import useFetch from '../../../../core/hooks/useFetch';
import { fetchVenue } from '../../../../core/modules/venues/api';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { Routes } from '../../../../core/routing';
import EditVenue from './Edit/EditVenue';
import VenueDetail from './Detail/VenueDetail';

const VenueContext = createContext();

const VenueDetailContainer = () => {
  const { id } = useParams();

  const apiCall = useCallback(() => {
    return fetchVenue(id);
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
        <Route path={Routes.Venues.Edit}>
          <EditVenue onUpdate={(data) => setData(data)} />
        </Route>
        <Route>
          <VenueDetail />
        </Route>
      </Switch>
    </VenueContext.Provider>
  );
};

const useVenue = () => {
  return useContext(VenueContext);
};

export { useVenue };

export default VenueDetailContainer;
