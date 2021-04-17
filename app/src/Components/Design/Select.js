import PropTypes from 'prop-types';

const Select = ({
  options = [],
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

      <select
        id={id}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        name={name}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
      >
        <option>--</option>
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Select;
