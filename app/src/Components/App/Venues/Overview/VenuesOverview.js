import { Link } from 'react-router-dom';
import useFetch from '../../../../core/hooks/useFetch';
import { route, Routes } from '../../../../core/routing';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { fetchVenues } from '../../../../core/modules/venues/api';
import AdminContainer from '../../../Shared/Admin/AdminContainer';
import PageHeader from '../../../Shared/Header/PageHeader';
import LinkButton from '../../../Shared/Button/LinkButton';

const VenuesOverview = () => {
  const { data: venues, error, isLoading } = useFetch(fetchVenues);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <>
      <PageHeader title="Venues">
        <AdminContainer>
          <LinkButton to={Routes.Venues.Create} color="success">
            Create venue
          </LinkButton>
        </AdminContainer>
      </PageHeader>

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
