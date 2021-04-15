import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import AdminRoute from '../../Shared/Admin/AdminRoute';
import SongsOverview from '../Songs/Overview/SongsOverview';
import CreateSong from './Create/CreateSong';
import SongDetail from './Detail/Detail/SongDetail';

const Songs = () => {
  return (
    <Switch>
      <AdminRoute path={Routes.Songs.Create}>
        <CreateSong />
      </AdminRoute>
      <Route path={Routes.Songs.Detail}>
        <SongDetail />
      </Route>
      <Route path={Routes.Songs.Index}>
        <SongsOverview />
      </Route>
      <Redirect to={Routes.Songs.Index} />
    </Switch>
  );
};

export default Songs;
