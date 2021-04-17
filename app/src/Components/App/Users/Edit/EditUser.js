import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { editUser } from '../../../../core/modules/users/api';
import { Routes } from '../../../../core/routing';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import Modal from '../../../Shared/Modal/Modal';
import UserForm from '../Form/UserForm';

const EditUser = ({ user, onEdit, onClose }) => {
  const withAuth = useAuthApi();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(editUser(data))
      .then((data) => {
        onEdit(data);
        history.push(Routes.Users.Index);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(true);
      });
  };

  return (
    <Modal title="Edit user" onClose={onClose}>
      <ErrorAlert error={error} />
      <UserForm
        onSubmit={handleSubmit}
        initialData={user}
        disabled={isLoading}
      />
    </Modal>
  );
};

export default EditUser;
