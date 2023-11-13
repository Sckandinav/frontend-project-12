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
  Image,
  Row,
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../contexts';
import routes from '../../routes';

const LoginPage = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authFailed, setAuthFailed] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().trim().required(t('errors.required')),
    password: Yup.string().trim().required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.login, values);
        logIn(data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (error) {
        setSubmitting(false);
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
              <Col
                xs={12}
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Image
                  src="src/images/avatar.login.jpg"
                  roundedCircle
                  alt={t('headers.login')}
                />
              </Col>
              <Form onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4 h3">{t('headers.login')}</h1>
                <FloatingLabel
                  controlId="username"
                  label={t('placeholders.username')}
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder={t('placeholders.username')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                    autoFocus
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="password"
                  label={t('placeholders.password')}
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder={t('placeholders.password')}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t('errors.loginValidation')}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <Button
                  variant="outline-primary"
                  className="w-100 mb-3"
                  type="submit"
                >
                  {t('buttons.login')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('messages.noAccount')}</span>{' '}
                <Link to="/signup">{t('messages.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
