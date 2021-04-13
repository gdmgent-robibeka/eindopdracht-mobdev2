import { createContext, useContext, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getUser, storeUser } from '../../core/modules/storage';
import { Routes } from '../../core/routing';
import App from '../App/App';
import LoginPage from '../Onboarding/Login/LoginPage';

const AuthContext = createContext();

const AuthProvider = () => {
  const [user, setUser] = useState(getUser);

  const updateUser = (user) => {
    storeUser(user);
    setUser(user);
  };

  if (user) {
    return (
      <AuthContext.Provider value={{ user, setUser: updateUser }}>
        <App />
      </AuthContext.Provider>
    );
  }

  return (
    <Switch>
      <Route path={Routes.Login}>
        <LoginPage setUser={updateUser} />
      </Route>
      <Redirect to={Routes.Login} />
    </Switch>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };

export default AuthProvider;
