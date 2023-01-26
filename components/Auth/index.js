import React from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';

const Stack = createNativeStackNavigator();

export default function AuthNavigationProvider() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Login'} component={Login} />
    </Stack.Navigator>
  );
}
