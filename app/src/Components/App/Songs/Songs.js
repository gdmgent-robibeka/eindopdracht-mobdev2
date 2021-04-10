import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import SongsOverview from '../Songs/Overview/SongsOverview';

const Songs = () => {
  return (
    <Switch>
      <Route path={Routes.Songs.Index}>
        <SongsOverview />
      </Route>
      <Redirect to={Routes.Songs.Index} />
    </Switch>
  );
};

export default Songs;
