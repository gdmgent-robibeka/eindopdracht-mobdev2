import PropTypes from 'prop-types';

const Alert = ({ color, children }) => {
  return (
    <div className={`alert alert-${color}`} role="alert">
      {children}
    </div>
  );
};

Alert.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'danger']),
};

export default Alert;
