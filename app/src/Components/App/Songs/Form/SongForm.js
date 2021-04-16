import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { getValidationErrors } from '../../../../core/modules/utils/validation';
import Button from '../../../Design/Button';
import Input from '../../../Design/Input';

const schema = yup.object().shape({
  title: yup.string().required(),
  source: yup.string().required(),
  language: yup.string().required(),
  isOfficial: yup.boolean(),
  codexPage: yup.number().required().positive().integer(),
});

const defaultData = {
  title: '',
  source: '',
  language: '',
  isOfficial: false,
  codexPage: '',
};

const SongForm = ({ onSubmit, initialData = {}, disabled }) => {
  const [isTouched, setIsTouched] = useState();
  const [data, setData] = useState({
    ...defaultData,
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      setData({
        ...data,
        [e.target.name]: e.target.checked,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
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
        name="title"
        value={data.title}
        id="title"
        label="Titel"
        onChange={handleChange}
        error={errors.title}
        disabled={disabled}
      />

      <Input
        type="text"
        name="source"
        value={data.source}
        id="source"
        label="Soundcloud link"
        onChange={handleChange}
        error={errors.source}
        disabled={disabled}
      />

      <Input
        type="text"
        name="language"
        value={data.language}
        id="language"
        label="Taal"
        onChange={handleChange}
        error={errors.language}
        disabled={disabled}
      />

      {/* <Input
        type="checkbox"
        name="isOfficial"
        value={data.isOfficial}
        id="isOfficial"
        label="Officieel lied?"
        onChange={handleChange}
        error={errors.isOfficial}
        disabled={disabled}
      /> */}

      <label htmlFor="isOfficial">Officieel lied?</label>
      <input
        type="checkbox"
        name="isOfficial"
        value={data.isOfficial}
        id="isOfficial"
        label="Officieel lied?"
        onChange={handleChange}
        error={errors.isOfficial}
        disabled={disabled}
      />

      <Input
        type="number"
        name="codexPage"
        value={data.codexPage}
        id="codexPage"
        label="Pagina in de codex"
        onChange={handleChange}
        error={errors.codexPage}
        disabled={disabled}
      />

      <Button type="submit" disabled={disabled}>
        {data._id ? 'Bewerk' : 'Voeg toe'}
      </Button>
    </form>
  );
};

export default SongForm;
