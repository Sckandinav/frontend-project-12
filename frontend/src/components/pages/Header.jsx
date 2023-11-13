import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../contexts';

const Header = () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand href="/">{t('headers.title')}</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          {loggedIn && <Button onClick={logOut}>{t('buttons.logout')}</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
