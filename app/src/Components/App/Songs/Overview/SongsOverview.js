import { useState } from 'react';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { fetchSongs } from '../../../../core/modules/songs/api';
import { Routes } from '../../../../core/routing';
import SongDetail from '../Detail/Detail/SongDetail';
import AdminContainer from '../../../Shared/Admin/AdminContainer';
import EditSong from '../Edit/EditSong';
import LinkButton from '../../../Shared/Button/LinkButton';

const SongsOverview = () => {
  const [currentSong, setCurrentSong] = useState();

  const { data: songs, error, refresh, isLoading } = useFetch(fetchSongs);

  const handleSongUpdate = (song) => {
    setCurrentSong(null);
    refresh();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <>
      <h1>Liederen</h1>

      <AdminContainer>
        <LinkButton to={Routes.Songs.Create}>Voeg lied toe</LinkButton>
      </AdminContainer>

      <ul className="d-flex flex-wrap justify-content-between list-unstyled mt-3 card-list">
        {songs.map((song) => (
          <li key={song._id}>
            <SongDetail song={song} editSong={setCurrentSong} />
          </li>
        ))}
      </ul>

      {currentSong && (
        <EditSong
          song={currentSong}
          onUpdate={handleSongUpdate}
          onClose={() => setCurrentSong(null)}
        />
      )}
    </>
  );
};

export default SongsOverview;
