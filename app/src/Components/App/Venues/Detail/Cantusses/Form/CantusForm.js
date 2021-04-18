import { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import * as yup from 'yup';
import { getValidationErrors } from '../../../../../../core/modules/utils/validation';
import Button from '../../../../../Design/Button';
import Input from '../../../../../Design/Input';
import { useVenue } from '../../VenueDetailContainer';

const defaultData = {
  date: format(new Date(), 'yyyy-MM-dd'),
  studentUnion: '',
  attendees: '',
};

const CantusForm = ({ onSubmit, initialData = {}, disabled }) => {
  const { venue } = useVenue();

  const schema = yup.object().shape({
    date: yup.string().required(),
    studentUnion: yup.string().required(),
    attendees: yup
      .number()
      .required()
      .positive()
      .integer()
      .max(venue.capacity)
      .min(1),
  });

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
        name="date"
        value={data.date}
        id="date"
        label="Date"
        onChange={handleChange}
        error={errors.date}
        disabled={disabled}
      />

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

      <Input
        type="number"
        name="attendees"
        value={data.attendees}
        id="attendees"
        label="Attendees"
        onChange={handleChange}
        error={errors.attendees}
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
