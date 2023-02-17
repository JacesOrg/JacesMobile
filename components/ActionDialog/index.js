import { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ActionDialog(props) {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(()=>{
    setIsVisible(props.visible)
  }, [props.visible])
  const handleClose = () => {
    setIsVisible(false)
    props.closeAction()
  }
  if(isVisible)
    return (
      <View className='absolute w-screen h-full bg-slate-300 bg-opacity-25 items-center justify-center' style={{backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>

        <View className='w-8/12 h-8/12 bg-cyan-400 items-center rounded-md p-4' style={{ elevation:2 }}>
          <Text className='text-xl text-white mb-5' style={st.txt}>{props.title}</Text>
          {props.actions && props.actions.map(action=>(
            <TouchableOpacity
              className={`flex-row justify-center w-11/12 h-30 ${action.color} items-center rounded-md filter drop-shadow-lg mb-3 p-2`} style={{ elevation:2 }}
              onPress={action.action}
          >
              <Icon name={action.icon} color='white' size={20} />
              <Text className='text-xl text-white ml-2' style={st.txt}>{action.name}</Text>
            </TouchableOpacity>)
            )}
          <View style={st.line} />
          <TouchableOpacity onPress={handleClose} className='flex-row justify-center w-11/12 h-30 bg-green-500 items-center rounded-md filter drop-shadow-lg mb-3 p-2' style={{ elevation:2 }}>
            <Icon name="times" color='white' size={20} />
            <Text className='text-xl text-white ml-2' style={st.txt}>Close</Text>
          </TouchableOpacity>

        </View>

      </View>
    )
  else
    return null
}

const st = StyleSheet.create({
  txt: {
    fontFamily: 'Oswald-Medium',
  },
  line: {
    height: 24,
    borderBottomWidth: 1,
    transform: [{ translateY: -12 }],
    backgroundColor: 'black'
  },
});
