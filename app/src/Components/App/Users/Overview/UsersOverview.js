import { useState } from 'react';
import useFetch from '../../../../core/hooks/useFetch';
import { fetchUsers } from '../../../../core/modules/users/api';
import { Routes } from '../../../../core/routing';
import Alert from '../../../Design/Alert';
import Button from '../../../Design/Button';
import Spinner from '../../../Design/Spinner';
import AdminContainer from '../../../Shared/Admin/AdminContainer';
import LinkButton from '../../../Shared/Button/LinkButton';
import PageHeader from '../../../Shared/Header/PageHeader';
import DeleteUser from '../Delete/DeleteUser';
import EditUser from '../Edit/EditUser';

const UserOverview = () => {
  const [currentUserEdit, setCurrentUserEdit] = useState();
  const [currentUserDelete, setCurrentUserDelete] = useState();

  const { data: users, error, refresh, isLoading } = useFetch(fetchUsers);

  const handleUserEditOrDelete = () => {
    setCurrentUserEdit(null);
    setCurrentUserDelete(null);
    refresh();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <>
      <PageHeader title="Users">
        <AdminContainer>
          <LinkButton to={Routes.Users.Create} color="success">
            Create user
          </LinkButton>
        </AdminContainer>
      </PageHeader>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="col-md-1">
                <Button onClick={() => setCurrentUserEdit(user)}>Edit</Button>
              </td>
              <td className="col-md-1">
                <Button
                  onClick={() => setCurrentUserDelete(user)}
                  color="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentUserEdit && (
        <EditUser
          user={currentUserEdit}
          onEdit={handleUserEditOrDelete}
          onClose={() => setCurrentUserEdit(null)}
        />
      )}

      {currentUserDelete && (
        <DeleteUser
          user={currentUserDelete}
          onDelete={handleUserEditOrDelete}
          onClose={() => setCurrentUserDelete(null)}
        />
      )}
    </>
  );
};

export default UserOverview;
