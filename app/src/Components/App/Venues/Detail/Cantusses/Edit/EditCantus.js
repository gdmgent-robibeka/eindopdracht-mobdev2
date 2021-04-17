import { useState } from 'react';
import useAuthApi from '../../../../../../core/hooks/useAuthApi';
import { editCantusByVenue } from '../../../../../../core/modules/cantusses/api';
import ErrorAlert from '../../../../../Shared/Alert/ErrorAlert';
import Modal from '../../../../../Shared/Modal/Modal';
import CantusForm from '../Form/CantusForm';

const EditCantus = ({ venueId, cantus, onEdit, onClose }) => {
  const withAuth = useAuthApi();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(editCantusByVenue(venueId, data))
      .then((data) => {
        onEdit(data);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(true);
      });
  };

  return (
    <Modal title="Edit cantus" onClose={onClose}>
      <ErrorAlert error={error} />
      <CantusForm
        onSubmit={handleSubmit}
        initialData={cantus}
        disabled={isLoading}
      />
    </Modal>
  );
};

export default EditCantus;
