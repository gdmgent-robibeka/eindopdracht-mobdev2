import Card from '../../../Design/Card';

const PenaltyDetail = ({ penalty }) => {
  return (
    <Card>
      <h5 className="card-title">{penalty.penaltyName}</h5>
      <p>Moeilijkheidsgraad: {penalty.difficulty}</p>
      <p>{penalty.description}</p>
    </Card>
  );
};

export default PenaltyDetail;
