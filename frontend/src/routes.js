const apiPath = '/api/v1';

export default {
  dataApi: [apiPath, 'data'].join('/'),
  loginApi: [apiPath, 'login'].join('/'),
  signupApi: [apiPath, 'signup'].join('/'),
  rootPage: '/',
  loginPage: '/login',
  signupPage: '/signup',
  notFound: '*',
};
