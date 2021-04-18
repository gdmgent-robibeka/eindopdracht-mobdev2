import ReactPlayer from 'react-player/soundcloud';
import Button from '../../../Design/Button';
import Card from '../../../Design/Card';
import AdminContainer from '../../../Shared/Admin/AdminContainer';

const SongDetail = ({ song, editSong, deleteSong }) => {
  return (
    <Card>
      <h5 className="card-title">
        {song.title}
        {song.isOfficial ? ' - Official song' : ''}
      </h5>
      <ReactPlayer url={song.source} width="525px" height="200px" />
      <br />
      <p>{song.language} Song</p>
      <p>Page in the codex: {song.codexPage}</p>
      <AdminContainer>
        <Button onClick={() => editSong(song)}>Edit</Button>
      </AdminContainer>
      <AdminContainer>
        <Button onClick={() => deleteSong(song)} color="danger">
          Delete
        </Button>
      </AdminContainer>
    </Card>
  );
};

export default SongDetail;
