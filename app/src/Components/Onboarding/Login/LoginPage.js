import Button from '../../Design/Button';
import Styles from './LoginPage.module.scss';
import { useState } from 'react';
import Input from '../../Design/Input';
import * as yup from 'yup';
import { login } from '../../../core/modules/auth/api';
import { getValidationErrors } from '../../../core/modules/utils/validation';
import Alert from '../../Design/Alert';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = ({ setUser }) => {
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
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }

            throw res.json();
          })
          .then((data) => {
            setUser(data);
          })
          .catch((err) => {
            console.log(err);
            setError(err);
          });
      })
      .catch((err) => {
        setErrors(getValidationErrors(err));
      });
  };

  return (
    <div id={Styles['login']}>
      {error && (
        <Alert color="danger">{error.message || 'Er ging iets fout'}</Alert>
      )}
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
              <h3 className="text-center">Login</h3>
              <div className="form-group">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  label="E-mail"
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
                  label="Wachtwoord"
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
