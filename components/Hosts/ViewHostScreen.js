import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity, Alert, ListView } from "react-native";
import Header from '../Header';
import st from '../styles';
import { faServer, faCircle, faArrowsSpin, faTrash, faXmark} from '@fortawesome/free-solid-svg-icons';
import { Modal } from "nativewind/dist/preflight";
import ConfigListItem from "../Configs/ConfigListItem";

export default function ViewHostScreen(props) {
    console.log(props);
    const [toggleOperations, setToggleOperations] = useState(false)
    const host = props.route.params.host;
    const confirmDialog = (title, message, onOk, onCancel) => {
       Alert.alert(title, message, [{
           text: "Confirm",
           onPress: onOk
       }, {
           text: "Cancel",
           style: "cancel",
           onPress: onCancel
       }])
    }
    return(
        <View className="w-full">
        <Header title={'View Host'} backButton={true} addButton={true}/>
        <View className="flex flex-col h-1/4  bg-slate-400 shadow-md w-full">
            <View className="flex-row items-center mt-4" >
                <View className="justify-center ml-4 mr-4">
                    <FontAwesomeIcon
                    icon={faServer}
                    className="ml-20"
                    size={65}
                    color={'lightgreen'}
                    />
                </View>
                <View className="w-60 ml-5">
                    <Text className="text-4xl text-white" style={st.txt}>
                    {host.host_id}
                    </Text>
                    <View className="flex-row items-center mt-1">
                    <Text className="text-xl text-white mr-3" style={st.txt}>
                        Status:
                    </Text>
                    <FontAwesomeIcon icon={faCircle} size={8} color="lightgreen" />
                    <Text className="text-xl text-white ml-1" style={st.txt}>
                        Online
                    </Text>
                    </View>
                    <Text
                    numberOfLines={2}
                    className="text-base text-white mt-1"
                    style={st.txt}>
                    {host.info}
                    </Text>
                </View>
            </View>
            <View className="flex mt-5">
                <Button title='Operations' onPress={()=>setToggleOperations(!toggleOperations)} />
            </View>

        </View>
            {
                !host.configs || host.configs.length === 0 ?
                    <TouchableOpacity className="bg-fuchsia-300 w-11/12 mt-10 ml-4 h-16 items-center justify-center rounded-md">
                       <Text style={st.txt} className="text-xl text-white tracking-widest uppercase">Create your first config</Text>
                    </TouchableOpacity>
                  :
                  <View className="mt-10 ml-2 items-center h-full">
                      <Text className="text-base mb-2">Your Configs</Text>
                      <ScrollView contentContainerStyle={{width: 400, height: '100%'}}>
                        <ConfigListItem />
                      </ScrollView>
                  </View>
            }
            <View className="w-100 h-1/2 bg-white-100 rounded-sm mt-22">
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={toggleOperations}
                  onRequestClose={() => {
                      setToggleOperations(!toggleOperations);
                  }}>
                    <View className="mt-20 ml-4 items-center w-11/12">
                        <Text style={st.txt} className="text-xl text-black">Operations with host: {host.host_id}</Text>
                        <TouchableOpacity onPress={()=>confirmDialog("Reboot host", "Are you sure you want to reboot host?", ()=>console.log("OK"), ()=>console.log("Cancel"))} className="w-11/12 h-10 bg-orange-400 justify-center items-center mt-3 flex-row">
                            <FontAwesomeIcon icon={faArrowsSpin} size={20} color={'white'}/>
                            <Text style={st.txt} className="text-xl text-white ml-3">Reboot</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>confirmDialog("Delete host", "Are you sure you want to delete host?", ()=>console.log("OK"), ()=>console.log("Cancel"))} className="w-11/12 h-10 bg-red-400 justify-center items-center mt-3 flex-row">
                            <FontAwesomeIcon icon={faTrash} size={20} color={'white'}/>
                            <Text style={st.txt} className="text-xl text-white ml-3">Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setToggleOperations(!toggleOperations)} className="w-11/12 h-10 bg-blue-400 justify-center items-center mt-10 flex-row">
                            <FontAwesomeIcon icon={faXmark} size={20} color={'white'}/>
                            <Text style={st.txt} className="text-xl text-white ml-3">Close this window</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </View>
    )

};

