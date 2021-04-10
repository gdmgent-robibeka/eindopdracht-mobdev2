import { useParams } from 'react-router-dom';

const PenaltyDetail = () => {
  const { id } = useParams();

  return <h1>Ad Pistum Detail {id}</h1>;
};

export default PenaltyDetail;
