import React from 'react';
import { Container } from 'react-bootstrap';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import SignUpPage from './pages/SignUpPage';
import { useAuth } from '../contexts';

const Root = () => {
  const auth = useAuth();
  return auth.loggedIn ? <ChatPage /> : <LoginPage />;
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
    </>,
  ),
);

const App = () => {
  return (
    <Container fluid className="h-100">
      <RouterProvider router={router}></RouterProvider>
    </Container>
  );
};

export default App;
