import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

export const AuthContext = createContext();

const AUTH_KEY = 'phone';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState('');

  useEffect(function loadFromAsyncStorage() {
    AsyncStorage.getItem(AUTH_KEY).then((value) => {
      if (value) {
        setAuth(value);
      }
      SplashScreen.hideAsync();
    });
  }, []);

  const login = (phone) => {
    setAuth(phone);
    void AsyncStorage.setItem(AUTH_KEY, phone);
  };

  const logout = () => {
    setAuth('');
    void AsyncStorage.setItem(AUTH_KEY, '');
  };

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
};
