import Button from '../../Design/Button';
import Styles from '../Onboarding.module.scss';
import { useState } from 'react';
import Input from '../../Design/Input';
import * as yup from 'yup';
import { register } from '../../../core/modules/auth/api';
import { getValidationErrors } from '../../../core/modules/utils/validation';
import { handleApiResult } from '../../../core/modules/utils/api';
import ApiError from '../../../core/error/ApiError';
import AppError from '../../../core/error/AppError';
import ErrorAlert from '../../Shared/Alert/ErrorAlert';
import useTitle from '../../../core/hooks/useTitle';
import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';

let schema = yup.object().shape({
  userName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const RegisterPage = ({ setUser }) => {
  useTitle('Register');

  const [data, setData] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        register(data)
          .then(handleApiResult)
          .then((data) => {
            setUser(data);
          })
          .catch((err) => {
            if (err instanceof ApiError) {
              setError(err);
            } else {
              setError(new AppError(err));
            }
          });
      })
      .catch((err) => {
        setErrors(getValidationErrors(err));
      });
  };

  return (
    <div id={Styles['onboarding']}>
      <ErrorAlert error={error} />

      <div
        id={Styles['onboarding-row']}
        className="row justify-content-center align-items-center"
      >
        <div id={Styles['onboarding-column']} className="col-md-6">
          <div id={Styles['onboarding-box']} className="col-md-12">
            <form
              id={Styles['onboarding-form']}
              onSubmit={handleSubmit}
              noValidate={true}
            >
              <h3 className="text-center">Register</h3>
              <Input
                id="userName"
                type="userName"
                name="userName"
                label="Name"
                value={data.userName}
                error={errors.userName}
                onChange={handleChange}
              />

              <Input
                id="email"
                type="email"
                name="email"
                label="Email"
                value={data.email}
                error={errors.email}
                onChange={handleChange}
              />

              <Input
                id="password"
                type="password"
                name="password"
                label="Password"
                value={data.password}
                error={errors.password}
                onChange={handleChange}
              />

              <Button type="submit">Register</Button>
            </form>
            <p id={Styles['onboarding-link']}>
              Already have an account?{' '}
              <Link to={Routes.Login}>Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
