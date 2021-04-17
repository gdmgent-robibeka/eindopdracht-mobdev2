import { useState } from 'react';
import useFetch from '../../../../core/hooks/useFetch';
import { fetchPenalties } from '../../../../core/modules/penalties/api';
import { Routes } from '../../../../core/routing';
import Alert from '../../../Design/Alert';
import Spinner from '../../../Design/Spinner';
import AdminContainer from '../../../Shared/Admin/AdminContainer';
import LinkButton from '../../../Shared/Button/LinkButton';
import PageHeader from '../../../Shared/Header/PageHeader';
import DeletePenalty from '../Delete/DeletePenalty';
import PenaltyDetail from '../Detail/PenaltyDetail';
import EditPenalty from '../Edit/EditPenalty';

const PenaltiesOverview = () => {
  const [currentPenaltyEdit, setCurrentPenaltyEdit] = useState();
  const [currentPenaltyDelete, setCurrentPenaltyDelete] = useState();

  const { data: penalties, error, refresh, isLoading } = useFetch(
    fetchPenalties
  );

  const handlePenaltyEditOrDelete = () => {
    setCurrentPenaltyEdit(null);
    setCurrentPenaltyDelete(null);
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
      <PageHeader title="Penalties">
        <AdminContainer>
          <LinkButton to={Routes.Penalties.Create} color="success">
            Create penalty
          </LinkButton>
        </AdminContainer>
      </PageHeader>

      <div className="d-flex flex-wrap justify-content-between mt-3 card-list">
        {penalties.map((penalty) => (
          <PenaltyDetail
            key={penalty._id}
            penalty={penalty}
            editPenalty={setCurrentPenaltyEdit}
            deletePenalty={setCurrentPenaltyDelete}
          />
        ))}
      </div>

      {currentPenaltyEdit && (
        <EditPenalty
          penalty={currentPenaltyEdit}
          onEdit={handlePenaltyEditOrDelete}
          onClose={() => setCurrentPenaltyEdit(null)}
        />
      )}

      {currentPenaltyDelete && (
        <DeletePenalty
          penalty={currentPenaltyDelete}
          onDelete={handlePenaltyEditOrDelete}
          onClose={() => setCurrentPenaltyDelete(null)}
        />
      )}
    </>
  );
};

export default PenaltiesOverview;
