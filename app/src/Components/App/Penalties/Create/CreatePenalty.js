import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { createPenalty } from '../../../../core/modules/penalties/api';
import { Routes } from '../../../../core/routing';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import PenaltyForm from '../Form/PenaltyForm';

const CreatePenalty = () => {
  const withAuth = useAuthApi();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(createPenalty(data))
      .then(() => {
        history.push(Routes.Penalties.Index);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(true);
      });
  };

  return (
    <>
      <h1>Add penalty</h1>
      <ErrorAlert error={error} />
      <PenaltyForm onSubmit={handleSubmit} disabled={isLoading} />
    </>
  );
};

export default CreatePenalty;
