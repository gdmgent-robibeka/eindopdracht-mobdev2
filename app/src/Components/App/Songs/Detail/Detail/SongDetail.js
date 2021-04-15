import ReactPlayer from 'react-player/soundcloud';
import { Link } from 'react-router-dom';
import { route, Routes } from '../../../../../core/routing';
import Card from '../../../../Design/Card';
import AdminContainer from '../../../../Shared/Admin/AdminContainer';
import { useSong } from '../SongDetailContainer';

const SongDetail = () => {
  const { song } = useSong;

  return (
    <Card>
      <ReactPlayer url={song.source} />
      <h5 className="card-title">{song.title}</h5>
      <AdminContainer>
        <Link to={(route(Routes.Songs.Edit), { id: song._id })}>
          Bewerk lied
        </Link>
      </AdminContainer>
    </Card>
  );
};

export default SongDetail;
