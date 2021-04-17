import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { getValidationErrors } from '../../../../../../core/modules/utils/validation';
import Button from '../../../../../Design/Button';
import Input from '../../../../../Design/Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import nlBE from 'date-fns/locale/nl-BE';
registerLocale('nl-BE', nlBE);

const schema = yup.object().shape({
  date: yup.string().required(),
  studentUnion: yup.string().required(),
});

const defaultData = {
  date: new Date(),
  studentUnion: '',
};

const CantusForm = ({ onSubmit, initialData = {}, disabled }) => {
  const [isTouched, setIsTouched] = useState();
  const [data, setData] = useState({
    ...defaultData,
    ...initialData,
  });
  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState(new Date());

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
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        locale={nlBE}
      />

      {/* <Input
        type="text"
        name="date"
        value={data.date}
        id="date"
        label="Date"
        onChange={handleChange}
        error={errors.date}
        disabled={disabled}
      /> */}

      <Input
        type="text"
        name="studentUnion"
        value={data.studentUnion}
        id="studentUnion"
        label="Student union"
        onChange={handleChange}
        error={errors.studentUnion}
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

export default CantusForm;
