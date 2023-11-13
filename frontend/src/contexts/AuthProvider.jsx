import React, { useState } from 'react';
import { AuthContext } from '.';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    setLoggedIn(true);
  };

  const signUp = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    setLoggedIn(false);
  };

  const getUserName = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user ? user.username : null;
    return username;
  };

  const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn,
        logIn,
        signUp,
        logOut,
        getUserName,
        getAuthHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
