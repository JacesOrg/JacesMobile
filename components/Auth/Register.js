import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Spinner = require('react-native-spinkit');
import { register } from "../../lib/api";
import  Toast  from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Context from "../Context";


export default function Register() {
  
  const contextObj = useContext(Context)
  const navigation = useNavigation()
  const [registerLoading, setRegisterLoading] = useState(false)
  const [clientId, setClientId] = useState('')

  const handleRegister = async () =>{
    setRegisterLoading(true)
    if(clientId==="")
      return
    try {
        const token = await register(clientId);
        console.log(token);
        await AsyncStorage.setItem('token', token)
        setRegisterLoading(false)
        contextObj.setToken(token);
        contextObj.setIsLoggedIn(true);
    } catch (error) {
      Toast.show({
        text1: 'Error registering user',
        text2: error.message,
        type: 'error'
      })
      setRegisterLoading(false)
    }
  }
  return (
    <View className="flex h-screen w-full">
      <View className="m-auto w-full items-center mt-36">
        <Image source={require('../../assets/images/logo.png')}  className='w-36 h-36 rounded-full mx-auto mb-8'/>
        <TextInput placeholder={'Enter Client ID'} className='border border-t-0 border-l-0 border-r-0 border-solid border-cyan-500 rounded-md text-2xl w-5/6' style={st.txt}
          onChangeText={(e)=>setClientId(e)}
        />
        <TouchableOpacity className='flex-row w-5/6 bg-green-400 h-10 justify-center content-center items-center drop-shadow-2xl mt-7'
          onPress={handleRegister}
        >
        <Spinner
          isVisible={registerLoading}
          type={'Circle'}
          size={20}
          style={{ color: "white"}}
        />
          <Text style={st.txt} className='text-white text-xl ml-3' > SIGN UP TO JACES</Text>
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
