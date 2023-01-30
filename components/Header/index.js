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

const AddButton = (props) => {
  return (
    <TouchableOpacity
      onPress={()=>props.onPress}
      className=" w-16 ml-5"
    >
      <Text style={st.txt} className="text-xl text-white">+</Text>
    </TouchableOpacity>)}
export default function Header(props) {

  return (
    <View className="flex-row w-full">
      <View className="h-100 justify-center bg-cyan-500">
        {props.backButton ? <BackButton /> : null }
      </View>
      <View className={` h-16 justify-center items-center bg-cyan-500`}>
        <Text style={st.txt} className={`text-2xl text-white ml-14`}>
          {props.title}
        </Text>
      </View>
      <View className="h-100 flex justify-center bg-cyan-500">
        {props.addButton ? <AddButton /> : null }
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  txt: {
    fontFamily: 'Oswald-Medium',
  },
});
