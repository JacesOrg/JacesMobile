import { useEffect, useState } from "react";
import { View, Text } from "react-native";
const Spinner = require('react-native-spinkit');


export default function Loading(props) {
    const [visible, setVisible] = useState(false)
    useEffect(()=>{
        setVisible(props.visible)
    }, [props.visible])
    if(visible)
        return (<View className='absolute w-screen h-full bg-slate-300 bg-opacity-25 items-center justify-center' style={{backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
            <Spinner
                isVisible={true}
                type={'Wave'}
                size={50}
                style={{color: "rgb(6,182,212)"}}
            />
            <Text className="text-xl text-white">{props.text}</Text>
        </View>)
    else 
        return null
};
