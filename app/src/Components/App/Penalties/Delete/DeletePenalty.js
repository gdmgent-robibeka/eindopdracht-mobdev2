import { useState } from 'react';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { deletePenalty } from '../../../../core/modules/penalties/api';
import Button from '../../../Design/Button';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import Modal from '../../../Shared/Modal/Modal';

const DeletePenalty = ({ penalty, onDelete, onClose }) => {
  const withAuth = useAuthApi();
  const [error, setError] = useState();

  const handleDelete = (data) => {
    withAuth(deletePenalty(data))
      .then((data) => {
        onDelete(data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Modal title="Delete penalty" onClose={onClose}>
      <ErrorAlert error={error} />
      <h5 className="mb-4">Are you sure you want to delete this penalty?</h5>
      <Button onClick={() => handleDelete(penalty)} color="danger">
        Delete
      </Button>
      <Button onClick={onClose} color="secondary">
        Cancel
      </Button>
    </Modal>
  );
};

export default DeletePenalty;
