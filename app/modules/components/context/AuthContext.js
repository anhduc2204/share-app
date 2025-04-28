import React, { createContext, useState, useContext, useEffect } from 'react';
import { Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isLoadedUser, setIsLoadedUser] = useState(false);

  useEffect(() => {
    updateUser();
  }, []);

  const updateUser = () => {
    setIsLoadedUser(false);
    loadUser();
  }

  const loadUser = () => {
    const user = auth().currentUser;
    console.log('login info ----- ', JSON.stringify(user));
    setUser(user);
    setIsLoadedUser(true);
  }

  return (
    <AuthContext.Provider value={{ updateUser, user, isLoadedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
