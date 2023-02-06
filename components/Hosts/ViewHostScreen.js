import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Alert } from "react-native";
import Header from '../Header';
import st from '../styles';
import { faServer, faCircle } from '@fortawesome/free-solid-svg-icons';
import ConfigItem from '../Configs/ConfigItem';
import ActionDialog from "../ActionDialog";

export default function ViewHostScreen(props) {
    console.log(props);
    const host = props.route.params.host;
    const [isVisible, setIsVisible] = useState(false)
    const [configDialogTitle, setConfigDialogTitle] = useState("")

    const toggleDialog = (title) => {
        setIsVisible(!isVisible)
        setConfigDialogTitle(title)
    }

    const configAction = [{
        name: 'Stop',
        icon: 'stop',
        color: 'bg-red-400',
        action: ()=>{Alert.alert('Stop action', 'Are you sure you want to stop this config?')}
    },{
        name: 'Reload',
        icon: 'refresh',
        color: 'bg-yellow-500',
        action: ()=>{Alert.alert('Reload action', 'Are you sure you want to reload this config?')}
    },
        {
        name: 'View logs',
        icon: 'th-list',
        color: 'bg-sky-400',
        action: ()=>{Alert.alert('View logs action', 'View logs')}
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
                <Button title='Operations' />
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
        </>
    )

};

const sts = StyleSheet.create({
    scw: {
        alignItems: 'center'
    }
})

