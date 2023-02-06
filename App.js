import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import Context from './components/Context';
import RootNavigation from './components/RootNavigation';
import {getHosts} from './lib/api';
import FirstScreen from "./components/FirstScreen";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [hosts, setHosts] = useState([]);
  const [loadComplete, setLoadComplete] = useState(false)
  const [appReady, setAppReady] = useState(false)


  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);
        setAppReady(true)
      } else {
        setIsLoggedIn(true);
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setAppReady(true)
      AsyncStorage.getItem('token').then(async storageToken => {
        const hostList = await getHosts(storageToken);
        setHosts(hostList)
        for (let host of hostList) {
          await AsyncStorage.setItem(host._id, JSON.stringify(host));
        }
        setLoadComplete(true);
      });
    } else {
      console.log('Not Logged In');
    }
  }, [isLoggedIn]);

  const gState = {
    isLoggedIn,
    setIsLoggedIn,
    setToken,
    loadComplete,
    hosts,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        {!appReady ? <FirstScreen /> : (
        <Context.Provider value={gState}>
          <RootNavigation isLoggedIn={isLoggedIn} />
        </Context.Provider>)}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
