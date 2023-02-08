import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import Context from './components/Context';
import RootNavigation from './components/RootNavigation';
import {getHosts} from './lib/api';
import FirstScreen from "./components/FirstScreen";
import Toast from 'react-native-toast-message';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [hosts, setHosts] = useState([]);
  const [loadComplete, setLoadComplete] = useState(false)
  const [appReady, setAppReady] = useState(false)
  const [currentHost, setCurrentHost] = useState({})


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

  const refresh = () =>{
    AsyncStorage.getItem('token').then(async storageToken => {
      const hostList = await getHosts(storageToken);
      console.log(hostList);
      setHosts(hostList)
      setToken(storageToken)
      for (let host of hostList) {
        await AsyncStorage.setItem(host._id, JSON.stringify(host));
      }
      setLoadComplete(true);
    });
  }

  useEffect(() => {
    if (isLoggedIn) {
      setAppReady(true)
      refresh()
    } else {
      console.log('Not Logged In');
    }
  }, [isLoggedIn]);

  const gState = {
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    loadComplete,
    hosts,
    currentHost,
    setCurrentHost,
    refresh
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
          {!appReady ? <FirstScreen /> : (
          <Context.Provider value={gState}>
            <RootNavigation isLoggedIn={isLoggedIn} />
          </Context.Provider>)}
        <Toast />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
