import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { getValidationErrors } from '../../../../core/modules/utils/validation';
import Button from '../../../Design/Button';
import Input from '../../../Design/Input';

const schema = yup.object().shape({
  userName: yup.string().required(),
  email: yup.string().required(),
  role: yup.string().required(),
});

const defaultData = {
  userName: '',
  email: '',
  role: '',
};

const UserForm = ({ onSubmit, initialData = {}, disabled }) => {
  const [isTouched, setIsTouched] = useState();
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

  const validate = useCallback((data, onSuccess) => {
    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        if (onSuccess) {
          onSuccess();
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
        name="userName"
        value={data.userName}
        id="userName"
        label="Name"
        onChange={handleChange}
        error={errors.userName}
        disabled={disabled}
      />

      <Input
        type="text"
        name="email"
        value={data.email}
        id="email"
        label="Email"
        onChange={handleChange}
        error={errors.email}
        disabled={disabled}
      />

      <Input
        type="text"
        name="role"
        value={data.role}
        id="role"
        label="Role"
        onChange={handleChange}
        error={errors.role}
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

export default UserForm;
