import { Link } from 'react-router-dom';
import { route, Routes } from '../../../../core/routing';

const PenaltiesOverview = () => {
  return (
    <>
      <h1>Ad Pistums</h1>
      <Link to={route(Routes.Penalties.Detail, { id: 1 })}>Ad Pistum 1</Link>
    </>
  );
};

export default PenaltiesOverview;
