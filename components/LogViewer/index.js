import React, {useState, useEffect} from 'react'
import Header from '../Header'
import { View, Text, ScrollView } from 'react-native'

export default function LogViewer(props) {
    const [log, setLog] = useState("")
    useEffect(() => {
      setLog(props.route.params.log)
    }, [props.route.params.log])

    return <>
        <View>
            <Header title="View logs" backButton={true}/>
            <ScrollView>
            <Text>{log ? log : "Nothing to show"}</Text>
            </ScrollView>
        </View>
    </>
    
}