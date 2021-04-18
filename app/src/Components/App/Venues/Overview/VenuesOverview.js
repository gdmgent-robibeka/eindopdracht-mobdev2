import { Link } from 'react-router-dom';
import useFetch from '../../../../core/hooks/useFetch';
import { route, Routes } from '../../../../core/routing';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { fetchVenues } from '../../../../core/modules/venues/api';
import AdminContainer from '../../../Shared/Admin/AdminContainer';
import PageHeader from '../../../Shared/Header/PageHeader';
import LinkButton from '../../../Shared/Button/LinkButton';
import Card from '../../../Design/Card';

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

      <div className="d-flex flex-wrap justify-content-between mt-3 card-list">
        {venues.map((venue) => (
          <Link
            to={route(Routes.Venues.Detail, { id: venue._id })}
            key={venue._id}
          >
            <Card id="card-box">
              <h4>{venue.venueName}</h4>
              <br />
              <p>{venue.fullAddress}</p>
              <p>Capacity: {venue.capacity}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default VenuesOverview;
