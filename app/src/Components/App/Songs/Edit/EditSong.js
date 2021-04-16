import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { updateSong } from '../../../../core/modules/songs/api';
import { Routes } from '../../../../core/routing';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import SongForm from '../Form/SongForm';

const EditSong = ({ song, onUpdate }) => {
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
    <>
      <h1>Bewerk lied</h1>
      <ErrorAlert error={error} />
      <SongForm
        onSubmit={handleSubmit}
        initialData={song}
        disabled={isLoading}
      />
    </>
  );
};

export default EditSong;
