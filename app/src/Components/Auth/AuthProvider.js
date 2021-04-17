import { createContext, useContext, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getUser, storeUser } from '../../core/modules/storage';
import { Routes } from '../../core/routing';
import App from '../App/App';
import LoginPage from '../Onboarding/Login/LoginPage';
import RegisterPage from '../Onboarding/Register/RegisterPage';

const AuthContext = createContext();

const AuthProvider = () => {
  const [auth, setAuth] = useState(getUser);

  const updateAuth = (user) => {
    storeUser(user);
    setAuth(user);
  };

  const logout = () => {
    updateAuth(null);
  };

  if (auth && auth.user) {
    const { user, token } = auth;

    return (
      <AuthContext.Provider value={{ user, token, logout }}>
        <App />
      </AuthContext.Provider>
    );
  }

  return (
    <Switch>
      <Route path={Routes.Login}>
        <LoginPage setUser={updateAuth} />
      </Route>
      <Route path={Routes.Register}>
        <RegisterPage setUser={updateAuth} />
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
