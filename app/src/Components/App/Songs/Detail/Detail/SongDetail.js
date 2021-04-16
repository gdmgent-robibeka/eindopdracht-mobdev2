import ReactPlayer from 'react-player/soundcloud';
import { Link } from 'react-router-dom';
import { route, Routes } from '../../../../../core/routing';
import Card from '../../../../Design/Card';
import AdminContainer from '../../../../Shared/Admin/AdminContainer';

const SongDetail = ({ song }) => {
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
        <Link to={(route(Routes.Songs.Edit), { id: song._id })}>
          Bewerk lied
        </Link>
      </AdminContainer>
    </Card>
  );
};

export default SongDetail;
