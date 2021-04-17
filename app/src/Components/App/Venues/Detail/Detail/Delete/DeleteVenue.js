import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuthApi from '../../../../../../core/hooks/useAuthApi';
import { deleteVenue } from '../../../../../../core/modules/venues/api';
import { Routes } from '../../../../../../core/routing';
import Button from '../../../../../Design/Button';
import ErrorAlert from '../../../../../Shared/Alert/ErrorAlert';
import Modal from '../../../../../Shared/Modal/Modal';
import { useVenue } from '../../VenueDetailContainer';

const DeleteVenue = ({ onClose, onDelete }) => {
  const { venue } = useVenue();

  const withAuth = useAuthApi();
  const history = useHistory();
  const [error, setError] = useState();

  const handleDelete = (data) => {
    withAuth(deleteVenue(data))
      .then((data) => {
        onDelete(data);
        history.push(Routes.Venues.Index);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Modal title="Delete venue" onClose={onClose}>
      <ErrorAlert error={error} />
      <h5 className="mb-4">Are you sure you want to delete this venue?</h5>
      <Button onClick={() => handleDelete(venue)} color="danger">
        Delete
      </Button>
      <Button onClick={onClose} color="secondary">
        Cancel
      </Button>
    </Modal>
  );
};

export default DeleteVenue;
