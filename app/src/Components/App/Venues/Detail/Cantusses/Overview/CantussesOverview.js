import { useCallback, useState } from 'react';
import useAdmin from '../../../../../../core/hooks/useAdmin';
import useFetch from '../../../../../../core/hooks/useFetch';
import { fetchCantussesByVenue } from '../../../../../../core/modules/cantusses/api';
import Button from '../../../../../Design/Button';
import Spinner from '../../../../../Design/Spinner';
import ErrorAlert from '../../../../../Shared/Alert/ErrorAlert';
import { format, parse } from 'date-fns';
import CreateOrEditCantus from '../Edit/CreateOrEditCantus';
import AdminContainer from '../../../../../Shared/Admin/AdminContainer';
import DeleteCantus from '../Delete/DeleteCantus';

const CantussesOverview = ({ venueId }) => {
  const [currentCantus, setCurrentCantus] = useState();
  const [currentCantusDelete, setCurrentCantusDelete] = useState();

  const fetchCantusses = useCallback(() => fetchCantussesByVenue(venueId), [
    venueId,
  ]);

  const { data: cantusses, error, refresh, isLoading } = useFetch(
    fetchCantusses
  );

  const handleCreateCantus = () => {
    setCurrentCantus({});
  };

  const handleCantusEditOrDelete = () => {
    setCurrentCantus(null);
    setCurrentCantusDelete(null);
    refresh();
  };

  const admin = useAdmin();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <>
      <Button onClick={() => handleCreateCantus()} color="success">
        Create cantus
      </Button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Student Union</th>
            <th>Attendees</th>
            {admin && <th>User</th>}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cantusses.map((cantus) => (
            <tr key={cantus._id}>
              <td>
                {format(
                  parse(cantus.date, 'yyyy-MM-dd', new Date()),
                  'dd/MM/yyyy'
                )}
              </td>
              <td>{cantus.studentUnion}</td>
              <td>{cantus.attendees}</td>
              {admin && <td>{cantus.user?.userName}</td>}
              <td className="col-md-1">
                <AdminContainer>
                  <Button onClick={() => setCurrentCantus(cantus)}>Edit</Button>
                </AdminContainer>
              </td>
              <td className="col-md-1">
                <AdminContainer>
                  <Button
                    onClick={() => setCurrentCantusDelete(cantus)}
                    color="danger"
                  >
                    Delete
                  </Button>
                </AdminContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentCantus && (
        <CreateOrEditCantus
          venueId={venueId}
          cantus={currentCantus}
          onEdit={handleCantusEditOrDelete}
          onClose={() => setCurrentCantus(null)}
        />
      )}

      {currentCantusDelete && (
        <DeleteCantus
          venueId={venueId}
          cantus={currentCantusDelete}
          onDelete={handleCantusEditOrDelete}
          onClose={() => setCurrentCantusDelete(null)}
        />
      )}
    </>
  );
};

export default CantussesOverview;
