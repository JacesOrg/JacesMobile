import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Header(props) {
  return (
    <View className="w-full h-16 justify-center items-center bg-cyan-500">
      <Text style={st.txt} className="text-2xl text-white">
        {props.title}
      </Text>
    </View>
  );
}

const st = StyleSheet.create({
  txt: {
    fontFamily: 'Oswald-Medium',
    wordBreak: 'normal',
  },
});
