import { Link } from 'react-router-dom';
import useFetch from '../../../../core/hooks/useFetch';
import { fetchPenalties } from '../../../../core/modules/penalties/api';
import { Routes } from '../../../../core/routing';
import Alert from '../../../Design/Alert';
import Button from '../../../Design/Button';
import Spinner from '../../../Design/Spinner';
import AdminContainer from '../../../Shared/Admin/AdminContainer';
import PenaltyDetail from '../Detail/PenaltyDetail';

const PenaltiesOverview = () => {
  const { data: penalties, error, refresh, isLoading } = useFetch(
    fetchPenalties
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }
  return (
    <>
      <h1>Ad Pistums</h1>

      <Button color="secondary" onClick={() => refresh()}>
        Refresh
      </Button>

      <AdminContainer>
        <Link to={Routes.Penalties.Create}>Voeg Ad Pistum toe</Link>
      </AdminContainer>

      <ul className="d-flex flex-wrap list-unstyled mt-3 card-list">
        {penalties.map((penalty) => (
          <li key={penalty._id}>
            <PenaltyDetail penalty={penalty} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default PenaltiesOverview;
