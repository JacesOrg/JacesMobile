import React from 'react';
import {Text, View} from 'react-native';
const Spinner = require('react-native-spinkit');

export default function Greetings() {
  return (
    <View className="flex h-screen">
      <View className="m-auto mb-10">
        <Text className="text-4xl dark:text-white text-cyan-400 font-semibold tracking-widest font-mono">
          J A C E S
        </Text>
      </View>
      <View className="m-auto mt-0">
        <Spinner isVisible={true} type={'Wave'} color={'cyan'} size={50} />
      </View>
    </View>
  );
}
