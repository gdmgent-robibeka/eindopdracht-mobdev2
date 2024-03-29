import { useState } from 'react';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { deleteUser } from '../../../../core/modules/users/api';
import Button from '../../../Design/Button';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import Modal from '../../../Shared/Modal/Modal';

const DeleteUser = ({ onClose, onDelete, user }) => {
  const withAuth = useAuthApi();
  const [error, setError] = useState();

  const handleDelete = (data) => {
    withAuth(deleteUser(data))
      .then((data) => {
        onDelete(data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Modal title="Delete user" onClose={onClose}>
      <ErrorAlert error={error} />
      <h5 className="mb-4">Are you sure you want to delete this user?</h5>
      <Button onClick={() => handleDelete(user)} color="danger">
        Delete
      </Button>
      <Button onClick={onClose} color="secondary">
        Cancel
      </Button>
    </Modal>
  );
};

export default DeleteUser;
