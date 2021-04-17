import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { deleteSong } from '../../../../core/modules/songs/api';
import { Routes } from '../../../../core/routing';
import Button from '../../../Design/Button';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import Modal from '../../../Shared/Modal/Modal';

const DeleteSong = ({ onClose, onDelete, song }) => {
  const withAuth = useAuthApi();
  const history = useHistory();
  const [error, setError] = useState();

  const handleDelete = (data) => {
    withAuth(deleteSong(data))
      .then((data) => {
        onDelete(data);
        history.push(Routes.Songs.Index);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Modal title="Delete song" onClose={onClose}>
      <ErrorAlert error={error} />
      <h5 className="mb-4">Are you sure you want to delete this song?</h5>
      <Button onClick={() => handleDelete(song)} color="danger">
        Delete
      </Button>
      <Button onClick={onClose} color="secondary">
        Cancel
      </Button>
    </Modal>
  );
};

export default DeleteSong;
