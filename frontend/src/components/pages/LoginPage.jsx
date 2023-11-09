import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FloatingLabel,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import * as Yup from "yup";

const LoginPage = () => {
  const signupSchema = Yup.object().shape({
    username: Yup.string().trim().required("Обязательное поле"),
    password: Yup.string().trim().required("Обязательное поле"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
    signupSchema,
  });

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
                    type="username"
                    name="username"
                    placeholder="Ваш ник"
                    onChange={formik.handleChange}
                    value={formik.values.username}
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
                  />
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
