import { TouchableOpacity, View, Text, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function ConfigItem(props) {
    const navigation = useNavigation()
    const [containerStatus, setContainerStatus] = useState('')
    const offline = "bg-slate-400"
    const online = "bg-green-400"
    const error = "bg-red-400"

    useEffect(()=>{
        console.log('Container status:', props.config)
        if(!props.config.status)
            setContainerStatus(offline)
        else
            switch (props.config.status.toUpperCase()){
                case "DEPLOYED":
                    setContainerStatus(online)
                    break
                case "OFFLINE":
                    setContainerStatus(offline)
                    break
                default:
                    setContainerStatus(error)
                    break
            
        }
    }, [props.config])
    return (
        <TouchableOpacity className="w-11/12 rounded-md flex-row space-x-1 items-center bg-sky-400 mt-2"
          onPress={()=>navigation.navigate('View Config', {config: props.config})}
        >
            <View className="flex-row w-9/12 items-center">
                <View className="ml-3">
                    <Icon name={props.config.icon} size={30} color="white" />
                </View>
                <View className="ml-5 mt-3 mb-3">
                    <Text className="text-xl text-white">{props.config.name}</Text>
                    <Text className="text-md text-white">Image: {props.config.image}</Text>
                </View>
            </View>
            <View className="flex-row items-center pl-4">
                <View className={`rounded-full ${containerStatus} w-5 h-5`} />
                <TouchableOpacity className="ml-7 h-full w-full" onPress={()=>props.btnPress(props.config.name, props.config.id)}>
                    <Icon name="ellipsis-v" size={35} color="white"/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )

};
