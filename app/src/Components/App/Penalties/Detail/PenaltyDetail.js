import Button from '../../../Design/Button';
import Card from '../../../Design/Card';
import AdminContainer from '../../../Shared/Admin/AdminContainer';

const PenaltyDetail = ({ penalty, editPenalty, deletePenalty }) => {
  return (
    <Card id="card-box">
      <h5 className="card-title">{penalty.penaltyName}</h5>
      <p>Difficulty: {penalty.difficulty}</p>
      <p>{penalty.description}</p>

      <AdminContainer>
        <Button onClick={() => editPenalty(penalty)}>Edit penalty</Button>
      </AdminContainer>
      <AdminContainer>
        <Button onClick={() => deletePenalty(penalty)} color="danger">
          Delete
        </Button>
      </AdminContainer>
    </Card>
  );
};

export default PenaltyDetail;
