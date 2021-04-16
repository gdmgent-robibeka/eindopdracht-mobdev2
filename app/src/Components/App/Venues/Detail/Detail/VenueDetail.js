import AdminContainer from '../../../../Shared/Admin/AdminContainer';
import { route, Routes } from '../../../../../core/routing';
import { useVenue } from '../VenueDetailContainer';
import LinkButton from '../../../../Shared/Button/LinkButton';

const VenueDetail = () => {
  const { venue } = useVenue();

  return (
    <>
      <div className="row">
        <div className="col-sm-8">
          <h1>{venue.venueName}</h1>
          <p>{venue.fullAddress}</p>
        </div>
        <div className="col-sm-4">
          <AdminContainer>
            <LinkButton to={route(Routes.Venues.Edit, { id: venue._id })}>
              Bewerk cantuszaal
            </LinkButton>
          </AdminContainer>
        </div>
      </div>
    </>
  );
};

export default VenueDetail;
