import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import Context from '../Context';
import Header from '../Header';
import HostItem from './HostItem';

export default function Hosts() {
  const contextObj = useContext(Context);
  console.log(JSON.stringify(contextObj.hosts, 0, 2));

  return (
    <>
      <Header title="Your Hosts" />
      <ScrollView
        className="flex h-screen align-middle"
        contentContainerStyle={st.scroll}>
        {contextObj.hosts.map(host => (
          <HostItem host={host} />
        ))}
      </ScrollView>
    </>
  );
}

const st = StyleSheet.create({
  scroll: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
