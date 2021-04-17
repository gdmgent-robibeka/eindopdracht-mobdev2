import AdminContainer from '../../../../Shared/Admin/AdminContainer';
import { route, Routes } from '../../../../../core/routing';
import { useVenue } from '../VenueDetailContainer';
import LinkButton from '../../../../Shared/Button/LinkButton';
import PageHeader from '../../../../Shared/Header/PageHeader';
import Button from '../../../../Design/Button';
import { useState } from 'react';
import DeleteVenue from './Delete/DeleteVenue';

const VenueDetail = ({ refresh }) => {
  const { venue } = useVenue();

  const [currentVenueDelete, setCurrentVenueDelete] = useState();

  const handleVenueDelete = () => {
    setCurrentVenueDelete(null);
    refresh();
  };

  return (
    <>
      <PageHeader title={venue.venueName}>
        <AdminContainer>
          <LinkButton to={route(Routes.Venues.Edit, { id: venue._id })}>
            Edit venue
          </LinkButton>
          <AdminContainer>
            <Button color="danger" onClick={setCurrentVenueDelete}>
              Delete
            </Button>
          </AdminContainer>
        </AdminContainer>
      </PageHeader>

      <p>{venue.fullAddress}</p>

      {currentVenueDelete && (
        <DeleteVenue
          onClose={() => setCurrentVenueDelete(null)}
          onDelete={handleVenueDelete}
        />
      )}
    </>
  );
};

export default VenueDetail;
