import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { getValidationErrors } from '../../../../core/modules/utils/validation';
import Button from '../../../Design/Button';
import Input from '../../../Design/Input';

const schema = yup.object().shape({
  penaltyName: yup.string().required(),
  difficulty: yup.number().required().min(1).max(5),
  description: yup.string().required(),
});

const defaultData = {
  penaltyName: '',
  difficulty: 1,
  description: '',
};

const PenaltyForm = ({ onSubmit, initialData = {}, disabled }) => {
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
        name="penaltyName"
        value={data.penaltyName}
        id="penaltyName"
        label="Name"
        onChange={handleChange}
        error={errors.penaltyName}
        disabled={disabled}
      />

      <Input
        type="number"
        name="difficulty"
        value={data.difficulty}
        id="difficulty"
        label="Difficulty"
        onChange={handleChange}
        error={errors.difficulty}
        disabled={disabled}
      />

      <Input
        type="text"
        name="description"
        value={data.description}
        id="description"
        label="Description"
        onChange={handleChange}
        error={errors.description}
        disabled={disabled}
      />

      <Button type="submit" disabled={disabled}>
        {data._id ? 'Edit' : 'Create'}
      </Button>
    </form>
  );
};

export default PenaltyForm;
