import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts';
import routes from '../../routes';

const Header = () => {
  const { user, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand as={Link} to={routes.rootPage}>
          {t('headers.title')}
        </Navbar.Brand>
        {user && (
          <Button variant="info" onClick={logOut}>
            {t('buttons.logout')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
