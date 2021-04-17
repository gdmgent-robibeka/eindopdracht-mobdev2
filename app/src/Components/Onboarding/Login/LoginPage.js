import Button from '../../Design/Button';
import Styles from '../Onboarding.module.scss';
import { useState } from 'react';
import Input from '../../Design/Input';
import * as yup from 'yup';
import { login } from '../../../core/modules/auth/api';
import { getValidationErrors } from '../../../core/modules/utils/validation';
import { handleApiResult } from '../../../core/modules/utils/api';
import ApiError from '../../../core/error/ApiError';
import AppError from '../../../core/error/AppError';
import ErrorAlert from '../../Shared/Alert/ErrorAlert';
import useTitle from '../../../core/hooks/useTitle';
import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = ({ setUser }) => {
  useTitle('Login');

  const [data, setData] = useState({
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
        login(data)
          .then(handleApiResult)
          .then((data) => {
            setUser(data);
          })
          .catch((err) => {
            if (err instanceof ApiError) {
              if (err.isUnauthorized()) {
                setError(new AppError('Wrong combination'));
              } else {
                setError(err);
              }
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
              <h3 className="text-center">Log in</h3>
              <div className="form-group">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  label="Email"
                  value={data.email}
                  error={errors.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <Input
                  id="password"
                  type="password"
                  name="password"
                  label="Password"
                  value={data.password}
                  error={errors.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <Button type="submit">Log in</Button>
              </div>
            </form>
            <p id={Styles['onboarding-link']}>
              Don't have an account yet?{' '}
              <Link to={Routes.Register}>Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
