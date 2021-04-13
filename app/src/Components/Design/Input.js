import PropTypes from 'prop-types';

// TODO fix number input
const Input = ({
  type = 'text',
  name,
  value,
  id,
  label,
  onChange,
  error,
  disabled,
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}

      <input
        id={id}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Input;
