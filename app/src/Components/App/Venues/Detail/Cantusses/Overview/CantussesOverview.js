import { useCallback, useState } from 'react';
import useAdmin from '../../../../../../core/hooks/useAdmin';
import useFetch from '../../../../../../core/hooks/useFetch';
import { fetchCantussesByVenue } from '../../../../../../core/modules/cantusses/api';
import Button from '../../../../../Design/Button';
import Spinner from '../../../../../Design/Spinner';
import ErrorAlert from '../../../../../Shared/Alert/ErrorAlert';
import { format, parse } from 'date-fns';
import EditCantus from '../Edit/EditCantus';

const CantussesOverview = ({ venueId }) => {
  const [currentCantusEdit, setCurrentCantusEdit] = useState();
  const [currentCantusDelete, setCurrentCantusDelete] = useState();

  const fetchCantusses = useCallback(() => fetchCantussesByVenue(venueId), [
    venueId,
  ]);

  const { data: cantusses, error, refresh, isLoading } = useFetch(
    fetchCantusses
  );

  const handleCantusEditOrDelete = () => {
    setCurrentCantusEdit(null);
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
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Student Union</th>
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
              {admin && <td>{cantus.user?.userName}</td>}
              <td className="col-md-1">
                <Button onClick={() => setCurrentCantusEdit(cantus)}>
                  Edit
                </Button>
              </td>
              <td className="col-md-1">
                <Button color="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentCantusEdit && (
        <EditCantus
          venueId={venueId}
          cantus={currentCantusEdit}
          onEdit={handleCantusEditOrDelete}
          onClose={() => setCurrentCantusEdit(null)}
        />
      )}
    </>
  );
};

export default CantussesOverview;
