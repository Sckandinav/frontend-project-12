import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Button, Card, Col, Container, Form, FloatingLabel, Image, Row,
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';

import { useAuth } from '../../contexts';
import routes from '../../routes';
import loginImage from '../../images/avatar.login.jpg';

const LoginPage = () => {
  const { logIn } = useAuth();
  const { t } = useTranslation();
  const inputRef = useRef();
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
        const { data } = await axios.post(routes.loginApi, values);
        logIn(data);
        const { from } = location.state || { from: { pathname: routes.rootPage } };
        navigate(from);
      } catch (error) {
        setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        toast.error(t('errors.netWorkError'));
      }
    },
    validationSchema,
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card>
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image src={loginImage} rounded alt={t('headers.login')} />
              </Col>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4 h2">{t('headers.login')}</h1>
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
                    disabled={formik.isSubmitting}
                    autoFocus
                    ref={inputRef}
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

                <Button variant="outline-info" className="w-100 mb-3 custom-button" type="submit">
                  {t('buttons.login')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('messages.noAccount')}</span>
                {' '}
                <Link to={routes.signupPage}>{t('messages.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
