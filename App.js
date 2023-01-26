import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import Context from "./components/Context";
import RootNavigation from './components/RootNavigation'
import Greetings from "./components/Greetings";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getToken = async ()=>{
      const token = await AsyncStorage.getItem('token')
      if (!token) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        console.log(isLoggedIn);
      }
    }
    getToken()
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('Logged In');
    } else {
      console.log('Not Logged In');
    }
  }, [isLoggedIn]);

  const gState={
    isLoggedIn,
    setIsLoggedIn
  }

  return (
    <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Context.Provider value={gState} >
            <RootNavigation isLoggedIn={isLoggedIn}/>
          </Context.Provider>
        </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
