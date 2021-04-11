import PropTypes from 'prop-types';

const Input = ({ type = 'text', name, value, id, onChange }) => {
  return (
    <div className="form-group">
      <input
        id={id}
        className="form-control"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;
