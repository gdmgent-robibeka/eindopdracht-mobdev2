import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  color = 'primary',
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      className={`btn btn-${color}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'danger',
    'success',
    'outline-light',
  ]),
  type: PropTypes.oneOf(['button', 'submit']),
  disabled: PropTypes.bool,
};

export default Button;
