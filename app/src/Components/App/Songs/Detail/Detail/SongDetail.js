import ReactPlayer from 'react-player/soundcloud';
import Button from '../../../../Design/Button';
import Card from '../../../../Design/Card';
import AdminContainer from '../../../../Shared/Admin/AdminContainer';

const SongDetail = ({ song, editSong }) => {
  return (
    <Card>
      <h5 className="card-title">
        {song.title}
        {song.isOfficial ? ' - Officieel lied' : ''}
      </h5>
      <ReactPlayer
        url={song.source}
        width="525px"
        height="200px"
        className="my-3"
      />
      <p>Pagina in de codex: {song.codexPage}</p>
      <AdminContainer>
        <Button onClick={() => editSong(song)}>Bewerk lied</Button>
      </AdminContainer>
    </Card>
  );
};

export default SongDetail;
