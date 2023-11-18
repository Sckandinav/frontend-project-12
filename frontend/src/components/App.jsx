import React from 'react';
import {
  Route,
  RouterProvider,
  Navigate,
  useLocation,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './pages/Layout';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import SignUpPage from './pages/SignUpPage';
import { useAuth } from '../contexts';
import routes from '../routes';

const Root = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  return user ? children : <Navigate to={routes.loginPage} state={{ from: location }} />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routes.rootPage} element={<Layout />}>
      <Route
        index
        element={(
          <Root>
            <ChatPage />
          </Root>
        )}
      />
      <Route path={routes.loginPage} element={<LoginPage />} />
      <Route path={routes.signupPage} element={<SignUpPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>,
  ),
);

const App = () => (
  <>
    <div className="d-flex flex-column h-100">
      <RouterProvider router={router} />
    </div>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
);

export default App;
