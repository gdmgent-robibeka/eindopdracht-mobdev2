import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../core/routing';
import Penalties from './Penalties/Penalties';
import Songs from './Songs/Songs';
import Users from './Users/Users';
import Venues from './Venues/Venues';

const MainRouting = () => {
  return (
    <Switch>
      <Route path={Routes.Venues.Index}>
        <Venues />
      </Route>
      <Route path={Routes.Songs.Index}>
        <Songs />
      </Route>
      <Route path={Routes.Penalties.Index}>
        <Penalties />
      </Route>
      <Route path={Routes.Users.Index}>
        <Users />
      </Route>
      <Redirect to={Routes.Songs.Index} />
    </Switch>
  );
};

export default MainRouting;
