import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Hosts from '../Hosts';
import Settings from '../Settings';
import {faServer, faGear} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function MainAppNavigationProvider() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={
        (({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;
            if (route.name === 'Your Hosts') {
              iconName = faServer;
            } else if (route.name === 'Settings') {
              iconName = faGear;
            }
            return (
              <FontAwesomeIcon
                icon={iconName}
                color={focused ? 'black' : 'lightgray'}
                size={25}
              />
            );
          },
          headerShown: false,
          tabBarStyle: {
            height:70,
          },
          labelStyle:{
            fontFamily: 'Oswald-Bold',
            fontSize: '32pt',
            fontStyle: 'italic',
            margin: 5
          },
        }))
      }
      tabBarOptions={{
        labelStyle: {
            fontFamily: 'Oswald-Medium',
            fontSize: 16,
        }
      }}>
      <Tab.Screen name="Your Hosts" component={Hosts} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
