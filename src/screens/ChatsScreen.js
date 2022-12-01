import { View, Text, FlatList, SafeAreaView } from 'react-native';
import React from 'react';
import chats from '../../assets/data/chats.json';
import { ChatListItem } from '../components/ChatListItem';

const ChatsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatListItem chat={item} />}
        style={{ backgroundColor: 'white' }}
      />
    </SafeAreaView>
  );
};

export default ChatsScreen;
