import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { updatePenalty } from '../../../../core/modules/penalties/api';
import { Routes } from '../../../../core/routing';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import PenaltyForm from '../Form/PenaltyForm';

const EditPenalty = ({ penalty, onUpdate }) => {
  const withAuth = useAuthApi();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(updatePenalty(data))
      .then((data) => {
        onUpdate(data);
        history.push(Routes.Penalties.Index);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(true);
      });
  };

  return (
    <>
      <h1>Bewerk lied</h1>
      <ErrorAlert error={error} />
      <PenaltyForm
        onSubmit={handleSubmit}
        initialData={penalty}
        disabled={isLoading}
      />
    </>
  );
};

export default EditPenalty;
