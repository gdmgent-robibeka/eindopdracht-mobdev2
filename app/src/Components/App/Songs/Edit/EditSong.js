import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { updateSong } from '../../../../core/modules/songs/api';
import { route, Routes } from '../../../../core/routing';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import { useSong } from '../Detail/SongDetailContainer';
import SongForm from '../Form/SongForm';

const EditSong = ({ onUpdate }) => {
  const withAuth = useAuthApi();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const { song } = useSong();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(updateSong(data))
      .then((data) => {
        onUpdate(data);
        history.push(route(Routes.Songs.Detail, { id: data._id }));
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
