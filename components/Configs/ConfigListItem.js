import React from "react";
import { View } from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAddressBook} from "@fortawesome/free-solid-svg-icons";

export default function ConfigListItem(){
  return (
    <View className="w-11/12 h-200 bg-slate-300 flex-row rounded-md">
      <View className="w-1/3">
        <FontAwesomeIcon icon={faAddressBook} size={55} color={"red"} />
      </View>

    </View>
  )
}
