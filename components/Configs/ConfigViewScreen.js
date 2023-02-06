import { View } from "react-native";
import Header from "../Header";

export default function ConfigViewScreen(props) {

  const config = props.route.params.config

  return(
    <View>
      <Header title={'View Config'} backButton={true}/>

    </View>
  )

}
