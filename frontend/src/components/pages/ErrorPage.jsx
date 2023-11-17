import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';
import routes from '../../routes';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col className="md-12 text-center">
          <span className="display-1 d-block">404</span>
          <div className="mb-4 lead">
            The page you are looking for was not found.
          </div>
          <Link to={routes.rootPage}>Back to Home</Link>
        </Col>
      </Row>
    </Container>
  );
}
