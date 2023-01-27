import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HostsListScreen from './HostListScreen';
import ViewHostScreen from './ViewHostScreen';

const Stack = createNativeStackNavigator()

export default function HostsNavigationProvider() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="Your Hosts" component={HostsListScreen} />
      <Stack.Screen name="View Host" component={ViewHostScreen} />
    </Stack.Navigator>
  )
}
