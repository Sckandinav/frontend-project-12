const apiPath = '/api/v1';

const routes = {
  dataApi: [apiPath, 'data'].join('/'),
  loginApi: [apiPath, 'login'].join('/'),
  signupApi: [apiPath, 'signup'].join('/'),
  rootPage: '/',
  loginPage: '/login',
  signupPage: '/signup',
};

export default routes;
