import Container from '../../Design/Container';
import Button from '../../Design/Button';
import Styles from './LoginPage.module.scss';
import { useState } from 'react';
import Input from '../../Design/Input';

const LoginPage = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: setData(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert('Werkt');
  };

  return (
    <Container>
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
    </Container>
  );
};

export default LoginPage;
