import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkButton = ({ to, children, color = 'primary' }) => {
  return (
    <Link to={to} className={`btn btn-${color}`}>
      {children}
    </Link>
  );
};

LinkButton.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'danger',
    'success',
    'outline-light',
  ]),
};

export default LinkButton;
