import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, {createContext} from "react";
import {BASE_URL} from '../config';
import { useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const register = (telefone, email, codigo, password) => {
    setIsLoading(true);

    axios.post(`${BASE_URL}/register`, {
      telefone,
      email,
      codigo,
      password,
    })
    .then(res => {
      let userInfo = res.data;
      setUserInfo(userInfo);
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLoading(false);
      console.log(userInfo);
    })
    .catch(e => {
      console.log(`register error ${e}`);
      setIsLoading(false);
    });
  };

  const login = (telefone, password) => {
    setIsLoading(true);

    axios.post(`${BASE_URL}/login`, {
      email, password,
    }).then(res => {
      let userInfo = res.data;
      console.log(userInfo);
      setUserInfo(userInfo);
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLoading(false);
    }).catch(e => {
      console.log(`login error ${e}`);
      setIsLoading(false);
    });
  };


  return (
  <AuthContext.Provider value={{isLoading,userInfo,register,login}}>{children}</AuthContext.Provider>
);
};
