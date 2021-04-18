import { useCallback, useEffect, useState } from 'react';
import Button from '../../../Design/Button';
import Input from '../../../Design/Input';
import * as yup from 'yup';
import { getValidationErrors } from '../../../../core/modules/utils/validation';

const schema = yup.object().shape({
  venueName: yup.string().required(),
  street: yup.string().required(),
  number: yup.number().required().positive().integer(),
  city: yup.string().required(),
  capacity: yup.number().required().positive().integer(),
});

const defaultData = {
  venueName: '',
  street: '',
  number: '',
  city: '',
  capacity: '',
};

const VenueForm = ({ onSubmit, initialData = {}, disabled }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [data, setData] = useState({
    ...defaultData,
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validate = useCallback((data, onSucces) => {
    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        if (onSucces) {
          onSucces();
        }
      })
      .catch((err) => {
        setErrors(getValidationErrors(err));
      });
  }, []);

  useEffect(() => {
    if (isTouched) {
      validate(data);
    }
  }, [isTouched, validate, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTouched(true);
    validate(data, () => {
      onSubmit(data);
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate={true}>
      <Input
        type="text"
        name="venueName"
        value={data.venueName}
        id="venueName"
        label="Name"
        onChange={handleChange}
        error={errors.venueName}
        disabled={disabled}
      />

      <Input
        type="text"
        name="street"
        value={data.street}
        id="street"
        label="Street"
        onChange={handleChange}
        error={errors.street}
        disabled={disabled}
      />

      <Input
        type="number"
        name="number"
        value={data.number}
        id="number"
        label="Number"
        onChange={handleChange}
        error={errors.number}
        disabled={disabled}
      />

      <Input
        type="text"
        name="city"
        value={data.city}
        id="city"
        label="City"
        onChange={handleChange}
        error={errors.city}
        disabled={disabled}
      />

      <Input
        type="number"
        name="capacity"
        value={data.capacity}
        id="capacity"
        label="Capacity"
        onChange={handleChange}
        error={errors.capacity}
        disabled={disabled}
      />

      <Button
        type="submit"
        disabled={disabled}
        color={data._id ? 'primary' : 'success'}
      >
        {data._id ? 'Edit' : 'Create'}
      </Button>
    </form>
  );
};

export default VenueForm;
