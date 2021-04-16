import Button from '../../../Design/Button';
import Card from '../../../Design/Card';
import AdminContainer from '../../../Shared/Admin/AdminContainer';

const PenaltyDetail = ({ penalty, editPenalty }) => {
  return (
    <Card>
      <h5 className="card-title">{penalty.penaltyName}</h5>
      <p>Moeilijkheidsgraad: {penalty.difficulty}</p>
      <p>{penalty.description}</p>

      <AdminContainer>
        <Button onClick={() => editPenalty(penalty)}>Bewerk ad pistum</Button>
      </AdminContainer>
    </Card>
  );
};

export default PenaltyDetail;
