import React, {useContext, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Image} from 'react-native';
const Spinner = require('react-native-spinkit');
import Context from '../Context';
import {useNavigation} from '@react-navigation/native';

export default function Greetings() {
  const navigation = useNavigation();
  const contextObj = useContext(Context);
  useEffect(() => {
    if (contextObj.loadComplete) {
      navigation.navigate('Main Tabs');
    }
  }, [contextObj.loadComplete]);
  return (
    <View className="flex h-screen">
      <View className="m-auto mb-10 items-center">
        <Image
          source={require('../../assets/images/logo.png')}
          className="w-36 h-36 rounded-full mx-auto mb-8"
        />
        <Text
          className="text-4xl dark:text-white font-semibold tracking-widest font-serif text-cyan-500"
          style={st.logo}>
          J A C E S
        </Text>
      </View>
      <View className="m-auto mt-0">
        <Spinner
          isVisible={true}
          type={'Wave'}
          size={50}
          style={{color: "rgb(6,182,212)"}}
        />
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  logo: {
    fontFamily: 'Oswald-SemiBold',
  },
});
