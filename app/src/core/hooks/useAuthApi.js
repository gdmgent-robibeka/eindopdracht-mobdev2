import { useCallback } from 'react';
import { useAuth } from '../../Components/Auth/AuthProvider';
import ApiError from '../error/ApiError';
import AppError from '../error/AppError';
import { handleApiResult, withToken } from '../modules/utils/api';

const useAuthApi = () => {
  const { token, logout } = useAuth();

  const withAuth = useCallback(
    (promise) => {
      return new Promise((resolve, reject) => {
        withToken(promise, token)
          .then(handleApiResult)
          .then((data) => resolve(data))
          .catch((error) => {
            if (error instanceof ApiError) {
              if (error.isUnauthorized()) {
                logout();
              } else {
                reject(error);
              }
            } else {
              reject(new AppError(error));
            }
          });
      });
    },
    [token, logout]
  );

  return withAuth;
};

export default useAuthApi;
