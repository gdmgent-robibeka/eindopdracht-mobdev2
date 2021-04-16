import { useState } from 'react';
import useFetch from '../../../../core/hooks/useFetch';
import { fetchPenalties } from '../../../../core/modules/penalties/api';
import { Routes } from '../../../../core/routing';
import Alert from '../../../Design/Alert';
import Spinner from '../../../Design/Spinner';
import AdminContainer from '../../../Shared/Admin/AdminContainer';
import LinkButton from '../../../Shared/Button/LinkButton';
import PageHeader from '../../../Shared/Header/PageHeader';
import PenaltyDetail from '../Detail/PenaltyDetail';
import EditPenalty from '../Edit/EditPenalty';

const PenaltiesOverview = () => {
  const [currentPenalty, setCurrentPenalty] = useState();

  const { data: penalties, error, refresh, isLoading } = useFetch(
    fetchPenalties
  );

  const handlePenaltyUpdate = () => {
    setCurrentPenalty(null);
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
      <PageHeader title="Ad Pistums">
        <AdminContainer>
          <LinkButton to={Routes.Penalties.Create}>
            Voeg Ad Pistum toe
          </LinkButton>
        </AdminContainer>
      </PageHeader>

      <div className="d-flex flex-wrap mt-3 card-list">
        {penalties.map((penalty) => (
          <PenaltyDetail
            key={penalty._id}
            penalty={penalty}
            editPenalty={setCurrentPenalty}
          />
        ))}
      </div>

      {currentPenalty && (
        <EditPenalty
          penalty={currentPenalty}
          onUpdate={handlePenaltyUpdate}
          onClose={() => setCurrentPenalty(null)}
        />
      )}
    </>
  );
};

export default PenaltiesOverview;
