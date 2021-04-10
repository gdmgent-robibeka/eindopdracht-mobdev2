import { Link } from 'react-router-dom';
import useFetch from '../../../../core/hooks/useFetch';
import { route, Routes } from '../../../../core/routing';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';

const VenuesOverview = () => {
  const { data: venues, error, isLoading } = useFetch('/data.json');

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <>
      <h1>Cantuszalen</h1>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id}>
            <Link to={route(Routes.Venues.Detail, { id: venue.id })}>
              {venue.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default VenuesOverview;
