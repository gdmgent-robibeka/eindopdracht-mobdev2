import AdminContainer from '../../../../Shared/Admin/AdminContainer';
import { route, Routes } from '../../../../../core/routing';
import { useVenue } from '../VenueDetailContainer';
import LinkButton from '../../../../Shared/Button/LinkButton';
import PageHeader from '../../../../Shared/Header/PageHeader';

const VenueDetail = () => {
  const { venue } = useVenue();

  return (
    <>
      <PageHeader title={venue.venueName}>
        <AdminContainer>
          <LinkButton to={route(Routes.Venues.Edit, { id: venue._id })}>
            Bewerk cantuszaal
          </LinkButton>
        </AdminContainer>
      </PageHeader>

      <p>{venue.fullAddress}</p>
    </>
  );
};

export default VenueDetail;
