import React from 'react';
import {Text, View, StyleSheet,  Image} from 'react-native';


export default function FirstScreen() {


  return (
    <View className="flex h-screen">
      <View className="m-auto items-center">
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
    </View>
  );
}

const st = StyleSheet.create({
  logo: {
    fontFamily: 'Oswald-SemiBold',
  },
});
