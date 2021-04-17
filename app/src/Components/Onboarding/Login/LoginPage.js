import Button from '../../Design/Button';
import Styles from './LoginPage.module.scss';
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
                setError(new AppError('Verkeerde combinatie'));
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
    <div id={Styles['login']}>
      <ErrorAlert error={error} />
      <div
        id={Styles['login-row']}
        className="row justify-content-center align-items-center"
      >
        <div id={Styles['login-column']} className="col-md-6">
          <div id={Styles['login-box']} className="col-md-12">
            <form
              id={Styles['login-form']}
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
              <br />
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
                <br />
                <Button type="submit">Log in</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
