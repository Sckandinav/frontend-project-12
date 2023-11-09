import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FloatingLabel,
  Row,
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../../contexts';
import routes from '../../routes';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const validationSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.login, values);
        localStorage.setItem('userId', JSON.stringify(data));
        logIn();
        const { from } = location.state;
        navigate(from);
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw error;
      }
    },
    validationSchema,
  });

  console.log(formik);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col className="col-sm-4">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Form onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4 h3">Войти</h1>
                <FloatingLabel
                  controlId="username"
                  label="Ваш ник"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Ваш ник"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    autoComplete="username"
                    isInvalid={authFailed}
                    autoFocus
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="password"
                  label="Пароль"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    autoComplete="new-password"
                    isInvalid={authFailed}
                  />
                  {authFailed && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      Неверные имя пользователя или пароль
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>

                <Button
                  variant="outline-primary"
                  className="w-100 mb-3"
                  type="submit"
                >
                  Войти
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span> <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
