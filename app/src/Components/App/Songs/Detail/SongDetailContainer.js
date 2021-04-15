import { createContext, useCallback, useContext } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import useFetch from '../../../../core/hooks/useFetch';
import { fetchSongById } from '../../../../core/modules/songs/api';
import { Routes } from '../../../../core/routing';
import Alert from '../../../Design/Alert';
import Spinner from '../../../Design/Spinner';
import AdminRoute from '../../../Shared/Admin/AdminRoute';
import EditSong from '../Edit/EditSong';
import SongDetail from './Detail/SongDetail';

const SongContext = createContext();

const SongDetailContainer = () => {
  const { id } = useParams();

  const apiCall = useCallback(() => {
    return fetchSongById(id);
  }, [id]);

  const { data: song, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <SongContext.Provider value={{ song }}>
      <Switch>
        <AdminRoute path={Routes.Songs.Edit}>
          <EditSong onUpdate={(data) => setData(data)} />
        </AdminRoute>
        <Route path={Routes.Songs.Detail}>
          <SongDetail />
        </Route>
        <Redirect to={Routes.Songs.Index} />
      </Switch>
    </SongContext.Provider>
  );
};

const useSong = () => {
  return useContext(SongContext);
};

export { useSong };

export default SongDetailContainer;
