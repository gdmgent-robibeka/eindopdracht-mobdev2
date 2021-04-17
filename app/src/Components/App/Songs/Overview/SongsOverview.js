import { useState } from 'react';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { fetchSongs } from '../../../../core/modules/songs/api';
import { Routes } from '../../../../core/routing';
import SongDetail from '../Detail/SongDetail';
import AdminContainer from '../../../Shared/Admin/AdminContainer';
import EditSong from '../Edit/EditSong';
import LinkButton from '../../../Shared/Button/LinkButton';
import PageHeader from '../../../Shared/Header/PageHeader';

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
      <PageHeader title="Songs">
        <AdminContainer>
          <LinkButton to={Routes.Songs.Create}>Create song</LinkButton>
        </AdminContainer>
      </PageHeader>

      <div className="d-flex flex-wrap justify-content-between mt-3 card-list">
        {songs.map((song) => (
          <SongDetail key={song._id} song={song} editSong={setCurrentSong} />
        ))}
      </div>

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
