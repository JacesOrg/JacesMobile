import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getConfigs } from "../../lib/api";
import Header from "../Header";
import Icon from "react-native-vector-icons/FontAwesome5"
import { useNavigation } from "@react-navigation/native";
import uuid from 'react-native-uuid';

export default function ConfigList(params) {
    const [configList, setConfigList] = useState([])
    const navigation = useNavigation()
    useEffect(()=>{
        getConfigs().then(configs=>{
            setConfigList(configs)
        })
    }, [])

    const proceedToConf = (id) =>{
        for(let el of configList)
            if(el._id === id){
                const obj = {}
                obj.name=""
                obj.image=el.image,
                obj.id = uuid.v4()
                obj.params = el.params
                obj.icon = el.icon
                navigation.navigate('View Config', {config: obj, isNew: true})
                break
            }
        
    }
    return(
        <View>
            <Header title={"Choose Image"} backButton={true} />
            <ScrollView contentContainerStyle={st.scv}>
                {configList && configList.map(conf=>(
                    <TouchableOpacity 
                        className="bg-sky-400 w-10/12 ml-10 justify-center items-center p-6 rounded-xl flex-row" 
                        style={{elevation: 2}}
                        onPress={()=>proceedToConf(conf._id)}
                    >
                        <Icon name={conf.icon} size={40} />
                        <Text className="text-2xl text-white ml-5">{conf.name}</Text>
                    </TouchableOpacity>
                ))}
                
            </ScrollView>
        </View>
        
    )
};

const st = StyleSheet.create({
    txt: {
        fontFamily: 'Oswald-Bold'
    },
    scv: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15
    },
})
