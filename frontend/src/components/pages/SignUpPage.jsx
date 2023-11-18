import React, { useRef, useState } from 'react';
import {
  Button, Card, Container, Col, FloatingLabel, Form, Image, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';

import { useAuth } from '../../contexts';
import routes from '../../routes';
import signupImage from '../../images/avatar.signup.jpg';

const SignUpPage = () => {
  const { logIn } = useAuth();
  const { t } = useTranslation();
  const inputRef = useRef();
  const navigate = useNavigate();

  const [authFailed, setAuthFailed] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .min(3, t('errors.length'))
      .max(20, t('errors.length'))
      .required(t('errors.required')),
    password: Yup.string().trim().min(6, t('errors.passwordLength')).required(t('errors.required')),
    passwordConfirmation: Yup.string()
      .trim()
      .oneOf([Yup.ref('password'), t('errors.passwordConfirmation')])
      .required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await axios.post(routes.signupApi, values);
        logIn(data);
        navigate(routes.rootPage);
      } catch (error) {
        setSubmitting(false);
        if (error.isAxiosError && error.response.status === 409) {
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
                <Image src={signupImage} rounded alt={t('headers.signup')} />
              </Col>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4 h2">{t('headers.signup')}</h1>
                <FloatingLabel controlId="username" label={t('placeholders.user')} className="mb-3">
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder={t('placeholders.user')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={(formik.touched.username && formik.errors.username) || authFailed}
                    disabled={formik.isSubmitting}
                    autoFocus
                    ref={inputRef}
                  />
                  {authFailed ? (
                    <Form.Control.Feedback type="invalid" />
                  ) : (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {authFailed ? null : formik.errors.username}
                    </Form.Control.Feedback>
                  )}
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
                    isInvalid={(formik.touched.password && formik.errors.password) || authFailed}
                    disabled={formik.isSubmitting}
                  />
                  {authFailed ? (
                    <Form.Control.Feedback type="invalid" />
                  ) : (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>

                <FloatingLabel
                  controlId="passwordConfirmation"
                  label={t('placeholders.passwordConfirmation')}
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="passwordConfirmation"
                    autoComplete="new-password"
                    placeholder={t('placeholders.passwordConfirmation')}
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirmation}
                    isInvalid={
                      (formik.touched.passwordConfirmation && formik.errors.passwordConfirmation)
                      || authFailed
                    }
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {authFailed ? t('errors.userExists') : formik.errors.passwordConfirmation}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button variant="outline-info" className="w-100 mb-3" type="submit">
                  {t('buttons.signup')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default SignUpPage;
