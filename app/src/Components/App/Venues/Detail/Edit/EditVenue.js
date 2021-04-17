import { useState } from 'react';
import useAuthApi from '../../../../../core/hooks/useAuthApi';
import VenueForm from '../../Form/VenueForm';
import { editVenue } from '../../../../../core/modules/venues/api';
import ErrorAlert from '../../../../Shared/Alert/ErrorAlert';
import { useHistory } from 'react-router';
import { route, Routes } from '../../../../../core/routing';
import { useVenue } from '../VenueDetailContainer';

const EditVenue = ({ onUpdate }) => {
  const withAuth = useAuthApi();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const { venue } = useVenue();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(editVenue(data))
      .then((data) => {
        onUpdate(data);
        history.push(route(Routes.Venues.Detail, { id: data._id }));
      })
      .catch((err) => {
        setError(err);
        setIsLoading(true);
      });
  };

  return (
    <>
      <h1>Edit Venue</h1>
      <ErrorAlert error={error} />
      <VenueForm
        onSubmit={handleSubmit}
        initialData={venue}
        disabled={isLoading}
      />
    </>
  );
};

export default EditVenue;
