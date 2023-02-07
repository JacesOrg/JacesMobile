import { useContext, useEffect, useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import  Icon  from "react-native-vector-icons/FontAwesome5";
import Header from "../Header";
import RNTextArea from "@freakycoder/react-native-text-area"
import { useNavigation } from "@react-navigation/native";
import Context from "../Context";
import Toast from 'react-native-toast-message';
import { updateHost } from "../../lib/api";

export default function ConfigViewScreen(props) {

  const [name, setName] = useState('')
  const [params, setParams] = useState('')
  const navigation = useNavigation()
  useEffect(()=>{
    setName(props.route.params.config.name)
    setParams(props.route.params.config.params.join('\n'))
  }, [props.config])
  const config = props.route.params.config
  const {isNew} = props.route.params
  console.log(config);
  const contextObj = useContext(Context)

  const saveConfig = async () =>{
    console.log(contextObj);
    const currentHost = contextObj.currentHost
    const updateObj = {
      id: config.id,
      name: name,
      params: params.split('\n'),
      icon: config.icon,
      image: config.image
    }
    if(isNew){
      currentHost.configs.push(updateObj)
    }else
      for(let i=0; i < currentHost.configs.length; i++)
        if(updateObj.id == currentHost.configs[i].id)
          currentHost.configs[i] = updateObj;
    console.log('To update');
    console.log(updateObj);
    console.log('Updated host');
    console.log(currentHost);
    try {
      console.log(contextObj.token);
      await updateHost(contextObj.token, currentHost)
      contextObj.setCurrentHost(currentHost)
      contextObj.refresh()
      Toast.show({type: 'success', text1: 'Successfully saved'})
      navigation.navigate("View Host")
    } catch (error) {
      console.log(error);
      Toast.show({type: 'error', text1: 'Error saving config'})
    }
  }

  return(
    <View>
      <Header title={'Edit Config'} backButton={true}/>
      <View className="flex-row ml-5 pt-3 items-center">
        <Icon name={config.icon} size={60} color="coral" />
        <TextInput 
          value={name} 
          placeholder="Enter config name" 
          onChangeText={(e)=>setName(e)} 
          className="text-xl ml-4 border-b-2 w-10/12"
          style={styles.txt}
        />
       
        
      </View>
      <View className="w-11/12 ml-5 mt-4">
        <Text className="text-xl" style={styles.txt}>Run parameters:</Text>
        <RNTextArea
            maxCharLimit={150}
            style={styles.input}
            placeholderTextColor="black"
            exceedCharCountColor="#990606"
            onChangeText={(e)=>{setParams(e)}}
            value={params}
            textAlignVertical='top'           
          />
      </View>
      <View className="w-11/12 items-center m-auto">
        <TouchableOpacity 
          className="w-full bg-green-400 flex-row justify-center items-center ml-2 mt-5 p-3 " 
          style={{elevation:2}}
          onPress={saveConfig}
          >
          <Icon name="file-archive" size={25} color="white" />
          <Text className="text-xl text-white ml-3" style={styles.txt}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="w-full bg-red-400 items-center ml-2 mt-3 p-3 flex-row justify-center"
          onPress={()=>navigation.goBack()}
        >
          <Icon name="backspace" size={25} color="white" />
          <Text className="text-xl text-white ml-3" style={styles.txt}>Cancel</Text>
        </TouchableOpacity>

      </View>
    </View>
  )

}
const styles = StyleSheet.create({
  input: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 36
  },
  txt: {
    fontFamily: 'Oswald-SemiBold',
  }
});