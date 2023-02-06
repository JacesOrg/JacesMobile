import { TouchableOpacity, View, Text, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'

export default function ConfigItem(props) {

    return (
        <TouchableOpacity className="w-11/12 rounded-md flex-row space-x-1 items-center bg-sky-400 mt-2">
            <View className="flex-row w-9/12 items-center">
                <View className="ml-3">
                    <Icon name="rocket" size={30} color="white" />
                </View>
                <View className="ml-5 mt-3 mb-3">
                    <Text className="text-xl text-white">{props.name}</Text>
                    <Text className="text-md text-white">Image: {props.image}</Text>
                </View>
            </View>
            <View className="flex-row items-center pl-4">
                <View className="rounded-full bg-green-400 w-5 h-5" />
                <TouchableOpacity className="ml-7">
                    <Icon name="ellipsis-v" size={35} color="white"/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
    
};
