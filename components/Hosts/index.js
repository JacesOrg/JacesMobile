import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HostsListScreen from './HostListScreen';
import ViewHostScreen from './ViewHostScreen';
import ConfigViewScreen from "../Configs/ConfigViewScreen";
import ConfigList from "../Configs"

const Stack = createNativeStackNavigator()

export default function HostsNavigationProvider() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName={"Your Hosts"}>
      <Stack.Screen name="Your Hosts" component={HostsListScreen} />
      <Stack.Screen name="View Config" component={ConfigViewScreen} />
      <Stack.Screen name="View Host" component={ViewHostScreen} />
      <Stack.Screen name="Choose config" component={ConfigList} />

    </Stack.Navigator>
  )
}
