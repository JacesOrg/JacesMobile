import React, { useContext } from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faServer, faCircle} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import Context from '../Context';

export default function HostItem(props) {
  const navigation = useNavigation();
  const contextObj = useContext(Context)
  const viewHost = () => {
    contextObj.setCurrentHost(props.host)
    navigation.navigate('View Host' , {host: props.host})
  }
  return (
    <TouchableOpacity className="bg-slate-500 w-11/12 mb-1 mt-2 h-28 flex-row rounded-md"
    onPress={viewHost}>
      <View className="justify-center ml-5 mr-5">
        <FontAwesomeIcon
          icon={faServer}
          className="ml-20"
          size={45}
          color={'lightgreen'}
        />
      </View>
      <View className="mt-4 w-60">
        <Text className="text-2xl text-white" style={st.txt}>
          {props.host.host_id}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-sm text-white mr-3" style={st.txt}>
            Status:
          </Text>
          <FontAwesomeIcon icon={faCircle} size={8} color={props.host.status == "ONLINE" ? "lightgreen" : "red"} />
          <Text className="text-sm text-white ml-1" style={st.txt}>
            {props.host.status ? props.host.status : 'OFFLINE'}
          </Text>
        </View>
        <Text
          numberOfLines={2}
          className="text-xs text-white mt-1"
          style={st.txt}>
          {props.host.info}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const st = StyleSheet.create({
  txt: {
    fontFamily: 'Oswald-Medium',
  },
  logo: {
    fontFamily: 'Oswald-SemiBold',
    color: '#38BDF8',
  },
  bg: {
    backgroundColor: '#38BDF8',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
  },
});
