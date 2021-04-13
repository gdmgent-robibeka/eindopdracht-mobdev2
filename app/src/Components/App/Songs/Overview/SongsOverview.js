import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import Button from '../../../Design/Button';
import { fetchSongs } from '../../../../core/modules/songs/api';

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
      <ul>
        {songs.map((song) => (
          <li key={song._id}>{song.title}</li>
        ))}
      </ul>
    </>
  );
};

export default SongsOverview;
