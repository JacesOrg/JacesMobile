import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import Header from '../Header';
import st from '../styles';
import { faServer, faCircle } from '@fortawesome/free-solid-svg-icons';

export default function ViewHostScreen(props) {
    console.log(props);
    const host = props.route.params.host;
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
        <ScrollView>
            <Text style={st.txt} className="text-xl mt-7">Running configs:</Text>
            <Text>{JSON.stringify(host.configs)}</Text>
        </ScrollView>
        </>
    )
    
};

