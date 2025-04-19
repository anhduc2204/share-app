import React, { createContext, useState, useContext, useEffect } from 'react';
import { Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    updateUser();
  }, []);

  const updateUser = () => {
    const user = auth().currentUser;
    console.log('login info ----- ', JSON.stringify(user));
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ updateUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
