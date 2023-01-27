import React, { useContext } from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Header from '../Header';
import Context from '../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
  const contextObj = useContext(Context)
  const logOut = async () =>{
    try {
      await AsyncStorage.removeItem('token')
      contextObj.setIsLoggedIn(false)
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <>
      <Header title={'Settings'} />
      <View className="items-center w-full">
        <TouchableOpacity className="mt-7 bg-red-400 h-10 justify-center items-center w-11/12" onPress={logOut}>
          <Text className="text-xl text-white" style={st.txt}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const st = StyleSheet.create({
  txt: {
    fontFamily: 'Oswald-Medium'
  },
});