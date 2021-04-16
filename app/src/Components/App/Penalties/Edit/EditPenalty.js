import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { updatePenalty } from '../../../../core/modules/penalties/api';
import { Routes } from '../../../../core/routing';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import Modal from '../../../Shared/Modal/Modal';
import PenaltyForm from '../Form/PenaltyForm';

const EditPenalty = ({ penalty, onUpdate, onClose }) => {
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
    <Modal title="Bewerk Ad Pistum" onClose={onClose}>
      <ErrorAlert error={error} />
      <PenaltyForm
        onSubmit={handleSubmit}
        initialData={penalty}
        disabled={isLoading}
      />
    </Modal>
  );
};

export default EditPenalty;
