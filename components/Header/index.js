import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';

const BackButton = () => {
  const navigation = useNavigation();
  return (
  <TouchableOpacity 
      onPress={()=>navigation.goBack()}
      className=" w-16 ml-5"
      >
        <Text style={st.txt} className="text-xl text-white">{'<'} Back</Text>
  </TouchableOpacity>)}

export default function Header(props) {
  
  return (
    <View className="flex-row">
      <View className="h-100 justify-center bg-cyan-500">
        {props.backButton ? <BackButton /> : null } 
      </View>
      <View className={`w-full h-16 justify-center ${!props.backButton ? "items-center": ""} bg-cyan-500`}>
        <Text style={st.txt} className={`text-2xl text-white ${props.backButton ? "ml-14": ""}`}>
          {props.title}
        </Text>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  txt: {
    fontFamily: 'Oswald-Medium',
    wordBreak: 'normal',
  },
});
