import { Link } from 'react-router-dom';
import AdminContainer from '../../../../Shared/Admin/AdminContainer';
import { route, Routes } from '../../../../../core/routing';
import { useVenue } from '../VenueDetailContainer';

const VenueDetail = () => {
  const { venue } = useVenue();

  return (
    <>
      <h1>{venue.venueName}</h1>

      <AdminContainer>
        <Link to={route(Routes.Venues.Edit, { id: venue._id })}>
          Bewerk cantuszaal
        </Link>
      </AdminContainer>
    </>
  );
};

export default VenueDetail;
