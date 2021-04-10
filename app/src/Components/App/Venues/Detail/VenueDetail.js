import { Route, useParams, Link } from 'react-router-dom';
import { route, Routes } from '../../../../core/routing';
import Cantus from './Cantus/Cantus';

const VenueDetail = () => {
  const { id } = useParams();
  return (
    <>
      <h1>Cantuszaal Detail {id}</h1>

      <Link to={route(Routes.Venues.DetailAddCantus, { id })}>Plan Cantus</Link>

      <Route path={Routes.Venues.DetailAddCantus}>
        <Cantus />
      </Route>
    </>
  );
};

export default VenueDetail;
