import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import AuthNavigationProvider from './components/Auth';

import Greetings from './components/Greetings';

const App = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (!token) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        console.log(isLoggedIn);
      }
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('Logged In');
    } else {
      navigation.navigate("Login")
      console.log('Not Logged In');
    }
  }, [isLoggedIn]);

  return (
    <SafeAreaView>
      <NavigationContainer>
        <Greetings />
        <AuthNavigationProvider />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
