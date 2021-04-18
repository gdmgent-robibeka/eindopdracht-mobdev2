import { useState } from 'react';
import useAuthApi from '../../../../../../core/hooks/useAuthApi';
import { deleteCantusByVenue } from '../../../../../../core/modules/cantusses/api';
import Button from '../../../../../Design/Button';
import ErrorAlert from '../../../../../Shared/Alert/ErrorAlert';
import Modal from '../../../../../Shared/Modal/Modal';

const DeleteCantus = ({ venueId, onClose, onDelete, cantus }) => {
  const withAuth = useAuthApi();
  const [error, setError] = useState();

  const handleDelete = (data) => {
    withAuth(deleteCantusByVenue(venueId, data))
      .then((data) => {
        onDelete(data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Modal title="Delete cantus" onClose={onClose}>
      <ErrorAlert error={error} />
      <h5 className="mb-4">Are you sure you want to delete this cantus?</h5>
      <Button onClick={() => handleDelete(cantus)} color="danger">
        Delete
      </Button>
      <Button onClick={onClose} color="secondary">
        Cancel
      </Button>
    </Modal>
  );
};

export default DeleteCantus;
