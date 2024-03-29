import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Header from '../Header';
import st from '../styles';
import { faServer, faCircle } from '@fortawesome/free-solid-svg-icons';
import ConfigItem from '../Configs/ConfigItem';
import ActionDialog from "../ActionDialog";
import Context from '../Context';
import { useNavigation } from '@react-navigation/native';
import {sendAction, unregisterHost, getLogs, getActionStatus} from '../../lib/api'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Loading from '../Loading';

export default function ViewHostScreen(props) {
    const contextObj = useContext(Context)
    const host = contextObj.currentHost;
    const navigation = useNavigation()
    const [isVisible, setIsVisible] = useState(false)
    const [hostDialogVisible, setHostDialogVisible] = useState(false)
    const [configDialogTitle, setConfigDialogTitle] = useState("")
    const [currentConf, setCurrentConf] = useState("")
    const [currentAction, setCurrentAction] = useState("")
    const [loadingComplete, setLoadingComplete] = useState(false)

    const toggleDialog = (title, conf_id) => {
        setIsVisible(!isVisible)
        setConfigDialogTitle(title)
        setCurrentConf(conf_id);
    }
    const toggleHostDialog = (title) => {
        setHostDialogVisible(!hostDialogVisible)
        setConfigDialogTitle(host.host_id)
    }

    useEffect(() => {
        let counter = 0
        if(loadingComplete){
            const intrvl = setInterval(async () => {
                try{
                    counter++
                      if(counter > 30){
                        Toast.show({ text1: "Timeout receiving results of action. Please refresh host", type: 'error'})
                        clearInterval(intrvl)
                        setLoadingComplete(false)
                      }else{
                        console.log(currentAction);
                        const resp = await getActionStatus(currentAction, contextObj.token)
                        console.log(resp);
                        
                        if(resp.status !== 'NEW' && resp.status !== 'FAILED'){
                            Toast.show({ text1: "Successfully performed action", type: 'success'})
                            clearInterval(intrvl)
                            setLoadingComplete(false)
                        }else if(resp.status == 'FAILED') {
                            Toast.show({ text1: "Action failed", text2: resp.message, type: 'error'})
                            clearInterval(intrvl)
                            setLoadingComplete(false)
                        }
                      }
                }catch(e){
                    console.log(e);
                }
            }, 1000)
        }
    }, [loadingComplete])
    

    const configAction = [{
        name: 'Start',
        icon: 'play',
        color: 'bg-green-400',
        action: async ()=>{
            Alert.alert('Stop', 'Are you sure you want to stop this Config?', [{
                text: 'Cancel',
                onPress: async () => console.log("Canceled"),
                style: 'cancel',
              },
              {
                text: 'OK', 
                onPress: async () => {
                    const actionId = await sendAction(host.host_id, 'START', currentConf, contextObj.token)
                    setCurrentAction(actionId)
                    setLoadingComplete(true)
                    toggleDialog('', '')                    
                }
            }])
            
        }
    },{
        name: 'Stop',
        icon: 'stop',
        color: 'bg-red-400',
        action: async ()=>{
            Alert.alert('Stop', 'Are you sure you want to stop this Config?', [{
                text: 'Cancel',
                onPress: async () => console.log("Canceled"),
                style: 'cancel',
              },
              {
                text: 'OK', 
                onPress: async () => {
                    const actionId = await sendAction(host.host_id, 'STOP', currentConf, contextObj.token)
                    setCurrentAction(actionId)
                    setLoadingComplete(true)
                    toggleDialog('', '')                    
                }
            }])
            
        }
    },{
        name: 'RESTART',
        icon: 'refresh',
        color: 'bg-yellow-500',
        action: async ()=>{
            Alert.alert('Restart', 'Are you sure you want to restart this Config?', [{
                text: 'Cancel',
                onPress: async () => console.log("Canceled"),
                style: 'cancel',
              },
              {
                text: 'OK', 
                onPress: async () => {
                    const actionId = await sendAction(host.host_id, 'RESTART', currentConf, contextObj.token)
                    setCurrentAction(actionId)
                    setLoadingComplete(true)
                    toggleDialog('', '')                    
                }
            }])
        }
    },
        {
        name: 'View logs',
        icon: 'th-list',
        color: 'bg-sky-400',
        action: async ()=>{
            try {
                const logs = await getLogs(currentConf, contextObj.token)
                toggleDialog('', '') 
                if(!logs)
                    Toast.show({
                        text1: "No logs found",
                        type: 'info'
                    })
                else
                    navigation.navigate("View Logs", {log: logs.log})
            } catch (error) {
                Toast.show({
                    text1: 'Failed to receive logs',
                    text2: error,
                    type: 'error'
                })
            }
            
            
        }
    }]

    const hostActions = [{
        name: "Delete",
        icon: "trash",
        color: "bg-red-400",
        action: ()=>{Alert.alert('Delete', 'Are you sure you want to delete this Host?', [{
            text: 'Cancel',
            onPress: async () => console.log("Canceled"),
            style: 'cancel',
          },
          {
            text: 'OK', 
            onPress: async () => {
                await unregisterHost(host._id, contextObj.token)
                contextObj.refresh()
                navigation.goBack()
                
            }
        }])
        }
    }]

    return(
        <>
        <Header title={'View Host'} backButton={true}/>
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
                    <Text className="text-2xl text-white" style={st.txt}>
                    {host.host_id}
                    </Text>
                    <View className="flex-row items-center mt-1">
                    <Text className="text-xl text-white mr-3" style={st.txt}>
                        Status:
                    </Text>
                    <FontAwesomeIcon icon={faCircle} size={8} color={host.status == "ONLINE" ? "lightgreen" : "red"} />
                    <Text className="text-xl text-white ml-1" style={st.txt}>
                        {host.status ? host.status : 'OFFLINE'}
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
                <Button title='Operations' onPress={toggleHostDialog}/>
            </View>

        </View>
        <Text style={st.txt} className="text-xl mt-7 ml-3">Running configs:</Text>
        <ScrollView contentContainerStyle={sts.scw}>
                {host.configs && host.configs.map(conf=> <ConfigItem key={conf.name} config={conf} btnPress={toggleDialog}/>)}
        </ScrollView>
            <ActionDialog
              visible={isVisible}
              closeAction={toggleDialog}
              actions={configAction}
              title={configDialogTitle}
            />
            <TouchableOpacity 
                style={{elevation: 2}}
                className="absolute bottom-4 left-1/3 ml-5 rounded-full bg-indigo-600 w-20 h-20 items-center justify-center"
                onPress={()=>navigation.navigate("Choose config")}
            >
                <Text className="text-4xl text-white">+</Text>
            </TouchableOpacity>
            <ActionDialog 
                    visible={hostDialogVisible}
                    closeAction={toggleHostDialog}
                    actions={hostActions}
                    title={host.host_id}
            />
            <Loading visible={loadingComplete} text={"Loading actions"}/>
        </>
    )

};

const sts = StyleSheet.create({
    scw: {
        alignItems: 'center'
    }
})

