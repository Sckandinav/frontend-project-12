import React, { useState } from 'react';
import { AuthContext } from '.';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? currentUser : null);

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const signUp = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getUserName = () => {
    const username = currentUser ? currentUser.username : null;
    return username;
  };

  const getAuthHeader = () => {
    if (currentUser && currentUser.token) {
      return { Authorization: `Bearer ${currentUser.token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider
      value={{ user, logIn, signUp, logOut, getUserName, getAuthHeader }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
