import Container from '../../Design/Container';
import Button from '../../Design/Button';
import Styles from './LoginPage.module.scss';
import { useState } from 'react';
import Input from '../../Design/Input';
import * as yup from 'yup';

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

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    schema
      .validate(data)
      .then(() => {
        fetch(`${process.env.REACT_APP_BASE_API}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            // gelukt
            setUser(data);
          })
          .catch((err) => {
            // mislukt
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err.errors);
      });
  };

  return (
    <div id={Styles['login']}>
      <div
        id={Styles['login-row']}
        className="row justify-content-center align-items-center"
      >
        <div id={Styles['login-column']} className="col-md-6">
          <div id={Styles['login-box']} className="col-md-12">
            <form id={Styles['login-form']} onSubmit={handleSubmit}>
              <h3 className="text-center">Login</h3>
              <div className="form-group">
                <label htmlFor="email">Username:</label>
                <br />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <br />
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
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
