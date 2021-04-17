import { useState } from 'react';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import VenueForm from '../Form/VenueForm';
import { createVenue } from '../../../../core/modules/venues/api';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import { useHistory } from 'react-router';
import { Routes } from '../../../../core/routing';

const CreateVenue = () => {
  const withAuth = useAuthApi();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(createVenue(data))
      .then(() => {
        history.push(Routes.Venues.Index);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(true);
      });
  };

  return (
    <>
      <h1>Create venue</h1>
      <ErrorAlert error={error} />
      <VenueForm onSubmit={handleSubmit} disabled={isLoading} />
    </>
  );
};

export default CreateVenue;
