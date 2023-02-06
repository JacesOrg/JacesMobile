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
    <View className="flex-row bg-cyan-500">
      <View className={`h-12 flex-auto flex-row `}>
        {props.backButton ?
          <View className=" h-100 justify-center">
            <BackButton />
          </View>
          : null }

        <Text style={st.txt} className={`text-xl text-white m-auto ${props.backButton ? 'ml-16': ''}`}>
          {props.title}
        </Text>
      </View>

    </View>
  );
}

const st = StyleSheet.create({
  txt: {
    fontFamily: 'Oswald-Medium',
  },
});
