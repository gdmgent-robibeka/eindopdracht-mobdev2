import { Link } from 'react-router-dom';
import useFetch from '../../../../core/hooks/useFetch';
import { route, Routes } from '../../../../core/routing';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import Button from '../../../Design/Button';
import { fetchVenues } from '../../../../core/modules/venues/api';

const VenuesOverview = () => {
  const { data: venues, error, refresh, isLoading } = useFetch(fetchVenues);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <>
      <h1>Cantuszalen</h1>
      <Button color="secondary" onClick={() => refresh()}>
        Refresh
      </Button>

      <Link to={Routes.Venues.Create}>Voeg cantuszaal toe</Link>
      <ul>
        {venues.map((venue) => (
          <li key={venue._id}>
            <Link to={route(Routes.Venues.Detail, { id: venue._id })}>
              {venue.venueName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default VenuesOverview;
