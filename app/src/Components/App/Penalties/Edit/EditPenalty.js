import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { editPenalty } from '../../../../core/modules/penalties/api';
import { Routes } from '../../../../core/routing';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import Modal from '../../../Shared/Modal/Modal';
import PenaltyForm from '../Form/PenaltyForm';

const EditPenalty = ({ penalty, onEdit, onClose }) => {
  const withAuth = useAuthApi();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(editPenalty(data))
      .then((data) => {
        onEdit(data);
        history.push(Routes.Penalties.Index);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(true);
      });
  };

  return (
    <Modal title="Edit penalty" onClose={onClose}>
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
