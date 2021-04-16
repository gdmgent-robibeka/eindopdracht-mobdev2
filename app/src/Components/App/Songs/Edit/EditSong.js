import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { updateSong } from '../../../../core/modules/songs/api';
import { Routes } from '../../../../core/routing';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import Modal from '../../../Shared/Modal/Modal';
import SongForm from '../Form/SongForm';

const EditSong = ({ song, onUpdate, onClose }) => {
  const withAuth = useAuthApi();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(updateSong(data))
      .then((data) => {
        onUpdate(data);
        history.push(Routes.Songs.Index);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(true);
      });
  };

  return (
    <Modal title="Bewerk lied" onClose={onClose}>
      <ErrorAlert error={error} />
      <SongForm
        onSubmit={handleSubmit}
        initialData={song}
        disabled={isLoading}
      />
    </Modal>
  );
};

export default EditSong;
