import { Link } from 'react-router-dom';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import Button from '../../../Design/Button';
import { fetchSongs } from '../../../../core/modules/songs/api';
import { Routes } from '../../../../core/routing';
import SongDetail from '../Detail/Detail/SongDetail';
import AdminContainer from '../../../Shared/Admin/AdminContainer';

const SongsOverview = () => {
  const { data: songs, error, refresh, isLoading } = useFetch(fetchSongs);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <>
      <h1>Liederen</h1>

      <Button color="secondary" onClick={() => refresh()}>
        Refresh
      </Button>

      <AdminContainer>
        <Link to={Routes.Songs.Create}>Voeg lied toe</Link>
      </AdminContainer>

      <ul>
        {songs.map((song) => (
          <li key={song._id}>
            <SongDetail />
            {/* <Link to={(route(Routes.Songs.Detail), { id: songs._id })}>
              {song.title}
            </Link> */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SongsOverview;
