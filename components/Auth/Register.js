import React, { useEffect } from "react";
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  console.log('LOGIN');
  useEffect(()=>{
    console.log('We"re on login');
  }, [])
  const navigation = useNavigation()
  return (
    <View className="flex h-screen w-full">
      <View className="m-auto w-full items-center mt-36">
        <Image source={require('../../assets/images/logo.png')}  className='w-36 h-36 rounded-full mx-auto mb-8'/>
        <TextInput placeholder={'Enter Client ID'} className='border border-t-0 border-l-0 border-r-0 border-solid border-cyan-500 rounded-md text-2xl w-5/6' style={st.txt}/>
        <TouchableOpacity className='w-5/6 bg-green-400 h-10 justify-center content-center items-center drop-shadow-2xl mt-7'>
          <Text style={st.txt} className='text-white text-xl' > SIGN UP TO JACES</Text>
        </TouchableOpacity>

        <TouchableOpacity className='w-5/6 bg-cyan-500 h-10 justify-center content-center items-center drop-shadow-2xl mt-7' onPress={()=> navigation.goBack()}>
          <Text style={st.txt} className='text-white text-xl' > {'<<'} GO BACK </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  txt: {
    fontFamily:'Oswald-Medium'
  },
  logo: {
    fontFamily: 'Oswald-SemiBold',
    color: '#38BDF8',

  },
  bg:{
    backgroundColor: '#38BDF8'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1'
  }
})
