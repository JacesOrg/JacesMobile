import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Greetings from '../Greetings';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import MainAppNavigationProvider from '../BottomTabs';

const Stack = createNativeStackNavigator();

export default function RootNavigation(props) {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        headerShown: false,
      }}>
      {props.isLoggedIn ? (
        <>
          <Stack.Screen name={'Greetings'} component={Greetings} />
          <Stack.Screen
            name={'Main Tabs'}
            component={MainAppNavigationProvider}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={'Login'} component={Login} />
          <Stack.Screen name={'Register'} component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}
