import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text,View, RefreshControl} from 'react-native';
import Context from '../Context';
import Header from '../Header';
import HostItem from './HostItem';

export default function HostsListScreen() {
  const contextObj = useContext(Context);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await contextObj.refresh()
    setRefreshing(false);
  }, []);


  return (
    <>
      <Header title="Your Hosts" />
      <ScrollView
        className="flex h-screen align-middle"
        contentContainerStyle={st.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
        {contextObj.hosts && contextObj.hosts.length > 0 ? contextObj.hosts.map(host => (
          <HostItem key={host._id} host={host} />
        )) : 
        <View className="items-center">
          <Text className="text-xl ml-1 mr-1 mb-2 mt-5 text-sky-500" style={st.txt}>You have no active hosts. Go to Jaces OS and register your first Host!</Text>
          <Text className="text-xl ml-1 mr-1 mt-5 text-green-500 " style={st.txt}>Then pull down to refresh Hosts List!</Text>
        </View>}
      </ScrollView>
    </>
  );
}

const st = StyleSheet.create({
  scroll: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: 'Oswald-Bold'
  }
});
