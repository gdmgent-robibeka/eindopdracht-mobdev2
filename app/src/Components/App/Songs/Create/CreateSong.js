import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { createSong } from '../../../../core/modules/songs/api';
import { Routes } from '../../../../core/routing';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import SongForm from '../Form/SongForm';

const CreateSong = () => {
  const withAuth = useAuthApi();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(createSong(data))
      .then(() => {
        history.push(Routes.Songs.Index);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(true);
      });
  };

  return (
    <>
      <h1>Voeg Lied toe</h1>
      <ErrorAlert error={error} />
      <SongForm onSubmit={handleSubmit} disabled={isLoading} />
    </>
  );
};

export default CreateSong;
