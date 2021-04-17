import { useState } from 'react';
import { useHistory } from 'react-router';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { Routes } from '../../../../core/routing';
import ErrorAlert from '../../../Shared/Alert/ErrorAlert';
import UserForm from '../Form/UserForm';

const CreateUser = () => {
  const withAuth = useAuthApi();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  // const handleSubmit = (data) => {
  //   setIsLoading(true);
  //   withAuth(register(data))
  //     .then(() => {
  //       history.push(Routes.Users.Index);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       setIsLoading(true);
  //     });
  // };

  return (
    <>
      <h1>Add song</h1>
      <ErrorAlert error={error} />
      {/* <UserForm onSubmit={handleSubmit} disabled={isLoading} /> */}
    </>
  );
};

export default CreateUser;
